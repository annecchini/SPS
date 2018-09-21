import '../../assets/css/app/app.css'
import React from "react";

import {
    Grid,
    Row,
    Col,
    Table,
    OverlayTrigger,
    Tooltip,
} from "react-bootstrap";

import {
    FormGroup,
    ControlLabel,
    FormControl,
    HelpBlock,
    Form,
    InputGroup
} from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import Checkbox from "components/CustomCheckbox/CustomCheckbox.jsx";
import Radio from "components/CustomRadio/CustomRadio.jsx";


import DummyApi from "../../variables/DummyApi.jsx";
import FormatHelpers from '../../helpers/FormatHelpers.jsx';

import Datetime from "react-datetime";
// react component that creates a switch button that changes from on to off mode


class Processes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentMode: 'process-list',
            currentId: null
        }
    }

    changeMode = (newMode, newId) => {
        if (newId !== undefined) {
            this.setState({
                currentMode: newMode,
                currentId: newId
            })
        } else {
            this.setState({
                currentMode: newMode
            })
        }
    }

    render() {

        let component = <ProcessList changeMode={this.changeMode} />
        switch (this.state.currentMode) {
            case 'process-list':
                break
            case 'process-create':
                component = <ProcessCreate changeMode={this.changeMode} />
                break
            case 'process-read':
                component = <ProcessRead id={this.state.currentId} changeMode={this.changeMode} />
                break
            case 'process-update':
                component = <ProcessUpdate id={this.state.currentId} changeMode={this.changeMode} />
                break
            case 'process-delete':
                component = <ProcessDelete id={this.state.currentId} changeMode={this.changeMode} />
                break
            default:
                break
        }
        return component
    }

}

export default Processes;


