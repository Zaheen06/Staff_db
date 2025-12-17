import React from "react";

export default function Topbar({ onSearch }) {
  return (
    <div className="flex items-center justify-between gap-3">

      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold text-blue-800">Medora Lab</h2>
        <div className="text-sm text-blue-600">Medora Lab</div>
      </div>

      <div className="flex items-center gap-3">
        <input onChange={e => onSearch(e.target.value)} placeholder="Search patient or MRN..." className="px-3 py-2 rounded-lg border bg-white/60 focus:outline-none" />
        <button className="px-3 py-2 rounded-lg bg-problue-500 text-white">Start Shift</button>
      </div>
    </div>
  );
}
