import React, { Component } from 'react';
import './Contacts.css';
import Countdown from 'react-countdown-now';
import { Label } from 'react-bootstrap';

class NextContactPanel extends Component
{
    render()
    {
        const elem = 
            <Countdown 
                date={this.props.aosTime} 
                onComplete={this.props.onComplete} 
                onTick={this.props.onTick}/>
        return (<div className={this.props.style}><Label>
                    <div>{elem}
                    </div>
                    {this.props.child}
                </Label></div>);
    }
}

export default NextContactPanel