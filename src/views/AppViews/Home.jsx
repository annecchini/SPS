import React from "react";

import {
    Grid,
    Row
} from "react-bootstrap";

import Card from "components/Card/Card.jsx";


class Home extends React.Component {
    render() {
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Card
                            title={"Bem-vindo!"}
                            tableFullWidth
                            content={
                                <ul>
                                    <li>Página inicial</li>
                                </ul>
                            }
                        />
                    </Row>
                </Grid>
            </div>
        )
    }
}

export default Home