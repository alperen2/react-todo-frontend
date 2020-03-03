import React, { useState } from "react";
import {
  Icon,
  Button,
  Col,
  Row,
  Modal,
  DatePicker,
  TimePicker,
  Input,
  Form
} from "antd";

import "antd/dist/antd.css";
import "../../App.css";
import config from '../../config'

const { TextArea } = Input;


const AddTask = props => {
  const [visibility, setVisibility] = useState(false);
  return (
    <>
      <Row type="flex" justify="end" style={{ marginBottom: 10 }}>
        <Col>
          <Button
            onClick={() => {
              setVisibility(true);
            }}
          >
            <Icon type="plus" />
            Add Task
          </Button>
        </Col>
      </Row>
      <Modal
        footer={null}
        onCancel={() => setVisibility(false)}
        cancelText="Close"
        okText="Add"
        visible={visibility}
        title="Add Task"
      >
        <WrappedAddTaskForm
          update={newTasks => props.updateTasks(newTasks)}
          closePanel={() => setVisibility(false)}
        />
      </Modal>
    </>
  );
};

const AddTaskForm = props => {
  const { getFieldDecorator } = props.form;

  return (
    <>
      <Form
        onSubmit={e => {
          e.preventDefault();
          props.form.validateFields((err, values) => {
            if (!err) {
              fetch(config.URI + "task/add", {
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
                  props.update(data);
                })
                .catch(err => console.log(err.message));
            }
          });
        }}
      >

        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Form.Item label="Title">
              {getFieldDecorator("title", {
                rules: [{ required: true, message: "Title is required" }]
              })(<Input id="title" />)}
            </Form.Item>
          </Col>
        </Row>
        <Row type="flex" gutter={[8, 8]} justify="space-between">
          <Col span={10}>
            <Form.Item label="Due date">
              {getFieldDecorator("due_date", {
                rules: [{ required: true, message: "Due date is required" }]
              })(<DatePicker id="due_date" format={config.DATEFORMAT} />)}
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item label="Due time">
              {getFieldDecorator("due_time", {
                rules: [{ required: true, message: "Due time is required" }]
              })(<TimePicker id="due_time" format={config.TIMEFORMAT} />)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Form.Item label="Defination">
            {getFieldDecorator("defination")(<TextArea id="defination" />)}
          </Form.Item>
        </Row>
        <Row type="flex" gutter={[8, 8]} justify="end">
          <Col>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

const WrappedAddTaskForm = Form.create({ name: "add_task_form" })(AddTaskForm);

export default AddTask;
