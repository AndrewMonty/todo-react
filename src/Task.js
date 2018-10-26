import React, { Component } from 'react';

class Task extends Component {

    onChange = (event) => {
        this.props.onChange(event, this.props.task.id);
    }

    render() {
        return (
            <li className="task">
                <input type="checkbox" 
                    defaultChecked={this.props.task.complete}
                    ref="complete"
                    onChange={this.onChange}>
                </input>
                { this.props.task.name }
            </li>
        );
    }
}

export default Task;