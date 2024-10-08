import React, { useState } from 'react';
//import { alertaSuccess } from '../Funciones';
import Swal from 'sweetalert2';
import { alertaSuccess, alertaError, alertaWarning, alertaDelete } from "../Funciones";



const TaskItem = ({ task, editTask, deleteTask, handleTaskSelection, isSelected }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  // Función para manejar la edición
  const handleEdit = () => {
    editTask(task.id, editedTask);
    setIsEditing(false);
    alertaSuccess(`Tarea "${editedTask.title}" ha sido editada con éxito`);
  };

  // Función para manejar la eliminación con confirmación
  const handleDelete = () => {
    Swal.fire({
      title: `¿Estás seguro de que deseas eliminar la tarea "${task.title}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTask(task.id);
        Swal.fire(
          'Eliminada',
          `Tarea "${task.title}" eliminada con éxito`,
          'success'
        );
      }
    });
  };

   // Función para aplicar el estilo en línea según el estado de la tarea
   const getStatusClass = (status) => {
    switch (status) {
      case 'Por hacer':
        return { color: 'red' };
      case 'En progreso':
        return { color: 'orange' };
      case 'Finalizada':
        return { color: 'green' };
      default:
        return {};
    }
  };

  return (
    <div className="list-group-item d-flex justify-content-between align-items-center">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => handleTaskSelection(task.id)}
      />
      {isEditing ? (
        <>
          <input
            type="text"
            className="form-control"
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
          />
          <select
            className="form-select mx-2"
            value={editedTask.status}
            onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value })}
          >
            <option value="Por hacer" className='status-pending'>Por hacer</option>
            <option value="En progreso" className='status-in-progress'>En progreso</option>
            <option value="Finalizada" className='status-completed'>Finalizada</option>
          </select>
          <button onClick={handleEdit} className="btn btn-success">Guardar</button>
        </>
      ) : (
        <>
          <span style={getStatusClass(task.status)}>
            {task.title} - <em>{task.status}</em>
          </span>
          <div>
            <button onClick={() => setIsEditing(true)} className="btn btn-warning mx-2">Editar</button>
            <button onClick={handleDelete} className="btn btn-danger">Eliminar</button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;

