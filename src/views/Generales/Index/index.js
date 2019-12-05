import React, { Component } from 'react';
import { Col, Container, Row, Card, CardHeader, CardBody} from 'reactstrap';

class Index extends Component{
    render(){
        return(
            <div className="flex-row d-flex align-items-center app">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="12">
                            <Card>
                                <CardHeader className="bg-primary">
                                    <div className="row justify-content-center">
                                        <h1 className="ColorTextModal">
                                            BIENVENIDO
                                        </h1>
                                    </div>
                                </CardHeader>
                                <CardBody >
                                    <div className="row justify-content-center">
                                        <h2>
                                            La Vendimia
                                        </h2>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Index;