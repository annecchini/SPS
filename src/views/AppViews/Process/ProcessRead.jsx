import React from "react";

import {
    Grid,
    Row
} from "react-bootstrap";

import Card from "components/Card/Card.jsx";

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

export default ProcessRead