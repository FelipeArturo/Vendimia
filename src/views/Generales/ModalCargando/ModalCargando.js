import React, { Component } from 'react';
import { Modal,ModalBody,Row,Col,CardGroup,Card,CardBody} from 'reactstrap';


//Clase para mostrar la vista del modal de cargando
class ModalCargando extends Component{
    constructor() {
        super();
        this.state = {
          loading: true
        }
      }

    render(){
        return(
            <Modal isOpen={this.props.modalCargando} className="static-modal" style={{marginTop: 5 + "%"}}>
                <ModalBody>
                    <Row className="justify-content-center" style={{margin:"-55px"}}>
                        <Col md="11">
                            <CardGroup>
                                <Card className="ColorTextModal bg-success " >
                                    <CardBody className="text-center">
                                        <div className="mt-2">
                                            <h4>{this.props.mensaje}</h4>
                                        </div>
                                    </CardBody>
                                </Card>
                                <Card className="border-primary">
                                    <CardBody>
                                        <div className="row">
                                            <div className="offset-sm-4 col-sm-4">
                                                <div className="spinner-border text-primary" style={{width: "3" + "rem", height: "3" + "rem"}} role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
        )
    }
}

export default ModalCargando;