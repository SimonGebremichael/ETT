import React from 'react'
import Teamlead from './Teamlead/Teamlead';
import Calendar from './calendar/calendarMain';

export default function Body() {
    if(1 == 2){
        return (<Teamlead />);
    }else{
        return(<Calendar />);
    }
}
