import React, { Component } from 'react';

class Task extends Component {

    onChange = (event) => {
        this.props.onChange(event, this.props.task.id);
    }

    render() {
        return (
            <li className="task">
                { this.props.task.name }
                <input type="checkbox" 
                    defaultChecked={this.props.task.complete}
                    ref="complete"
                    onChange={this.onChange}>
                </input>
            </li>
        );
    }
}

export default Task;