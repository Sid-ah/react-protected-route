/* eslint "class-methods-use-this": [2, { "exceptMethods": ["handleRequest", "fetchDisbursements", "historyTable", "getDecodedToken", "getHeaders"]}] */
/* eslint-env es6 */
/*eslint class-methods-use-this: ["error", { "exceptMethods": ["render", "componentDidMount"] }] */
import React from 'react';
import Header from './Header';
import Title from './todopage/Title';
import Form from './todopage/Form';
import Footer from './todopage/Footer';
import './todopage/styles.css'
import request from 'request';

const url = "https://sidah.azurewebsites.net/api/TodoRead?code=L3ut8sJs37jFe55PmDhKxSRhXt7Bik1r4c6lZRafMTqT8WoA5EXHrg=="
class Protected extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todoValue: "",
      filterType: "All",
      todos: [],
    }
  }

  handleChange = (event) => {
    this.setState({
      todoValue: event.target.value,
    })
  }

  handleClick = (event) => {
    event.preventDefault();
    if (this.state.todoValue !== "") {
      const todo =  {
          id: Date.now(),
          task: this.state.todoValue,
          todo: this.state.todoValue,
          isCompleted: false,
      }
      request.post({url: 'https://sidah.azurewebsites.net/api/TodoCreate?code=EQ8YvWnEodLIcnucgta3SoJrGh1sMcmW77ax3Dxp9760IKUU4EFBrw==', 
        body: todo,
      }, (err, response, body) => {
        if (err) {
          console.log('error from making request to API gateway: ' + err)
        } else {
          console.log('no error from api gateway request!')
        }
        console.log('response body: ', response)
      })
      this.setState({
        todoValue: "",
        todos: [todo, ...this.state.todos],
      })
    }
  }

  componentDidMount() {
    this.fetchTodos()
  }

  fetchTodos = () => {
    request.get(url, {
      headers: {
        'Accept': 'application/json',
        'Access-Control-Request-Method': "GET",
        'Access-Control-Request-Headers': "Content-Type",
        'auth_token': "L3ut8sJs37jFe55PmDhKxSRhXt7Bik1r4c6lZRafMTqT8WoA5EXHrg=="
      }
    }, (err, response, body) => {
      if (err) {
        console.log('error from making request to API gateway: ' + err)
      } else {
        console.log('no error from api gateway request!')
      }
      const type = typeof body
      let bodyToLog = body
      if (type === 'string') {
        bodyToLog = JSON.parse(body)
      }
      this.setState({todos: bodyToLog})
      console.log('response body: ', bodyToLog)
    })
  }

  handleToggle = (id) => {
    this.setState((prevState) => {
      return {
        todos: prevState.todos.map((item, i) => {
          if (item.id === id) {
            return {
              ...item,
              isCompleted: !prevState.todos[i].isCompleted,
            }
          }
          return item;
        })
      }
    })
  }

  handleDelete = (id) => {
    this.setState({
      todos: this.state.todos.filter(item => item.id !== id)
    })
  }

  deleteCompleted = () => {
    this.setState({
      todos: this.state.todos.filter(item => !item.done)
    })
  }

  getVisibleTodos = () => {
    const filterType = this.state.filterType;
    let filterState = null;
    switch (filterType) {
      case "Complited":
        return filterState = this.state.todos.filter(item => item.isCompleted);
      case "Active":
        return filterState = this.state.todos.filter(item => !item.isCompleted);
      default:
        return filterState = this.state.todos;
    }
  }

  setActiveFilter = (text) => {
    this.setState({
      filterType: text,
    })
  }

  render () {
    return (
      <div className="protected-app">
        <Header />
        <div className="container">
          <Title countTodo={this.state.todos.length}/>
          <Form handleDelete={this.handleDelete} 
                handleToggle={this.handleToggle}
                handleClick={this.handleClick} 
                handleChange={this.handleChange} 
                todoValue={this.state.todoValue} 
                todos={this.getVisibleTodos()}/>
          <Footer setActiveFilter={this.setActiveFilter} 
                deleteCompleted={this.deleteCompleted} 
                filter={this.state.filterType}/>
          </div>
      </div>
    )
  }
}

export default Protected;
