import React, { useState } from "react";
import AddTask from "./Components/Todo/AddTask";
import Tasks from "./Components/Todo/Tasks";
import {
  Row,
  Col
} from "antd";
import TaskCalender from "./Components/Calendar/TaskCalender";

const App = props => {
  const [tasks, setTasks] = useState(props.tasks);

  return (
    <Row gutter={[8, 8]}>
      <Col span={8}>
        <AddTask
          updateTasks={
            newTask => setTasks([...tasks, ...newTask])
          }
        />
        <Tasks tasks={tasks} deleteTask={id => setTasks(tasks.filter(task => task.id != id))} />
      </Col>
      <Col span={14}>
        <TaskCalender tasks={tasks} updateTasks={tasks} />
      </Col>
    </Row>
  );
};

export default App;
