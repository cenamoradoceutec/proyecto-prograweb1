import React, { useState } from 'react';
import { alertaSuccess, alertaError, alertaWarning } from "../Funciones";

const TaskForm = ({ addTask }) => {
  const [task, setTask] = useState({ title: '', status: 'Por hacer' });

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evitar el comportamiento predeterminado del formulario

    // Validación: si el título de la tarea no está vacío
    if (task.title.trim()) {
      // Llamada a la función para agregar la tarea
      addTask({ ...task, id: Date.now() });

      // Mostrar la alerta
      alertaSuccess(`Tarea "${task.title}" agregada con éxito`);

      // Limpiar el formulario después de agregar la tarea
      setTask({ title: '', status: 'Por hacer' });
    } else {
      // Si el título está vacío, mostrar una alerta de advertencia
      alertaError('Por favor, introduce un título para la tarea.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Nueva tarea"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />
        <button type="submit" className="btn btn-primary">
          Agregar
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
