import React, { useState } from "react";
import { Icon, Checkbox, Col, Row } from "antd";
import EditTask from "./EditTask";
import config from '../../config';

const Task = props => {
  const [visibility, setVisibility] = useState(false);
  const [task, setTask] = useState(props.data)

  const [checked, setChecked] = useState(parseInt(props.data.is_completed))

  return (
    <>
      <EditTask
        visibility={visibility}
        setVisibility={param => setVisibility(param)}
        task={task}
        updateTask={data => setTask(data)}
        deleteTask={id => props.deleteTask(id)}
      />

      <Row style={{ border: "1px solid #eee", padding: 5, marginBottom: 5 }}>
        <Col span={23}>
          <Checkbox
            style={{
              textDecoration: checked === 1 ? 'line-through' : 'none'
            }}
            onChange={
              e => {
                fetch(`${config.URI}task/change/${task.id}`, {
                  method: "GET",
                  mode: "cors",
                  headers: {
                    "Content-type":
                      "application/x-www-form-urlencoded; charset=UTF-8"
                  },
                })
                  .then(res => res.json())
                  .then(data => {
                    setChecked(checked === 1 ? 0 : 1);
                  })
                  .catch(err => console.log(err.message));
              }
            }
            checked={checked}
          >
            {task.title}
          </Checkbox>
        </Col>
        <Col span={1}>
          <Icon onClick={() => setVisibility(true)} type="edit" />
        </Col>
      </Row>
    </>
  );
};

export default Task;
