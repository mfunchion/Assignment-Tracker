'use client';
import { useState } from 'react';

export default function Home() {
  const [assignments, setAssignments] = useState([
    { id: 1, title: 'Project 3', cls: 'CSC 2053', due: '2026-04-30', done: false }
  ]);

  const [title, setTitle] = useState('');
  const [cls, setCls] = useState('');
  const [due, setDue] = useState('');

  function addAssignment() {
    if (!title || !cls || !due) return alert('Please fill in all fields.');
    setAssignments([...assignments, { id: Date.now(), title, cls, due, done: false }]);
    setTitle('');
    setCls('');
    setDue('');
  }

  function toggleDone(id) {
    setAssignments(assignments.map(a =>
      a.id === id ? { ...a, done: !a.done } : a
    ));
  }

  function deleteAssignment(id) {
    setAssignments(assignments.filter(a => a.id !== id));
  }

  const [showCalendar, setShowCalendar] = useState(false);

  // CALENDAR SETUP
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-xl mx-auto">

        {/* HEADER & NEW TOGGLE BUTTON */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Assignment Tracker</h1>
          <button 
            onClick={() => setShowCalendar(!showCalendar)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            {showCalendar ? 'Back to List View' : 'View Calendar'}
          </button>
        </div>

        {/* CALENDAR VIEW */}
        {showCalendar ? (
          <div className="bg-white rounded-xl p-5 shadow">
             <h2 className="text-xl font-bold text-gray-800 mb-4">
               {today.toLocaleString('default', { month: 'long', year: 'numeric' })}
             </h2>
             
             <div className="grid grid-cols-7 gap-2 text-center">
               {/* Day labels */}
               {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                 <div key={day} className="text-xs font-bold text-gray-400">{day}</div>
               ))}
               
               {/* 31 Simple day blocks */}
               {Array.from({ length: daysInMonth }).map((_, i) => {
                 const dayNum = i + 1;
                 // Format the day to match your YYYY-MM-DD string
                 const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
                 
                 // Check if this specific day has an assignment
                 const hasAssignment = assignments.some(a => a.due === dateStr);

                 return (
                   <div 
                     key={i} 
                     className={`p-3 rounded-lg border ${hasAssignment ? 'bg-blue-100 border-blue-400 font-bold text-blue-800' : 'border-gray-100'}`}
                   >
                     {dayNum}
                   </div>
                 );
               })}
             </div>
          </div>
        ) : (

          <>
            <div className="bg-white rounded-xl p-5 shadow mb-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Add New Assignment</h2>

              <input
                type="text"
                placeholder="Assignment title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 text-sm text-black focus:outline-none focus:border-blue-400"
              />
              <input
                type="text"
                placeholder="Class (e.g. CSC 2053)"
                value={cls}
                onChange={e => setCls(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 text-sm text-black focus:outline-none focus:border-blue-400"
              />
              <input
                type="date"
                value={due}
                onChange={e => setDue(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 text-sm text-black focus:outline-none focus:border-blue-400"
              />

              <button
                onClick={addAssignment}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg transition-colors"
              >
                Add Assignment
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {assignments.length === 0 && (
                <p className="text-center text-gray-400 text-sm py-8">No assignments yet. Add one above!</p>
              )}

              {assignments.map(a => (
                <div
                  key={a.id}
                  className={`bg-white rounded-xl p-4 shadow flex items-center gap-3 ${a.done ? 'opacity-50' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={a.done}
                    onChange={() => toggleDone(a.id)}
                    className="w-4 h-4 cursor-pointer"
                  />

                  <div className="flex-1">
                    <p className={`font-medium text-gray-800 ${a.done ? 'line-through' : ''}`}>{a.title}</p>
                    <p className="text-xs text-gray-400">{a.cls} · Due {a.due}</p>
                  </div>

                  <button
                    onClick={() => deleteAssignment(a.id)}
                    className="text-gray-300 hover:text-red-400 text-lg transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </main>
  );
}
