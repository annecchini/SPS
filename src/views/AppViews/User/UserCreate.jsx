import React from "react";

import { Grid, Row, Col } from "react-bootstrap";

import { FormGroup, ControlLabel, FormControl, Form } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import DummyApi from "../../../variables/DummyApi.jsx";
import RegexHelpers from "../../../helpers/RegexHelpers.jsx";

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
      // Create user error messages
      createUser_loginError: null,
      // Create user form error
      createUser_formError: null
    };
  }

  handleUserLogin(event) {
    //Atualiza valor
    this.setState({
      createUser_number: event.target.value
    });

    //Valida ser for numero
    var digitRex = RegexHelpers.numberRegex();
    digitRex.test(event.target.value) === false
      ? this.setState({
          createUser_numberError: (
            <small className="text-danger">Você deve fornecer um número.</small>
          )
        })
      : this.setState({ createUser_numberError: null });
  }

  removeAlert() {
    this.setState({
      createUser_formError: null
    });
  }

  handleSubmit(event) {
    event.preventDefault();
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
                        Login: <span className="star">*</span>
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
