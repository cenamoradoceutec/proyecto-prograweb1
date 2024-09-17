import React from 'react';
import TaskItem from './TaskItem';
import Swal from 'sweetalert2';
import { alertaSuccess, alertaError, alertaWarning, alertaDelete } from "../Funciones";

const TaskList = ({ tasks, editTask, deleteTask, handleTaskSelection, selectedTasks }) => {

  // Función para eliminar todas las tareas seleccionadas con SweetAlert2
  const deleteSelectedTasks = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción eliminará todas las tareas seleccionadas.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        selectedTasks.forEach(taskId => deleteTask(taskId));
        Swal.fire(
          'Eliminadas',
          'Las tareas seleccionadas han sido eliminadas con éxito.',
          'success'
        );
        selectedTasks.length = 0
      }
    });
  };

  return (
    <div>
      {selectedTasks.length > 0 && (
        <button className="btn btn-danger mb-3" onClick={deleteSelectedTasks}>
          Eliminar Tareas Seleccionadas
        </button>

        
      )}
      <div className="list-group">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            editTask={editTask}
            deleteTask={deleteTask}
            handleTaskSelection={handleTaskSelection}
            isSelected={selectedTasks.includes(task.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
