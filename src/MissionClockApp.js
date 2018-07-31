import React, { Component } from 'react';
import TimerStore from './TimerStore';
import NextContactPanel from './NextContactPanel';
import CurrentContactPanel from './CurrentContactPanel';
import AppActions from './AppActions';
import * as Constants from './Constants';
import {ProgressBar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';


class MissionClockApp extends Component
{
    constructor(props){
        super(props);
        this.state = {
          currentContact:TimerStore.getCurrentContact(),
          nextContact:TimerStore.getNextContact()
        };
        this.onChange = this.onChange.bind(this);
        this.shiftContacts = this.shiftContacts
        .bind(this);
        this.onNextTick = this.onNextTick.bind(this);
        this.onCurrentTick = this.onCurrentTick.bind(this);
        this.onCurrentComplete = this.onCurrentComplete.bind(this);
    }

    componentWillMount()
    {
        TimerStore.addChangeListener(this.onChange);
    }

    onChange()
    {
        this.setState({currentContact:TimerStore.getCurrentContact()});
        this.setState({nextContact:TimerStore.getNextContact()});
    }

    shiftContacts()
    {
        setTimeout(function(){AppActions.shiftContacts()},1);
    }

    onNextTick()
    {
        if((this.state.nextContact.style !== 'next-warn-style') && 
            ((this.state.nextContact.aosTime - 60000) < Date.now()))
        {
            AppActions.nextWarning();
        }
    }

    onCurrentTick()
    {
        if((this.state.currentContact.style !== Constants.CURRENT_WARN_STYLE) &&
            (this.state.currentContact.losTime - Constants.CURRENT_WARNING_TIME) < Date.now())
        {
            AppActions.currentWarning();
        }
    }

    onCurrentComplete()
    {
        AppActions.currentDone();
    }


    render()
    {
        const {currentContact,nextContact} = this.state;
        const currentElement = (currentContact ? <CurrentContactPanel 
                    style={currentContact.style}
                    losTime={currentContact.losTime}
                    onTick={() => this.onCurrentTick()}
                    onComplete={() => this.onCurrentComplete()}
                    child='Current Contact'/> : <span/>)
        return (<div>
            Testing Timers
        {currentElement}
        <NextContactPanel
            style={nextContact.style}
            aosTime={nextContact.aosTime}
            onTick={() => this.onNextTick()}
            onComplete={() => this.shiftContacts()}
            child={nextContact.label}/>
        </div>);
    }
}

export default MissionClockApp