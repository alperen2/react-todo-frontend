import React, { useState } from "react";
import AddTask from "./Components/Todo/AddTask";
import Tasks from "./Components/Todo/Tasks";
import { Row, Col, Switch } from "antd";
import TaskCalender from "./Components/Calendar/TaskCalender";

const App = props => {
  const [tasks, setTasks] = useState(props.tasks);
  const [visibility, setVisibility] = useState(false);
  const [modeName, setModeName] = useState("task");
  const [selectedDate, setSelectedDate] = useState();
  let mode = null;

  if (modeName === "task") {
    mode = (
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Tasks
            tasks={tasks}
            deleteTask={id => setTasks(tasks.filter(task => task.id != id))}
          />
        </Col>
      </Row>
    );
  } else {
    mode = (
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <TaskCalender
            showAddPanel={e => setVisibility(e)}
            tasks={tasks}
            updateTasks={tasks}
            selectedDate={e => setSelectedDate(e)}
          />
        </Col>
      </Row>
    );
  }
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col>
          <AddTask
            setVisibility={e => setVisibility(e)}
            visibility={visibility}
            updateTasks={newTask => setTasks([...tasks, ...newTask])}
            selectedDate={selectedDate}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col>
          <Switch
            checkedChildren="Task"
            onChange={e => {
              setModeName(modeName === "task" ? "calendar" : "task");
            }}
            unCheckedChildren="Calendar"
          />
        </Col>
      </Row>
      {mode}
    </>
  );
};

export default App;
