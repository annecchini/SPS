import React from "react";

import { Grid, Row, Col } from "react-bootstrap";

import { FormGroup, ControlLabel, FormControl, Form } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import Datetime from "react-datetime";
// react component that creates a switch button that changes from on to off mode

import DummyApi from "../../../variables/DummyApi.jsx";
import RegexHelpers from "../../../helpers/RegexHelpers.jsx";
import FormatHelpers from "../../../helpers/FormatHelpers.jsx";

//Imports para colocar o datetime em pt-br
import moment from "moment";
import "moment/locale/pt-br";
moment.locale("pt-br");

class UserUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.vForm = this.refs.vForm;
    this.state = {
      // Create user
      updateUser_number: "",
      updateUser_year: "",
      updateUser_end: "",
      updateUser_description: "",
      // Create user error messages
      updateUser_numberError: null,
      updateUser_yearError: null,
      updateUser_endError: null,
      // Create user form error
      updateUser_formError: ""
    };
  }

  componentDidMount() {
    this.setState({
      updateUser_number: FormatHelpers.processNumber(this.props.user.number),
      updateUser_year: this.props.user.year,
      updateUser_end: this.props.user.end,
      updateUser_description: this.props.user.description
    });
  }

  handleUserNumber(event) {
    //Atualiza valor
    this.setState({
      updateUser_number: event.target.value
    });

    //Valida ser for numero
    var digitRex = RegexHelpers.numberRegex();
    digitRex.test(event.target.value) === false
      ? this.setState({
          updateUser_numberError: (
            <small className="text-danger">Você deve fornecer um número.</small>
          )
        })
      : this.setState({ updateUser_numberError: null });
  }

  handleUserYear(event) {
    //Atualiza valor
    this.setState({
      updateUser_year: event.target.value
    });

    //Valida ser for ano
    var digitRex = RegexHelpers.yearRegex();
    digitRex.test(event.target.value) === false
      ? this.setState({
          updateUser_yearError: (
            <small className="text-danger">
              Você deve digitar o ano no formato AAAA.
            </small>
          )
        })
      : this.setState({ updateUser_yearError: null });
  }

  handleUserEnd(date) {
    //Atualiza valor
    this.setState({
      updateUser_end: date
    });

    //verifica formato DD/MM/AAAA
    if (typeof date === "string") {
      var brDateRex = RegexHelpers.brDateRegex();
      brDateRex.test(date) === false
        ? this.setState({
            updateUser_endError: (
              <small className="text-danger">
                Você deve digitar a data no formato DD/MM/AAAA.
              </small>
            )
          })
        : this.setState({ updateUser_endError: null });
    } else {
      this.setState({ updateUser_endError: null });
    }
  }

  handleUserDescription(event) {
    //Atualiza valor
    this.setState({
      updateUser_description: event.target.value
    });
  }

  removeAlert() {
    this.setState({
      createUser_formError: null
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    let readyToPost = true;

    //conferindo se não existem erros em campos / Se existem campos obrigatórios vazios.
    if (
      this.state.updateUser_numberError !== null ||
      this.state.updateUser_yearError !== null ||
      this.state.updateUser_endError !== null ||
      (this.state.updateUser_number === "" ||
        this.state.updateUser_year === "" ||
        this.state.updateUser_end === "")
    ) {
      readyToPost = false;
      this.setState({
        createUser_formError: (
          <FormGroup>
            <ControlLabel className="col-md-3" />
            <Col md={8}>
              <div
                className="alert alert-danger"
                role="alert"
                onClick={event => this.removeAlert(event)}
              >
                <button type="button" className="close" aria-label="Close">
                  &times;
                </button>
                Existem campos requeridos vazios ou com erro.
              </div>
            </Col>
          </FormGroup>
        )
      });
    }

    const updatedUser = {
      id: this.props.user.id,
      number: this.state.updateUser_number,
      year: this.state.updateUser_year,
      end: this.state.updateUser_end._d,
      description: this.state.updateUser_description
    };

    //Tentar enviar para o servidor.
    if (readyToPost) {
      let result = null;

      try {
        result = DummyApi.putData("user-update", updatedUser);
      } catch (exception) {
        alert("Falha na comunicação com o servidor");
      }

      if (result.ok === true) {
        this.props.changeMode("user-list");
      } else {
        this.setState({
          createUser_formError: (
            <FormGroup>
              <ControlLabel className="col-md-3" />
              <Col md={8}>
                <div
                  className="alert alert-danger"
                  role="alert"
                  onClick={event => this.removeAlert(event)}
                >
                  <button type="button" className="close" aria-label="Close">
                    &times;
                  </button>
                  {result.message.userMessage}
                </div>
              </Col>
            </FormGroup>
          )
        });
      }
    }
  }

  handleCancel(event) {
    event.preventDefault();
    this.props.changeMode("user-list");
  }

  render() {
    return (
      <div className="main-content">
        <Grid fluid>
          <Row>
            <Card
              title="Atualizar usuário"
              tableFullWidth
              content={
                <span>
                  <Form horizontal>
                    {this.state.createUser_formError}

                    <FormGroup>
                      <ControlLabel className="col-md-3">
                        Número: <span className="star">*</span>
                      </ControlLabel>
                      <Col md={8}>
                        <FormControl
                          placeholder="000"
                          type="text"
                          name="updateUser_number"
                          value={this.state.updateUser_number}
                          onChange={event => this.handleUserNumber(event)}
                        />
                        {this.state.updateUser_numberError}
                      </Col>
                    </FormGroup>

                    <FormGroup>
                      <ControlLabel className="col-md-3">
                        Ano: <span className="star">*</span>
                      </ControlLabel>
                      <Col md={8}>
                        <FormControl
                          placeholder="AAAA"
                          type="text"
                          name="updateUser_year"
                          value={this.state.updateUser_year}
                          onChange={event => this.handleUserYear(event)}
                        />
                        {this.state.updateUser_yearError}
                      </Col>
                    </FormGroup>

                    <FormGroup>
                      <ControlLabel className="col-md-3">
                        Fim do usuário: <span className="star">*</span>
                      </ControlLabel>
                      <Col md={8}>
                        <Datetime
                          locale="pt-br"
                          defaultValue={FormatHelpers.brDate(
                            this.props.user.end
                          )}
                          onChange={date => this.handleUserEnd(date)}
                          dateFormat="DD/MM/YYYY"
                          timeFormat={false}
                          inputProps={{
                            placeholder: "DD/MM/AAAA"
                          }}
                        />
                        {this.state.updateUser_endError}
                      </Col>
                    </FormGroup>

                    <FormGroup>
                      <ControlLabel className="col-md-3">
                        Descrição:
                      </ControlLabel>
                      <Col md={8}>
                        <FormControl
                          value={this.state.updateUser_description}
                          onChange={event => this.handleUserDescription(event)}
                          componentClass="textarea"
                          placeholder="Escrever mais detalhes sobre o edital..."
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup>
                      <Col md={8} mdOffset={3}>
                        <Button
                          bsStyle="info"
                          fill
                          onClick={event => this.handleSubmit(event)}
                        >
                          Atualizar usuário
                        </Button>{" "}
                        <Button
                          bsStyle="info"
                          fill
                          onClick={event => this.handleCancel(event)}
                        >
                          Cancelar
                        </Button>
                      </Col>
                    </FormGroup>
                  </Form>
                </span>
              }
            />
          </Row>
        </Grid>
      </div>
    );
  }
}

export default UserUpdate;
