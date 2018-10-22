import React from "react";

import {
  Grid,
  Row,
  Col,
  Form,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import MaskedFormControl from "react-bootstrap-maskedinput";

import Card from "components/Card/Card.jsx";

import Button from "components/CustomButton/CustomButton.jsx";

class UserRead extends React.Component {
  constructor(props) {
    super(props);
    this.vForm = this.refs.vForm;
    this.state = {
      // Create user
      login: this.props.user.login,
      password: this.props.user.password,
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      cpf: this.props.user.cpf,
      // Create user error messages
      errors: {},
      // Create user form error
      createUser_formError: null
    };
  }

  handleCancel(event) {
    event.preventDefault();
    this.props.changeMode("user-list");
  }

  userUpdate(event) {
    event.preventDefault();
    this.props.changeMode("user-update");
  }

  render() {
    return (
      <div className="main-content">
        <Grid fluid>
          <Row>
            <Card
              title="Ler usuário"
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
                          name="login"
                          value={this.state.login}
                          disabled
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
                          name="password"
                          value={this.state.password}
                          disabled
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
                          name="firstName"
                          value={this.state.firstName}
                          disabled
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
                          name="lastName"
                          value={this.state.lastName}
                          disabled
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
                          name="cpf"
                          value={this.state.cpf}
                          mask="111.111.111-11"
                          disabled
                        />
                        {this.state.createUser_cpfError}
                      </Col>
                    </FormGroup>

                    <FormGroup>
                      <Col md={8} mdOffset={3}>
                        <Button
                          bsStyle="info"
                          fill
                          onClick={event => this.userUpdate(event)}
                        >
                          Editar esse usuário
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

export default UserRead;
