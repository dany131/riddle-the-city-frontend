'use client';

import axiosInstance from "@/app/utils/axiosInstance";
import {Input} from "@nextui-org/react";
import {useRouter} from "next/navigation";
import {FormEvent, useEffect, useState} from "react";
import {BsEyeFill, BsEyeSlash} from "react-icons/bs";
import {CiMail} from "react-icons/ci";
import {IoIosLock} from "react-icons/io";
import {useMutation} from "react-query";
import Cookies from 'js-cookie';
import {ImSpinner2} from "react-icons/im";
import {toast} from "react-toastify";
import {RegexConstants} from "@/app/utils/constant";

type LoginData = {
    email: string,
    password: string,
    accessType: number,
    accessToken: string
}


export default function Login() {
    const [isVisible, toggleVisibility] = useState(false);
    const router = useRouter();
    const [invalid, setInvalid] = useState(false);
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const loginMutation = useMutation((data: LoginData): any => axiosInstance.post('/auth/login', data), {
        onSuccess(data: any) {
            if (data.data.data.user.role === 'Admin') {
                setInvalid(false);
                Cookies.set('accessToken', data.data.data.tokens.access_token);
                Cookies.set('refreshToken', data.data.data.tokens.refresh_token);
                Cookies.set('userData', JSON.stringify({
                    name: data.data.data.user.name,
                    email: data.data.data.user.email,
                    phone: data.data.data.user.phone,
                    role: data.data.data.user.role,
                    id: data.data.data.user._id,
                    profile: data.data.data.user.profilePicture,
                    accessType: data.data.data.user.accessType
                }));
                router.replace('/admin/dashboard');
            } else {
                toast.error('Invalid Credentials', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                });
            }
        },
        onError(error: any) {
            if (typeof (error.response.data.message) == 'string') {
                toast.error(error.response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            }
            else {
                toast.error(error.response.data.message[0], {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            }
        }
    });

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!RegexConstants.PASSWORD.test(password)) {
            setPasswordError('Password must be 8-30 characters long, include at least one uppercase letter and one number.');
            return;
        }

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const dataForLogin: LoginData = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            accessType: 1,
            accessToken: ''
        };

        setPasswordError('');
        loginMutation.mutate(dataForLogin);
    }

    useEffect(() => {
        const accessToken = Cookies.get('accessToken')
        if (accessToken) {
            const { role } = JSON.parse(Cookies.get('userData')!)
            if (role == 'User') {
                router.replace('/dashboard')
            }
            else {
                router.replace('/admin/dashboard')
            }
        }
    }, [])
    return (
        <>
            <form onSubmit={handleSubmit} className=" w-full items-center flex flex-col gap-4 p-8 sm:px-24">
                <h1 className="text-2xl font-bold">Welcome Back!</h1>
                {invalid && <p className="text-red-600">{message}</p>}
                <p>Please use your email and password to login</p>
                <Input
                    required
                    name="email"
                    className="w-full"
                    type="email"
                    classNames={{ label: 'font-semibold' }}
                    isInvalid={email === '' && loginMutation.isError}
                    errorMessage="Please Enter Email"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    label="Email"
                    placeholder="you@example.com"
                    labelPlacement="outside"
                    startContent={
                        <CiMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                    }
                />
                <Input
                    name="password"
                    required
                    classNames={{ label: 'font-semibold' }}
                    isInvalid={passwordError !== ''}
                    errorMessage={passwordError}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    label="Password"
                    className="w-full"
                    placeholder="Enter your password"
                    labelPlacement="outside"
                    startContent={
                        <IoIosLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                    }
                    endContent={
                        <button className="focus:outline-none" type="button" onClick={() => {
                            toggleVisibility(!isVisible);
                        }}>
                            {isVisible ? (
                                <BsEyeSlash className="text-2xl text-default-400 pointer-events-none"/>
                            ) : (
                                <BsEyeFill className="text-2xl text-default-400 pointer-events-none"/>
                            )}
                        </button>
                    }
                    type={isVisible ? "text" : "password"}
                />

                <div className="flex w-full justify-end">
                    {/* <Checkbox>Remember Me</Checkbox> */}
                    {/* <Link href={'/admin/forgot-password'} className="text-blue-600 underline">Forgot Password?</Link> */}
                </div>
                <button type="submit" className="px-16 py-2 bg-[#A92223] flex justify-center rounded text-white w-max ">
                    {loginMutation.isLoading ? <ImSpinner2 className="text-xl animate-spin"/> : "Login"}
                </button>
            </form>
        </>
    );
}