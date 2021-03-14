import React, { Component } from "react";
import axios from 'axios';

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
    // delete from backend then update ux
    axios({
      method: 'delete',
      url: `http://localhost:8000/boards/cards/delete/${id}`
    }).then(response => {
      this.setState( prevState => {
        return {
          boardList: prevState.boardList.filter( l => l.id !== id )
        }
      })
    }) 

    
  }
  saveCard = (cardId, newText) => {
    // update backend, then ui
    var bodyFormData = new FormData();
    bodyFormData.append('description', newText);
    axios({
      method: 'post',
      url: `http://localhost:8000/boards/cards/update/${cardId}`,
      data: bodyFormData
    })
    .then(response => {
      this.setState(prevState => {
        return {
          boardList: prevState.boardList.map( l => {
            if (l.id === cardId) {
              l.title = newText;
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
            deleteCallback={this.deleteCard} 
            saveCallback={this.saveCard} />
        
      </li>
    ));
  };
  addCard = () => {
    var bodyFormData = new FormData();
    bodyFormData.append('title', "");
    bodyFormData.append('description', "");
    const boardId = this.props.match.params.id;
    axios({
      method: 'post',
      url: `http://localhost:8000/boards/${boardId}/cards/add`,
      data: bodyFormData
    })
    .then(response => {
      this.setState(prevState => {
        return {
          boardList: [
            ...prevState.boardList,
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