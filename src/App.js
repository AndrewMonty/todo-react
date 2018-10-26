import React, { Component } from 'react';
import './App.css';
import Task from './Task.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      pagination: {},
      newTask: ''
    }
  }

  componentDidMount() {
    fetch('http://localhost:8000/api/tasks')
    .then(results => {
      return results.json();
    }).then(data => {
      const tasks = data.data.map(task => {
        return this.renderTask(task);
      });

      this.setState({
        pagination: data,
        tasks: tasks
      });
    });
  }

  handleTaskChange = (event, id) => {
    let index = this.state.tasks.findIndex(task => {
      return task.key == id;
    });

    if (index > -1) {
      fetch('http://localhost:8000/api/tasks/' + id, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          complete: event.target.checked
        })
      }).then(results => {
        return results.json();
      }).then(data => {
        let tasks = this.state.tasks.slice();
        tasks.splice(index, 1, this.renderTask(data));
        this.setState({
          tasks: tasks
        });
      });
    }
  }

  renderTask(task) {
    return (
      <Task key={task.id} task={task} onChange={this.handleTaskChange}></Task>
    );
  }

  handleChange = (event) => {
    this.setState({newTask: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:8000/api/tasks', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.newTask
      })
    }).then(results => {
      return results.json();
    }).then(data => {
      let tasks = this.state.tasks.slice();
      tasks.push(this.renderTask(data));
      this.setState({
        tasks: tasks,
        newTask: ''
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Todo List</h1>

        <ul className="tasks">
          {this.state.tasks}
        </ul>

        <form onSubmit={this.handleSubmit}>
          <input type="text" name="task"
            placeholder="new task"
            value={this.state.newTask}
            onChange={this.handleChange}>
          </input>
          <button type="submit">save</button>
        </form>
      </div>
    );
  }
}

export default App;
