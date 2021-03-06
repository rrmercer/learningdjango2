import React, { Component } from "react";

import CardName from "./CardName";
import CardActions from "./CardActions";


class BoardIndex extends Component {
  state = {
    viewCompleted: false,
    boardList: []
  };
  componentDidMount() {
    const boardId = this.props.match.params.id;
    fetch(`http://localhost:8000/boards/${boardId}`)
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
        >
          Complete
        </span>
        <span
          onClick={() => this.displayCompleted(false)}
        >
          Incomplete
        </span>
      </div>
    );
  };
  deleteCard = (id) => {
    this.setState( prevState => {
      return {
        boardList: prevState.boardList.filter( l => l.id !== id )
        // TODO: remove from backend as well
      }
    })
  }
  editCardName = (id) => {
    this.setState( prevState => {
      return {
        boardList: prevState.boardList.map( l => {
          if (l.id === id) {
            l.editEnabled = !l.editEnabled;
            return l;
          } 
          return l;
        })
      }
    })
  }
   
  setCardName = (id, newValue) => {
    this.setState( prevState => {
      return {
        boardList: prevState.boardList.map( l => {
          if (l.id === id) {
            l.description = newValue;
            return l;
          } 
          return l;
        })
      }
    })
  }
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
          <CardName item={item}
            setCardNameCallback={this.setCardName} />
          <CardActions item={item}
            editCallback={this.editCardName}
            deleteCallback={this.deleteCard} />
        
      </li>
    ));
  };
  addCard = () => {
    this.setState(prevState => {
      return {
        boardList: [
          ...prevState.boardList,
          {
            id: prevState.boardList.length + 1, 
            description: "", 
            title: "",
            editEnabled: true
          }
        ]
      }
    });
  };
  render() {
    
    return (
      <main className="content">
        <div className="row ">
         <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="container">
                <button className="btn btn-primary" onClick={() => this.addCard()}>Add a card</button>
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