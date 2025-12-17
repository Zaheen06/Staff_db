import React, { useEffect, useState } from "react";
import { fetchVitals, postVital, on } from "../data/mock";



export default function PatientVitals({ patient }) {
  const [vitals, setVitals] = useState([]);
  useEffect(()=>{
    if(!patient) return;
    fetchVitals(patient.id).then(setVitals);
    const unsub = on("vital:changed", ({patientId, vital})=>{
      if(patientId === patient.id){
        setVitals(prev => [vital, ...prev].slice(0,30));
      }
    });
    return unsub;
  }, [patient]);

  async function update(type){
    const value = prompt(`Enter ${type} value`);
    if(!value) return;
    const unit = type === "Temp" ? "°C" : type === "SpO2" ? "%" : "bpm";
    const payload = { type, value: Number(value), unit, source: "manual" };
    await postVital(patient.id, payload);
  }

  return (
    <div className="glass p-4 rounded-xl shadow">
      <h4 className="font-semibold mb-3">Live Vitals</h4>
      <div className="grid grid-cols-2 gap-3">
        {["Pulse","BP","SpO2","Temp"].map(t => {
          const last = vitals.find(v => v.type === t) || {};
          return (
            <div key={t} className="p-3 rounded border bg-white/50">
              <div className="font-medium">{t}</div>
              <div className="text-2xl">{last.value ?? "—"} <span className="text-sm">{last.unit ?? ""}</span></div>
              <div className="text-xs text-gray-500">{last.source ?? ""} · {last.recorded_at ? new Date(last.recorded_at).toLocaleTimeString() : ""}</div>
              <div className="mt-2">
                <button onClick={()=>update(t)} className="px-2 py-1 rounded border text-sm">Update</button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4">
        <h5 className="font-medium">Recent</h5>
        <div className="max-h-48 overflow-auto mt-2 space-y-2">
          {vitals.map((v, idx) => (
            <div key={idx} className="text-sm flex justify-between">
              <div>{v.type} — {v.value} {v.unit}</div>
              <div className="text-xs text-gray-500">{new Date(v.recorded_at).toLocaleTimeString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
