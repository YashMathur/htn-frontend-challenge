import React from "react";

import FormContext from "../../contexts/FormContext";
import { Link } from "react-router-dom";

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
        <h1>{set.label}</h1>
        <span>{this.fetchCompletion(set)}% complete</span>
        <Link to={`/sets/${i}`}>Go</Link>
      </div>
    ));
  };

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        {this.context ? this.renderQuestionSets() : "Loading..."}
      </div>
    );
  }
}
