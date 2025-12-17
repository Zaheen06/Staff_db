import React, { useState } from "react";
import { format, formatDistanceToNow } from "date-fns";

/**
 * TaskList Component - Displays all assigned duties from doctors
 * Features: patient vitals recording, report collection, discharge follow-up
 */
export default function TaskList({ tasks = [], onOpenPatient, onComplete }) {
  const [filter, setFilter] = useState("all");

  /**
   * Get priority color based on task urgency
   */
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-400 text-white";
      case "medium":
        return "bg-amber-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  /**
   * Get task type icon based on task category
   */
  const getTaskIcon = (type) => {
    return "";
  };

  /**
   * Filter tasks based on selected filter
   */
  const filteredTasks = tasks.filter(task => {
    if (filter === "all") return true;
    if (filter === "high") return task.priority === "high";
    if (filter === "pending") return task.status === "pending";
    return true;
  });

  /**
   * Check if task is overdue
   */
  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
      {/* Header with Task Management Title */}
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg text-blue-700">
          Task Management Dashboard
        </h3>
        <div className="text-xs text-gray-600 bg-blue-50 px-2 py-1 rounded-lg">
          {tasks.length} tasks
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2">
        {[
          { key: "all", label: "All", count: tasks.length },
          { key: "high", label: "High Priority", count: tasks.filter(t => t.priority === "high").length },
          { key: "pending", label: "Pending", count: tasks.filter(t => t.status === "pending").length }
        ].map(({ key, label, count }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all transform hover:scale-105 ${
              filter === key
                ? "bg-blue-500 text-white shadow-md"
                : "bg-blue-50 text-gray-700 hover:bg-blue-100 hover:shadow-sm"
            }`}
          >
            {label} ({count})
          </button>
        ))}
      </div>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-2">✅</div>
          <div className="text-gray-600 font-medium">All tasks completed!</div>
          <div className="text-gray-500 text-sm mt-1">Great work today</div>
        </div>
      ) : (
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {filteredTasks.map((task) => {
            const overdue = isOverdue(task.due_at);

            return (
              <div
                key={task.id}
                className={`p-4 rounded-xl border transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer ${
                  overdue
                    ? "border-red-200 bg-red-50 hover:bg-red-100"
                    : "border-gray-100 bg-white hover:border-blue-200 shadow-sm hover:bg-blue-50/30"
                }`}
              >
                {/* Task Header */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div>
                      <div className="font-bold text-blue-700">{task.type}</div>
                      <div className="text-gray-600 text-sm flex items-center gap-2">
                        <span>{task.patientName}</span>
                        {overdue && (
                          <span className="text-red-500 font-medium text-xs bg-red-100 px-1.5 py-0.5 rounded">
                            OVERDUE
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority.toUpperCase()}
                  </div>
                </div>

                {/* Task Details */}
                <div className="text-gray-700 text-sm mb-3">
                  {task.details}
                </div>

                {/* Task Metadata */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <div>
                    Due: {format(new Date(task.due_at), "MMM dd, hh:mm a")}
                    {overdue && (
                      <span className="text-red-500 ml-1">
                        ({formatDistanceToNow(new Date(task.due_at))} ago)
                      </span>
                    )}
                  </div>
                  <div>{task.assignedTo}</div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('View Patient clicked for task:', task.id, 'patientId:', task.patientId);
                      onOpenPatient(task.patientId);
                    }}
                    className="flex-1 px-3 py-2 rounded-lg border border-blue-200 text-xs font-medium text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all hover:scale-105 cursor-pointer"
                  >
                    View Patient
                  </button>
                  <button
                    onClick={() => onComplete(task.id)}
                    className="flex-1 px-3 py-2 rounded-lg bg-blue-500 text-white text-xs font-medium hover:bg-blue-600 transition-all hover:scale-105 shadow-sm"
                  >
                    Complete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Task Management Summary */}
      <div className="border-t border-gray-100 pt-4">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-blue-50 p-3 rounded-xl hover:bg-blue-100 transition-colors cursor-pointer">
            <div className="text-2xl font-bold text-blue-600">
              {tasks.filter(t => t.type.includes("Vitals")).length}
            </div>
            <div className="text-xs text-blue-500 font-medium">Vitals</div>
          </div>
          <div className="bg-blue-50 p-3 rounded-xl hover:bg-blue-100 transition-colors cursor-pointer">
            <div className="text-2xl font-bold text-blue-600">
              {tasks.filter(t => t.type.includes("Lab")).length}
            </div>
            <div className="text-xs text-blue-500 font-medium">Labs</div>
          </div>
          <div className="bg-blue-50 p-3 rounded-xl hover:bg-blue-100 transition-colors cursor-pointer">
            <div className="text-2xl font-bold text-blue-600">
              {tasks.filter(t => t.type.includes("Discharge")).length}
            </div>
            <div className="text-xs text-blue-500 font-medium">Discharge</div>
          </div>
        </div>
      </div>
    </div>
  );
}
