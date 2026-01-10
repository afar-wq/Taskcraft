import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Calendar, CheckSquare } from 'lucide-react';

export default function TaskCard({ task, index, onClick }) {
  // Calcul du ratio de la checklist (ex: 2/4)
  const totalSubtasks = task.subtasks?.length || 0;
  const completedSubtasks = task.subtasks?.filter(s => s.completed).length || 0;

  const priorityColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-amber-100 text-amber-800',
    low: 'bg-green-100 text-green-800',
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={(e) => {
            e.stopPropagation();
            if (onClick) onClick();
          }}
          className={`p-4 mb-3 bg-white rounded-xl border border-gray-200 shadow-sm cursor-pointer active:cursor-grabbing hover:border-blue-400 transition-all ${
            snapshot.isDragging ? 'shadow-lg border-blue-500 bg-blue-50/50' : ''
          }`}
        >
          {/* Tag de Priorité */}
          {task.priority && (
            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide ${priorityColors[task.priority]}`}>
              {task.priority}
            </span>
          )}

          {/* Titre & Description */}
          <h4 className="font-semibold text-gray-800 mt-2 line-clamp-1">{task.title}</h4>
          {task.description && (
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{task.description}</p>
          )}

          {/* Meta Infos (Date & Checklist) */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 text-xs text-gray-400">
            {task.dueDate && (
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{task.dueDate}</span>
              </div>
            )}

            {totalSubtasks > 0 && (
              <div className="flex items-center gap-1 ml-auto">
                <CheckSquare className="w-3.5 h-3.5" />
                <span>{completedSubtasks}/{totalSubtasks}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
}