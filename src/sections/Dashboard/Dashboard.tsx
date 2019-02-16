import React from "react";
import { Link } from "react-router-dom";
import { Progress } from "reactstrap";

import FormContext from "../../contexts/FormContext";

export default class Dashboard extends React.Component {
  static contextType = FormContext;

  fetchCompletion = set => {
    const questions = set.questions;
    const completed = questions.filter(q => q.answer != "");

    return Math.round((completed.length * 100) / questions.length);
  };

  renderQuestionSets = () => {
    return this.context.newData.map((set, i) => (
      <div key={set.id}>
        <span>{set.label}</span>
        <Progress value={this.fetchCompletion(set)} style={{ width: 150 }} />
        <span>{this.fetchCompletion(set)}% complete</span>
        <Link to={`/sets/${i}`}>go</Link>
      </div>
    ));
  };

  render() {
    return (
      <div className="container">
        <h1>Dashboard</h1>
        {this.context ? this.renderQuestionSets() : "Loading..."}
      </div>
    );
  }
}
