import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import logo from './img/logo.png'

const App = () => {
  // Función para cargar tareas desde localStorage
  const loadStoredTasks = () => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  };

  // Usamos una función para inicializar el estado solo una vez
  const [tasks, setTasks] = useState(loadStoredTasks);
  const [selectedTasks, setSelectedTasks] = useState([]);

  // Guardar tareas en localStorage cada vez que cambien
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  // Agregar tarea
  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  // Editar tarea
  const editTask = (id, updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? updatedTask : task
    );
    setTasks(updatedTasks);
  };

  // Eliminar tarea
  const deleteTask = (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };

  // Manejar selección de tareas
  const handleTaskSelection = (id) => {
    if (selectedTasks.includes(id)) {
      setSelectedTasks(selectedTasks.filter(taskId => taskId !== id));
    } else {
      setSelectedTasks([...selectedTasks, id]);
    }
  };

  // Eliminar tareas seleccionadas
  const deleteSelectedTasks = () => {
    const remainingTasks = tasks.filter(task => !selectedTasks.includes(task.id));
    setTasks(remainingTasks);
    setSelectedTasks([]); // Limpiar las tareas seleccionadas
  };

  return (
     <div>
     <div className='img-container' >
          <img src="{logo}" alt='Prueba'></img> 
      </div>
    <div className="container">
      <h1 className="text-center my-4 task-list-title">Lista de Tareas</h1>
      <TaskForm addTask={addTask} />
      
      {selectedTasks.length > 0 && (
        <button className="btn btn-danger mb-3" onClick={deleteSelectedTasks}>
          Eliminar Tareas Seleccionadas
        </button>
      )}

      <TaskList 
        tasks={tasks} 
        editTask={editTask} 
        deleteTask={deleteTask} 
        handleTaskSelection={handleTaskSelection}
        selectedTasks={selectedTasks} 
      />
    </div>
 </div>
  );
};

export default App;
