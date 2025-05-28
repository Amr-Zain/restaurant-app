import React from "react";
import "./style.scss";
export default function SkeltonSection2() {
  return (
    <div className="container mb-11 lg:mb-20">
      <div className="skeleton mb-2 h-16 w-[300px] rounded-3xl"></div>

      <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-3 rounded-3xl border border-solid border-[#F5F5FC] p-5 pb-5 shadow-sm">
          <div className="skeleton mb-2 h-5 w-40 rounded-full"></div>
          <div className="skeleton h-8 w-48 rounded-3xl"></div>
          <div className="skeleton h-16 w-full rounded-3xl"></div>
        </div>
        <div className="space-y-3 rounded-3xl border border-solid border-[#F5F5FC] p-5 pb-5 shadow-sm">
          <div className="skeleton mb-2 h-5 w-40 rounded-full"></div>
          <div className="skeleton h-8 w-48 rounded-3xl"></div>
          <div className="skeleton h-16 w-full rounded-3xl"></div>
        </div>
        <div className="space-y-3 rounded-3xl border border-solid border-[#F5F5FC] p-5 pb-5 shadow-sm">
          <div className="skeleton mb-2 h-5 w-40 rounded-full"></div>
          <div className="skeleton h-8 w-48 rounded-3xl"></div>
          <div className="skeleton h-16 w-full rounded-3xl"></div>
        </div>
      </div>
    </div>
  );
}
