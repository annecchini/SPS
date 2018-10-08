import React, { Component } from "react";
import { Grid, Row, Col, Media, FormControl, FormGroup } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import MaskedFormControl from "react-bootstrap-maskedinput";

import { testaCPF } from "helpers/CpfHelpers.jsx";
import RegexHelpers from "helpers/RegexHelpers.jsx";
import DummyApi from "variables/DummyApi.jsx";

class AuthRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //register form data
      register_firstName: "",
      register_lastName: "",
      register_cpf: "",
      register_email: "",
      register_password: "",
      register_passwordCheck: "",
      //register form validation errors
      register_firstNameError: null,
      register_lastNameError: null,
      register_cpfError: null,
      register_emailError: null,
      register_passwordError: null,
      register_passwordCheckError: null,
      //register form error
      register_formError: null,
      //success flag
      success: false
    };
  }

  handleFirstName(event) {
    //Atualiza valor
    this.setState({
      register_firstName: event.target.value
    });
    //validação campo requerido.
    event.target.value === ""
      ? this.setState({
          register_firstNameError: (
            <small className="text-danger">Campo requerido.</small>
          )
        })
      : this.setState({ register_firstNameError: null });
  }

  handleLastName(event) {
    //Atualiza valor
    this.setState({
      register_lastName: event.target.value
    });
    //validação campo requerido.
    event.target.value === ""
      ? this.setState({
          register_lastNameError: (
            <small className="text-danger">Campo requerido.</small>
          )
        })
      : this.setState({ register_lastNameError: null });
  }

  handleCpf(event) {
    //Atualiza valor
    this.setState({
      register_cpf: event.target.value
    });
    //validação do cpf
    var cpfRex = RegexHelpers.cpfRegex();
    if (cpfRex.test(event.target.value) === false) {
      this.setState({
        register_cpfError: (
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
          register_cpfError: (
            <small className="text-danger">CPF inválido.</small>
          )
        });
      } else {
        this.setState({ register_cpfError: null });
      }
    }
  }

  handleEmail(event) {
    //Atualiza valor
    this.setState({
      register_email: event.target.value
    });
    //validação
    var emailRex = RegexHelpers.emailRegex();
    emailRex.test(event.target.value) === false
      ? this.setState({
          register_emailError: (
            <small className="text-danger">
              Campo requerido e em formato de email válido.
            </small>
          )
        })
      : this.setState({ register_emailError: null });
  }

  handlePassword(event) {
    //Atualiza valor
    this.setState({
      register_password: event.target.value
    });
    //validação tamanho da senha.
    event.target.value.length < 6
      ? this.setState({
          register_passwordError: (
            <small className="text-danger">
              A senha deve conter ao menos 6 caracteres.
            </small>
          )
        })
      : this.setState({ register_passwordError: null });
    //validação com o password check
    event.target.value !== this.state.register_passwordCheck
      ? this.setState({
          register_passwordCheckError: (
            <small className="text-danger">
              A senhas digitadas não conferem.
            </small>
          )
        })
      : this.setState({ register_passwordCheckError: null });
  }

  handlePasswordCheck(event) {
    //Atualiza valor
    this.setState({
      register_passwordCheck: event.target.value
    });
    //validação com o password
    event.target.value !== this.state.register_password
      ? this.setState({
          register_passwordCheckError: (
            <small className="text-danger">
              A senhas digitadas não conferem.
            </small>
          )
        })
      : this.setState({ register_passwordCheckError: null });
  }

  removeAlert() {
    this.setState({
      register_formError: null
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    let readyToPost = true;

    //conferindo se não existem erros em campos / Se existem campos obrigatórios vazios.
    if (
      this.state.register_firstName === "" ||
      this.state.register_lastName === "" ||
      this.state.register_cpf === "" ||
      this.state.register_email === "" ||
      this.state.register_password === "" ||
      this.state.register_passwordCheck === "" ||
      (this.state.register_firstNameError !== null,
      this.state.register_lastNameError !== null,
      this.state.register_cpfError !== null,
      this.state.register_emailError !== null,
      this.state.register_passwordError !== null,
      this.state.register_passwordCheckError !== null)
    ) {
      readyToPost = false;
      this.setState({
        register_formError: (
          <FormGroup>
            <Col>
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

    //tentar enviar para o servidor.
    if (readyToPost) {
      const newUser = {
        firstName: this.state.register_firstName,
        physicalPerson: {
          lastName: this.state.register_lastName,
          cpf: this.state.register_cpf,
          user: {
            email: this.state.register_email,
            password: this.state.register_password,
            userType: "sead"
          }
        }
      };

      let result = null;

      try {
        result = DummyApi.postData("user-create", newUser);
      } catch (exception) {
        alert("Falha na comunicação com o servidor");
      }

      if (result.ok === true) {
        this.setState({
          success: true
        });
      } else {
        this.setState({
          register_formError: (
            <FormGroup>
              <Col>
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

  renderForm() {
    return (
      <Grid>
        <Row>
          <Col md={8} mdOffset={2}>
            <div className="header-text">
              <h2>Sistema de processo seletivo SEAD - UFES</h2>
              <h4>
                Registre-se para poder acessar todos os recursos do sistema
              </h4>
              <hr />
            </div>
          </Col>
          <Col md={4} mdOffset={2}>
            <Media>
              <Media.Left>
                <div className="icon">
                  <i className="pe-7s-user" />
                </div>
              </Media.Left>
              <Media.Body>
                <Media.Heading>Acompanhe os editais</Media.Heading>
                Você pode filtrar e acompanhar os editais de seu interesse.
              </Media.Body>
            </Media>
            <Media>
              <Media.Left>
                <div className="icon">
                  <i className="pe-7s-graph1" />
                </div>
              </Media.Left>
              <Media.Body>
                <Media.Heading>Inscrições e recursos</Media.Heading>
                Em breve será possivel fazer inscrições e entrar com recursos
                online.
              </Media.Body>
            </Media>
          </Col>
          <Col md={4}>
            <form>
              <Card
                plain
                content={
                  <div>
                    {this.state.register_formError}
                    <FormGroup>
                      <FormControl
                        type="text"
                        placeholder="Seu nome"
                        value={this.state.register_firstName}
                        onChange={event => this.handleFirstName(event)}
                      />
                      {this.state.register_firstNameError}
                    </FormGroup>
                    <FormGroup>
                      <FormControl
                        type="text"
                        placeholder="Seu sobrenome"
                        value={this.state.register_lastName}
                        onChange={event => this.handleLastName(event)}
                      />
                      {this.state.register_lastNameError}
                    </FormGroup>
                    <FormGroup>
                      <MaskedFormControl
                        type="text"
                        placeholder="C.P.F."
                        value={this.state.register_cpf}
                        onChange={event => this.handleCpf(event)}
                        mask="111.111.111-11"
                      />
                      {this.state.register_cpfError}
                    </FormGroup>
                    <FormGroup>
                      <FormControl
                        type="email"
                        placeholder="Digite seu email"
                        value={this.state.register_email}
                        onChange={event => this.handleEmail(event)}
                      />
                      {this.state.register_emailError}
                    </FormGroup>
                    <FormGroup>
                      <FormControl
                        type="password"
                        placeholder="Senha"
                        value={this.state.register_password}
                        onChange={event => this.handlePassword(event)}
                      />
                      {this.state.register_passwordError}
                    </FormGroup>
                    <FormGroup>
                      <FormControl
                        type="password"
                        placeholder="Repita a senha"
                        value={this.state.register_passwordCheck}
                        onChange={event => this.handlePasswordCheck(event)}
                      />
                      {this.state.register_passwordCheckError}
                    </FormGroup>
                  </div>
                }
                ftTextCenter
                legend={
                  <Button
                    wd
                    fill
                    neutral
                    onClick={event => this.handleSubmit(event)}
                  >
                    Criar a sua conta
                  </Button>
                }
              />
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }

  renderSuccess() {
    return (
      <Grid>
        <Row>
          <Col md={8} mdOffset={2}>
            <div className="header-text">
              <h2>Sistema de processo seletivo SEAD - UFES</h2>
              <h4>
                Registre-se para poder acessar todos os recursos do sistema
              </h4>
              <hr />
            </div>
          </Col>
          <Col md={8} mdOffset={2}>
            <Media>
              <Media.Left>
                <div className="icon">
                  <i className="pe-7s-user" />
                </div>
              </Media.Left>
              <Media.Body>
                <Media.Heading>
                  Cadastro efetuado com sucesso {this.state.register_firstName}!
                </Media.Heading>
                Um email de confirmação foi enviado para{" "}
                {this.state.register_email}. Acesse seu email e clique no link
                de confirmação nas próximas 48 horas para terminar de efetuar
                seu cadastro.
              </Media.Body>
            </Media>
          </Col>
        </Row>
      </Grid>
    );
  }

  render() {
    if (this.state.success) {
      return this.renderSuccess();
    } else {
      return this.renderForm();
    }
  }
}

export default AuthRegister;
