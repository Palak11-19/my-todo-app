"use client";
import { useState, useEffect } from "react";
import { Trash2, CheckCircle, Circle, Plus, ListTodo } from "lucide-react";

export default function TodoApp() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState<{id: number, text: string, completed: boolean}[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.trim()) return;
    setTodos([{ id: Date.now(), text: task, completed: false }, ...todos]);
    setTask("");
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        
        {/* Navy Blue Premium Header */}
        <div className="bg-[#001f3f] p-8 text-center shadow-md">
          <div className="flex justify-center mb-2">
            <ListTodo className="text-blue-400" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Focus Tasks</h1>
          <p className="text-blue-200 text-xs mt-1 opacity-80">Stay organized, stay productive</p>
        </div>

        <div className="p-8">
          {/* Professional Input Field */}
          <form onSubmit={addTask} className="flex gap-3 mb-8">
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="What's on your mind?"
              className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-[#001f3f] focus:bg-white transition-all text-gray-800"
            />
            <button type="submit" className="bg-[#001f3f] text-white p-3 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg">
              <Plus size={24} />
            </button>
          </form>

          {/* Elegant List */}
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {todos.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-400 text-sm italic">Your list is clear. Time to relax!</p>
              </div>
            )}
            
            {todos.map((todo) => (
              <div 
                key={todo.id} 
                className={`flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 ${
                  todo.completed 
                  ? "bg-green-50 border-green-100 opacity-75" 
                  : "bg-white border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                }`}
              >
                <div 
                  className="flex items-center gap-4 flex-1 cursor-pointer" 
                  onClick={() => setTodos(todos.map(t => t.id === todo.id ? {...t, completed: !t.completed} : t))}
                >
                  {todo.completed ? (
                    <CheckCircle className="text-green-500" size={24} />
                  ) : (
                    <Circle className="text-gray-300 hover:text-blue-500" size={24} />
                  )}
                  <span className={`text-lg font-medium ${todo.completed ? "line-through text-gray-400" : "text-gray-700"}`}>
                    {todo.text}
                  </span>
                </div>
                <button 
                  onClick={() => setTodos(todos.filter(t => t.id !== todo.id))} 
                  className="text-gray-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
