import React, { Component } from "react";
import {Link} from "react-router-dom";
import axios from 'axios';

import './App.css';   

class App extends Component {
  state = {
    viewCompleted: false,
    todoList: []
  };

  componentDidMount() {
    fetch('http://localhost:8000/boards/')
      .then(response => response.json())
      .then(result => {
        this.setState({
          viewCompleted: false,
          todoList: result
        });
      })
  }
  deleteBoard = (id) => {
    // delete from backend then update ux
    axios({
      method: 'delete',
      url: `http://localhost:8000/boards/delete/${id}`
    }).then(response => {
      this.setState( prevState => {
        return {
          todoList: prevState.todoList.filter( l => l.id !== id )
        }
      })
    }) 
  }
  editBoardName = (id) => {
    this.setState( prevState => {
      return {
        todoList: prevState.todoList.map( l => {
          if (l.id === id) {
            l.editEnabled = !l.editEnabled;
            return l;
          } 
          return l;
        })
      }
    })
  }

  saveBoardName = (id, newTitle) => {
    // update backend, then ui
    var bodyFormData = new FormData();
    bodyFormData.append('title', newTitle);
    //bodyFormData.append('description', "");
    axios({
      method: 'post',
      url: `http://localhost:8000/boards/update/${id}`,
      data: bodyFormData
    })
    .then(response => {
      this.setState(prevState => {
        return {
          todoList: prevState.todoList.map( l => {
            if (l.id === id) {
              l.title = newTitle;
              return l;
            } 
            return l;
          })
        }
      });
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }

  displayBoardItemName = (item) => {
      if (item.editEnabled) {
        return (
          <span className="txtBoard">
            <input type="text" 
              className="form-control"
              defaultValue={item.title} 
              onChange={ e => {
                this.setState(prevState => {
                    return {
                      todoList: prevState.todoList.map( l => {
                        if (l.id === item.id) {
                          l.title = e.target.value;
                          return l;
                        } 
                        return l;
                      })
                    }
                })
              }}
              />
          </span>
        );
      } else {
        return (
        <span
          className={`todo-title mr-2 ${
            this.state.viewCompleted ? "completed-todo" : ""
          }`}
          title={item.description}
        >
        <Link to={`/boards/${item.id}`}>{item.title}</Link>
        </span>
        );
      }
  }
  displayBoardItemActions = (item) => {
    if (item.editEnabled) {
      return (
        <span>  
          <button className="btn btn-secondary mr-2" onClick={() => {
            this.editBoardName(item.id);
            this.saveBoardName(item.id, item.title);
          }}> Save </button>
          <button className="btn btn-danger" onClick={() => this.deleteBoard(item.id)}>Delete </button>
        </span>
      );
    } else {
      return (
        <span>  
          <button className="btn btn-secondary mr-2" onClick={() => this.editBoardName(item.id)}> Edit </button>
          <button className="btn btn-danger" onClick={() => this.deleteBoard(item.id)}>Delete </button>
        </span>
      );
    }
  }
  addBoard = () => {
    var bodyFormData = new FormData();
    bodyFormData.append('title', "");
    bodyFormData.append('description', "");
    axios({
      method: 'post',
      url: 'http://localhost:8000/boards/add',
      data: bodyFormData
    })
    .then(response => {
      this.setState(prevState => {
        return {
          todoList: [
            ...prevState.todoList,
            {
              id: response.data.id, 
              description: "", 
              title: "",
              editEnabled: true
            }
          ]
        }
      });
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  };
  renderItems = () => {
    const newItems = this.state.todoList;
    return newItems.map(item => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center">
        {this.displayBoardItemName(item)} {/* TODO: these should be components */}
        {this.displayBoardItemActions(item)}
        
      </li>
    ));
  };
  render() {
    return (
      <main className="content">
         <div className="col-md-8 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="card-body">
                <h5 className="card-title">Boards</h5>
                <ul className="list-group list-group-flush">
                  {this.renderItems()}
                </ul>
              
                <div className="row gx-5">
                  <button className="btn btn-primary" onClick={() => this.addBoard()}>Add a board</button>
                </div>
              </div>
            </div>
          </div>
      </main>
    );
  }
}
export default App;