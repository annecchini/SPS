import React, { Component } from "react";
import { Grid, Row, Col, Media } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import DummyApi from "variables/DummyApi.jsx"
import { NavLink } from "react-router-dom";

class AuthConfirm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            key: this.props.match.params.id,
            confirmationStatus: false,
            messageError: ""
        }
    }

    componentWillMount(){
        this.confirmKey(this.state.key)
    }

    confirmKey(key) {
        let result = null

        const keyToConfirm = {
            key: key
        }

        try {
            result = DummyApi.postData('auth-confirm', keyToConfirm)
        }
        catch (exception) {
            alert("Falha na comunicação com o servidor")
        }

        if (result.ok === true) {
            this.setState({ confirmationStatus: true })
        } else {
            this.setState({
                confirmationStatus: false,
                messageError: result.message.userMessage
            })
        }
    }

    render() {
        if (this.state.confirmationStatus) {
            return this.renderSuccess()
        } else {
            return this.renderError()
        }
    }


    renderSuccess() {
        return (

            <Grid>
                <Row>
                    <Col md={8} mdOffset={2}>
                        <div className="header-text">
                            <h2>Sistema de processo seletivo SEAD - UFES</h2>
                            <h4>Confirmação de segurança do cadastro de usuário.</h4>
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
                                <Media.Heading>Sua conta foi confirmada com sucesso!</Media.Heading>

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

    renderError() {
        return (
            <Grid>
                <Row>
                    <Col md={8} mdOffset={2}>
                        <div className="header-text">
                            <h2>Sistema de processo seletivo SEAD - UFES</h2>
                            <h4>Confirmação de segurança do cadastro de usuário.</h4>
                            <hr />
                        </div>
                    </Col>
                    <Col md={8} mdOffset={2}>

                        <Media>
                            <Media.Left>
                                <div className="icon">
                                    <i className="pe-7s-close-circle" />
                                </div>
                            </Media.Left>
                            <Media.Body>
                                <Media.Heading>Ocorreu um erro na confirmação do seu cadastro!</Media.Heading>
                                {this.state.messageError}
                            </Media.Body>
                        </Media>

                        <Media>
                            <Media.Left>
                                <div className="icon">
                                    <i className="pe-7s-help1" />
                                </div>
                            </Media.Left>
                            <Media.Body>
                                <Media.Heading>O que pode ter acontecido:</Media.Heading>
                                <ul>
                                    <li>
                                        Sua solicitação de cadastro ocorreu a mais de 48 horas? Então seu cadastro foi invalidado pelo sistema. Faça o processo de registro novamente clicando <NavLink to={"/app/auth/register"} className="nav-link">aqui</NavLink>.
                                    </li>
                                    <li>
                                        Se ainda estiver enfrentando problemas para efetuar seu cadastro, entre em contato com o suporte sead para ajuda adicional.
                                    </li>
                                </ul>

                            </Media.Body>
                        </Media>

                    </Col>
                </Row>
            </Grid>
        )
    }

}

export default AuthConfirm;
