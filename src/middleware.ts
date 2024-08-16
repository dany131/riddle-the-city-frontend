import axios from "axios"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

type UserData = {
    name: string,
    email: string,
    phone: string,
    role: string,
    id: string
}

const restrictedUserPaths = ['/dashboard','/feedback','/help','/profile','/settings']

export default async function Middleware(request: NextRequest) {
    const cookiesInitialise = cookies()
    const accessToken = cookiesInitialise.get('accessToken')?.value
    const refreshToken = cookiesInitialise.get('refreshToken')?.value
    let userData: UserData | any = cookiesInitialise.get('userData')?.value
    console.log('pathname',request.nextUrl.pathname)
    if (accessToken) {
        userData = JSON.parse(userData!)
        try {
            const accessTokenChecking = await axios.get(`${process.env.NEXT_PUBLIC_API}/riddle/api/brewery/all?page=1&limit=20`, {
                headers: {
                    Authorization:`Bearer ${accessToken}`
                }
            })
            const { role } = userData
            if (request.nextUrl.pathname.includes('/login') && role == 'User') {
                return NextResponse.redirect(new URL('/dashboard', request.nextUrl.origin))
            }
            else if (request.nextUrl.pathname.includes('/login') && role == 'Admin') {
                return NextResponse.redirect(new URL('/admin/dashboard', request.nextUrl.origin))
            }
            else if (role == 'User' && request.nextUrl.pathname.includes('/admin')) {
                return NextResponse.redirect(new URL('/dashboard', request.nextUrl.origin))
            }
            else if (role=='Admin' && restrictedUserPaths.includes(request.nextUrl.pathname)) {
                return NextResponse.redirect(new URL('/admin/dashboard', request.nextUrl.origin))
            }
        }
        catch {
            try {
                const refreshTokenChecking = await axios.get(`${process.env.NEXT_PUBLIC_API}/riddle/api/auth/tokens`, {
                    headers: {
                        Authorization: `Bearer ${refreshToken}`
                    }
                })
                const { access_token, refresh_token } = refreshTokenChecking.data.data.tokens
                const response = NextResponse.next()
                console.log('new middleware refresh tokens set')
                response.cookies.set('accessToken', access_token)
                response.cookies.set('refreshToken', refresh_token)
                return response
            }
            catch (e) {
                console.log('middleware refreshtoken error')
                const { role } = userData
                let response;
                if (role == 'Admin') {
                    response = NextResponse.redirect(new URL('/admin/login', request.nextUrl.origin))
                }
                else {
                    response = NextResponse.redirect(new URL('/auth/login', request.nextUrl.origin))
                }
                response.cookies.delete('accessToken')
                response.cookies.delete('refreshToken')
                response.cookies.delete('userData')
                return response
            }
        }
    }
    else {
        if (request.nextUrl.pathname.includes('/admin')) {
            return NextResponse.redirect(new URL('/admin/login', request.nextUrl.origin))
        }
        else if (restrictedUserPaths.includes(request.nextUrl.pathname)) {
            return NextResponse.redirect(new URL('/auth/login', request.nextUrl.origin))
        }
    }
}


export const config = {
    matcher: [
        '/admin/dashboard',
        '/admin/manage-breweries/:path*',
        '/admin/manage-hunts/:path*',
        '/admin/notifications',
        '/admin/settings',
        '/admin/view-bookings',
        '/dashboard',
        '/feedback',
        '/help',
        '/profile',
        '/settings/:path*',
        '/checkout',
        '/payment',
        '/startRiddle',
        '/packages',
        '/brewery',
        '/completion/:path*',
        '/rewards',
        '/admin/login',
        '/auth/login'
    ]
}