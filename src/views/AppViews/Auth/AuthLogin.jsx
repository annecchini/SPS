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
import DummySession from "variables/DummySession.jsx"


class AuthLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //Configurações da transição
            cardHidden: true,
            //Itens de formulário 
            login_login: "",
            login_password: "",
            //erros do formulário
            login_formError: null
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

    handleLogin(event) {
        this.setState({
            login_login: event.target.value
        })
    }

    handlePassword(event) {
        this.setState({
            login_password: event.target.value
        })
    }

    removeAlert() {
        this.setState({
            login_formError: null
        })
    }

    handleSubmit(event) {
        event.preventDefault()

        let readyToPost = true

        if (this.state.login_login === "" || this.state.login_password === "") {
            readyToPost = false
            this.setState({
                login_formError: (
                    <FormGroup>
                        <div className="alert alert-danger" role="alert" onClick={event => this.removeAlert(event)}>
                            <button type="button" className="close" aria-label="Close">&times;</button>
                            Campos requeridos vazios ou com erro.
                        </div>
                    </FormGroup>
                )
            })
        }

        if (readyToPost) {

            const newLogin = {
                login: this.state.login_login,
                password: this.state.login_password
            }

            let result = null

            try {
                result = DummySession.postData('auth-login', newLogin)
            }
            catch (exception) {
                alert("Falha na criação da sessão / Erro no servidor")
            }

            if (result.ok === true) {
                window.location.replace("http://localhost:3000/#/app/home")
                //this.props.history.push('/#/app/home')
            } else {
                this.setState({
                    login_formError: (
                        <FormGroup>
                            <div className="alert alert-danger" role="alert" onClick={event => this.removeAlert(event)}>
                                <button type="button" className="close" aria-label="Close">&times;</button>
                                {result.message.userMessage}
                            </div>
                        </FormGroup>
                    )
                })
            }
        }

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

                                        {this.state.login_formError}

                                        <FormGroup>
                                            <ControlLabel>Email / Login único</ControlLabel>
                                            <FormControl
                                                placeholder="Email ou login único"
                                                type="email"
                                                name="login_login"
                                                value={this.state.login_login}
                                                onChange={(event) => this.handleLogin(event)}
                                            />
                                        </FormGroup>

                                        <FormGroup>
                                            <ControlLabel>Senha</ControlLabel>
                                            <FormControl
                                                placeholder="Senha"
                                                type="password"
                                                name="login_password"
                                                value={this.state.login_password}
                                                onChange={(event) => this.handlePassword(event)}
                                            />
                                        </FormGroup>

                                        <FormGroup>
                                            <NavLink to={"/app/auth/forgot"} className="nav-link">
                                                <p>Esqueci meu login/senha.</p>
                                            </NavLink>
                                        </FormGroup>

                                    </div>
                                }
                                legend={
                                    <Button bsStyle="info" fill wd onClick={(event) => this.handleSubmit(event)}>
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
