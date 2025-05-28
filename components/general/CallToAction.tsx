"use client";

import { useSearchParams } from "next/navigation";
import React from "react";
import { appStore } from "@/stores/app";

interface Props {
  text: string;
  icon?: string;
  className?: string;
}
export default function CallToAction({ text, className = "" }: Props) {
  const { settings } = appStore();
  const params = useSearchParams();

  const message = params.get("message");
  return (
    settings?.whatsapp && (
      <a
        href={`https://wa.me/${settings.whatsapp}${message ? "/?text=" + message : ""}`}
        className={`flex w-fit items-center justify-center gap-3 capitalize ${className}`}
        target="_blank"
      >
        <span>{text}</span>

        {/* <i v-if="icon" :class="icon"></i> */}
      </a>
    )
  );
}
