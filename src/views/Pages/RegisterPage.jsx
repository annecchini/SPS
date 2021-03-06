import React, { Component } from "react";
import { Grid, Row, Col, Media, FormControl, FormGroup } from "react-bootstrap";

import Card from "components/Card/Card.jsx";

import Button from "components/CustomButton/CustomButton.jsx";

class RegisterPage extends Component {
  constructor(props){
    super(props)
    this.state = {
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
      register_passwordCheckError: null
    }
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col md={8} mdOffset={2}>
            <div className="header-text">
              <h2>Sistema de processo seletivo SEAD - UFES</h2>
              <h4>Registre-se para poder acessar todos os recursos do sistema</h4>
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
                Em breve será possivel fazer inscrições e entrar com recursos online.
              </Media.Body>
            </Media>
          </Col>
          <Col md={4}>
            <form>
              <Card
                plain
                content={
                  <div>
                    <FormGroup>
                      <FormControl type="text" placeholder="Seu nome" />
                      {this.state.register_firstNameError}
                    </FormGroup>
                    <FormGroup>
                      <FormControl type="text" placeholder="Seu sobrenome" />
                      {this.state.register_lastNameError}
                    </FormGroup>
                    <FormGroup>
                      <FormControl type="text" placeholder="C.P.F." />
                      {this.state.register_cpfError}
                    </FormGroup>
                    <FormGroup>
                      <FormControl type="email" placeholder="Digite seu email" />
                      {this.state.register_emailError}
                    </FormGroup>
                    <FormGroup>
                      <FormControl type="password" placeholder="Senha" />
                      {this.state.register_passwordError}
                    </FormGroup>
                    <FormGroup>
                      <FormControl type="password" placeholder="Repita a senha" />
                      {this.state.register_passwordCheckError}
                    </FormGroup>
                  </div>
                }
                ftTextCenter
                legend={
                  <Button wd fill neutral>
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
}

export default RegisterPage;
