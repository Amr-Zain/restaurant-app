'use server';
import axiosInstance from "../services/instance";


export const register = async(form:{
    name: string;
    phoneCode: string;
    phoneNumber: string;
    email: string;
    password: string;
    rememberMe?: boolean | undefined;
})=>{
    const { data } = await axiosInstance.post("auth/register",form);
    console.log(data)
}