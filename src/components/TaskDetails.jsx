import React, { useState } from "react";
import DischargeEditor from "./DischargeEditor";

export default function TaskDetails({ task, onRevert }) {
  const [note, setNote] = useState("");
  if(!task) return <div className="glass p-4 rounded-xl">Open a task to view details</div>;
  return (
    <div className="glass p-4 rounded-xl shadow">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold">{task.type}</div>
          <div className="text-sm text-gray-600">{task.patientName}</div>
        </div>
        <div className="text-sm text-gray-500">Priority: {task.priority}</div>
      </div>

      <div className="mt-3">
        <div className="text-sm">{task.details}</div>
      </div>

      {task.type.toLowerCase().includes("discharge") && (
        <div className="mt-4">
          <DischargeEditor patientId={task.patientId} />
        </div>
      )}

      <div className="mt-4 space-y-2">
        <textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Add note to doctor..." className="w-full p-2 rounded border" />
        <div className="flex gap-2">
          <button onClick={()=>onRevert(task.id, note)} className="px-3 py-2 rounded border">Revert to Doctor</button>
        </div>
      </div>
    </div>
  );
}
