import React from "react";

import { Grid, Row, Table, OverlayTrigger, Tooltip } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import DummyApi from "../../../variables/DummyApi.jsx";

//Imports para colocar o datetime em pt-br
import moment from "moment";
import "moment/locale/pt-br";
moment.locale("pt-br");

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: []
    };
  }

  componentDidMount() {
    try {
      const uList = DummyApi.getData("user-list");
      this.setState({ userList: uList });
    } catch (exception) {
      alert("Falha na comunicação com o servidor");
    }
  }

  renderActions(user) {
    const view = <Tooltip id="view">Ver</Tooltip>;
    const edit = <Tooltip id="edit">Editar</Tooltip>;
    const remove = <Tooltip id="remove">Remover</Tooltip>;
    return (
      <td className="td-actions text-right">
        <OverlayTrigger placement="top" overlay={view}>
          <Button
            simple
            bsStyle="info"
            bsSize="xs"
            onClick={() => this.props.changeMode("user-read", user)}
          >
            <i className="fa fa-user" />
          </Button>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={edit}>
          <Button
            simple
            bsStyle="success"
            bsSize="xs"
            onClick={() => this.props.changeMode("user-update", user)}
          >
            <i className="fa fa-edit" />
          </Button>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={remove}>
          <Button
            simple
            bsStyle="danger"
            bsSize="xs"
            onClick={() => this.props.changeMode("user-delete", user)}
          >
            <i className="fa fa-times" />
          </Button>
        </OverlayTrigger>
      </td>
    );
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
                  <Button
                    bsStyle="primary"
                    fill
                    onClick={() => this.props.changeMode("user-create")}
                  >
                    Novo usuário...
                  </Button>
                </div>
              }
            />

            <Card
              title="Filtro"
              category=""
              tableFullWidth
              content={
                <ul>
                  <li>Sem fomulário de filtro por enquanto</li>
                </ul>
              }
            />

            <Card
              title="Usuários"
              category="Sem filtros aplicados"
              tableFullWidth
              content={
                <div>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Nome/Sobrenome</th>
                        <th>Email principal</th>
                        <th>Último Acesso</th>
                        <th className="text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.userList.map(user => {
                        return (
                          <tr key={user.id}>
                            <td>
                              {user.firstName} {user.lastName}
                            </td>
                            <td>{user.login}</td>
                            <td>
                              {moment(user.lastAcess)
                                .startOf("day")
                                .fromNow()}
                            </td>
                            {this.renderActions(user)}
                          </tr>
                        );
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

export default UserList;
