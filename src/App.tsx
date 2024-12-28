import React, { useState } from 'react';
import './App.css'
import { CheckCheck, BookMarked, Equal, Delete, Icon, PlusCircle, Trash2, CheckCircle2, Circle } from 'lucide-react';

interface Task {
  id: number;
  text: string;
  eisen: 'do'|'schedule'|'delegate'|'delete';
  completed: boolean;
}

interface TaskLevel {
  color: string;
  bgColor: string;
  textColor: string;
  icon: React.ElementType;
  label: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTasks, setNewTasks] = useState('');
  const [selectedEisenMode, setSelectedEisenMode] = useState<Task['eisen']>('delegate');

  const TaskLevels: Record<Task['eisen'], TaskLevel> = {
    do: { 
      color: 'text-green-500', 
      bgColor: 'bg-green-500',
      textColor: 'text-green-500',
      icon: CheckCheck, 
      label: 'Do' 
    },
    schedule: { 
      color: 'text-blue-500', 
      bgColor: 'bg-blue-500',
      textColor: 'text-blue-500',
      icon: BookMarked, 
      label: 'Schedule' 
    },
    delegate: { 
      color: 'text-yellow-500', 
      bgColor: 'bg-yellow-500',
      textColor: 'text-yellow-500',
      icon: Equal, 
      label: 'Delegate' 
    },
    delete: { 
      color: 'text-red-500', 
      bgColor: 'bg-red-500',
      textColor: 'text-red-500',
      icon: Delete, 
      label: 'Delete' 
    },
  };

  const addTask = () => {
    if (newTasks.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTasks, eisen: selectedEisenMode, completed: false }]);
      setNewTasks(''); 
    }
  }

  const toggleComplete = (taskId: number) => {
    setTasks(tasks.map((task) => 
      task.id === taskId ? { ...task, completed: !task.completed } : task 
    ));
  };

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const filterTasks = (eisen: Task['eisen']) => {
    return tasks.filter((task) => task.eisen === eisen);
  };

  return (
    <div className='max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen'>
      <h1 className='text-3xl font-bold text-gray-800 mb-8'>Eisenhower Matrix</h1>
      <div className='bg-white rounded-lg shadow-md p-6 mb-8'>
        <div className='flex flex-col gap-4'>
          <input type="text"
            value={newTasks}
            onChange={(e) => setNewTasks(e.target.value)}
            placeholder='Enter a New Task (i.e Doing Laboratory Works)'
            className='w-full p-3 border rounded-lg bg-white text-gray-900'
          />
          <div className='flex gap-4'>
            {(Object.entries(TaskLevels) as [Task['eisen'], TaskLevel][]).map(([eisen, { bgColor, textColor, icon: IconComponent, label }]) => (
              <button
                key={eisen}
                onClick={() => setSelectedEisenMode(eisen)} 
                className={`flex-1 p-3 rounded-lg border flex items-center justify-center gap-2 ${
                  selectedEisenMode === eisen ? `${bgColor} text-white` : 'bg-white ' + textColor
                }`}>
                <IconComponent size={20} />
                <span>{label}</span>
              </button>
            ))}
          </div>
          <button
            onClick={addTask}
            className='flex items-center justify-center gap-2 bg-green-500 text-white p-3 rounded-lg'>
            <PlusCircle size={20} />
            Add Task
          </button>
        </div>
      </div>
      <div className='grid md:grid-cols-3 gap-6'>
        {(Object.entries(TaskLevels) as [Task['eisen'], TaskLevel][]).map(([eisen, { textColor, icon: IconComponent, label }]) => (
          <div
            key={eisen}
            className='bg-white rounded-lg shadow-md p-6'>
            <div className='flex items-center gap-2 mb-4'>
              <IconComponent size={24} className={textColor}/>
              <h2 className='text-xl font-semibold text-gray-900'>{label}</h2>
            </div>
            <div className='space-y-3'>
              {filterTasks(eisen).map((task) =>
                <div
                  key={task.id}
                  className={`flex items-center justify-between p-3 rounded-lg border ${task.completed ? 'bg-gray-50' : 'bg-white'}`}>
                  <div className='flex items-center gap-2'>
                    <button
                      onClick={() => toggleComplete(task.id)}
                      className='text-green-500 transition-colors'
                    >
                      {task.completed ? <CheckCircle2 size={15} /> : <Circle size={15} />}
                    </button>
                    <span className={task.completed ? 'line-through text-gray-600' : 'text-gray-900'}>
                      {task.text}
                    </span>
                  </div>
                  <button 
                    onClick={() => deleteTask(task.id)}
                    className='text-red-400 hover:text-red-800 transition-colors'>
                    <Trash2 size={15} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App