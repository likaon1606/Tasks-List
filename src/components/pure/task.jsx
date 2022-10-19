import React, { useEffect } from "react";
import PropTypes from "prop-types";

// Models
import { Task } from "../../models/task.class";
import { LEVELS } from "../../models/levels.enum";

//Importamos la hoja de estilos de task.scss
import "../../styles/task.scss";

const TaskComponent = ({ task, complete, deleted }) => {
  useEffect(() => {
    console.log("Created Task");
    return () => {
      console.log(`Task: ${task.name} is going to un mount`);
    };
  }, [task]);

  /**
   * Function that returns a Badge
   * depending on the level of th task
   */
  function taskLevelBadge() {
    switch (task.level) {
      case LEVELS.NORMAL:
        return (
          <h6 className="mb-0">
            <span className="badge bg-primary">{task.level}</span>
          </h6>
        );
      case LEVELS.URGENTE:
        return (
          <h6 className="mb-0">
            <span className="badge bg-warning">{task.level}</span>
          </h6>
        );
      case LEVELS.BLOCKING:
        return (
          <h6 className="mb-0">
            <span className="badge bg-danger">{task.level}</span>
          </h6>
        );
      default:
        break;
    }
  }

  /**
   *
   * @returns Function that return icon depending on completion of the task
   */
  function taskCompletedIcon() {
    if (task.completed) {
      return (
        <i
          onClick={() => complete(task)}
          className="bi-toggle-on task-action"
          style={{ color: "green", paddingRight: "1rem" }}
        ></i>
      );
    } else {
      return (
        <i
          onClick={() => complete(task)}
          className="bi-toggle-off task-action"
          style={{ color: "grey", paddingRight: "1rem" }}
        ></i>
      );
    }
  }

  const taskCompleted = {
    color: "green",
    fontWeight: "bold",
    textDecoration: "line-through",
  };

  const taskPending = {
    fontWeight: "bold",
    color: "tomato",
  };

  return (
    <tr
      className="fw-normal"
      style={task.completed ? taskCompleted : taskPending}
    >
      <th>
        <span className="ms-2">{task.name}</span>
      </th>
      <td className="align-middle">
        <span>{task.description}</span>
      </td>
      <td className="align-middle">
        {/* TODO: Sustituir por un badge */}
        {/* Execution of function to return badge element */}
        <span>{taskLevelBadge()}</span>
      </td>
      <td className="align-middle">
        {/* Execution of function to return badge element */}
        {taskCompletedIcon()}
        {/* TODO: Sustituir por un iconos */}
        {/* Ejemplo 1 de lógica para llamar los iconos */}
        {/* { task.completed ?
                (<i className='bi-toggle-on' style={{color: 'green'}}></i>) 
                : 
                (<i className='bi-toggle-off' style={{color: 'grey'}}></i>)
                }*/}
        <i
          onClick={() => deleted(task)}
          className="bi-trash task-action"
          style={{ color: "tomato" }}
        ></i>
      </td>
    </tr>

    // <div>
    //     <h2 className='task-name'>
    //         Nombre: { task.name }
    //     </h2>
    //     <h3>
    //         Descripción: { task.description }
    //     </h3>
    //     <h4>
    //         Level: { task.level }
    //     </h4>
    //     <h5>
    //         This task is: { task.completed ? 'completed' : 'pending' }
    //     </h5>
    // </div>
  );
};

TaskComponent.propTypes = {
  task: PropTypes.instanceOf(Task).isRequired, //es una tarea
  complete: PropTypes.func.isRequired,
  deleted: PropTypes.func.isRequired,
};

export default TaskComponent;
