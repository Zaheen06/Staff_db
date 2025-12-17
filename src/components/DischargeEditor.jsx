import React, { useState } from "react";

export default function DischargeEditor({ patientId }) {
  const [draft, setDraft] = useState({
    diagnosis: "",
    meds: "",
    followUp: ""
  });
  function submit(){
    alert("Submitted draft for doctor signoff (demo).");
  }
  return (
    <div className="p-3 rounded bg-white/40 border">
      <h5 className="font-medium">Discharge Summary (Draft)</h5>
      <div className="mt-2 space-y-2">
        <input value={draft.diagnosis} onChange={e=>setDraft({...draft, diagnosis:e.target.value})} placeholder="Diagnosis" className="w-full p-2 rounded border" />
        <textarea value={draft.meds} onChange={e=>setDraft({...draft, meds:e.target.value})} placeholder="Medications" className="w-full p-2 rounded border" />
        <input value={draft.followUp} onChange={e=>setDraft({...draft, followUp:e.target.value})} placeholder="Follow up instructions" className="w-full p-2 rounded border" />
        <div className="flex justify-end">
          <button onClick={submit} className="px-3 py-2 rounded bg-problue-500 text-white">Submit for Sign-off</button>
        </div>
      </div>
    </div>
  );
}
