import React, { useState } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { Plus, MoreHorizontal } from 'lucide-react';
import TaskCard from './TaskCard';
import Button from './../../../components/ui/Button';

export default function Column({ column, tasks, onAddTask, onTaskClick }) {
  const [isAdding, setIsAdding] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    onAddTask(column.id, taskTitle);
    setTaskTitle('');
    setIsAdding(false);
  };

  return (
    <div className="w-80 flex flex-col bg-gray-50 rounded-2xl p-4 max-h-[80vh] border border-gray-100">
      {/* Header de la Colonne */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-gray-700">{column.title}</h3>
          <span className="bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full font-medium">
            {tasks.length}
          </span>
        </div>
        <Button variant="ghost" className="p-1 rounded-md">
          <MoreHorizontal className="w-4 h-4 text-gray-500" />
        </Button>
      </div>

      {/* Zone Droppable (Conteneur des tâches) */}
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 overflow-y-auto pr-1 min-h-37.5 transition-colors rounded-xl ${
              snapshot.isDraggingOver ? 'bg-gray-100/80' : ''
            }`}
          >
            {tasks.map((task, index) => (
              <TaskCard 
                key={task.id} 
                task={task} 
                index={index} 
                onClick={() => onTaskClick(task)} 
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* Bouton d'ajout de tâche */}
      <div className="mt-2">
        {isAdding ? (
          <form onSubmit={handleSubmit} className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
            <input
              type="text"
              autoFocus
              placeholder="Nom de la tâche..."
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="w-full text-sm border-0 focus:ring-0 p-0 mb-2 font-medium placeholder-gray-400 text-gray-800"
            />
            <div className="flex justify-end gap-2 text-xs">
              <Button type="button" variant="ghost" onClick={() => setIsAdding(false)}>
                Annuler
              </Button>
              <Button type="submit" variant="primary" className="py-1 px-3">
                Ajouter
              </Button>
            </div>
          </form>
        ) : (
          <Button
            variant="ghost"
            onClick={() => setIsAdding(true)}
            className="w-full flex items-center justify-center gap-2 border border-dashed border-gray-300 hover:border-gray-400 hover:bg-white text-gray-500 py-2.5 rounded-xl"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter une carte</span>
          </Button>
        )}
      </div>
    </div>
  );
}