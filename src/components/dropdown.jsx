import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import React from 'react';

const DropDownButton = () => {
    return (
        <DropdownButton id="dropdown-menu-align-right" title="" menuAlign="left" size="sm">
            <Dropdown.Item href="#/action-1" drop="left">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        </DropdownButton>
    );
};

export default DropDownButton;