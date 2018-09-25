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

import DummyApi from "../../../variables/DummyApi.jsx";
import FormatHelpers from '../../../helpers/FormatHelpers.jsx';


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

    renderActions(process) {
        const view = <Tooltip id="view">Ver</Tooltip>;
        const edit = <Tooltip id="edit">Editar</Tooltip>;
        const remove = <Tooltip id="remove">Remover</Tooltip>;
        return (
            <td className="td-actions text-right">
                <OverlayTrigger placement="top" overlay={view}>
                    <Button simple bsStyle="info" bsSize="xs" onClick={() => this.props.changeMode('process-read', process)}>
                        <i className="fa fa-user" />
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={edit} >
                    <Button simple bsStyle="success" bsSize="xs" onClick={() => this.props.changeMode('process-update', process)}>
                        <i className="fa fa-edit" />
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={remove}>
                    <Button simple bsStyle="danger" bsSize="xs" onClick={() => this.props.changeMode('process-delete', process)}>
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
                                    <Button bsStyle="primary" fill onClick={() => this.props.changeMode('process-create')} >Novo processo...</Button>
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
                                                        {this.renderActions(process)}
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

export default ProcessList