"use client";

import Image from "next/image";
import logo from "@/assets/images/logo.png";
import loginImg from "@/assets/images/login.jpg";

const AuthPageLayout = ({ children, title, instructions, className }: {children: React.ReactNode, title: string, instructions?: string,className?:string}) => {
 
  return (
     <div className={"grid w-full grid-cols-1 items-center md:grid-cols-[1.25fr_1fr] "+className}>
      <div className="hidden md:block border-e-1 rounded-xl">
        <Image
          width={700}
          height={500}
          src={loginImg}
          alt="logo"
          className="h-screen w-[853px] bg-cover rounded-e-xl"
        />
      </div>
      <div className="mx-auto flex h-screen flex-1 flex-col items-start justify-center gap-2 rounded-3xl  px-4">
        <div className="mx-auto w-full max-w-md bg-backgroud">
          <div className="mt-4">
            <Image width={120} height={100} src={logo} alt="logo" />
          </div>
          <h1 className="mb-2 text-3xl font-bold">
            {title}
          </h1>
          <p className="text-sub mb-4">{instructions}</p>
         {children}
        </div>
      </div>
    </div>
  );
};

export default AuthPageLayout;
