import React from 'react';

class Todo extends React.Component {
  render() {
    return (
      <ul className="todos-list">
        {
          this.props.todos.map((item) => {
            return (
              <li className="todo-item" key={item.id} onClick={() =>                 this.props.handleToggle(item.id)}>
                  <span className={item.done ? "todo-item__name disabled" : "todo-item__name"}>{item.text}</span>
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