import React from "react";

import "./style.scss";

export default function SkeltonDropdown() {
  return (
    <div className="mb-11 last:mb-0">
      {/* <div className="skeleton mb-5 h-8 w-68 rounded-3xl"></div> */}

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-4">
        <div className="skeleton h-12 w-full rounded-lg"></div>
        <div className="skeleton h-12 w-full rounded-lg"></div>
        <div className="skeleton h-12 w-full rounded-lg"></div>
        <div className="skeleton h-12 w-full rounded-lg"></div>
        <div className="skeleton h-12 w-full rounded-lg"></div>
        <div className="skeleton h-12 w-full rounded-lg"></div>
        <div className="skeleton h-12 w-full rounded-lg"></div>
        <div className="skeleton h-12 w-full rounded-lg"></div>
      </div>
    </div>
  );
}
