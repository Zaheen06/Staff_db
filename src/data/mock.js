// simple mock DB & event emitter for demo
const subscribers = {};
function emit(event, payload) {
  (subscribers[event] || []).forEach(cb => cb(payload));
}
export function on(event, cb) {
  subscribers[event] = subscribers[event] || [];
  subscribers[event].push(cb);
  return () => {
    subscribers[event] = subscribers[event].filter(x => x !== cb);
  };
}

/* mock patients */
export const patients = [
  { id: "p1", name: "Aisha Khan", mrn: "MRN-001", bed: "A-101", ward: "Cardiology", photo: "", allergies: "Penicillin" },
  { id: "p2", name: "Ravi Patel", mrn: "MRN-002", bed: "A-102", ward: "General", photo: "", allergies: "None" },
  { id: "p3", name: "Sunita Rao", mrn: "MRN-003", bed: "B-201", ward: "Orthopedics", photo: "", allergies: "Latex" }
];

export let tasks = [
  { id: "t1", patientId: "p1", patientName: "Aisha Khan", type: "Record Vitals", details: "Hourly vitals", assignedTo: "staff1", status: "pending", priority: "high", due_at: Date.now() + 1000*60*30 },
  { id: "t2", patientId: "p2", patientName: "Ravi Patel", type: "Collect Lab Report", details: "Blood culture", assignedTo: "staff1", status: "pending", priority: "medium", due_at: Date.now() + 1000*60*60 },
  { id: "t3", patientId: "p3", patientName: "Sunita Rao", type: "Discharge Summary—Complete", details: "Draft discharge", assignedTo: "staff1", status: "pending", priority: "low", due_at: Date.now() + 1000*60*120 }
];

export let vitals = {
  p1: [{ type: "Pulse", value: 82, unit: "bpm", source: "device", recorded_at: Date.now() - 1000*60*5 }],
  p2: [{ type: "Temp", value: 98.6, unit: "°F", source: "device", recorded_at: Date.now() - 1000*60*20 }],
  p3: [{ type: "SpO2", value: 96, unit: "%", source: "device", recorded_at: Date.now() - 1000*60*10 }]
};

export function fetchTasks() {
  return new Promise(res => setTimeout(() => res([...tasks]), 250));
}


export function fetchPatient(id) {
  return new Promise(res => setTimeout(() => res(patients.find(p => p.id === id) || null), 200));
}
export function fetchVitals(patientId) {
  return new Promise(res => setTimeout(() => res(vitals[patientId] || []), 150));
}

export function postVital(patientId, payload){
  payload.recorded_at = Date.now();
  vitals[patientId] = vitals[patientId] || [];
  vitals[patientId].unshift(payload);
  // broadcast
  emit("vital:changed", { patientId, vital: payload });
  return Promise.resolve(payload);
}

export function completeTask(taskId, note){
  const idx = tasks.findIndex(t => t.id === taskId);
  if(idx !== -1){
    tasks[idx] = { ...tasks[idx], status: "completed", completed_at: Date.now(), staff_note: note };
    emit("task:updated", tasks[idx]);
    return Promise.resolve(tasks[idx]);
  }
  return Promise.reject(new Error("Not found"));
}

// small simulator to push random vitals every 20s (for demo)
setInterval(()=>{
  const p = patients[Math.floor(Math.random()*patients.length)];
  const sample = { type: ["Pulse","SpO2","Temp"][Math.floor(Math.random()*3)], value: Math.floor(Math.random()*40)+60, unit: "bpm", source: "device", recorded_at: Date.now() };
  vitals[p.id] = vitals[p.id] || [];
  vitals[p.id].unshift(sample);
  emit("vital:changed", { patientId: p.id, vital: sample });
}, 20000);
