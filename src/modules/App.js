import React from 'react';
import Nav from 'react-bootstrap/Nav'

export default class App extends React.Component {

    render() {
        return (
            <div>
                <h1>React Router Tutorial</h1>
                <Nav>
                    <ul>
                        <li><Nav.Link href="/" >Home</Nav.Link></li>
                        <li><Nav.Link href="/dashboard">Dashboard</Nav.Link></li>
                        <li><Nav.Link href="/register">Register</Nav.Link></li>
                        <li><Nav.Link href="/login">Login</Nav.Link></li>
                    </ul>
                    {this.props.children}
                </Nav>
            </div>
        )
    }
}