import React from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { FormGroup, ControlLabel, FormControl, Form } from "react-bootstrap";
import MaskedFormControl from "react-bootstrap-maskedinput";

import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

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
    let login = this.state.createUser_login;
    if (event) {
      this.setState({
        createUser_login: event.target.value,
        createUser_loginError: null
      });
      login = event.target.value;
    }

    //validação email
    var emailRex = RegexHelpers.emailRegex();
    if (emailRex.test(login) === false) {
      this.setState({
        createUser_loginError: (
          <small className="text-danger">Formato de email válido.</small>
        )
      });
    }

    //validação campo requerido.
    if (login === "") {
      this.setState({
        createUser_loginError: (
          <small className="text-danger">Campo requerido</small>
        )
      });
    }
  }

  handlePassword(event) {
    //Atualiza valor
    let password = this.state.createUser_password;
    if (event) {
      this.setState({
        createUser_password: event.target.value,
        createUser_passwordError: null
      });
      password = event.target.value;
    }

    //validação tamanho da senha.
    if (password < 6) {
      this.setState({
        createUser_passwordError: (
          <small className="text-danger">
            A senha deve conter ao menos 6 caracteres.
          </small>
        )
      });
    }

    //validação campo requerido.
    if (password === "") {
      this.setState({
        createUser_passwordError: (
          <small className="text-danger">Campo requerido</small>
        )
      });
    }
  }

  handleFirstName(event) {
    //Atualiza valor
    let firstName = this.state.createUser_firstName;
    if (event) {
      this.setState({
        createUser_firstName: event.target.value,
        createUser_firstNameError: null
      });
      firstName = event.target.value;
    }

    //validação campo requerido.
    if (firstName === "") {
      this.setState({
        createUser_firstNameError: (
          <small className="text-danger">Campo requerido</small>
        )
      });
    }
  }

  handleLastName(event) {
    //Atualiza valor
    let lastName = this.state.createUser_lastName;
    if (event) {
      this.setState({
        createUser_lastName: event.target.value,
        createUser_lastNameError: null
      });
      lastName = event.target.value;
    }

    //validação campo requerido.
    if (lastName === "") {
      this.setState({
        createUser_lastNameError: (
          <small className="text-danger">Campo requerido.</small>
        )
      });
    }
  }

  handleCpf(event) {
    //Atualiza valor
    let cpf = this.state.createUser_cpf;
    if (event) {
      this.setState({
        createUser_cpf: event.target.value,
        createUser_cpfError: null
      });
      cpf = event.target.value;
    }

    //validação do cpf
    var cpfRex = RegexHelpers.cpfRegex();
    if (cpfRex.test(cpf) === false) {
      this.setState({
        createUser_cpfError: (
          <small className="text-danger">
            Formato de cpf inválido (000.000.000-00).
          </small>
        )
      });
    } else {
      let cpfString = cpf;
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
    if (cpf === "") {
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

    this.handleUserLogin();
    this.handlePassword();
    this.handleFirstName();
    this.handleLastName();
    this.handleCpf();

    let readyToPost = true;

    if (
      this.state.createUser_firstName === "" ||
      this.state.createUser_lastName === "" ||
      this.state.createUser_cpf === "" ||
      this.state.createUser_email === "" ||
      this.state.createUser_password === "" ||
      (this.state.createUser_firstNameError !== null ||
        this.state.createUser_lastNameError !== null ||
        this.state.createUser_cpfError !== null ||
        this.state.createUser_emailError !== null ||
        this.state.createUser_passwordError !== null)
    ) {
      readyToPost = false;
      this.setState({
        createUser_formError: (
          <FormGroup>
            <Col md={8} mdOffset={3}>
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

    if (readyToPost) {
      let newUser = {
        login: this.state.createUser_login,
        passowrd: this.state.createUser_password,
        name: this.state.createUser_firstName,
        lastname: this.state.createUser_lastName,
        cpf: this.state.createUser_cpf
      };

      console.log(newUser);
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
                        <MaskedFormControl
                          placeholder="C.P.F."
                          type="text"
                          name="createUser_cpf"
                          onChange={event => this.handleCpf(event)}
                          mask="111.111.111-11"
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
