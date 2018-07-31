import React, { Component } from 'react';

class Header extends Component
{
    render()
    {
        const headerString = function(){
                return "My React App!";
        }
        return <div>{headerString()}</div>;
    }
}

export default Header;