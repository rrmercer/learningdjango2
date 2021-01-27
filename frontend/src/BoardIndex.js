import React, { Component } from "react";
import {Link} from "react-router-dom";


class BoardIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
          viewCompleted: false,
          boardList: []
        };
    fetch('http://localhost:8000/boards/1')
      .then(response => response.json())
      .then(result => {
        this.setState({
          viewCompleted: false,
          boardList: result
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
          Complete
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
  renderItems = () => {
    //const { viewCompleted } = this.state;

    const newItems = this.state.boardList;
//    const newItems = this.state.todoList.filter(
//      item => item.completed == viewCompleted
//    );
    return newItems.map(item => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewCompleted ? "completed-todo" : ""
          }`}
          title={item.description}
        >
          <Link to={`/cards/${item.id}`}>{item.description}</Link>
          
        </span>
        <span>
          <button className="btn btn-secondary mr-2"> Edit </button>
          <button className="btn btn-danger">Delete </button>
        </span>
      </li>
    ));
  };
  render() {
    return (
      <main className="content">
        <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
        <div className="row ">

         <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
              <Link to="/board/add">
                <button className="btn btn-primary">Add a card</button>
                </Link>
              </div>
              {this.renderTabList()}
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
export default BoardIndex;