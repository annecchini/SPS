import React from "react";

import { Grid, Row, Col } from "react-bootstrap";

import { FormGroup, ControlLabel, FormControl, Form } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import DummyApi from "../../../variables/DummyApi.jsx";
import RegexHelpers from "../../../helpers/RegexHelpers.jsx";
import { testaCPF } from "helpers/CpfHelpers.jsx";

//Imports para colocar o datetime em pt-br
import moment from "moment";
import "moment/locale/pt-br";
moment.locale("pt-br");

class UserCreate extends React.Component {
  constructor(props) {
    super(props);
    this.vForm = this.refs.vForm;
    this.state = {
      // Create user
      createUser_login: "",
      createUser_password: "",
      createUser_firstName: "",
      createUser_lastName: "",
      createUser_cpf: "",
      // Create user error messages
      createUser_loginError: null,
      createUser_passwordError: null,
      createUser_firstNameError: null,
      createUser_lastNameError: null,
      createUser_cpfError: null,
      // Create user form error
      createUser_formError: null
    };
  }

  handleUserLogin(event) {
    //Atualiza valor
    this.setState({
      createUser_login: event.target.value,
      createUser_loginError: null
    });

    //validação email
    var emailRex = RegexHelpers.emailRegex();
    if (emailRex.test(event.target.value) === false) {
      this.setState({
        createUser_loginError: (
          <small className="text-danger">Formato de email válido.</small>
        )
      });
    }

    //validação campo requerido.
    if (event.target.value === "") {
      this.setState({
        createUser_loginError: (
          <small className="text-danger">Campo requerido</small>
        )
      });
    }
  }

  handlePassword(event) {
    //Atualiza valor
    this.setState({
      createUser_password: event.target.value,
      createUser_passwordError: null
    });

    //validação tamanho da senha.
    if (event.target.value.length < 6) {
      this.setState({
        createUser_passwordError: (
          <small className="text-danger">
            A senha deve conter ao menos 6 caracteres.
          </small>
        )
      });
    }

    //validação campo requerido.
    if (event.target.value === "") {
      this.setState({
        createUser_passwordError: (
          <small className="text-danger">Campo requerido</small>
        )
      });
    }
  }

  handleFirstName(event) {
    //Atualiza valor
    this.setState({
      createUser_firstName: event.target.value,
      createUser_firstNameError: null
    });

    //validação campo requerido.
    if (event.target.value === "") {
      this.setState({
        createUser_firstNameError: (
          <small className="text-danger">Campo requerido</small>
        )
      });
    }
  }

  handleLastName(event) {
    //Atualiza valor
    this.setState({
      register_lastName: event.target.value,
      createUser_lastNameError: null
    });

    //validação campo requerido.
    if (event.target.value === "") {
      this.setState({
        createUser_lastNameError: (
          <small className="text-danger">Campo requerido.</small>
        )
      });
    }
  }

  handleCpf(event) {
    //Atualiza valor
    this.setState({
      createUser_cpf: event.target.value,
      createUser_cpfError: null
    });

    //validação do cpf
    var cpfRex = RegexHelpers.cpfRegex();
    if (cpfRex.test(event.target.value) === false) {
      this.setState({
        createUser_cpfError: (
          <small className="text-danger">
            Formato de cpf inválido (000.000.000-00).
          </small>
        )
      });
    } else {
      let cpfString = event.target.value;
      cpfString = cpfString.replace(/[^\d]+/g, "");
      if (!testaCPF(cpfString)) {
        this.setState({
          createUser_cpfError: (
            <small className="text-danger">CPF inválido.</small>
          )
        });
      }
    }

    //validação campo requerido.
    if (event.target.value === "") {
      this.setState({
        createUser_cpfError: (
          <small className="text-danger">Campo requerido.</small>
        )
      });
    }
  }

  removeAlert() {
    this.setState({
      createUser_formError: null
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let newUser = {};
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
              title="Novo usuário"
              tableFullWidth
              content={
                <span>
                  <Form horizontal>
                    {this.state.createUser_formError}

                    <FormGroup>
                      <ControlLabel className="col-md-3">
                        Login/Email: <span className="star">*</span>
                      </ControlLabel>
                      <Col md={8}>
                        <FormControl
                          placeholder="Login do usuário"
                          type="text"
                          name="createUser_login"
                          onChange={event => this.handleUserLogin(event)}
                        />
                        {this.state.createUser_loginError}
                      </Col>
                    </FormGroup>

                    <FormGroup>
                      <ControlLabel className="col-md-3">
                        Senha: <span className="star">*</span>
                      </ControlLabel>
                      <Col md={8}>
                        <FormControl
                          placeholder="Senha"
                          type="password"
                          name="createUser_password"
                          onChange={event => this.handlePassword(event)}
                        />
                        {this.state.createUser_passwordError}
                      </Col>
                    </FormGroup>

                    <FormGroup>
                      <ControlLabel className="col-md-3">
                        Nome: <span className="star">*</span>
                      </ControlLabel>
                      <Col md={8}>
                        <FormControl
                          placeholder="Nome"
                          type="text"
                          name="createUser_firstName"
                          onChange={event => this.handleFirstName(event)}
                        />
                        {this.state.createUser_firstNameError}
                      </Col>
                    </FormGroup>

                    <FormGroup>
                      <ControlLabel className="col-md-3">
                        Sobrenome: <span className="star">*</span>
                      </ControlLabel>
                      <Col md={8}>
                        <FormControl
                          placeholder="Sobrenome"
                          type="text"
                          name="createUser_lastName"
                          onChange={event => this.handleLastName(event)}
                        />
                        {this.state.createUser_lastNameError}
                      </Col>
                    </FormGroup>

                    <FormGroup>
                      <ControlLabel className="col-md-3">
                        C.P.F: <span className="star">*</span>
                      </ControlLabel>
                      <Col md={8}>
                        <FormControl
                          placeholder="C.P.F."
                          type="text"
                          name="createUser_cpf"
                          onChange={event => this.handleCpf(event)}
                        />
                        {this.state.createUser_cpfError}
                      </Col>
                    </FormGroup>

                    <FormGroup>
                      <Col md={8} mdOffset={3}>
                        <Button
                          bsStyle="info"
                          fill
                          onClick={event => this.handleSubmit(event)}
                        >
                          Criar novo usuário
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

export default UserCreate;
