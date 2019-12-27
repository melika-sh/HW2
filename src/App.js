import React, { Component } from "react";
import DynamicForm from "./components/DynamicForm";
import "./App.css";
import {matchRoutes} from 'react-router-config'

class App extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.props = props;
    console.log(props);
  }
  onSubmit = model => {

  };
  componentDidMount(){
        console.log(this.props.match.params.id); // i can access the id here
    } 
  render() {
    return (
      <div className="App">
        <DynamicForm 
          src="http://localhost:3000/api/forms/"
          id="1"
          className="form"
          onSubmit={model => { this.onSubmit(model); }}
        />
      </div>
    );
  }
}

export default App;
