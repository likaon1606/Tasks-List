import React, { useEffect, useState } from "react";
import { LEVELS } from "../../models/levels.enum";
import Task from "../../models/task.class";
import TaskComponent from "../pure/task";
import Taskform from "../pure/forms/taskForm";

// Importamos la hoja de estilos de task.scss
import "../../styles/task.scss";

const TaskListComponent = () => {
  const defaultTask1 = new Task(
    "Example1",
    "Description1",
    true,
    LEVELS.NORMAL
  );
  const defaultTask2 = new Task(
    "Example2",
    "Description2",
    false,
    LEVELS.URGENTE
  );
  const defaultTask3 = new Task(
    "Example3",
    "Description3",
    false,
    LEVELS.BLOCKING
  );

  //Estado del componente
  const [tasks, setTasks] = useState([
    defaultTask1,
    defaultTask2,
    defaultTask3,
  ]);
  const [loading, setLoading] = useState([true]); //true, por defecto está cargando

  //Control de ciclo de vida del componente
  useEffect(() => {
    console.log("Task State has been modified");
    setTimeout(() => {
      setLoading(false); //ya no está cargando
    }, 2000);
    return () => {
      console.log("TaskList componente is going to unmount");
    };
  }, [tasks]);

  // ? Complete Task BUTTON
  function completeTask(task) {
    console.log("complete this task: ", task);
    const index = tasks.indexOf(task);
    const tempTasks = [...tasks];
    tempTasks[index].completed = !tempTasks[index].completed;
    // We update the state of the component with the new list of tasks and it will update the
    // Iteration of the tasks in order to show the task updated
    setTasks(tempTasks);
  }

  // ? DELETE TASK BUTTON
  function deleteTask(task) {
    console.log("Delete this Task", task);
    const index = tasks.indexOf(task);
    const tempTasks = [...tasks];
    tempTasks.splice(index, 1);
    setTasks(tempTasks);
  }

  // ? ADD TASKS
  function addTask(task) {
    console.log("ADD this Task", task);
    const tempTasks = [...tasks];
    tempTasks.push(task);
    setTasks(tempTasks);
  }

  // ? show table
  const Table = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Priority</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* TODO: Iterar sobre una lista de tareas */}
          {tasks.map((task, index) => {
            return (
              <TaskComponent
                key={index}
                task={task}
                complete={completeTask}
                deleted={deleteTask}
              ></TaskComponent>
            );
          })}
        </tbody>
      </table>
    );
  };

  let tasksTable;

  if (tasks.length > 0) {
    tasksTable = <Table />;
  } else {
    tasksTable = (
      <div>
        <h3>The are no tasks to show</h3>
        <h4>Please, create one </h4>
      </div>
    );
  }

  const loadingStyle = {
    color: "gray",
    fontSize: "30px",
    fontWeight: "bold",
  };

  return (
    <div>
      <div className="col-12">
        <div className="card">
          {/* Card Header (title) */}
          <div className="card-header p-3">
            <h5>Your tasks:</h5>
          </div>
        </div>
        {/* Card Body (content) */}
        <div
          className="card-body"
          data-mdb-perfect-scrollbar="true"
          style={{ position: "relative", height: "400px" }}
        >
          {/* TODO: Add Loading Spinner */}
          {loading ? <p style={loadingStyle}>Loading tasks...</p> : tasksTable}
        </div>
      </div>
      {/*TODO: Aplicar un For/Map para redenderizar una lista de tareas */}
      {/* <TaskComponent task={defaultTask}/> */}
      <Taskform add={addTask} length={tasks.length}></Taskform>
    </div>
  );
};

export default TaskListComponent;
