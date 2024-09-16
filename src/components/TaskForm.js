import React, { useState } from 'react';

const TaskForm = ({ addTask }) => {
  const [task, setTask] = useState({ title: '', status: 'Por hacer' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.title.trim()) {
      addTask({ ...task, id: Date.now() });
      setTask({ title: '', status: 'Por hacer' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
    <div className="input-group shadow-sm">
      <input
      type="text"
      className="form-control"
      placeholder="Nueva tarea"
      value={task.title}
      onChange={(e) => setTask({ ...task, title: e.target.value })}
    />
      <button type="submit" className="btn btn-primary">
        <i className="bi bi-plus-circle"></i> Agregar
      </button>
    </div>
  </form>

  );
};

export default TaskForm;
