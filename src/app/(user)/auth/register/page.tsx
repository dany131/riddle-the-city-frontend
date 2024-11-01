'use client';
import axiosInstance from "@/app/utils/axiosInstance";
import {Checkbox, CheckboxGroup, Input, Radio, RadioGroup} from "@nextui-org/react";
import {useGoogleLogin} from "@react-oauth/google";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {FormEvent, useRef, useState} from "react";
import {BiPhone} from "react-icons/bi";
import {BsEyeFill, BsEyeSlash} from "react-icons/bs";
import {CiMail} from "react-icons/ci";
import {FaFacebook} from "react-icons/fa";
import {FcGoogle} from "react-icons/fc";
import {IoIosLock} from "react-icons/io";
import {useMutation} from "react-query";
import {CiUser} from "react-icons/ci";
import Cookies from 'js-cookie';
import {toast} from "react-toastify";
import GooglePlacesInput from "@/components/common/google-input";
import { FieldValues, useController, useForm } from "react-hook-form";


type LoginData = {
    accessType: number,
    accessToken: string,
    internal?: {
        name: string,
        email: string,
        phone: string,
        password: string,
        postalCode:string
    }
}

export default function Register() {
    const [isVisible1, toggleVisibility1] = useState(false);
    const [isVisible2, toggleVisibility2] = useState(false);
    const [message, setMessage] = useState('');
    const [noMatch, setNoMatch] = useState(false);
    const [selected, setSelected] = useState([]);
    const [invalidKey, setInvalidKey] = useState(false); // New state for invalid key
    const formRef = useRef();
    const router = useRouter();
    const secretKey = "Admin@1234";

    const {control,handleSubmit,register,formState:{errors},watch}=useForm()
    const registerMutation = useMutation((data: LoginData) => axiosInstance.post('/auth/signup', data), {
        onSuccess(data) {
            console.log('success', data);
            localStorage.setItem('accessToken', data.data.data.tokens.access_token);
            localStorage.setItem('refreshToken', data.data.data.tokens.refresh_token);
            localStorage.setItem('userData', JSON.stringify({
                name: data.data.data.user.name,
                email: data.data.data.user.email,
                phone: data.data.data.user.phone,
                role: data.data.data.user.role,
                id: data.data.data.user._id,
                profile: data.data.data.user.profilePicture,
                accessType: data.data.data.user.accessType
            }));
            router.push(`/auth/verify?userid=${data.data.data.user._id}`);
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
                    theme: "light"
                });
            } else {
                toast.error(error.response.data.message.join(','), {
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
        }
    });
    const registerGoogleMutation = useMutation((data: LoginData) => axiosInstance.post('/auth/signup', data), {
        onSuccess(data) {
            console.log('success', data);
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
            router.push('/dashboard');
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
                    theme: "light"
                });
            } else {
                toast.error(error.response.data.message.join(','), {
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
        }
    });

    function handleSubmitt(e: FieldValues) {
        // e.preventDefault();

        const form = e.target as any as HTMLFormElement;
        // const formData = new FormData(form);
        const name=e.name
        const email=e.email
        const phone=e.phone
        const password = e.password as any as string;
        const confirmPass = e['confirm-password'] as any as string;
        const key =e.key as string; // Get the key value
        const code=e.address.postalCode

        if (key !== secretKey) {
            setInvalidKey(true); // Set the error for invalid key
            toast.error('Invalid Key', {
                position: "top-right",
                autoClose: 5000,
                theme: "light"
            });
            return;
        }

        setInvalidKey(false);
        const loginData: LoginData = {
            accessType: 1,
            accessToken: '',
            internal: {
                name,
                email,
                password,
                phone,
                postalCode:code
            }
        };

        if (password == confirmPass) {
            registerMutation.mutate(loginData);

        } else {
            toast.error('Passwords Do Not Match', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
            // setMessage('Passwords Do Not Match')
            // setNoMatch(true)
        }
    }

    const loginMutation = useMutation((data: LoginData): any => axiosInstance.post('/auth/login', data), {
        onSuccess(data: any) {
            if (data.data.data.statusCode != 400) {
                if (data.data.data.user.role == 'User') {
                    // setInvalid(false)

                    Cookies.set('accessToken', data.data.data.tokens.access_token);
                    Cookies.set('refreshToken', data.data.data.tokens.refresh_token);
                    Cookies.set('userData', JSON.stringify({
                        name: data.data.data.user.name,
                        email: data.data.data.user.email,
                        phone: data.data.data.user.phone,
                        role: data.data.data.user.role,
                        id: data.data.data.user._id,
                        profile: data.data.data.user.profilePicture
                    }));
                    router.push('/dashboard');
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
                    // setInvalid(true)
                    // setMessage('Invalid Credentials')
                }
            }
            console.log(data);
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
                    theme: "light"
                });
            } else {
                toast.error(error.response.data.message.join(','), {
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
        }
    });
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            const {access_token} = codeResponse;
            console.log('google', access_token);
            const loginData: LoginData = {
                accessType: 2,
                accessToken: access_token
            };
            registerGoogleMutation.mutate(loginData);
        },
        flow: 'implicit'
    });

    const {field:field1,fieldState:fieldState1}=useController({name:'above21',control,rules:{required:"Is Required"}})
    const {field,fieldState}=useController({name:'accept',control,rules:{required:"Is Required"}})




    console.log(errors?.['confirm-password'])
    return (
        <>
            <form ref={formRef as any} onSubmit={handleSubmit(handleSubmitt)}
                  className="h-full sm:overflow-visible overflow-auto  hidden w-full items-center  sm:flex flex-col gap-4 p-8 sm:p-8">
                <h1 className="text-2xl font-bold">Registration</h1>
                {noMatch && <p className="text-red-600">{message}</p>}
                <Input
                     {...register('name',{required:"Enter Name"})}
                     isInvalid={errors.name as any}
                     errorMessage={errors.name?.message as any}
                    className="w-full"
                    type="text"
                    label="Full Name"
                    placeholder="John Gordon"
                    labelPlacement="outside"
                    startContent={
                        <CiUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                    }
                    classNames={{label: 'font-semibold'}}
                />
                <Input
                     {...register('email',{required:"Enter Email"})}
                     isInvalid={errors.email as any}
                     errorMessage={errors.email?.message as any}
                    className="w-full"
                    type="email"
                    label="Email Address"
                    placeholder="you@example.com"
                    labelPlacement="outside"
                    startContent={
                        <CiMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                    }
                    classNames={{label: 'font-semibold'}}
                />
                <Input
                     {...register('phone',{required:"Enter Phone"})}
                     isInvalid={errors.phone as any}
                     errorMessage={errors.phone?.message as any}
                    className="w-full"
                    type="text"
                    label="Phone Number"
                    placeholder="+123456789"
                    labelPlacement="outside"
                    startContent={
                        <BiPhone className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                    }
                    classNames={{label: 'font-semibold'}}
                />
                <Input
                     {...register('password',{required:"Enter Password"})}
                     isInvalid={errors.password as any}
                     errorMessage={errors.password?.message as any}
                    label="Password"
                    className={'w-full'}
                    placeholder="Enter your password"
                    labelPlacement="outside"
                    startContent={
                        <IoIosLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                    }
                    endContent={
                        <button className="focus:outline-none" type="button" onClick={() => {
                            toggleVisibility1(!isVisible1);
                        }}>
                            {isVisible1 ? (
                                <BsEyeSlash className="text-2xl text-default-400 pointer-events-none"/>
                            ) : (
                                <BsEyeFill className="text-2xl text-default-400 pointer-events-none"/>
                            )}
                        </button>
                    }
                    classNames={{label: 'font-semibold'}}
                    type={isVisible1 ? "text" : "password"}
                />
                <Input
                    {...register('confirm-password',{required:"Enter Confirm Password",

                        validate:(value, formValues) => value == watch('password')|| 'Passwords Dont Match',

                     })}
                     isInvalid={errors['confirm-password'] as any}
                     errorMessage={errors['confirm-password']?.message as any}
                    label="Confirm Password"
                    className={'w-full'}
                    placeholder="Enter your password"
                    labelPlacement="outside"
                    classNames={{label: 'font-semibold'}}
                    startContent={
                        <IoIosLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                    }
                    endContent={
                        <button className="focus:outline-none" type="button" onClick={() => {
                            toggleVisibility2(!isVisible2);
                        }}>
                            {isVisible2 ? (
                                <BsEyeSlash className="text-2xl text-default-400 pointer-events-none"/>
                            ) : (
                                <BsEyeFill className="text-2xl text-default-400 pointer-events-none"/>
                            )}
                        </button>
                    }
                    type={isVisible2 ? "text" : "password"}
                />

                <Input
                {...register('key',{required:"Enter Key"})}
                isInvalid={errors.key as any}
                errorMessage={errors.key?.message as any}
                    label="Key"
                    className="w-full"
                    placeholder="Enter the key"
                    labelPlacement="outside"
                    classNames={{label: 'font-semibold'}}
                    startContent={<IoIosLock
                        className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>}
                    // endContent={invalidKey && <span className="text-red-600">Invalid Key</span>}
                    type="text"
                />

                <GooglePlacesInput
                      name="address"
                      control={control}
                      placeholder="Zip Code"
                      rules={{ required: "Zip Code is required" }}
                      addressKey="postalCode"
                      radius="sm"
                    />
                  {/* </div> */}

                  <div className="flex w-full justify-between">
                    <CheckboxGroup isInvalid={!!fieldState1.error} errorMessage={fieldState1.error?.message} {...field1}>
                        <Checkbox value={'yes'}>You must be 21 years of age to enter this site</Checkbox>

                    </CheckboxGroup>
                </div>
                <div className="flex w-full justify-between">
                    <CheckboxGroup {...field} isInvalid={!!fieldState.error} errorMessage={fieldState.error?.message}>
                        <Checkbox value={'yes'}>I accept <Link href={'/terms-and-conditions'} className="underline">Terms & Conditions</Link> and <Link href={'/privacy-policy'}
                            className="underline">Privacy Policy</Link></Checkbox>

                    </CheckboxGroup>
                </div>
                <button type="submit" className="bg-[#A92223] rounded-lg p-4 text-white w-[80%]">SignUp</button>
                {/*<div className="flex w-full items-center justify-center gap-4 mt-4">*/}
                {/*    <div className="h-[0.1rem] w-[15%] bg-gray-400 w-full"></div>*/}
                {/*    <p>Or</p>*/}
                {/*    <div className="h-[0.1rem] w-[15%] bg-gray-400 w-full"></div>*/}
                {/*</div>*/}
                {/*<div className="flex gap-4 pb-4">*/}
                {/*    <button type="button" onClick={() => {*/}
                {/*        login();*/}
                {/*    }} className="flex items-center gap-2 px-4 py-2 shadow-lg rounded-lg"><FcGoogle*/}
                {/*        className="text-3xl"/><p className="text-lg">Google</p></button>*/}
                {/*    /!* <button className="flex items-center gap-2 px-4 py-2 shadow-lg rounded-lg"><FaFacebook className="text-3xl text-blue-600" /><p className="text-lg">Facebook</p></button> *!/*/}
                {/*</div>*/}
            </form>


            <form onSubmit={handleSubmit(handleSubmitt)}
                  className="h-full sm:overflow-visible overflow-auto  bg-[#160704]  relative sm:hidden w-full ">
                <Image
                    priority
                    className="absolute top-0 h-full w-full"
                    style={{opacity: "0.5"}}
                    src={"/images/home/home-banner.png"}
                    alt="home-banner"
                    width={1000}
                    height={500}

                />
                <div
                    className="h-full sm:overflow-visible overflow-auto relative z-[1] text-white flex w-full items-center flex-col gap-4 p-8 !sm:px-16 !sm:py-8 ">
                    <div className="flex justify-center">
                        <div className="w-[7rem] h-[7rem]">

                            <Image className="w-full h-full object-contain" src={'/images/admin/main/layout/ridde.png'}
                                   alt="auth" width={200} height={200}/>
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold">Registration</h1>
                    {noMatch && <p className="text-red-600">{message}</p>}
                    <Input
                     {...register('name',{required:"Enter Name"})}
                     isInvalid={errors.name as any}
                     errorMessage={errors.name?.message as any}
                    className="w-full"
                    type="text"
                    label="Full Name"
                    placeholder="John Gordon"
                    labelPlacement="outside"
                    startContent={
                        <CiUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                    }
                    classNames={{label: 'font-semibold'}}
                />
                <Input
                     {...register('email',{required:"Enter Email"})}
                     isInvalid={errors.email as any}
                     errorMessage={errors.email?.message as any}
                    className="w-full"
                    type="email"
                    label="Email Address"
                    placeholder="you@example.com"
                    labelPlacement="outside"
                    startContent={
                        <CiMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                    }
                    classNames={{label: 'font-semibold'}}
                />
                <Input
                     {...register('phone',{required:"Enter Phone"})}
                     isInvalid={errors.phone as any}
                     errorMessage={errors.phone?.message as any}
                    className="w-full"
                    type="text"
                    label="Phone Number"
                    placeholder="+123456789"
                    labelPlacement="outside"
                    startContent={
                        <BiPhone className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                    }
                    classNames={{label: 'font-semibold'}}
                />
                <Input
                     {...register('password',{required:"Enter Password"})}
                     isInvalid={errors.password as any}
                     errorMessage={errors.password?.message as any}
                    label="Password"
                    className={'w-full'}
                    placeholder="Enter your password"
                    labelPlacement="outside"
                    startContent={
                        <IoIosLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                    }
                    endContent={
                        <button className="focus:outline-none" type="button" onClick={() => {
                            toggleVisibility1(!isVisible1);
                        }}>
                            {isVisible1 ? (
                                <BsEyeSlash className="text-2xl text-default-400 pointer-events-none"/>
                            ) : (
                                <BsEyeFill className="text-2xl text-default-400 pointer-events-none"/>
                            )}
                        </button>
                    }
                    classNames={{label: 'font-semibold'}}
                    type={isVisible1 ? "text" : "password"}
                />
                <Input
                    {...register('confirm-password',{required:"Enter Confirm Password",

                        validate:(value, formValues) => value == watch('password')|| 'Passwords Dont Match',

                     })}
                     isInvalid={errors['confirm-password'] as any}
                     errorMessage={errors['confirm-password']?.message as any}
                    label="Confirm Password"
                    className={'w-full'}
                    placeholder="Enter your password"
                    labelPlacement="outside"
                    classNames={{label: 'font-semibold'}}
                    startContent={
                        <IoIosLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                    }
                    endContent={
                        <button className="focus:outline-none" type="button" onClick={() => {
                            toggleVisibility2(!isVisible2);
                        }}>
                            {isVisible2 ? (
                                <BsEyeSlash className="text-2xl text-default-400 pointer-events-none"/>
                            ) : (
                                <BsEyeFill className="text-2xl text-default-400 pointer-events-none"/>
                            )}
                        </button>
                    }
                    type={isVisible2 ? "text" : "password"}
                />

                <Input
                {...register('key',{required:"Enter Key"})}
                isInvalid={errors.key as any}
                errorMessage={errors.key?.message as any}
                    label="Key"
                    className="w-full"
                    placeholder="Enter the key"
                    labelPlacement="outside"
                    classNames={{label: 'font-semibold'}}
                    startContent={<IoIosLock
                        className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>}
                    // endContent={invalidKey && <span className="text-red-600">Invalid Key</span>}
                    type="text"
                />

                <GooglePlacesInput
                      name="address"
                      control={control}
                      placeholder="Zip Code"
                      rules={{ required: "Zip Code is required" }}
                      addressKey="postalCode"
                      radius="sm"
                    />

<div className="flex w-full justify-between">
                    <CheckboxGroup isInvalid={!!fieldState1.error} errorMessage={fieldState1.error?.message} {...field1}>
                        <Checkbox value={'yes'}><p className="text-white">You must be 21 years of age to enter this site</p></Checkbox>

                    </CheckboxGroup>
                </div>
                <div className="flex w-full justify-between">
                    <CheckboxGroup {...field} isInvalid={!!fieldState.error} errorMessage={fieldState.error?.message}>
                        <Checkbox value={'yes'}><p className="text-white">I accept <Link href={'/terms-and-conditions'} className="underline">Terms & Conditions</Link> and <Link href={'/privacy-policy'}
                            className="underline">Privacy Policy</Link></p></Checkbox>

                    </CheckboxGroup>
                </div>
                    <button type="submit" className="bg-[#A92223] rounded-lg p-4 text-white w-[80%]">SignUp</button>
                    {/*<div className="flex w-full items-center justify-center gap-4 mt-4">*/}
                    {/*    <div className="h-[0.1rem] w-[15%] bg-gray-400 w-full"></div>*/}
                    {/*    <p>Or</p>*/}
                    {/*    <div className="h-[0.1rem] w-[15%] bg-gray-400 w-full"></div>*/}
                    {/*</div>*/}
                    {/*<div className="flex gap-4 pb-4">*/}
                    {/*    <button type="button" onClick={() => {*/}
                    {/*        login();*/}
                    {/*    }} className="flex items-center gap-2 px-4 py-2 shadow-lg rounded-lg bg-white text-black">*/}
                    {/*        <FcGoogle className="text-3xl"/><p className="text-lg">Google</p></button>*/}
                    {/*    /!* <button className="flex items-center gap-2 px-4 py-2 shadow-lg rounded-lg"><FaFacebook className="text-3xl text-blue-600" /><p className="text-lg">Facebook</p></button> *!/*/}
                    {/*</div>*/}
                </div>
            </form>
        </>
    );
}

