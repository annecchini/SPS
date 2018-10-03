import React, { Component } from "react";
import { Grid, Row, Col, Media, FormControl, FormGroup } from "react-bootstrap";

import Card from "components/Card/Card.jsx";

import Button from "components/CustomButton/CustomButton.jsx";

import { testaCPF } from "helpers/CpfHelpers.jsx"
import RegexHelpers from "helpers/RegexHelpers.jsx"
//import DummyApi from "variables/DummyApi.jsx"

import MaskedFormControl from "react-bootstrap-maskedinput"
import DummyApi from "variables/DummyApi.jsx"



class AuthRecover extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //recover form data
            recover_cpf: "",
            recover_email: "",
            //recover form validation errors
            recover_emailError: null,
            recover_cpfError: null,
            //recover form error
            recover_formError: null,
            //recover Form status
            success: false
        }
    }

    handleEmail(event) {
        let email = this.state.recover_email
        //Atualiza valor
        if (event) {
            this.setState({
                recover_email: event.target.value,
            });
            email = event.target.value
        }

        //validação
        var emailRex = RegexHelpers.emailRegex();
        emailRex.test(email) === false
            ? this.setState({
                recover_emailError: (
                    <small className="text-danger">
                        Campo requerido e em formato de email válido.
                    </small>
                )
            })
            : this.setState({ recover_emailError: null });
    }

    handleCpf(event) {

        let cpf = this.state.recover_cpf
        //Atualiza valor
        if (event) {
            this.setState({
                recover_cpf: event.target.value,
            });
            cpf = event.target.value
        }



        //validação do cpf
        var cpfRex = RegexHelpers.cpfRegex();
        if (cpfRex.test(cpf) === false) {
            this.setState({
                recover_cpfError: (
                    <small className="text-danger">
                        Formato de cpf inválido (000.000.000-00).
                    </small>
                )
            })
        } else {
            let cpfString = cpf
            cpfString = cpfString.replace(/[^\d]+/g, '')
            if (!testaCPF(cpfString)) {
                this.setState({
                    recover_cpfError: (
                        <small className="text-danger">
                            CPF inválido.
                        </small>
                    )
                })
            } else {
                this.setState({ recover_cpfError: null })
            }
        }
    }

    handleSubmit(event) {
        event.preventDefault()

        this.handleCpf()
        this.handleEmail()

        let readyToPost = true

        //conferindo se não existem erros em campos.
        if ((this.state.recover_cpf === "" || this.state.recover_email === "") || (this.state.recover_cpfError !== null || this.state.recover_emailError !== null)) {
            readyToPost = false
            this.setState({
                recover_formError: (
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

            const newRecover = {
                cpf: this.state.recover_cpf,
                email: this.state.recover_email
            }

            let result = null

            try {
                result = DummyApi.postData('auth-recover', newRecover)
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
                    recover_formError: (
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
            recover_formError: null
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
                            <h4>Formulário de recuperação de acesso</h4>
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
                                <Media.Heading>Recuperar sua senha:</Media.Heading>
                                Após preencher fornecer as informações solicitadas, nós enviaremos um email para seu email cadastrado com um link para a recuperação de senha.
                            </Media.Body>
                        </Media>

                        <Media>
                            <Media.Left>
                                <div className="icon">
                                    <i className="pe-7s-help1" />
                                </div>
                            </Media.Left>
                            <Media.Body>
                                <Media.Heading>Não lembra o email?</Media.Heading>
                                Caso não se lembre do email cadastro ou não tenha mais acesso a ele, sugerimos entrar em contato com o suporte SEAD que solicitará informações adicionais para efetuar alterações no campo de email cadastrado.
                            </Media.Body>
                        </Media>

                    </Col>
                    <Col md={4}>
                        <form>
                            <Card
                                plain
                                content={
                                    <div>
                                        {this.state.recover_formError}

                                        <FormGroup>
                                            <MaskedFormControl
                                                type="text"
                                                placeholder="Digite seu C.P.F. cadastrado"
                                                value={this.state.recover_cpf}
                                                onChange={(event) => this.handleCpf(event)}
                                                mask='111.111.111-11'
                                            />
                                            {this.state.recover_cpfError}
                                        </FormGroup>

                                        <FormGroup>
                                            <FormControl
                                                type="email"
                                                placeholder="Digite seu email cadastrado"
                                                value={this.state.recover_email}
                                                onChange={(event) => this.handleEmail(event)}
                                            />
                                            {this.state.recover_emailError}
                                        </FormGroup>
                                    </div>
                                }
                                ftTextCenter
                                legend={
                                    <Button wd fill neutral onClick={(event) => this.handleSubmit(event)}>
                                        Enviar email de recuperação
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
                                <Media.Heading>Email de recuperação enviado!</Media.Heading>
                                Um email de recuperação de acesso foi enviado para o email cadastrado. Acesse seu email e clique no link de recuperação para escolher sua nova senha.
                  </Media.Body>
                        </Media>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default AuthRecover;
