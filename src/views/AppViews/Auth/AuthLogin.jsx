import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import Card from "components/Card/Card.jsx";

import Button from "components/CustomButton/CustomButton.jsx";
import { NavLink } from "react-router-dom";


class AuthLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardHidden: true
    };
  }
  componentDidMount() {
    setTimeout(
      function () {
        this.setState({ cardHidden: false });
      }.bind(this),
      700
    );
  }
  render() {
    return (
      <Grid>
        <Row>
          <Col md={4} sm={6} mdOffset={4} smOffset={3}>
            <form>
              <Card
                hidden={this.state.cardHidden}
                textCenter
                title="Login"
                content={
                  <div>
                    <FormGroup>
                      <ControlLabel>Email / Login único</ControlLabel>
                      <FormControl placeholder="Email ou login único" type="email" />
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Senha</ControlLabel>
                      <FormControl placeholder="Senha" type="password" />
                    </FormGroup>

                    <FormGroup>
                      <NavLink to={"/app/auth/forgot"} className="nav-link">
                        <p>Esqueci meu login/senha.</p>
                      </NavLink>
                    </FormGroup>

                  </div>
                }
                legend={
                  <Button bsStyle="info" fill wd>
                    Login
                  </Button>
                }
                ftTextCenter
              />
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default AuthLogin;
