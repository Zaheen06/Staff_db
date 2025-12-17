import React, { useEffect, useState } from "react";

// Components
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import TaskList from "./components/TaskList";
import PatientCard from "./components/PatientCard";
import PatientVitals from "./components/PatientVitals";
import TaskDetails from "./components/TaskDetails";
import NotificationCenter from "./components/NotificationCenter";

// Data & Services
import {
  fetchTasks,
  fetchPatient,
  on,
  completeTask,
  patients as allPatients
} from "./data/mock";

export default function App() {
  // State Management
  const [staff] = useState({
    name: "Zaheen",
    shift: "Morning",
    unit: "Ward A"
  });
  const [tasks, setTasks] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  // Initialize tasks and event listeners
  useEffect(() => {
    fetchTasks().then(setTasks);
    
    const unsubTask = on("task:updated", (task) => {
      setTasks(prev => prev.map(t => t.id === task.id ? task : t));
    });
    
    const unsubNewTask = on("task:assigned", (task) => {
      setTasks(prev => [task, ...prev]);
    });
    
    return () => {
      unsubTask();
      unsubNewTask();
    };
  }, []);










  // Patient Management
  async function openPatient(id) {
    const patient = await fetchPatient(id);
    
    if (patient) {
      setSelectedPatient(patient);
      
      // Find active task for this patient
      const activeTask = tasks.find(task => task.patientId === id && task.status !== "completed");
      setSelectedTask(activeTask || null);
    }
  }

  // Task Management
  async function onComplete(taskId) {
    await completeTask(taskId, "Completed by staff in-app");
    setTasks(await fetchTasks());
    setSelectedTask(null);
  }

  function onRevert(taskId, note) {
    alert(`Reverted to doctor (demo). Note: ${note || "—"}`);
  }

  // Search Functionality
  function handleSearch(query) {
    if (!query) return;
    
    const patient = allPatients.find(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) || 
      p.mrn.toLowerCase().includes(query.toLowerCase())
    );
    
    if (patient) {
      openPatient(patient.id);
    }
  }



  // Render
  return (
    <div className="min-h-screen p-6">
      <NotificationCenter />
      
      <div className="max-w-[1200px] mx-auto">
        <Topbar onSearch={handleSearch} />
        
        <div className="mt-6 flex gap-6">
          <Sidebar staff={staff} />
          
          <main className="flex-1 grid grid-cols-3 gap-6">
            {/* Task List Column */}
            <div className="col-span-1">
              <TaskList 
                tasks={tasks.filter(task => task.status !== "completed")} 
                onOpenPatient={openPatient} 
                onComplete={onComplete} 
              />
            </div>

            {/* Patient Information Column */}
            <div className="col-span-1 space-y-4">
              <PatientCard 
                patient={selectedPatient} 
                onOpenVitals={() => {}} 
              />
              <PatientVitals patient={selectedPatient} />
            </div>

            {/* Task Details Column */}
            <div className="col-span-1">
              <TaskDetails 
                task={selectedTask} 
                onRevert={onRevert} 
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
