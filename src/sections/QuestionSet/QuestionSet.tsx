import React from "react";

import FormContext from "../../contexts/FormContext";
import { Link } from "react-router-dom";

export default class QuestionSet extends React.Component {
  static contextType = FormContext;

  constructor(props) {
    super(props);

    this.state = {};
  }

  createInput = (question, i) => {
    if (question.type === "text") {
      return (
        <input
          type="text"
          defaultValue={question.answer}
          placeholder={question.placeholder}
          onChange={this.updateAnswer}
          data-ques={i}
        />
      );
    } else if (question.type === "select") {
      return (
        <select onChange={this.updateAnswer} data-ques={i}>
          {question.options.map(opt => {
            return (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            );
          })}
        </select>
      );
    } else {
      return (
        <textarea
          placeholder={question.placeholder}
          defaultValue={question.answer}
          onChange={this.updateAnswer}
          data-ques={i}
        />
      );
    }
  };

  createForm = () => {
    const set = this.context.newData[this.props["match"].params.id];
    let form = set.questions.map((question, i) => {
      return (
        <div key={question.id}>
          <span>{question.label}</span>
          {this.createInput(question, i)}
        </div>
      );
    });

    return form;
  };

  updateAnswer = el => {
    const question = el.target.dataset.ques;
    const answer = el.target.value;

    this.setState({
      ...this.state,
      [question]: answer
    });
  };

  saveAnswers = () => {
    Object.keys(this.state).forEach(k => {
      this.context.updateAnswer(
        this.props["match"].params.id,
        k,
        this.state[k]
      );
    });
  };

  render() {
    return (
      <div>
        <h1>
          {this.context
            ? this.context.newData[this.props["match"].params.id].label
            : "Loading..."}
        </h1>
        {this.context ? this.createForm() : null}
        <button onClick={this.saveAnswers}>Save!</button>
        <Link to="/">Back</Link>
      </div>
    );
  }
}
