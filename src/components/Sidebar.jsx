import React from "react";

export default function Sidebar({ staff }) {
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <aside className="w-72 p-4 space-y-4 sticky top-4 self-start">
      {/* Staff Profile Card */}
      <div className="glass p-4 rounded-xl shadow">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-problue-500 to-problue-700 flex items-center justify-center text-white font-semibold">
            {getInitials(staff.name)}
          </div>

          <div className="flex-1">
            <div className="font-semibold text-gray-900">{staff.name}</div>
            <div className="text-sm text-gray-600">RN — {staff.shift} Shift</div>
          </div>
        </div>

        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Unit</span>
            <span className="font-medium text-gray-900">{staff.unit}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">On Duty</span>
            <span className="font-medium text-green-600">Yes</span>
          </div>
        </div>
      </div>

      {/* Filters Card */}
      <div className="glass p-4 rounded-xl shadow">
        <h4 className="font-medium text-gray-900 mb-3">Task Filters</h4>

        <div className="space-y-1">
          <button className="w-full text-left px-3 py-2 rounded-lg bg-white/40 text-gray-900 font-medium hover:bg-white/60 transition-colors">
            Today
          </button>
          <button className="w-full text-left px-3 py-2 rounded-lg bg-white/20 text-gray-700 hover:bg-white/40 transition-colors">
            Pending
          </button>
          <button className="w-full text-left px-3 py-2 rounded-lg bg-white/20 text-gray-700 hover:bg-white/40 transition-colors">
            Critical
          </button>
          <button className="w-full text-left px-3 py-2 rounded-lg bg-white/20 text-gray-700 hover:bg-white/40 transition-colors">
            Completed
          </button>
        </div>
      </div>
    </aside>
  );
}
