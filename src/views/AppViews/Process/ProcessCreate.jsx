import React from "react";

import {
    Grid,
    Row,
    Col
} from "react-bootstrap";

import {
    FormGroup,
    ControlLabel,
    FormControl,
    Form,
} from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import Datetime from "react-datetime";
// react component that creates a switch button that changes from on to off mode

import RegexHelpers from '../../../helpers/RegexHelpers.jsx'


class ProcessCreate extends React.Component {
    constructor(props) {
        super(props)
        this.vForm = this.refs.vForm;
        this.state = {
            // Create process
            createProcess_number: "",
            createProcess_year: "",
            createProcess_end: "",
            createProcess_description: "",
            // Create process error messages
            createProcess_numberError: "",
            createProcess_yearError: "",
            createProcess_endError: "",
        };
    }

    handleProcessNumber(event) {
        //Atualiza valor
        this.setState({
            createProcess_number: event.target.value,
        });

        //Valida ser for numero
        var digitRex = RegexHelpers.numberRegex();
        digitRex.test(event.target.value) === false
            ? this.setState({
                createProcess_numberError: (
                    <small className="text-danger">
                        Você deve fornecer um número.
                    </small>
                )
            })
            : this.setState({ createProcess_numberError: null });
    }

    handleProcessYear(event) {
        //Atualiza valor
        this.setState({
            createProcess_year: event.target.value,
        });

        //Valida ser for ano
        var digitRex = RegexHelpers.yearRegex();
        digitRex.test(event.target.value) === false
            ? this.setState({
                createProcess_yearError: (
                    <small className="text-danger">
                        Você deve digitar o ano no formato AAAA.
                    </small>
                )
            })
            : this.setState({ createProcess_yearError: null });
    }

    handleProcessEnd(date) {
        //Atualiza valor
        this.setState({
            createProcess_end: date,
        });

        //verifica formato DD/MM/AAAA
        if (typeof date === 'string') {
            var dateBrRex = RegexHelpers.dateBrRegex();
            dateBrRex.test(date) === false
                ? this.setState({
                    createProcess_endError: (
                        <small className="text-danger">
                            Você deve digitar a data no formato DD/MM/AAAA.
                        </small>
                    )
                })
                : this.setState({ createProcess_endError: null });
        } else {
            this.setState({ createProcess_endError: null });
        }
    }

    handleProcessDescription(event) {
        //Atualiza valor
        this.setState({
            createProcess_description: event.target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault()
        console.log(this.state)
    }

    render() {
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Card
                            title="Novo processo"
                            tableFullWidth
                            content={
                                <span>
                                    <Form horizontal>

                                        <FormGroup>
                                            <ControlLabel className="col-md-3">
                                                Número: <span className="star">*</span>
                                            </ControlLabel>
                                            <Col md={8}>
                                                <FormControl
                                                    placeholder="000"
                                                    type="text"
                                                    name="createProcess_number"
                                                    onChange={event => this.handleProcessNumber(event)}
                                                />
                                                {this.state.createProcess_numberError}
                                            </Col>
                                        </FormGroup>

                                        <FormGroup>
                                            <ControlLabel className="col-md-3">
                                                Ano: <span className="star">*</span>
                                            </ControlLabel>
                                            <Col md={8}>
                                                <FormControl
                                                    placeholder="AAAA"
                                                    type="text"
                                                    name="createProcess_year"
                                                    onChange={event => this.handleProcessYear(event)}
                                                />
                                                {this.state.createProcess_yearError}
                                            </Col>
                                        </FormGroup>

                                        <FormGroup>
                                            <ControlLabel className="col-md-3">
                                                Fim do processo: <span className="star">*</span>
                                            </ControlLabel>
                                            <Col md={8}>
                                                <Datetime
                                                    onChange={date => this.handleProcessEnd(date)}
                                                    dateFormat="DD/MM/YYYY"
                                                    timeFormat={false}
                                                    inputProps={{
                                                        placeholder: "DD/MM/AAAA",
                                                    }}
                                                />
                                                {this.state.createProcess_endError}
                                            </Col>
                                        </FormGroup>

                                        <FormGroup>
                                            <ControlLabel className="col-md-3">
                                                Descrição:
                                            </ControlLabel>
                                            <Col md={8}>
                                                <FormControl
                                                    onChange={event => this.handleProcessDescription(event)}
                                                    componentClass="textarea"
                                                    placeholder="Escrever mais detalhes sobre o edital..."
                                                />
                                            </Col>
                                        </FormGroup>

                                        <FormGroup>
                                            <Col md={9} mdOffset={3}>
                                                <Button bsStyle="info" fill onClick={event => this.handleSubmit(event)}>
                                                    Criar novo processo
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
        )
    }
}

export default ProcessCreate