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

import DummyApi from "../../../variables/DummyApi.jsx";
import RegexHelpers from '../../../helpers/RegexHelpers.jsx'
import FormatHelpers from '../../../helpers/FormatHelpers.jsx'

//Imports para colocar o datetime em pt-br
import moment from 'moment'
import 'moment/locale/pt-br'
moment.locale('pt-br')

class ProcessUpdate extends React.Component {
    constructor(props) {
        super(props)
        this.vForm = this.refs.vForm;
        this.state = {
            // Create process
            updateProcess_number: "",
            updateProcess_year: "",
            updateProcess_end: "",
            updateProcess_description: "",
            // Create process error messages
            updateProcess_numberError: null,
            updateProcess_yearError: null,
            updateProcess_endError: null,
            // Create process form error
            updateProcess_formError: ""
        };
    }

    componentDidMount(){
        this.setState({
            updateProcess_number: FormatHelpers.processNumber(this.props.process.number),
            updateProcess_year: this.props.process.year,
            updateProcess_end: this.props.process.end,
            updateProcess_description: this.props.process.description
        })
    }

    handleProcessNumber(event) {
        //Atualiza valor
        this.setState({
            updateProcess_number: event.target.value,
        });

        //Valida ser for numero
        var digitRex = RegexHelpers.numberRegex();
        digitRex.test(event.target.value) === false
            ? this.setState({
                updateProcess_numberError: (
                    <small className="text-danger">
                        Você deve fornecer um número.
                    </small>
                )
            })
            : this.setState({ updateProcess_numberError: null });
    }

    handleProcessYear(event) {
        //Atualiza valor
        this.setState({
            updateProcess_year: event.target.value,
        });

        //Valida ser for ano
        var digitRex = RegexHelpers.yearRegex();
        digitRex.test(event.target.value) === false
            ? this.setState({
                updateProcess_yearError: (
                    <small className="text-danger">
                        Você deve digitar o ano no formato AAAA.
                    </small>
                )
            })
            : this.setState({ updateProcess_yearError: null });
    }

    handleProcessEnd(date) {
        //Atualiza valor
        this.setState({
            updateProcess_end: date,
        });

        //verifica formato DD/MM/AAAA
        if (typeof date === 'string') {
            var brDateRex = RegexHelpers.brDateRegex();
            brDateRex.test(date) === false
                ? this.setState({
                    updateProcess_endError: (
                        <small className="text-danger">
                            Você deve digitar a data no formato DD/MM/AAAA.
                        </small>
                    )
                })
                : this.setState({ updateProcess_endError: null });
        } else {
            this.setState({ updateProcess_endError: null });
        }
    }

    handleProcessDescription(event) {
        //Atualiza valor
        this.setState({
            updateProcess_description: event.target.value,
        });
    }

    removeAlert() {
        this.setState({
            createProcess_formError: null
        })
    }

    handleSubmit(event) {
        event.preventDefault()

        let readyToPost = true

        //conferindo se não existem erros em campos / Se existem campos obrigatórios vazios.
        if ((this.state.updateProcess_numberError !== null || this.state.updateProcess_yearError !== null || this.state.updateProcess_endError !== null) || (this.state.updateProcess_number === "" || this.state.updateProcess_year === "" || this.state.updateProcess_end === "")) {
            readyToPost = false
            this.setState({
                createProcess_formError: (
                    <FormGroup>
                        <ControlLabel className="col-md-3"></ControlLabel>
                        <Col md={8}>
                            <div className="alert alert-danger" role="alert" onClick={event => this.removeAlert(event)}>
                                <button type="button" className="close" aria-label="Close">&times;</button>
                                Existem campos requeridos vazios ou com erro.
                            </div>
                        </Col>
                    </FormGroup>
                )
            })
        }

        const updatedProcess = {
            id: this.props.process.id,
            number: this.state.updateProcess_number,
            year: this.state.updateProcess_year,
            end: this.state.updateProcess_end._d,
            description: this.state.updateProcess_description
        }

        //Tentar enviar para o servidor.
        if (readyToPost) {

            let result = null

            try {
                result = DummyApi.putData('process-update', updatedProcess)
            }
            catch (exception) {
                alert("Falha na comunicação com o servidor")
            }

            if (result.ok === true) {
                this.props.changeMode('process-list')
            } else {
                this.setState({
                    createProcess_formError: (
                        <FormGroup>
                            <ControlLabel className="col-md-3"></ControlLabel>
                            <Col md={8}>
                                <div className="alert alert-danger" role="alert" onClick={event => this.removeAlert(event)}>
                                    <button type="button" className="close" aria-label="Close">&times;</button>
                                    {result.message.userMessage}
                                </div>
                            </Col>
                        </FormGroup>
                    )
                })
            }
        }
    }

    handleCancel(event) {
        event.preventDefault()
        this.props.changeMode('process-list')
    }

    render() {
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Card
                            title="Atualizar processo"
                            tableFullWidth
                            content={
                                <span>
                                    <Form horizontal>

                                        {this.state.createProcess_formError}

                                        <FormGroup>
                                            <ControlLabel className="col-md-3">
                                                Número: <span className="star">*</span>
                                            </ControlLabel>
                                            <Col md={8}>
                                                <FormControl
                                                    placeholder="000"
                                                    type="text"
                                                    name="updateProcess_number"
                                                    value={this.state.updateProcess_number}
                                                    onChange={event => this.handleProcessNumber(event)}
                                                />
                                                {this.state.updateProcess_numberError}
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
                                                    name="updateProcess_year"
                                                    value = {this.state.updateProcess_year}
                                                    onChange={event => this.handleProcessYear(event)}
                                                />
                                                {this.state.updateProcess_yearError}
                                            </Col>
                                        </FormGroup>

                                        <FormGroup>
                                            <ControlLabel className="col-md-3">
                                                Fim do processo: <span className="star">*</span>
                                            </ControlLabel>
                                            <Col md={8}>
                                                <Datetime
                                                    locale='pt-br'
                                                    defaultValue={FormatHelpers.brDate(this.props.process.end)}
                                                    onChange={date => this.handleProcessEnd(date)}
                                                    dateFormat="DD/MM/YYYY"
                                                    timeFormat={false}
                                                    inputProps={{
                                                        placeholder: "DD/MM/AAAA",
                                                    }}
                                                />
                                                {this.state.updateProcess_endError}
                                            </Col>
                                        </FormGroup>

                                        <FormGroup>
                                            <ControlLabel className="col-md-3">
                                                Descrição:
                                            </ControlLabel>
                                            <Col md={8}>
                                                <FormControl
                                                    value={this.state.updateProcess_description} 
                                                    onChange={event => this.handleProcessDescription(event)}
                                                    componentClass="textarea"
                                                    placeholder="Escrever mais detalhes sobre o edital..."
                                                />
                                            </Col>
                                        </FormGroup>

                                        <FormGroup>
                                                <Col md={8} mdOffset={3}>
                                                    <Button bsStyle="info" fill onClick={event => this.handleSubmit(event)}>
                                                        Atualizar processo
                                                    </Button >
                                                    {" "}
                                                    <Button bsStyle="info" fill onClick={event => this.handleCancel(event)}>
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
        )
    }
}

export default ProcessUpdate