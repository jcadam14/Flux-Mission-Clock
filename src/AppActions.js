import Dispatcher from './Dispatcher';
import * as Constants from './Constants';

class AppActions
{
    shiftContacts()
    {
        setTimeout(function(){Dispatcher.dispatch({actionName:Constants.SHIFT_CONTACTS})},3);
    }

    nextWarning()
    {
        Dispatcher.dispatch({actionName:Constants.NEXT_IN_WARNING});
    }

    currentWarning()
    {
        Dispatcher.dispatch({actionName:Constants.CURRENT_IN_WARNING});
    }

    currentDone()
    {
        setTimeout(function(){Dispatcher.dispatch({actionName:Constants.CURRENT_DONE})},1); 
    }

} 

export default new AppActions