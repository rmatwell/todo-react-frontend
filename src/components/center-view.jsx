import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'


export default class CenterView extends React.Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col xl lg md sm xs="auto"></Col>
                    <Col xl lg md sm xs="auto">{this.props.children}</Col>
                    <Col xl lg md sm xs="auto"></Col>
                </Row>
            </Container>
        )
    }
}