/** Previous code without key*/
// 'use client';
// import axiosInstance from "@/app/utils/axiosInstance";
// import { Checkbox, CheckboxGroup, Input, Radio, RadioGroup } from "@nextui-org/react"
// import { useGoogleLogin } from "@react-oauth/google";
// import Image from "next/image"
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { FormEvent, useRef, useState } from "react";
// import { BiPhone } from "react-icons/bi";
// import { BsEyeFill, BsEyeSlash } from "react-icons/bs";
// import { CiMail } from "react-icons/ci";
// import { FaFacebook } from "react-icons/fa";
// import { FcGoogle } from "react-icons/fc";
// import { IoIosLock } from "react-icons/io";
// import { useMutation } from "react-query";
// import { CiUser } from "react-icons/ci";
// import Cookies from 'js-cookie'
// import { toast } from "react-toastify";
// type LoginData = {
//     accessType: number,
//     accessToken: string,
//     internal?: {
//         name: string,
//         email: string,
//         phone: string,
//         password: string
//     }
// }
//
// export default function Register() {
//     const [isVisible1, toggleVisibility1] = useState(false)
//     const [isVisible2, toggleVisibility2] = useState(false)
//     const [message, setMessage] = useState('')
//     const [noMatch, setNoMatch] = useState(false)
//     const [selected, setSelected] = useState([]);
//     const formRef=useRef()
//     const router = useRouter()
//
//     const registerMutation = useMutation((data: LoginData) => axiosInstance.post('/auth/signup', data), {
//         onSuccess(data) {
//             console.log('success', data)
//             localStorage.setItem('accessToken', data.data.data.tokens.access_token)
//             localStorage.setItem('refreshToken', data.data.data.tokens.refresh_token)
//             localStorage.setItem('userData', JSON.stringify({ name: data.data.data.user.name, email: data.data.data.user.email, phone: data.data.data.user.phone, role: data.data.data.user.role, id: data.data.data.user._id, profile: data.data.data.user.profilePicture, accessType: data.data.data.user.accessType }))
//             router.push(`/auth/verify?userid=${data.data.data.user._id}`)
//         },
//         onError(error: any) {
//             if (typeof (error.response.data.message) == 'string') {
//                 toast.error(error.response.data.message, {
//                     position: "top-right",
//                     autoClose: 5000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined,
//                     theme: "light",
//                 })
//             }
//             else {
//                 toast.error(error.response.data.message.join(','), {
//                     position: "top-right",
//                     autoClose: 5000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined,
//                     theme: "light",
//                 })
//             }
//         },
//     })
//     const registerGoogleMutation = useMutation((data: LoginData) => axiosInstance.post('/auth/signup', data), {
//         onSuccess(data) {
//             console.log('success', data)
//             Cookies.set('accessToken', data.data.data.tokens.access_token)
//             Cookies.set('refreshToken', data.data.data.tokens.refresh_token)
//             Cookies.set('userData', JSON.stringify({ name: data.data.data.user.name, email: data.data.data.user.email, phone: data.data.data.user.phone, role: data.data.data.user.role, id: data.data.data.user._id, profile: data.data.data.user.profilePicture, accessType: data.data.data.user.accessType }))
//             router.push('/dashboard')
//         },
//         onError(error: any) {
//             if (typeof (error.response.data.message) == 'string') {
//                 toast.error(error.response.data.message, {
//                     position: "top-right",
//                     autoClose: 5000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined,
//                     theme: "light",
//                 })
//             }
//             else {
//                 toast.error(error.response.data.message.join(','), {
//                     position: "top-right",
//                     autoClose: 5000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined,
//                     theme: "light",
//                 })
//             }
//         },
//     })
//     function handleSubmit(e:FormEvent) {
//         e.preventDefault()
//         const form = e.target as any as HTMLFormElement
//         const formData = new FormData(form)
//         const password = formData.get('password')! as any as string
//         const confirmPass = formData.get('confirm-password')! as any as string
//         const loginData: LoginData = {
//             accessType: 1,
//             accessToken: '',
//             internal: {
//                 name: formData.get('name')! as any as string,
//                 email: formData.get('email')! as any as string,
//                 password,
//                 phone: formData.get('phone')! as any as string
//             }
//         }
//
//         if (password == confirmPass) {
//             if (selected.length != 1) {
//                 toast.error('The Terms & Conditions is not checked', {
//                     position: "top-right",
//                     autoClose: 5000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined,
//                     theme: "light",
//                 })
//                 // setMessage('The Terms & Conditions is not checked')
//                 // setNoMatch(true)
//             }
//             else {
//                 // setNoMatch(false)
//                 registerMutation.mutate(loginData)
//             }
//         }
//         else {
//             toast.error('Passwords Do Not Match', {
//                 position: "top-right",
//                 autoClose: 5000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "light",
//             })
//             // setMessage('Passwords Do Not Match')
//             // setNoMatch(true)
//         }
//     }
//     const loginMutation = useMutation((data: LoginData): any => axiosInstance.post('/auth/login', data), {
//         onSuccess(data: any) {
//             if (data.data.data.statusCode != 400) {
//                 if (data.data.data.user.role == 'User') {
//                     // setInvalid(false)
//
//                     Cookies.set('accessToken', data.data.data.tokens.access_token)
//                     Cookies.set('refreshToken', data.data.data.tokens.refresh_token)
//                     Cookies.set('userData', JSON.stringify({ name: data.data.data.user.name, email: data.data.data.user.email, phone: data.data.data.user.phone, role: data.data.data.user.role, id: data.data.data.user._id, profile: data.data.data.user.profilePicture }))
//                     router.push('/dashboard')
//                 }
//                 else {
//                     toast.error('Invalid Credentials', {
//                         position: "top-right",
//                         autoClose: 5000,
//                         hideProgressBar: false,
//                         closeOnClick: true,
//                         pauseOnHover: true,
//                         draggable: true,
//                         progress: undefined,
//                         theme: "light",
//                     })
//                     // setInvalid(true)
//                     // setMessage('Invalid Credentials')
//                 }
//             }
//             console.log(data)
//         },
//         onError(error: any) {
//             if (typeof (error.response.data.message) == 'string') {
//                 toast.error(error.response.data.message, {
//                     position: "top-right",
//                     autoClose: 5000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined,
//                     theme: "light",
//                 })
//             }
//             else {
//                 toast.error(error.response.data.message.join(','), {
//                     position: "top-right",
//                     autoClose: 5000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined,
//                     theme: "light",
//                 })
//             }
//         },
//     })
//     const login = useGoogleLogin({
//         onSuccess: (codeResponse) => {
//             const { access_token } = codeResponse
//             console.log('google', access_token)
//             const loginData: LoginData = {
//                 accessType: 2,
//                 accessToken: access_token
//             }
//             registerGoogleMutation.mutate(loginData)
//         },
//         flow: 'implicit',
//     });
//
//     return (
//         <>
//             <form ref={formRef as any} onSubmit={handleSubmit} className="h-full sm:overflow-visible overflow-auto  hidden w-full items-center  sm:flex flex-col gap-4 p-8 sm:p-8">
//                 <h1 className="text-2xl font-bold">Registration</h1>
//                 {noMatch && <p className="text-red-600">{message}</p>}
//                 <Input
//                     required
//                     name="name"
//                     className="w-full"
//                     type="text"
//                     label="Full Name"
//                     placeholder="John Gordon"
//                     labelPlacement="outside"
//                     startContent={
//                         <CiUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
//                     }
//                     classNames={{label:'font-semibold'}}
//                 />
//                 <Input
//                     name="email"
//                     required
//                     className="w-full"
//                     type="email"
//                     label="Email Address"
//                     placeholder="you@example.com"
//                     labelPlacement="outside"
//                     startContent={
//                         <CiMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
//                     }
//                     classNames={{ label: 'font-semibold' }}
//                 />
//                 <Input
//                     name="phone"
//                     required
//                     className="w-full"
//                     type="text"
//                     label="Phone Number"
//                     placeholder="+123456789"
//                     labelPlacement="outside"
//                     startContent={
//                         <BiPhone className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
//                     }
//                     classNames={{ label: 'font-semibold' }}
//                 />
//                 <Input
//                     name="password"
//                     required
//                     label="Password"
//                     className={'w-full'}
//                     placeholder="Enter your password"
//                     labelPlacement="outside"
//                     startContent={
//                         <IoIosLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
//                     }
//                     endContent={
//                         <button className="focus:outline-none" type="button" onClick={() => { toggleVisibility1(!isVisible1) }}>
//                             {isVisible1 ? (
//                                 <BsEyeSlash className="text-2xl text-default-400 pointer-events-none" />
//                             ) : (
//                                 <BsEyeFill className="text-2xl text-default-400 pointer-events-none" />
//                             )}
//                         </button>
//                     }
//                     classNames={{ label: 'font-semibold' }}
//                     type={isVisible1 ? "text" : "password"}
//                 />
//                 <Input
//                     name="confirm-password"
//                     required
//                     label="Confirm Password"
//                     className={'w-full'}
//                     placeholder="Enter your password"
//                     labelPlacement="outside"
//                     classNames={{ label: 'font-semibold' }}
//                     startContent={
//                         <IoIosLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
//                     }
//                     endContent={
//                         <button className="focus:outline-none" type="button" onClick={() => { toggleVisibility2(!isVisible2) }}>
//                             {isVisible2 ? (
//                                 <BsEyeSlash className="text-2xl text-default-400 pointer-events-none" />
//                             ) : (
//                                 <BsEyeFill className="text-2xl text-default-400 pointer-events-none" />
//                             )}
//                         </button>
//                     }
//                     type={isVisible2 ? "text" : "password"}
//                 />
//
//                 <div className="flex w-full justify-between">
//                     <CheckboxGroup onValueChange={(e:any) => {
//                         console.log(e)
//                         setSelected(e)
//                     }}>
//                     <Checkbox  value={'yes'}>I accept <span className="underline">Terms & Conditions</span> and <span className="underline">Privacy Policy</span></Checkbox>
//
//                     </CheckboxGroup>
//                 </div>
//                 <button  type="submit" className="bg-[#A92223] rounded-lg p-4 text-white w-[80%]">SignUp</button>
//                 <div className="flex w-full items-center justify-center gap-4 mt-4">
//                     <div className="h-[0.1rem] w-[15%] bg-gray-400 w-full"></div>
//                     <p>Or</p>
//                     <div className="h-[0.1rem] w-[15%] bg-gray-400 w-full"></div>
//                 </div>
//                 <div className="flex gap-4 pb-4">
//                     <button type="button" onClick={() => { login() }} className="flex items-center gap-2 px-4 py-2 shadow-lg rounded-lg"><FcGoogle className="text-3xl" /><p className="text-lg">Google</p></button>
//                     {/* <button className="flex items-center gap-2 px-4 py-2 shadow-lg rounded-lg"><FaFacebook className="text-3xl text-blue-600" /><p className="text-lg">Facebook</p></button> */}
//                 </div>
//             </form>
//
//
//
//             <form onSubmit={handleSubmit} className="h-full sm:overflow-visible overflow-auto  bg-[#160704]  relative sm:hidden w-full ">
//                 <Image
//                     priority
//                     className="absolute top-0 h-full w-full"
//                     style={{ opacity: "0.5" }}
//                     src={"/images/home/home-banner.png"}
//                     alt="home-banner"
//                     width={1000}
//                     height={500}
//
//                 />
//                 <div className="h-full sm:overflow-visible overflow-auto relative z-[1] text-white flex w-full items-center flex-col gap-4 p-8 !sm:px-16 !sm:py-8 ">
//                     <div className="flex justify-center">
//                         <div className="w-[7rem] h-[7rem]">
//
//                             <Image className="w-full h-full object-contain" src={'/images/admin/main/layout/ridde.png'} alt="auth" width={200} height={200} />
//                         </div>
//                     </div>
//                     <h1 className="text-2xl font-bold">Registration</h1>
//                     {noMatch && <p className="text-red-600">{message}</p>}
//                     <Input
//                         required
//                         name="name"
//                         className="w-full"
//                         type="text"
//                         label="Full Name"
//                         placeholder="John Gordon"
//                         labelPlacement="outside"
//                         startContent={
//                             <CiUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
//                         }
//                         classNames={{ label: "!text-white font-semibold" }}
//                         // classNames={{ label: 'font-semibold' }}
//                     />
//                     <Input
//                         name="email"
//                         required
//                         className="w-full"
//                         type="email"
//                         label="Email Address"
//                         placeholder="you@example.com"
//                         labelPlacement="outside"
//                         startContent={
//                             <CiMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
//                         }
//                         classNames={{ label: "!text-white font-semibold" }}
//                     />
//                     <Input
//                         name="phone"
//                         required
//                         className="w-full"
//                         type="text"
//                         label="Phone Number"
//                         placeholder="+123456789"
//                         labelPlacement="outside"
//                         startContent={
//                             <BiPhone className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
//                         }
//                         classNames={{ label: "!text-white font-semibold" }}
//                     />
//                     <Input
//                         name="password"
//                         required
//                         label="Password"
//                         className={'w-full'}
//                         placeholder="Enter your password"
//                         labelPlacement="outside"
//                         startContent={
//                             <IoIosLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
//                         }
//                         endContent={
//                             <button className="focus:outline-none" type="button" onClick={() => { toggleVisibility1(!isVisible1) }}>
//                                 {isVisible1 ? (
//                                     <BsEyeSlash className="text-2xl text-default-400 pointer-events-none" />
//                                 ) : (
//                                     <BsEyeFill className="text-2xl text-default-400 pointer-events-none" />
//                                 )}
//                             </button>
//                         }
//                         type={isVisible1 ? "text" : "password"}
//                         classNames={{ label: "!text-white font-semibold" }}
//                     />
//                     <Input
//                         name="confirm-password"
//                         required
//                         label="Confirm Password"
//                         className={'w-full'}
//                         placeholder="Enter your password"
//                         labelPlacement="outside"
//                         startContent={
//                             <IoIosLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
//                         }
//                         classNames={{ label:"!text-white font-semibold"}}
//                         endContent={
//                             <button className="focus:outline-none" type="button" onClick={() => { toggleVisibility2(!isVisible2) }}>
//                                 {isVisible2 ? (
//                                     <BsEyeSlash className="text-2xl text-default-400 pointer-events-none" />
//                                 ) : (
//                                     <BsEyeFill className="text-2xl text-default-400 pointer-events-none" />
//                                 )}
//                             </button>
//                         }
//                         type={isVisible2 ? "text" : "password"}
//                     />
//
//                     <div className="flex w-full justify-between">
//                         <CheckboxGroup onValueChange={(e: any) => {
//                             console.log(e)
//                             setSelected(e)
//                         }}>
//                             <Checkbox value={'yes'}><span className="text-white">I accept</span> <span className="underline text-white">Terms & Conditions</span> <span className="text-white">and</span> <span className="underline text-white">Privacy Policy</span></Checkbox>
//
//                         </CheckboxGroup>
//                     </div>
//                     <button type="submit" className="bg-[#A92223] rounded-lg p-4 text-white w-[80%]">SignUp</button>
//                     <div className="flex w-full items-center justify-center gap-4 mt-4">
//                         <div className="h-[0.1rem] w-[15%] bg-gray-400 w-full"></div>
//                         <p>Or</p>
//                         <div className="h-[0.1rem] w-[15%] bg-gray-400 w-full"></div>
//                     </div>
//                     <div className="flex gap-4 pb-4">
//                         <button type="button" onClick={() => { login() }} className="flex items-center gap-2 px-4 py-2 shadow-lg rounded-lg bg-white text-black"><FcGoogle className="text-3xl" /><p className="text-lg">Google</p></button>
//                         {/* <button className="flex items-center gap-2 px-4 py-2 shadow-lg rounded-lg"><FaFacebook className="text-3xl text-blue-600" /><p className="text-lg">Facebook</p></button> */}
//                     </div>
//                 </div>
//             </form>
//         </>
//     )
// }