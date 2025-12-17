import React from "react";



export default function PatientCard({ patient, onOpenVitals }) {
  if(!patient) return <div className="glass p-4 rounded-xl">Select a patient to view</div>;
  return (
    <div className="glass p-4 rounded-xl shadow">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-white/60 flex items-center justify-center text-xl font-semibold">{patient.name.split(" ").map(n=>n[0]).slice(0,2).join("")}</div>
        <div>
          <div className="font-semibold text-lg">{patient.name}</div>
          <div className="text-sm text-gray-600">Bed {patient.bed} · {patient.mrn}</div>
        </div>
      </div>

      <div className="mt-3 text-sm">
        <div><strong>Ward:</strong> {patient.ward}</div>
        <div><strong>Allergies:</strong> {patient.allergies}</div>
      </div>

      <div className="mt-3">
        <button onClick={onOpenVitals} className="px-3 py-2 rounded bg-problue-500 text-white">Open Vitals</button>
      </div>
    </div>
  );
}
