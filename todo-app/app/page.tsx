'use client';

import { useState, useEffect } from 'react';

export default function TodoApp() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState<{ text: string; completed: boolean }[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // 1. LocalStorage se Data Load karna
  useEffect(() => {
    const saved = localStorage.getItem('my-todos');
    if (saved) {
      try {
        setTodos(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading todos", e);
      }
    }
  }, []);

  // 2. LocalStorage mein Data Save karna
  useEffect(() => {
    localStorage.setItem('my-todos', JSON.stringify(todos));
  }, [todos]);

  // 3. Naya Task add karna
  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim() === '') return;
    setTodos([...todos, { text: task, completed: false }]);
    setTask('');
  };

  // 4. Task ko Done/Undone karna
  const toggleTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  // 5. Task Delete karna
  const deleteTodo = (index: number) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  // 6. Filter Logic
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 font-sans">
      <div className="max-w-md mx-auto bg-white shadow-2xl rounded-[40px] overflow-hidden border border-gray-100">
        
        {/* Header Section */}
        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-10 text-white text-center">
          <h1 className="text-3xl font-black tracking-tight uppercase">Task Master</h1>
          <p className="text-purple-100 text-[10px] mt-2 tracking-[0.3em] font-bold opacity-80">STAY PRODUCTIVE</p>
        </div>

        {/* Input Form */}
        <form onSubmit={addTodo} className="p-8 flex flex-col gap-3">
          <input
            type="text"
            className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-purple-400 focus:bg-white transition-all text-gray-700 font-semibold"
            placeholder="What's on your mind?"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button 
            type="submit"
            className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-purple-600 active:scale-95 transition-all shadow-lg"
          >
            ADD TASK
          </button>
        </form>

        {/* Filter Tabs */}
        <div className="px-8 flex gap-4 mb-2 justify-center">
          {['all', 'active', 'completed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`pb-2 text-[11px] font-black uppercase tracking-widest transition-all ${
                filter === f 
                ? 'text-purple-600 border-b-2 border-purple-600' 
                : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Task List Area */}
        <div className="px-8 pb-10 min-h-[300px]">
          {filteredTodos.length === 0 ? (
            /* --- EMPTY STATE LOGIC START --- */
            <div className="flex flex-col items-center justify-center py-16 opacity-40">
              <span className="text-5xl mb-4">✨</span>
              <p className="text-gray-500 font-bold text-sm tracking-tight">
                No {filter !== 'all' ? filter : ''} tasks found!
              </p>
              <p className="text-gray-400 text-[10px] uppercase mt-1">Time to relax or add more</p>
            </div>
            /* --- EMPTY STATE LOGIC END --- */
          ) : (
            <ul className="space-y-3 mt-4">
              {filteredTodos.map((todo, index) => {
                // Sahi index nikalne ke liye taaki toggle/delete sahi ho
                const realIndex = todos.findIndex(t => t === todo);
                
                return (
                  <li 
                    key={index} 
                    className="flex justify-between items-center p-5 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
                  >
                    <div 
                      className="flex items-center gap-4 cursor-pointer flex-1" 
                      onClick={() => toggleTodo(realIndex)}
                    >
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        todo.completed ? 'bg-green-500 border-green-500' : 'border-gray-200 bg-gray-50'
                      }`}>
                        {todo.completed && <span className="text-white text-[10px]">✓</span>}
                      </div>
                      <span className={`font-bold text-sm tracking-tight transition-all ${
                        todo.completed ? 'line-through text-gray-300' : 'text-gray-700'
                      }`}>
                        {todo.text}
                      </span>
                    </div>
                    
                    <button 
                      onClick={() => deleteTodo(realIndex)}
                      className="text-gray-300 hover:text-red-500 transition-all p-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}