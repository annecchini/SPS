import React, { Component } from "react";
import { Grid, Row, Col, Media, FormControl, FormGroup } from "react-bootstrap";

import Card from "components/Card/Card.jsx";

import Button from "components/CustomButton/CustomButton.jsx";

import DummyApi from "variables/DummyApi.jsx"



class AuthPassRestore extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //new password data
            restore_password: "",
            restore_passwordCheck: "",
            //recover form validation errors
            restore_passwordError: null,
            restore_passwordCheckError: null,
            //recover form error
            restore_formError: null,
            //recover user data:
            restore_recoverKey: this.props.match.params.id,
            //recover Form status
            success: false
        }
    }

    handlePassword(event) {

        let password = this.state.restore_password
        //Atualiza valor
        if (event) {
            this.setState({
                restore_password: event.target.value,
            });
            password = event.target.value
        }

        //validação tamanho da senha.
        password.length < 6
            ? this.setState({
                restore_passwordError: (
                    <small className="text-danger">
                        A senha deve conter ao menos 6 caracteres.
              </small>
                )
            })
            : this.setState({ restore_passwordError: null });
        //validação com o password check
        password !== this.state.restore_passwordCheck
            ? this.setState({
                restore_passwordCheckError: (
                    <small className="text-danger">
                        A senhas digitadas não conferem.
            </small>
                )
            })
            : this.setState({ restore_passwordCheckError: null });
    }

    handlePasswordCheck(event) {

        let passwordCheck = this.state.restore_passwordCheck
        //Atualiza valor
        if (event) {
            this.setState({
                restore_passwordCheck: event.target.value,
            });
            passwordCheck = event.target.value
        }

        //validação com o password
        passwordCheck !== this.state.restore_password
            ? this.setState({
                restore_passwordCheckError: (
                    <small className="text-danger">
                        A senhas digitadas não conferem.
              </small>
                )
            })
            : this.setState({ restore_passwordCheckError: null });
    }

    handleSubmit(event) {
        event.preventDefault()

        this.handlePassword()
        this.handlePasswordCheck()

        let readyToPost = true

        //conferindo se não existem erros em campos.
        if ((this.state.restore_password === "" || this.state.restore_passwordCheck === "") || (this.state.restore_passwordError !== null || this.state.restore_passwordCheckError !== null)) {
            readyToPost = false
            this.setState({
                restore_formError: (
                    <FormGroup>
                        <div className="alert alert-danger" role="alert" onClick={event => this.removeAlert(event)}>
                            <button type="button" className="close" aria-label="Close">&times;</button>
                            Existem campos com erro/vazios.
                        </div>
                    </FormGroup>
                )
            })
        }

        if (readyToPost) {

            const newRestore = {
                recoverKey: this.state.restore_recoverKey,
                password: this.state.restore_password
            }

            let result = null

            try {
                result = DummyApi.putData('auth-restore', newRestore)
            }
            catch (exception) {
                alert("Falha na comunicação com o servidor")
            }

            if (result.ok === true) {
                this.setState({
                    success: true
                })
            } else {
                this.setState({
                    restore_formError: (
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

    removeAlert() {
        this.setState({
            restore_formError: null
        })
    }

    render() {
        if (this.state.success) {
            return this.renderSuccess()
        } else {
            return this.renderForm()
        }
    }

    renderForm() {
        return (
            <Grid>
                <Row>
                    <Col md={8} mdOffset={2}>
                        <div className="header-text">
                            <h2>Sistema de processo seletivo SEAD - UFES</h2>
                            <h4>Formulário de restauração de acesso</h4>
                            <hr />
                        </div>
                    </Col>
                    <Col md={4} mdOffset={2}>
                        <Media>
                            <Media.Left>
                                <div className="icon">
                                    <i className="pe-7s-mail" />
                                </div>
                            </Media.Left>
                            <Media.Body>
                                <Media.Heading>Escolha sua nova senha:</Media.Heading>
                                Escolha sua nova senha nos campos fornecidos. Depois de confirmar a alteração de senha você pode seguir para a pagia de login para fazer acesso.
                            </Media.Body>
                        </Media>

                    </Col>
                    <Col md={4}>
                        <form>
                            <Card
                                plain
                                content={
                                    <div>
                                        {this.state.restore_formError}
                                        <FormGroup>
                                            <FormControl
                                                type="password"
                                                placeholder="Digite sua nova senha"
                                                value={this.state.restore_password}
                                                onChange={(event) => this.handlePassword(event)}
                                            />
                                            {this.state.restore_passwordError}
                                        </FormGroup>

                                        <FormGroup>
                                            <FormControl
                                                type="password"
                                                placeholder="Repita sua nova senha"
                                                value={this.state.restore_passwordCheck}
                                                onChange={(event) => this.handlePasswordCheck(event)}
                                            />
                                            {this.state.restore_passwordCheckError}
                                        </FormGroup>
                                    </div>
                                }
                                ftTextCenter
                                legend={
                                    <Button wd fill neutral onClick={(event) => this.handleSubmit(event)}>
                                        Registrar nova senha
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
                            <h4>Formulário de recuperação de acesso</h4>
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
                                <Media.Heading>Sua senha foi alterada com sucesso!</Media.Heading>

                                <Button bsStyle="primary" fill href="http://localhost:3000/#/app/auth/login">
                                    Clique aqui para seguir até a página de login...
                                </Button>

                            </Media.Body>
                        </Media>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default AuthPassRestore;
