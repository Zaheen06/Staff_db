import React, { useEffect, useState } from "react";
import { on } from "../data/mock";

export default function NotificationCenter() {
  const [notes, setNotes] = useState([]);

  useEffect(()=>{
    const unsubVital = on("vital:changed", ({patientId, vital})=>{
      if(vital && vital.type === "SpO2" && vital.value < 90){
        setNotes(n => [{id:Date.now(), text:`Critical SpO2 ${vital.value} for ${patientId}`}, ...n]);
      }
    });
    const unsubTask = on("task:updated", (task)=>{
      setNotes(n => [{id:Date.now(), text:`Task ${task.type} updated for ${task.patientName}`}, ...n]);
    });
    return ()=>{ unsubVital(); unsubTask(); };
  }, []);

  if(notes.length === 0) return null;
  return (
    <div className="fixed right-4 bottom-4 space-y-2">
      {notes.slice(0,4).map(n=>(
        <div key={n.id} className="glass p-3 rounded-lg shadow">{n.text}</div>
      ))}
    </div>
  );
}
