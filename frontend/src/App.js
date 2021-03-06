import React, { Component } from "react";
import {Link} from "react-router-dom";


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

  displayCompleted = status => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };
  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}
        >
          complete
        </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}
        >
          Incomplete
        </span>
      </div>
    );
  };
  deleteBoard = (id) => {
    this.setState( prevState => {
      return {
        todoList: prevState.todoList.filter( l => l.id !== id )
        // TODO: remove from backend as well
      }
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

  setBoardName = (id, newTitle) => {
    this.setState( prevState => {
      return {
        todoList: prevState.todoList.map( l => {
          if (l.id === id) {
            l.title = newTitle;
            return l;
          } 
          return l;
        })
      }
    })
  }

  displayBoardItemName = (item) => {
      if (item.editEnabled) {
        return (
        <input type="text" 
          defaultValue={item.title} 
          onChange={e => this.setBoardName(item.id, e.target.value)}
          />
        );
      } else {
        return (
        <span
          className={`todo-title mr-2 ${
            this.state.viewCompleted ? "completed-todo" : ""
          }`}
          title={item.description}
        >
        <Link to={`/board/${item.id}`}>{item.title}</Link>
        </span>
        );
      }
  }
  displayBoardItemActions = (item) => {
    if (item.editEnabled) {
      return (
        <span>  
          <button className="btn btn-secondary mr-2" onClick={() => this.editBoardName(item.id)}> Save </button>
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
    this.setState(prevState => {
      return {
        todoList: [
          ...prevState.todoList,
          {
            id: prevState.todoList.length+1, 
            description: "", 
            title: ""
          }
        ]
      }
    });
  };
  renderItems = () => {
    //const { viewCompleted } = this.state;

    const newItems = this.state.todoList;
//    const newItems = this.state.todoList.filter(
//      item => item.completed == viewCompleted
//    );
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

        <div className="row ">

         <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button className="btn btn-primary" onClick={() => this.addBoard()}>Add a board</button>
              </div>

              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
export default App;