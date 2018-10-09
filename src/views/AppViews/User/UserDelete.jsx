import React from "react";

import { Grid, Row, Form, FormGroup, Col, ControlLabel } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import DummyApi from "../../../variables/DummyApi.jsx";

import FormatHelpers from "../../../helpers/FormatHelpers.jsx";

//Imports para colocar o datetime em pt-br
import moment from "moment";
import "moment/locale/pt-br";
moment.locale("pt-br");

class UserDelete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //delete user form error
      updateUser_formError: null
    };
  }

  removeAlert() {
    this.setState({
      updateUser_formError: null
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    let readyToPost = true;

    //Colocar verificações de dados aqui e alterar "readyToPost" para false se existir restrições para a postagem

    const toupdateUser = {
      id: this.props.user.id
    };

    //Tentar enviar para o servidor.
    if (readyToPost) {
      let result = null;

      try {
        result = DummyApi.delData("user-delete", toupdateUser);
      } catch (exception) {
        alert("Falha na comunicação com o servidor");
      }

      if (result.ok === true) {
        this.props.changeMode("user-list");
      } else {
        this.setState({
          updateUser_formError: (
            <FormGroup>
              <ControlLabel className="col-md-3" />
              <Col md={8}>
                <div
                  className="alert alert-danger"
                  role="alert"
                  onClick={event => this.removeAlert(event)}
                >
                  <button type="button" className="close" aria-label="Close">
                    &times;
                  </button>
                  {result.message.userMessage}
                </div>
              </Col>
            </FormGroup>
          )
        });
      }
    }
  }

  handleCancel(event) {
    event.preventDefault();
    this.props.changeMode("user-list");
  }

  render() {
    return (
      <div className="main-content">
        <Grid fluid>
          <Row>
            <Card
              title="Excluir usuário"
              tableFullWidth
              content={
                <span>
                  <Form horizontal>
                    {this.state.updateUser_formError}

                    <div className="col-md-offset-3">
                      <p>Tem certeza que deseja excluir esse usuário</p>

                      <dl className="dl-horizontal">
                        <dt>Identificador:</dt>
                        <dd>{this.props.user.id}</dd>
                        <dt>Usuário:</dt>
                        <dd>{`${FormatHelpers.processNumber(
                          this.props.user.number
                        )}/${this.props.user.year}`}</dd>
                        <dt>Data de criação:</dt>
                        <dd>
                          {moment(this.props.user.createdAt).format(
                            "DD/MM/YYYY"
                          )}
                        </dd>
                        <dt>Última atualização:</dt>
                        <dd>
                          {moment(this.props.user.createdAt).format(
                            "DD/MM/YYYY"
                          )}
                        </dd>
                      </dl>
                    </div>

                    <FormGroup>
                      <Col md={8} mdOffset={3}>
                        <Button
                          bsStyle="danger"
                          fill
                          onClick={event => this.handleSubmit(event)}
                        >
                          Excluir usuário
                        </Button>{" "}
                        <Button
                          bsStyle="info"
                          fill
                          onClick={event => this.handleCancel(event)}
                        >
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
    );
  }
}

export default UserDelete;
