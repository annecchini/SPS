import React from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Form
} from "react-bootstrap";
import MaskedFormControl from "react-bootstrap-maskedinput";

import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import RegexHelpers from "../../../helpers/RegexHelpers.jsx";
import { testaCPF } from "helpers/CpfHelpers.jsx";

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
      login: this.props.user.login,
      password: "",
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      cpf: this.props.user.cpf,
      // Create user error messages
      loginError: null,
      passwordError: null,
      firstNameError: null,
      lastNameError: null,
      cpfError: null,
      // Create user form error
      formError: null
    };
  }

  handleUserLogin(event) {
    //Atualiza valor
    let login = this.state.login;
    if (event) {
      this.setState({
        login: event.target.value,
        loginError: null
      });
      login = event.target.value;
    }

    //validação email
    var emailRex = RegexHelpers.emailRegex();
    if (emailRex.test(login) === false) {
      this.setState({
        loginError: (
          <small className="text-danger">Formato de email válido.</small>
        )
      });
    }

    //validação campo requerido.
    if (login === "") {
      this.setState({
        loginError: <small className="text-danger">Campo requerido</small>
      });
    }
  }

  handlePassword(event) {
    //Atualiza valor
    let password = this.state.password;
    if (event) {
      this.setState({
        password: event.target.value,
        passwordError: null
      });
      password = event.target.value;
    }

    //validação tamanho da senha.
    if (password !== "" && password.length < 6) {
      this.setState({
        passwordError: (
          <small className="text-danger">
            A senha deve conter ao menos 6 caracteres.
          </small>
        )
      });
    }
  }

  handleFirstName(event) {
    //Atualiza valor
    let firstName = this.state.firstName;
    if (event) {
      this.setState({
        firstName: event.target.value,
        firstNameError: null
      });
      firstName = event.target.value;
    }

    //validação campo requerido.
    if (firstName === "") {
      this.setState({
        firstNameError: <small className="text-danger">Campo requerido</small>
      });
    }
  }

  handleLastName(event) {
    //Atualiza valor
    let lastName = this.state.lastName;
    if (event) {
      this.setState({
        lastName: event.target.value,
        lastNameError: null
      });
      lastName = event.target.value;
    }

    //validação campo requerido.
    if (lastName === "") {
      this.setState({
        lastNameError: <small className="text-danger">Campo requerido.</small>
      });
    }
  }

  handleCpf(event) {
    //Atualiza valor
    let cpf = this.state.cpf;
    if (event) {
      this.setState({
        cpf: event.target.value,
        cpfError: null
      });
      cpf = event.target.value;
    }

    //validação do cpf
    var cpfRex = RegexHelpers.cpfRegex();
    if (cpfRex.test(cpf) === false) {
      this.setState({
        cpfError: (
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
          cpfError: <small className="text-danger">CPF inválido.</small>
        });
      }
    }

    //validação campo requerido.
    if (cpf === "") {
      this.setState({
        cpfError: <small className="text-danger">Campo requerido.</small>
      });
    }
  }

  removeAlert() {
    this.setState({
      formError: null
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
      this.state.firstName === "" ||
      this.state.lastName === "" ||
      this.state.cpf === "" ||
      this.state.login === "" ||
      (this.state.firstNameError !== null ||
        this.state.lastNameError !== null ||
        this.state.cpfError !== null ||
        this.state.loginError !== null ||
        this.state.passwordError !== null)
    ) {
      readyToPost = false;
      this.setState({
        formError: (
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
      let updatedUser = {
        login: this.state.login,
        name: this.state.firstName,
        lastname: this.state.lastName,
        cpf: this.state.cpf
      };

      if (this.state.password !== "")
        updatedUser.password = this.state.password;

      console.log(updatedUser);
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
                    {this.state.formError}

                    <FormGroup>
                      <ControlLabel className="col-md-3">
                        Login/Email: <span className="star">*</span>
                      </ControlLabel>
                      <Col md={8}>
                        <FormControl
                          placeholder="Login do usuário"
                          type="text"
                          name="login"
                          value={this.state.login}
                          onChange={event => this.handleUserLogin(event)}
                        />
                        {this.state.loginError}
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
                          name="password"
                          value={this.state.password}
                          onChange={event => this.handlePassword(event)}
                        />
                        {this.state.passwordError}
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
                          name="firstName"
                          value={this.state.firstName}
                          onChange={event => this.handleFirstName(event)}
                        />
                        {this.state.firstNameError}
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
                          name="lastName"
                          value={this.state.lastName}
                          onChange={event => this.handleLastName(event)}
                        />
                        {this.state.lastNameError}
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
                          name="cpf"
                          value={this.state.cpf}
                          onChange={event => this.handleCpf(event)}
                          mask="111.111.111-11"
                        />
                        {this.state.cpfError}
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
