import React, { useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import Column from './components/Column';

const initialData = {
  tasks: {
    'task-1': { id: 'task-1', title: 'Créer le repo GitHub', description: 'Ajouter un Readme propre', priority: 'high', dueDate: '2026-06-15', subtasks: [] },
    'task-2': { id: 'task-2', title: 'Designer la UI', description: 'Faire des maquettes sur Figma', priority: 'medium', dueDate: '2026-06-18', subtasks: [] },
    'task-3': { id: 'task-3', title: 'Configurer Tailwind', description: 'Installer les plugins requis', priority: 'low', subtasks: [] },
  },
  columns: {
    'col-todo': { id: 'col-todo', title: 'À faire', taskIds: ['task-1', 'task-2'] },
    'col-progress': { id: 'col-progress', title: 'En cours', taskIds: ['task-3'] },
    'col-done': { id: 'col-done', title: 'Terminé', taskIds: [] },
  },
  columnOrder: ['col-todo', 'col-progress', 'col-done'],
};

export default function Board() {
  const [data, setData] = useState(initialData);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const startColumn = data.columns[source.droppableId];
    const finishColumn = data.columns[destination.droppableId];

    if (startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = { ...startColumn, taskIds: newTaskIds };
      setData({
        ...data,
        columns: { ...data.columns, [newColumn.id]: newColumn },
      });
      return;
    }

    const startTaskIds = Array.from(startColumn.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStartColumn = { ...startColumn, taskIds: startTaskIds };

    const finishTaskIds = Array.from(finishColumn.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinishColumn = { ...finishColumn, taskIds: finishTaskIds };

    setData({
      ...data,
      columns: {
        ...data.columns,
        [newStartColumn.id]: newStartColumn,
        [newFinishColumn.id]: newFinishColumn,
      },
    });
  };

  const handleAddTask = (columnId, title) => {
    const newTaskId = `task-${Date.now()}`;
    const newTask = { id: newTaskId, title, description: '', priority: 'low', subtasks: [] };
    
    const column = data.columns[columnId];
    const newTaskIds = [...column.taskIds, newTaskId];

    setData({
      ...data,
      tasks: { ...data.tasks, [newTaskId]: newTask },
      columns: { ...data.columns, [columnId]: { ...column, taskIds: newTaskIds } }
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-6 p-6 overflow-x-auto items-start h-full">
        {data.columnOrder.map((columnId) => {
          const column = data.columns[columnId];
          const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

          return (
            <Column
              key={column.id}
              column={column}
              tasks={tasks}
              onAddTask={handleAddTask}
            />
          );          
        })}
      </div>
    </DragDropContext>
  );
}