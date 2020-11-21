import React from 'react';
import NavLink from './NavLink'


export default class App extends React.Component {

    render() {
        return (
            <div>
                <h1>React Router Tutorial</h1>
                <ul>
                    <li><NavLink to="/" onlyActiveOnIndex>Home</NavLink></li>
                    <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                    <li><NavLink to="/register">Register</NavLink></li>
                    <li><NavLink to="/login">Login</NavLink></li>
                </ul>
                {this.props.children}
            </div>
        )
    }
}