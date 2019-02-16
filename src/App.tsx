import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import FormContext from "./contexts/FormContext";
import Dashboard from "./sections/Dashboard";
import QuestionSet from "./sections/QuestionSet";

class App extends Component {
  FETCH_URL: string = "https://hackthenorth.com/fe-questions.json";

  constructor(props) {
    super(props);

    window.onbeforeunload = event => {
      event.preventDefault();
      event.returnValue = "";
    };
  }

  saveFormInContext(formData: any) {
    const newData = formData;

    formData.forEach((questionSet: any, i: number) => {
      questionSet.questions.forEach((_question: any, j: number) => {
        formData[i].questions[j].answer = "";
      });
    });

    this.setState({ newData, updateAnswer: this.updateAnswer });
  }

  componentDidMount() {
    fetch(this.FETCH_URL)
      .then(res => res.json())
      .then(res => {
        this.saveFormInContext(res);
      });
  }

  updateAnswer = (set, questionId, answer) => {
    this.state["newData"][set].questions[questionId].answer = answer;
  };

  render() {
    return (
      <div className="App">
        <FormContext.Provider value={this.state}>
          <Router>
            <div>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/sets/:id" component={QuestionSet} />
            </div>
          </Router>
        </FormContext.Provider>
      </div>
    );
  }
}

export default App;
