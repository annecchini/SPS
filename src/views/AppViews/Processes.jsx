import '../../assets/css/app/app.css'
import React from "react";

import {
    Grid,
    Row,
    Table,
    OverlayTrigger,
    Tooltip,
} from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import DummyApi from "../../variables/DummyApi.jsx";


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
        return (
            <div>
            <p>Nomedsffsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd</p>
            {component}
            </div>
        )
    }

}

export default Processes;

class ProcessList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            processList: [],
            teste : ''
        }
    }


    testando(){
        this.setState({teste:'alguma coisa'})
    }

    componentDidMount() {
        const pList = DummyApi.getData('process-list')
        this.setState({teste:'alguma coisa'})
        console.log(pList)
        console.log(this.state)
    }

    render() {
        const view = <Tooltip id="view">View Profile</Tooltip>;
        const edit = <Tooltip id="edit">Edit Profile</Tooltip>;
        const remove = <Tooltip id="remove">Remove</Tooltip>;
        // const viewPost = <Tooltip id="view">View Post</Tooltip>;
        // const editPost = <Tooltip id="edit">Edit Post</Tooltip>;
        // const removePost = <Tooltip id="remove">Remove Post</Tooltip>;
        const actions = (
            <td className="td-actions text-right">
                <OverlayTrigger placement="top" overlay={view}>
                    <Button simple bsStyle="info" bsSize="xs">
                        <i className="fa fa-user" />
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={edit}>
                    <Button simple bsStyle="success" bsSize="xs">
                        <i className="fa fa-edit" />
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={remove}>
                    <Button simple bsStyle="danger" bsSize="xs">
                        <i className="fa fa-times" />
                    </Button>
                </OverlayTrigger>
            </td>
        );
        // const actionsPost = (
        //     <td className="td-actions">

        //         <OverlayTrigger placement="left" overlay={viewPost}>
        //             <Button simple icon bsStyle="info">
        //                 <i className="fa fa-image" />
        //             </Button>
        //         </OverlayTrigger>
        //         <OverlayTrigger placement="left" overlay={editPost}>
        //             <Button simple icon bsStyle="success">
        //                 <i className="fa fa-edit" />
        //             </Button>
        //         </OverlayTrigger>
        //         <OverlayTrigger placement="left" overlay={removePost}>
        //             <Button simple icon bsStyle="danger">
        //                 <i className="fa fa-times" />
        //             </Button>
        //         </OverlayTrigger>
        //     </td>
        // );
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>

                        <Card
                            title="Novo"
                            tableFullWidth
                            content={
                                <div style={{paddingLeft:10}}>
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
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th className="text-center">#</th>
                                            <th>Name</th>
                                            <th>Job Position</th>
                                            <th className="text-right">Salary</th>
                                            <th className="text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="text-center">1</td>
                                            <td>Andrew Mike</td>
                                            <td>Develop</td>
                                            <td className="text-right">€ 99,225</td>
                                            {actions}
                                        </tr>
                                        <tr>
                                            <td className="text-center">2</td>
                                            <td>John Doe</td>
                                            <td>Design</td>
                                            <td className="text-right">€ 89,241</td>
                                            {actions}
                                        </tr>
                                        <tr>
                                            <td className="text-center">3</td>
                                            <td>Alex Mike</td>
                                            <td>Design</td>
                                            <td className="text-right">€ 92,144</td>
                                            {actions}
                                        </tr>
                                        <tr>
                                            <td className="text-center">4</td>
                                            <td>Mike Monday</td>
                                            <td>Marketing</td>
                                            <td className="text-right">€ 49,990</td>
                                            {actions}
                                        </tr>
                                        <tr>
                                            <td className="text-center">5</td>
                                            <td>Paul Dickens</td>
                                            <td>Communication</td>
                                            <td className="text-right">€ 69,201</td>
                                            {actions}
                                        </tr>
                                    </tbody>
                                </Table>
                            }
                        />
                    </Row>
                </Grid>
            </div>
        );
    }
}

class ProcessCreate extends React.Component {
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
                                    <li>Formulário de novo processo.</li>
                                </ul>
                            }
                        />
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