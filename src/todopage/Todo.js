import React from 'react';
import request from 'request';

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     todos: [] 
    }
  }

  render() {
    return (
      <ul className="todos-list">
        {
          this.props.todos.map((item) => {
            return (
              <li className="todo-item" key={item.id} onClick={() => this.props.handleToggle(item.id)}>
                  <span className={item.isCompleted ? "todo-item__name disabled" : "todo-item__name"}>{item.task}</span>
                  <span className="todo-item__delete-button" onClick={() => this.props.handleDelete(item.id)}>×</span>
              </li>
            )
          })
        }
      </ul>
    )
  }
}

export default Todo;