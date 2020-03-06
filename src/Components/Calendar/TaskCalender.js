import React from "react";
import { Calendar } from "antd";

import "antd/dist/antd.css";
import "../../App.css";
import config from "../../config";
import App from "../../App";
const moment = require("moment");

const TaskCalender = props => {
  const [tasks, setTasks] = [props.updateTasks];

  //   componentWillReceiveProps() {
  //     props.updateTasks);
  //     (state, props) => ({
  //       tasks: props.updateTasks
  //     }));
  //   }

  const getListData = value => {
    let listData;

    listData = tasks.filter(
      d =>
        moment(d.due_date).format("Y.MM.DD") === moment(value).format("Y.MM.DD")
    );
    return listData || [];
  };

  const dateCellRender = value => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map(item => (
          <li key={item.content}>{item.title}</li>
        ))}
      </ul>
    );
  };

  return (
    <Calendar
      onSelect={e => {
        props.showAddPanel(true);
        props.selectedDate(e);
      }}
      dateCellRender={dateCellRender}
    />
  );
};

export default TaskCalender;
