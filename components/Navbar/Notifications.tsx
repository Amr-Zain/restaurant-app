"use client";
import { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Notifications = () => {
  const [open, setOpen] = useState(false);
 
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div className="relative nav-icon">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.89736 5.19V8.52M9.91736 0.75C6.23736 0.75 3.25736 3.73 3.25736 7.41V9.51C3.25736 10.19 2.97736 11.21 2.62736 11.79L1.35736 13.91C0.577359 15.22 1.11736 16.68 2.55736 17.16C7.33864 18.75 12.5061 18.75 17.2874 17.16C17.6029 17.0548 17.8907 16.88 18.1295 16.6486C18.3684 16.4171 18.5522 16.135 18.6674 15.823C18.7826 15.511 18.8263 15.1771 18.7951 14.846C18.7639 14.5149 18.6588 14.195 18.4874 13.91L17.2174 11.79C16.8674 11.21 16.5874 10.18 16.5874 9.51V7.41C16.5774 3.75 13.5774 0.75 9.91736 0.75Z"
                stroke="#BDC1DF"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="absolute size-3 top-2 end-2 sm:top-3 sm:end-3 border-2 border-backgroud rounded-full bg-primary"></span>
          </div>
      </SheetTrigger>
      <SheetContent side="left" className="border-r-1 rounded-r-2xl">
        {" "}
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
        </SheetHeader>
          <div className="flex flex-col gap-2 p-4">
           
          </div>
      </SheetContent>
    </Sheet>
  );
};
export default Notifications;
