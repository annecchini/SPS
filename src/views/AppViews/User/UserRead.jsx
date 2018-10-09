import React from "react";

import { Grid, Row, Col, Form, FormGroup } from "react-bootstrap";

import Card from "components/Card/Card.jsx";

import FormatHelpers from "../../../helpers/FormatHelpers.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

class UserRead extends React.Component {
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
              title={`Usuário ${FormatHelpers.processNumber(
                this.props.user.id
              )}/${this.props.user.login}`}
              tableFullWidth
              content={
                <span>
                  <ul>
                    <li>Ver o usuário.</li>
                  </ul>
                  <Form horizontal>
                    <FormGroup>
                      <Col md={8} mdOffset={3}>
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

export default UserRead;
