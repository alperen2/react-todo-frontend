import React from "react";
import {
    Button,
    Col,
    Row,
    Modal,
    DatePicker,
    TimePicker,
    Input,
    Form
} from "antd";

import moment from "moment";
import "antd/dist/antd.css";
import "../../App.css";
import config from '../../config'

const { TextArea } = Input;



const EditTask = props => {

    return (
        <>
            <Modal
                footer={null}
                onCancel={() => props.setVisibility(false)}
                cancelText="Close"
                okText="Edit"
                visible={props.visibility}
                title="Edit Task"
            >
                <WrappedEditTaskForm
                    updateTask={newTask => props.updateTask(newTask)}
                    closePanel={() => props.setVisibility(false)}
                    task={props.task}
                    deleteTask={id => props.deleteTask(props.task.id)}
                />
            </Modal>
        </>
    );
};

const EditTaskForm = props => {
    const { getFieldDecorator } = props.form;
    return (
        <>
            <Form
                onSubmit={e => {
                    e.preventDefault();
                    props.form.validateFields((err, values) => {
                        if (!err) {
                            fetch(`${config.URI}task/edit/${props.task.id}`, {
                                method: "POST",
                                mode: "cors",
                                headers: {
                                    "Content-type":
                                        "application/x-www-form-urlencoded; charset=UTF-8"
                                },
                                body: JSON.stringify(values)
                            })
                                .then(res => res.json())
                                .then(data => {
                                    props.closePanel(false);
                                    props.form.resetFields();
                                    props.updateTask(data);
                                })
                                .catch(err => console.log(err.message));
                        }
                    });
                }}
            >
                <Row type="flex" gutter={[8, 8]} justify="space-between">
                    <Col span={10}>
                        <Form.Item label="Due date">
                            {getFieldDecorator("due_date", {
                                rules: [{ required: true, message: "Due date is required" }],
                                initialValue: moment(props.task.due_date, config.DATEFORMAT)
                            })(<DatePicker id="due_date" format={config.DATEFORMAT} />)}
                        </Form.Item>
                    </Col>
                    <Col span={7}>
                        <Form.Item label="Due time">
                            {getFieldDecorator("due_time", {
                                rules: [{ required: true, message: "Due time is required" }],
                                initialValue: moment(props.task.due_time, config.TIMEFORMAT)
                            })(<TimePicker id="due_time" format={config.TIMEFORMAT} />)}
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Col span={24}>
                        <Form.Item label="Title">
                            {getFieldDecorator("title", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Title is required"
                                    }
                                ],
                                initialValue: props.task.title
                            })(<Input id="title" />)}
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8, 8]}>
                    <Form.Item label="Defination">
                        {getFieldDecorator("defination", { initialValue: props.task.defination })(<TextArea id="title" />)}
                    </Form.Item>
                </Row>
                <Row type="flex" gutter={[8, 8]} justify="space-between">
                    <Col>
                        <Form.Item>
                            <Button onClick={e => {
                                fetch(`${config.URI}/task/delete/${props.task.id}`)
                                props.deleteTask(props.task.id);
                                props.closePanel(false);
                            }}>Kaldır</Button>
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Update
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

const WrappedEditTaskForm = Form.create({ name: "edit_task_form" })(EditTaskForm);

export default EditTask;
