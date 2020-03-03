import React from "react";
import Task from "./Task";
import { Empty, Divider } from 'antd';

const Tasks = props => {

  return (
    <>
      {props.tasks.length === 0 && (
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{
            height: 70,
          }}
          description={
            <span>
              No task here
            </span>
          }
        >
        </Empty>
      )}
      {props.tasks.map(task => <Task key={task.id} data={task} editTask={(id) => { props.editTask(id) }} deleteTask={id => props.deleteTask(id)} />)}
    </>
  );
};

export default Tasks;
