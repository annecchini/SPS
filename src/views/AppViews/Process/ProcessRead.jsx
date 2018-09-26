import React from "react";

import {
    Grid,
    Row
} from "react-bootstrap";

import Card from "components/Card/Card.jsx";

import FormatHelpers from '../../../helpers/FormatHelpers.jsx'

class ProcessRead extends React.Component {
    render() {
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Card
                            title={`Processo seletivo ${FormatHelpers.processNumber(this.props.process.number)}/${this.props.process.year}`}
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

export default ProcessRead