class ProcessList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            processList: [],
        }
    }

    componentDidMount() {
        try {
            const pList = DummyApi.getData('process-list')
            this.setState({ processList: pList })
        }
        catch (exception) {
            alert("Falha na comunicação com o servidor")
        }
    }

    renderActions(processId) {
        const view = <Tooltip id="view">Ver</Tooltip>;
        const edit = <Tooltip id="edit">Editar</Tooltip>;
        const remove = <Tooltip id="remove">Remover</Tooltip>;
        return (
            <td className="td-actions text-right">
                <OverlayTrigger placement="top" overlay={view}>
                    <Button simple bsStyle="info" bsSize="xs" onClick={() => this.props.changeMode('process-read', processId)}>
                        <i className="fa fa-user" />
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={edit} >
                    <Button simple bsStyle="success" bsSize="xs" onClick={() => this.props.changeMode('process-update', processId)}>
                        <i className="fa fa-edit" />
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={remove}>
                    <Button simple bsStyle="danger" bsSize="xs" onClick={() => this.props.changeMode('process-delete', processId)}>
                        <i className="fa fa-times" />
                    </Button>
                </OverlayTrigger>
            </td>
        )
    }

    render() {

        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>

                        <Card
                            title="Novo"
                            tableFullWidth
                            content={
                                <div style={{ paddingLeft: 10 }}>
                                    <Button bsStyle="primary" onClick={() => this.props.changeMode('process-create')} >Novo processo...</Button>
                                </div>
                            }
                        />


                        <Card
                            title="Filtro"
                            category=""
                            tableFullWidth
                            content={
                                <ul><li>Sem fomulário de filtro por enquanto</li></ul>
                            }
                        />


                        <Card
                            title="Processos"
                            category="Sem filtros aplicados"
                            tableFullWidth
                            content={
                                <div>
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                <th>Numero/Ano</th>
                                                <th className="text-right">Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.processList.map((process) => {
                                                return (
                                                    <tr key={process.id}>
                                                        <td>{`${FormatHelpers.processNumber(process.number)}/${process.year}`}</td>
                                                        {this.renderActions(process.id)}
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </Table>
                                </div>
                            }
                        />
                    </Row>
                </Grid>
            </div>
        );
    }
}

class ProcessCreate extends React.Component {
    constructor(props) {
        super(props)
        this.vForm = this.refs.vForm;
        this.state = {
            // Create process
            createProcess_number: "",
            createProcess_year: "",
            // Create process error messages
            createProcess_numberError: "",
            createProcess_yearError: "",

            // Register
            email: "",
            password: "",
            cfpassword: "",
            emailError: null,
            passwordError: null,
            cfpasswordError: null,
            /// Login
            emailLogin: "",
            emailErrorLogin: null,
            passwordLogin: "",
            passwordErrorLogin: null,
            // Type
            type_text: "",
            type_textError: null,
            type_email: "",
            type_emailError: null,
            type_number: "",
            type_numberError: null,
            type_url: "",
            type_urlError: null,
            type_source: "",
            type_sourceError: null,
            type_destination: "",
            type_destinationError: null
        };
    }

    handleEmailChange(event) {
        this.setState({
            email: event.target.value
        });
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        re.test(event.target.value) === false
            ? this.setState({
                emailError: (
                    <small className="text-danger">
                        Email is required and format should be <i>john@doe.com</i>.
                </small>
                )
            })
            : this.setState({ emailError: null });
    }

    handlePasswordChange(event) {
        this.setState({
            password: event.target.value
        });
        event.target.value.length < 6
            ? this.setState({
                passwordError: (
                    <small className="text-danger">
                        You must enter a password of at least 6 characters.
                </small>
                )
            })
            : this.setState({ passwordError: null });
    }

    handleCfPasswordChange(event) {
        this.setState({
            cfpassword: event.target.value
        });
        event.target.value !== this.state.password
            ? this.setState({
                cfpasswordError: (
                    <small className="text-danger">Passwords do not match.</small>
                )
            })
            : this.setState({ cfpasswordError: null });
    }

    handleRegisterSubmit() {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        re.test(this.state.email) === false
            ? this.setState({
                emailError: (
                    <small className="text-danger">
                        Email is required and format should be <i>john@doe.com</i>.
                </small>
                )
            })
            : this.setState({ emailError: null });
        this.state.password.length < 6
            ? this.setState({
                passwordError: (
                    <small className="text-danger">
                        You must enter a password of at least 6 characters.
                </small>
                )
            })
            : this.setState({ passwordError: null });
        this.state.cfpassword !== this.state.password
            ? this.setState({
                cfpasswordError: (
                    <small className="text-danger">Passwords do not match.</small>
                )
            })
            : this.setState({ cfpasswordError: null });
    }

    handleLoginEmail(event) {
        this.setState({
            emailLogin: event.target.value
        });
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        re.test(event.target.value) === false
            ? this.setState({
                emailErrorLogin: (
                    <small className="text-danger">
                        Email is required and format should be <i>john@doe.com</i>.
                </small>
                )
            })
            : this.setState({ emailErrorLogin: null });
    }

    handleLoginPassword(event) {
        this.setState({
            passwordLogin: event.target.value
        });
        event.target.value.length < 6
            ? this.setState({
                passwordErrorLogin: (
                    <small className="text-danger">
                        You must enter a password of at least 6 characters.
                </small>
                )
            })
            : this.setState({ passwordErrorLogin: null });
    }

    handleLoginSubmit() {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        re.test(this.state.emailLogin) === false
            ? this.setState({
                emailErrorLogin: (
                    <small className="text-danger">
                        Email is required and format should be <i>john@doe.com</i>.
                </small>
                )
            })
            : this.setState({ emailErrorLogin: null });
        this.state.passwordLogin < 6
            ? this.setState({
                passwordErrorLogin: (
                    <small className="text-danger">
                        You must enter a password of at least 6 characters.
                </small>
                )
            })
            : this.setState({ passwordErrorLogin: null });
    }

    handleTypeValidation() {
        var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        emailRex.test(this.state.type_email) === false
            ? this.setState({
                type_emailError: (
                    <small className="text-danger">
                        Email is required and format should be <i>john@doe.com</i>.
                </small>
                )
            })
            : this.setState({ type_emailError: null });
        this.state.type_text === ""
            ? this.setState({
                type_textError: (
                    <small className="text-danger">Text is required.</small>
                )
            })
            : this.setState({ type_textError: null });
        var digitRex = /^\d+$/;
        digitRex.test(this.state.type_number) === false
            ? this.setState({
                type_numberError: (
                    <small className="text-danger">
                        type_number has to be a number.
                </small>
                )
            })
            : this.setState({ type_numberError: null });
        var urlRex = /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi;
        urlRex.test(this.state.type_url)
            ? this.setState({ type_urlError: null })
            : this.setState({
                type_urlError: (
                    <small className="text-danger">Must be a valid URL!</small>
                )
            });
        this.state.type_source === ""
            ? this.setState({
                type_sourceError: (
                    <small className="text-danger">IdSource is required</small>
                )
            })
            : this.setState({ type_sourceError: null });
        this.state.type_source === this.state.type_destination
            ? this.setState({ type_destinationError: null })
            : this.setState({
                type_destinationError: (
                    <small className="text-danger">IdSource mismatch!</small>
                )
            });
    }

    handleNumberChange() {

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
                                                    onChange={event => this.handleEmailChange(event)}
                                                />
                                                {this.state.emailError}
                                            </Col>
                                        </FormGroup>

                                        <FormGroup>
                                            <ControlLabel className="col-md-3">
                                                Ano: <span className="star">*</span>
                                            </ControlLabel>
                                            <Col md={8}>
                                                <FormControl
                                                    placeholder="YYYY"
                                                    type="text"
                                                    name="createProcess_year"
                                                    onChange={event => this.handleEmailChange(event)}
                                                />
                                                {this.state.emailError}
                                            </Col>
                                        </FormGroup>

                                        <FormGroup>
                                            <ControlLabel className="col-md-3">
                                                Date piker: <span className="star">*</span>
                                            </ControlLabel>
                                            <Col md={8}>
                                            <Datetime
                                                dateFormat="DD/MM/YYYY"
                                                timeFormat={false}
                                                inputProps={{ placeholder: "DD/MM/YYYY" }}
                                            />
                                            </Col>
                                        </FormGroup>

                                        <FormGroup>
                                            <ControlLabel className="col-md-3">
                                                Descrição:
                                            </ControlLabel>
                                            <Col md={8}>
                                                <FormControl
                                                    componentClass="textarea"
                                                    placeholder="Escrever mais detalhes sobre o edital..."
                                                />
                                            </Col>
                                        </FormGroup>

                                        <FormGroup>
                                            <Col md={8} mdOffset={3}>
                                                <Checkbox number="2" label="Remember me" />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup>
                                            <Col md={9} mdOffset={3}>
                                                <Button bsStyle="info" fill>
                                                    Submit
                                                </Button>
                                            </Col>
                                        </FormGroup>
                                    </Form>
                                </span>
                            }
                        />

                        <Card
                            title="Horizontal Form"
                            content={
                                <Form horizontal>
                                    <FormGroup>
                                        <ControlLabel className="col-md-3">Email</ControlLabel>
                                        <Col md={9}>
                                            <FormControl placeholder="Email" type="email" />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel className="col-md-3">Password</ControlLabel>
                                        <Col md={9}>
                                            <FormControl placeholder="Password" type="password" />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup>
                                        <Col md={9} mdOffset={3}>
                                            <Checkbox number="2" label="Remember me" />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup>
                                        <Col md={9} mdOffset={3}>
                                            <Button bsStyle="info" fill>
                                                Submit
                                            </Button>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            }
                        />

                        <Card
                            title={<legend>Form Elements</legend>}
                            content={
                                <Form horizontal>
                                    <fieldset>
                                        <FormGroup>
                                            <ControlLabel className="col-sm-2">
                                                With Help
                                            </ControlLabel>
                                            <Col sm={10}>
                                                <FormControl type="text" />
                                                <HelpBlock>
                                                    Validation is based on string length.
                                                </HelpBlock>
                                            </Col>
                                        </FormGroup>
                                    </fieldset>
                                    <fieldset>
                                        <FormGroup>
                                            <ControlLabel className="col-sm-2">
                                                Password
                                            </ControlLabel>
                                            <Col sm={10}>
                                                <FormControl type="password" />
                                            </Col>
                                        </FormGroup>
                                    </fieldset>
                                    <fieldset>
                                        <FormGroup>
                                            <ControlLabel className="col-sm-2">
                                                Placeholder
                                            </ControlLabel>
                                            <Col sm={10}>
                                                <FormControl placeholder="placeholder" type="text" />
                                            </Col>
                                        </FormGroup>
                                    </fieldset>
                                    <fieldset>
                                        <FormGroup>
                                            <ControlLabel className="col-sm-2">
                                                Disabled
                                            </ControlLabel>
                                            <Col sm={10}>
                                                <FormControl
                                                    placeholder="Disabled input here"
                                                    type="text"
                                                    disabled
                                                />
                                            </Col>
                                        </FormGroup>
                                    </fieldset>
                                    <fieldset>
                                        <FormGroup>
                                            <ControlLabel className="col-sm-2">
                                                Static control
                                            </ControlLabel>
                                            <Col sm={10}>
                                                <FormControl.Static>
                                                    hello@creative-tim.com
                                                </FormControl.Static>
                                            </Col>
                                        </FormGroup>
                                    </fieldset>
                                    <fieldset>
                                        <FormGroup>
                                            <ControlLabel className="col-sm-2">
                                                Checkboxes and Radios
                                            </ControlLabel>
                                            <Col sm={10}>
                                                <Checkbox number="3" label="First Checkbox" />
                                                <Checkbox number="4" label="Second Checkbox" />
                                                <Radio
                                                    number="5"
                                                    option="1"
                                                    name="radio"
                                                    onChange={this.handleRadio}
                                                    checked={this.state.radio === "1"}
                                                    label="Checked"
                                                />
                                                <Radio
                                                    number="6"
                                                    option="2"
                                                    name="radio"
                                                    onChange={this.handleRadio}
                                                    checked={this.state.radio === "2"}
                                                    label="Unchecked"
                                                />
                                            </Col>
                                        </FormGroup>
                                    </fieldset>
                                    <fieldset>
                                        <FormGroup>
                                            <ControlLabel className="col-sm-2">
                                                Inline Checkboxes
                                            </ControlLabel>
                                            <Col sm={10}>
                                                <Checkbox inline number="7" label="a" />
                                                <Checkbox inline number="8" label="b" />
                                                <Checkbox inline number="9" label="c" />
                                            </Col>
                                        </FormGroup>
                                    </fieldset>
                                    <fieldset>
                                        <legend>Input Variants</legend>
                                        <FormGroup>
                                            <ControlLabel className="col-sm-2">
                                                Custom Checkboxes & Radios
                                            </ControlLabel>
                                            <Col sm={4} smOffset={1}>
                                                <Checkbox number="10" label="Unchecked" />
                                                <Checkbox isChecked number="11" label="Checked" />
                                                <Checkbox
                                                    disabled
                                                    number="12"
                                                    label="Disabled unchecked"
                                                />
                                                <Checkbox
                                                    disabled
                                                    isChecked
                                                    number="13"
                                                    label="Disabled checked"
                                                />
                                            </Col>
                                            <Col sm={5}>
                                                <Radio
                                                    number="14"
                                                    option="2"
                                                    name="radioVariant"
                                                    onChange={this.handleRadio}
                                                    checked={this.state.radioVariant === "2"}
                                                    label="Radio is off"
                                                />
                                                <Radio
                                                    number="15"
                                                    option="1"
                                                    name="radioVariant"
                                                    onChange={this.handleRadio}
                                                    checked={this.state.radioVariant === "1"}
                                                    label="Radio is on"
                                                />
                                                <Radio
                                                    disabled
                                                    number="16"
                                                    option="4"
                                                    name="radioVariantDisabled"
                                                    label="Disabled radio off"
                                                />
                                                <Radio
                                                    disabled
                                                    number="17"
                                                    option="3"
                                                    name="radioVariantDisabled"
                                                    checked
                                                    label="Disabled radio on"
                                                />
                                            </Col>
                                        </FormGroup>
                                    </fieldset>
                                    <fieldset>
                                        <FormGroup>
                                            <ControlLabel className="col-sm-2">
                                                Input with success
                                            </ControlLabel>
                                            <Col sm={10}>
                                                <FormControl type="text" className="valid" />
                                            </Col>
                                        </FormGroup>
                                    </fieldset>
                                    <fieldset>
                                        <FormGroup>
                                            <ControlLabel className="col-sm-2">
                                                Input with error
                                            </ControlLabel>
                                            <Col sm={10}>
                                                <FormControl type="text" className="error" />
                                            </Col>
                                        </FormGroup>
                                    </fieldset>
                                    <fieldset>
                                        <FormGroup>
                                            <ControlLabel className="col-sm-2">
                                                Column sizing
                                             </ControlLabel>
                                            <Col sm={10}>
                                                <Row>
                                                    <Col md={3}>
                                                        <FormControl type="text" placeholder="md={3}" />
                                                    </Col>
                                                    <Col md={4}>
                                                        <FormControl type="text" placeholder="md={4}" />
                                                    </Col>
                                                    <Col md={5}>
                                                        <FormControl type="text" placeholder="md={5}" />
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </FormGroup>
                                    </fieldset>
                                    <fieldset>
                                        <FormGroup>
                                            <ControlLabel className="col-sm-2">
                                                Input groups
                                            </ControlLabel>
                                            <Col sm={3}>
                                                <InputGroup>
                                                    <InputGroup.Addon>@</InputGroup.Addon>
                                                    <FormControl type="text" placeholder="Username" />
                                                </InputGroup>
                                            </Col>
                                            <Col sm={3}>
                                                <InputGroup>
                                                    <FormControl type="text" />
                                                    <InputGroup.Addon>.00</InputGroup.Addon>
                                                </InputGroup>
                                            </Col>
                                            <Col sm={4}>
                                                <InputGroup>
                                                    <InputGroup.Addon>$</InputGroup.Addon>
                                                    <FormControl type="text" />
                                                    <InputGroup.Addon>.00</InputGroup.Addon>
                                                </InputGroup>
                                            </Col>
                                        </FormGroup>
                                    </fieldset>
                                </Form>
                            }
                        />

                        <form>
                            <Card
                                title="Register Form"
                                content={
                                    <div>
                                        <FormGroup>
                                            <ControlLabel>
                                                Email adress: <span className="star">*</span>
                                            </ControlLabel>
                                            <FormControl
                                                type="text"
                                                name="email"
                                                onChange={event => this.handleEmailChange(event)}
                                            />
                                            {this.state.emailError}
                                        </FormGroup>
                                        <FormGroup>
                                            <ControlLabel>
                                                Password: <span className="star">*</span>
                                            </ControlLabel>
                                            <FormControl
                                                type="password"
                                                name="password"
                                                onChange={event => this.handlePasswordChange(event)}
                                            />
                                            {this.state.passwordError}
                                        </FormGroup>
                                        <FormGroup>
                                            <ControlLabel>
                                                Confirm password: <span className="star">*</span>
                                            </ControlLabel>
                                            <FormControl
                                                type="password"
                                                name="cfpassword"
                                                onChange={event => this.handleCfPasswordChange(event)}
                                            />
                                            {this.state.cfpasswordError}
                                        </FormGroup>
                                        <div className="category">
                                            <span className="star">*</span> Required fields
                                        </div>
                                        <Button
                                            bsStyle="info"
                                            fill
                                            pullRight
                                            onClick={this.handleRegisterSubmit.bind(this)}
                                        >
                                            Register
                                        </Button>
                                    </div>
                                }
                                legend={
                                    <div>
                                        <Checkbox number={1} label="Subscribe to newsletter" />
                                    </div>
                                }
                            />
                        </form>

                        <form>
                            <Card
                                textCenter
                                title="Login Form"
                                content={
                                    <div>
                                        <FormGroup>
                                            <ControlLabel>
                                                Email adress: <span className="star">*</span>
                                            </ControlLabel>
                                            <FormControl
                                                type="text"
                                                name="email"
                                                onChange={event => this.handleLoginEmail(event)}
                                            />
                                            {this.state.emailErrorLogin}
                                        </FormGroup>
                                        <FormGroup>
                                            <ControlLabel>
                                                Password: <span className="star">*</span>
                                            </ControlLabel>
                                            <FormControl
                                                type="password"
                                                name="password"
                                                onChange={event => this.handleLoginPassword(event)}
                                            />
                                            {this.state.passwordErrorLogin}
                                        </FormGroup>
                                        <div className="category">
                                            <span className="star">*</span> Required fields
                                        </div>
                                    </div>
                                }
                                ftTextCenter
                                legend={
                                    <Button
                                        bsStyle="info"
                                        fill
                                        wd
                                        onClick={this.handleLoginSubmit.bind(this)}
                                    >
                                        Login
                                    </Button>
                                }
                            />
                        </form>

                        <Form horizontal>
                            <Card
                                title={<legend>Type Validation</legend>}
                                content={
                                    <div>
                                        <FormGroup controlId="formHorizontalRequiredText">
                                            <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                                                Required text
                                            </Col>
                                            <Col sm={6}>
                                                <FormControl
                                                    type="text"
                                                    name="type_text"
                                                    onChange={event => {
                                                        this.setState({ type_text: event.target.value });
                                                        event.target.value === ""
                                                            ? this.setState({
                                                                type_textError: (
                                                                    <small className="text-danger">
                                                                        Text is required.
                                                                    </small>
                                                                )
                                                            })
                                                            : this.setState({ type_textError: null });
                                                    }}
                                                />
                                                {this.state.type_textError}
                                            </Col>
                                        </FormGroup>
                                        <FormGroup controlId="formHorizontalEmail">
                                            <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                                                Email
                                            </Col>
                                            <Col sm={6}>
                                                <FormControl
                                                    type="email"
                                                    name="type_email"
                                                    onChange={event => {
                                                        this.setState({ type_email: event.target.value });
                                                        var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                                        emailRex.test(event.target.value) === false
                                                            ? this.setState({
                                                                type_emailError: (
                                                                    <small className="text-danger">
                                                                        Email is required and format should be{" "}
                                                                        <i>john@doe.com</i>.
                                                                    </small>
                                                                )
                                                            })
                                                            : this.setState({ type_emailError: null });
                                                    }}
                                                />
                                                {this.state.type_emailError}
                                            </Col>
                                        </FormGroup>
                                        <FormGroup controlId="formHorizontalNumber">
                                            <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                                                Number
                                            </Col>
                                            <Col sm={6}>
                                                <FormControl
                                                    type="number"
                                                    name="type_number"
                                                    onChange={event => {
                                                        this.setState({
                                                            type_number: event.target.value
                                                        });
                                                        var digitRex = /^\d+$/;
                                                        digitRex.test(event.target.value) === false
                                                            ? this.setState({
                                                                type_numberError: (
                                                                    <small className="text-danger">
                                                                        type_number has to be a number.
                                                                    </small>
                                                                )
                                                            })
                                                            : this.setState({ type_numberError: null });
                                                    }}
                                                />
                                                {this.state.type_numberError}
                                            </Col>
                                        </FormGroup>
                                        <FormGroup controlId="formHorizontalURL">
                                            <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                                                URL
                                            </Col>
                                            <Col sm={6}>
                                                <FormControl
                                                    type="text"
                                                    name="type_url"
                                                    onChange={event => {
                                                        this.setState({ type_url: event.target.value });
                                                        var urlRex = /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi;
                                                        urlRex.test(event.target.value)
                                                            ? this.setState({ type_urlError: null })
                                                            : this.setState({
                                                                type_urlError: (
                                                                    <small className="text-danger">
                                                                        Must be a valid URL!
                                                                    </small>
                                                                )
                                                            });
                                                    }}
                                                />
                                                {this.state.type_urlError}
                                            </Col>
                                        </FormGroup>
                                        <FormGroup controlId="formHorizontalEqualTo">
                                            <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                                                Equal to
                                            </Col>
                                            <Col sm={3}>
                                                <FormControl
                                                    type="text"
                                                    name="type_source"
                                                    placeholder="idSource"
                                                    onChange={event => {
                                                        this.setState({
                                                            type_source: event.target.value
                                                        });
                                                        event.target.value === ""
                                                            ? this.setState({
                                                                type_sourceError: (
                                                                    <small className="text-danger">
                                                                        IdSource is required
                                                                    </small>
                                                                )
                                                            })
                                                            : this.setState({ type_sourceError: null });
                                                        this.state.type_destination === event.target.value
                                                            ? this.setState({ type_destinationError: null })
                                                            : this.setState({
                                                                type_destinationError: (
                                                                    <small className="text-danger">
                                                                        IdSource mismatch!
                                                                    </small>
                                                                )
                                                            });
                                                    }}
                                                />
                                                {this.state.type_sourceError}
                                            </Col>
                                            <Col sm={3}>
                                                <FormControl
                                                    type="text"
                                                    name="type_destination"
                                                    placeholder="idDestination"
                                                    onChange={event => {
                                                        this.setState({
                                                            type_destination: event.target.value
                                                        });
                                                        this.state.type_source === event.target.value
                                                            ? this.setState({ type_destinationError: null })
                                                            : this.setState({
                                                                type_destinationError: (
                                                                    <small className="text-danger">
                                                                        IdSource mismatch!
                                                                    </small>
                                                                )
                                                            });
                                                    }}
                                                />
                                                {this.state.type_destinationError}
                                            </Col>
                                        </FormGroup>
                                    </div>
                                }
                                ftTextCenter
                                legend={
                                    <Button
                                        fill
                                        bsStyle="info"
                                        type="submit"
                                        onClick={this.handleTypeValidation.bind(this)}
                                    >
                                        Validate Inputs
                                    </Button>
                                }
                            />
                        </Form>
                    </Row>
                </Grid>
            </div>
        )
    }
}

class ProcessRead extends React.Component {
    render() {
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Card
                            title="Novo processo"
                            tableFullWidth
                            content={
                                <ul>
                                    <li>Ver o processo.</li>
                                </ul>
                            }
                        />
                    </Row>
                </Grid>
            </div>
        )
    }
}

class ProcessUpdate extends React.Component {
    render() {
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Card
                            title="Novo processo"
                            tableFullWidth
                            content={
                                <ul>
                                    <li>Atualizar o processo.</li>
                                </ul>
                            }
                        />
                    </Row>
                </Grid>
            </div>
        )
    }
}

class ProcessDelete extends React.Component {
    render() {
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Card
                            title="Novo processo"
                            tableFullWidth
                            content={
                                <div style={{ 'padding-left': '10px' }}>
                                    <ul>
                                        <li>Deletar o processo.</li>
                                    </ul>
                                </div>
                            }
                        />
                    </Row>
                </Grid>
            </div>
        )
    }
}