"use client";

import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";

interface ToastProviderProps {
  children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  const contextClass = {
    success: "bg-blue-600",
    error: "bg-red-600",
    info: "bg-gray-600",
    warning: "bg-orange-400",
    default: "bg-indigo-600",
    dark: "bg-white-600 font-gray-300",
  };

  return (
    <>
      {children}
      <ToastContainer
        toastClassName={(context) =>
          contextClass[context?.type || "default"] +
          " relative flex   min-h-10 rounded-lg min-w-[350px]!  justify-between bg-white overflow-hidden cursor-pointer text-sm  font-medium  flex items-center flex-wrap rounded-lg py-3 px-4 text-primary"
        }
        position="bottom-left"
        autoClose={3000}
      />
    </>
  );
}
