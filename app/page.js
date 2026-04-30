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
  const [selectedDate, setSelectedDate] = useState(null);

  // NEW: Track the month currently being viewed
  const [viewDate, setViewDate] = useState(new Date());

  // CALENDAR SETUP (Now uses viewDate instead of a static 'today')
  const currentMonth = viewDate.getMonth();
  const currentYear = viewDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  function handleDayClick(dateStr) {
    console.log("You clicked:", dateStr);
    setSelectedDate(dateStr);
  }

  // NEW: Functions to change the month
  function prevMonth() {
    setViewDate(new Date(currentYear, currentMonth - 1, 1));
  }

  function nextMonth() {
    setViewDate(new Date(currentYear, currentMonth + 1, 1));
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-xl mx-auto">

        {/* HEADER & TOGGLE BUTTON */}
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
             
             {/* NEW: Month Navigation Header */}
             <div className="flex justify-between items-center mb-4">
               <button onClick={prevMonth} className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-700 font-bold">
                 &lt; Prev
               </button>
               <h2 className="text-xl font-bold text-gray-800">
                 {viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
               </h2>
               <button onClick={nextMonth} className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-700 font-bold">
                 Next &gt;
               </button>
             </div>
             
             <div className="grid grid-cols-7 gap-2 text-center">
               {/* Day labels */}
               {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                 <div key={day} className="text-xs font-bold text-gray-400">{day}</div>
               ))}
               
               {/* Simple day blocks */}
               {Array.from({ length: daysInMonth }).map((_, i) => {
                 const dayNum = i + 1;
                 const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
                 
                 const hasAssignment = assignments.some(a => a.due === dateStr);
                 const isSelected = selectedDate === dateStr;

                 return (
                   <button 
                     key={i} 
                     type="button"
                     onClick={() => handleDayClick(dateStr)}
                     className={`p-3 rounded-lg border w-full transition-colors cursor-pointer
                       ${hasAssignment ? 'bg-blue-100 border-blue-400 font-bold text-blue-800' : 'border-gray-100 hover:bg-gray-50'}
                       ${isSelected ? 'ring-2 ring-blue-600 outline-none' : ''}
                     `}
                   >
                     {dayNum}
                   </button>
                 );
               })}
             </div>

             {/* DISPLAY ASSIGNMENTS FOR SELECTED DAY */}
             {selectedDate && (
               <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                 <h3 className="font-semibold text-gray-800 mb-3 text-lg border-b pb-2">
                   Due on {selectedDate}:
                 </h3>
                 
                 <div className="flex flex-col gap-2">
                   {assignments.filter(a => a.due === selectedDate).length > 0 ? (
                     assignments.filter(a => a.due === selectedDate).map(a => (
                       <div key={a.id} className="flex justify-between items-center text-sm bg-white p-3 rounded border border-gray-200 shadow-sm">
                         <span className={`font-medium ${a.done ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                           {a.title} ({a.cls})
                         </span>
                         <span className={`px-2 py-1 rounded text-xs font-bold ${a.done ? 'bg-gray-200 text-gray-500' : 'bg-blue-100 text-blue-700'}`}>
                           {a.done ? 'Done' : 'Pending'}
                         </span>
                       </div>
                     ))
                   ) : (
                     <p className="text-sm text-gray-500 italic">No assignments due on this date.</p>
                   )}
                 </div>
               </div>
             )}
          </div>
        ) : (

          /* --- ORIGINAL UI (LIST VIEW) --- */
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
