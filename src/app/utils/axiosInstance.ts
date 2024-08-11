import axios, { AxiosError, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

const axiosInstance = axios.create(
    {
        baseURL: `${process.env.NEXT_PUBLIC_API}`
    }
)

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (config.url == '/riddle/api/auth/tokens') {
        config.headers.Authorization = `Bearer ${Cookies.get('refreshToken')}`
    }
    else {
        if (!config.url?.includes('/auth')) {
            if (Cookies.get('accessToken')) {
                config.headers.Authorization = `Bearer ${Cookies.get('accessToken')}`
            }
            else {
                window.location.href='/auth/login'
            }
        }
        // console.log('token',Cookies.get('accessToken'))
        // else {
        //     window.location.href='/auth/login'
        // }
    }
    return config
})
axiosInstance.interceptors.response.use((response:AxiosResponse) => {
    return response
}, async (error: AxiosError) => {
    if(error.response?.statusText == "Unauthorized") {
        console.log('token expired')
        const refreshToken = Cookies.get('refreshToken')
        try {
            const refreshTokenFetch=await axiosInstance.get('/riddle/api/auth/tokens', {
                headers: {
                    Authorization:`Bearer ${refreshToken}`
                }
            })
            const { access_token, refresh_token } = refreshTokenFetch.data.data.tokens
            console.log('new tokens set',access_token,refreshToken)
            Cookies.set('accessToken', access_token)
            Cookies.set('refreshToken', refresh_token)
            return axiosInstance({
                ...error.config, headers: {
                ...error.config?.headers,Authorization:`Bearer ${access_token}`
            }})
        }
        catch (e) {
            console.log('refresh token error')
            try {
                const userData = JSON.parse(Cookies.get('userData')!)
                if (userData.role == 'Admin') {
                    window.location.href = '/admin/login'
                }
                else {
                    window.location.href = '/auth/login'
                }
                Cookies.remove('userData')
                Cookies.remove('accessToken')
                Cookies.remove('refreshToken')
            }
            catch(e) {
                console.log('userdata error', e)
                // redirect("/auth/login");
                if (window.location.href.includes('/admin')) {
                    window.location.href = '/admin/login'
                }
                else {
                    window.location.href = '/auth/login'
                }
                // console.log(window.location.href)
            }
        }
    }
    console.log('interceptor error', error)
    return Promise.reject(error);
})
export default axiosInstance