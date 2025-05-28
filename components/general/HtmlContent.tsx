"use client";
import React from "react";

interface Props {
  className?: string;
  content: string;
}

function HtmlContent({ content, className = "" }: Props) {
  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: content }} />
  );
}

export default HtmlContent;
