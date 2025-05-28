import React from "react";
import "./style.scss";
export default function SkeltonSection1() {
  return (
    <div className="container grid grid-cols-1 items-center gap-10 py-20 lg:grid-cols-2">
      <div className="skeleton mb-5 h-100 w-full rounded-3xl"></div>

      <div className="space-y-5">
        <div className="skeleton mb-5 h-16 w-full rounded-3xl"></div>
        <div className="skeleton mb-5 h-28 w-full rounded-3xl"></div>

        <div className="mb-2 flex gap-3">
          <div className="skeleton h-[1.3rem] w-[1.3rem] rounded-3xl"></div>
          <div className="skeleton h-[1.3rem] w-40 rounded-3xl"></div>
        </div>
        <div className="mb-2 flex gap-3">
          <div className="skeleton h-[1.3rem] w-[1.3rem] rounded-3xl"></div>
          <div className="skeleton h-[1.3rem] w-40 rounded-3xl"></div>
        </div>
        <div className="mb-2 flex gap-3">
          <div className="skeleton h-[1.3rem] w-[1.3rem] rounded-3xl"></div>
          <div className="skeleton h-[1.3rem] w-40 rounded-3xl"></div>
        </div>
      </div>
    </div>
  );
}
