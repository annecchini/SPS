import React from "react";

import {
    Grid,
    Row
} from "react-bootstrap";


import Card from "components/Card/Card.jsx";

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

export default ProcessDelete