import React, { Component } from 'react';
import './Contacts.css';
import Countdown from 'react-countdown-now';
import { Label } from 'react-bootstrap';
import {ProgressBar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

const warningTime = 60000;

class CurrentContactPanel extends Component
{

    render()
    {
        const {style, losTime, onComplete, onTick} = this.props;
        const progress = ((losTime - Date.now())/100);
        return (<div className={style}><Label>
                    <div><Countdown 
                            date={losTime} 
                            onComplete={onComplete} 
                            onTick={onTick}/>
                    </div>
                    {this.props.child}
                </Label></div>);
    }
}

export default CurrentContactPanel