"use client";
import React from "react";

import "@/styles/social.scss";
import { appStore, SocialKey } from "@/stores/app";

import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "@/components/Icons";
const SocialLinks = ({ className = "" }: { className?: string }) => {
  const socialLinks: { icon: React.ElementType; name: SocialKey }[] = [
    {
      icon: Linkedin,
      name: "linkedin",
    },
    {
      icon: Facebook,
      name: "facebook",
    },
    {
      icon: Instagram,
      name: "instagram",
    },
    {
      icon: Youtube,
      name: "youtube",
    },
    {
      icon: Twitter,
      name: "x",
    },
  ];

  const { settings } = appStore();
  return (
    <ul className={`social ${className}`}>
      {socialLinks.map((link) => (
        <li key={link.name} className="flex items-center gap-2 lg:gap-5">
          <a
            href={settings[link.name]}
            className="duration-500 lg:hover:-translate-y-3"
            target="_blank"
          >
            <span className="icon shrink-0">
              <link.icon />
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SocialLinks;
