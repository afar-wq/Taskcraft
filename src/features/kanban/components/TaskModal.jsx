import React, { useState, useEffect } from 'react';
import { X, AlignLeft, BarChart2 } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

export default function TaskModal({ task, onClose, onSave, onDelete }) {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  
  // On s'assure que l'état initial utilise bien les valeurs en anglais ('low', 'medium', 'high')
  const [priority, setPriority] = useState(task?.priority || 'low');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setPriority(task.priority || 'low');
    }
  }, [task]);

  if (!task) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    // SÉCURITÉ TOUT-EN-UN : On force la conversion si jamais l'état a récupéré une chaîne en français
    let cleanPriority = priority;
    if (priority === 'Basse') cleanPriority = 'low';
    if (priority === 'Moyenne') cleanPriority = 'medium';
    if (priority === 'Haute') cleanPriority = 'high';

    onSave({
      ...task,
      title,
      description,
      priority: cleanPriority // On renvoie la clé anglaise attendue par TaskCard.jsx
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden z-10 border border-gray-100">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800">Détails de la tâche</h3>
          <Button variant="ghost" onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <X className="w-5 h-5 text-gray-500" />
          </Button>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
          
          <Input
            label="Titre de la tâche"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* Section Sélecteur de Priorité */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
              <BarChart2 className="w-4 h-4 text-gray-400" /> Priorité
            </label>
            <div className="grid grid-cols-3 gap-2 mt-1">
              {[
                { key: 'low', label: 'Basse', activeClass: 'bg-green-100 border-green-500 text-green-700' },
                { key: 'medium', label: 'Moyenne', activeClass: 'bg-amber-100 border-amber-500 text-amber-700' },
                { key: 'high', label: 'Haute', activeClass: 'bg-red-100 border-red-500 text-red-700' }
              ].map((p) => {
                // On gère le cas où la priorité actuelle est en anglais ou en français pour le style actif
                const isSelected = priority === p.key || priority === p.label;
                
                return (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => setPriority(p.key)} // Stocke la clé anglaise ('low', 'medium', 'high')
                    className={`py-2 px-3 text-sm font-medium rounded-xl border transition-all ${
                      isSelected 
                        ? p.activeClass 
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
              <AlignLeft className="w-4 h-4 text-gray-400" /> Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ajoutez des détails pour cette tâche..."
              rows="4"
              className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-xl placeholder-gray-400 text-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onDelete(task.id)}
              className="text-red-600 hover:bg-red-50 hover:text-red-700 font-medium px-3 py-2"
            >
              Supprimer
            </Button>

            <div className="flex gap-2">
              <Button type="button" variant="ghost" onClick={onClose}>
                Annuler
              </Button>
              <Button type="submit" variant="primary" className="px-5">
                Enregistrer
              </Button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}