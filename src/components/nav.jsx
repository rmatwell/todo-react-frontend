import React from 'react';
import { Link } from 'react-router-dom';

export default class Nav extends React.Component {
    render() {
        return (
            <nav className="Nav">
                <div className="Nav__container">
                    <Link to="/" className="Nav__brand">
                        <img src="logo192.png" className="Nav__logo" />
                    </Link>

                    <div className="Nav__right">
                        <ul className="Nav__item-wrapper">
                            <li className="Nav__item">
                                <Link className="Nav__link" to="/">Link 1</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}