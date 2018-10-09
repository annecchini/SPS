import React from "react";

import { Grid, Row, FormGroup, Col, Form } from "react-bootstrap";

import Card from "components/Card/Card.jsx";

import FormatHelpers from "../../../helpers/FormatHelpers.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

class ProcessRead extends React.Component {
  handleCancel(event) {
    event.preventDefault();
    this.props.changeMode("process-list");
  }

  render() {
    return (
      <div className="main-content">
        <Grid fluid>
          <Row>
            <Card
              title={`Processo seletivo ${FormatHelpers.processNumber(
                this.props.process.number
              )}/${this.props.process.year}`}
              tableFullWidth
              content={
                <span>
                  <ul>
                    <li>Ver o processo.</li>
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

export default ProcessRead;
