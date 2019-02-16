import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Nav,
  NavItem,
  Row,
  Col
} from "reactstrap";

import FormContext from "../../contexts/FormContext";

export default class QuestionSet extends React.Component {
  static contextType = FormContext;

  constructor(props) {
    super(props);

    this.state = {};
  }

  navLink = () => {
    const currentItem = this.props["match"].params.id;

    return this.context.newData.map((set, i) => {
      return (
        <NavItem>
          {i == currentItem ? "> " : ""}
          <Link to={`/sets/${i}`}>{set.label}</Link>
        </NavItem>
      );
    });
  };

  createInput = (question, index: number) => {
    if (question.type === "text") {
      return (
        <Input
          id={question.id}
          type="text"
          defaultValue={question.answer}
          placeholder={question.placeholder}
          onChange={this.updateAnswer}
          data-ques={index}
        />
      );
    } else if (question.type === "select") {
      return (
        <Input
          type="select"
          onChange={this.updateAnswer}
          data-ques={index}
          id={question.id}
        >
          {question.options.map(opt => {
            return (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            );
          })}
        </Input>
      );
    } else {
      return (
        <Input
          type="textarea"
          id={question.id}
          placeholder={question.placeholder}
          defaultValue={question.answer}
          onChange={this.updateAnswer}
          data-ques={index}
        />
      );
    }
  };

  createForm = () => {
    const set = this.context.newData[this.props["match"].params.id];
    let form = set.questions.map((question, i) => {
      return (
        <FormGroup key={question.id}>
          <Label for={question.id}>{question.label}</Label>
          {this.createInput(question, i)}
        </FormGroup>
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
      <Container>
        <Row>
          <Col xs="3" style={{ position: "fixed" }}>
            <h1>Navigation</h1>
            <Nav vertical>{this.context ? this.navLink() : null}</Nav>
          </Col>
          <Col style={{ marginLeft: "25%" }}>
            <Form class="row justify-content-md-right">
              <h1>
                {this.context
                  ? this.context.newData[this.props["match"].params.id].label
                  : "Loading..."}
              </h1>
              {this.context ? this.createForm() : null}
              <FormGroup>
                <Link to="/">Back</Link>
                <Button
                  onClick={this.saveAnswers}
                  type="button"
                  className="float-right"
                >
                  Save!
                </Button>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
