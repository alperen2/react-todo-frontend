import React from "react";
import {
    Calendar
} from "antd";

import "antd/dist/antd.css";
import "../../App.css";
import config from '../../config'
const moment = require('moment');

export default class TaskCalender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: props.tasks,
        };
    }

    componentWillReceiveProps() {
        this.setState(this.props.updateTasks);
        this.setState((state, props) => ({
            tasks: props.updateTasks
        }));
    }

    getListData = value => {
        let listData;

        listData = this.state.tasks.filter(d => moment(d.due_date).format("Y.MM.DD") === moment(value).format("Y.MM.DD"))
        return listData || [];
    }

    dateCellRender = value => {
        const listData = this.getListData(value);
        return (
            <ul className="events">
                {listData.map(item => (
                    <li key={item.content}>
                        {item.title}
                    </li>
                ))}
            </ul>
        );
    }


    render() {
        return <Calendar
            onSelect={e => console.log(moment(e).format("Y.MM.DD"))}
            dateCellRender={this.dateCellRender}
        />
    }

}