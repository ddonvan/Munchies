import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "./pickupDropdown.styles.css"


export const PickupDropdown = ({ onSelect }) => {
    const [pickupTimes, setPickupTimes] = useState([]);
    const [selectedPickupTime, setSelectedPickupTime] = useState('');

    useEffect(() => {
        // get current hour and minutes and calculate current time in 24hr format
        const currentHour = new Date().getHours();
        const currentMinute = new Date().getMinutes();
        const currentTime = currentHour * 60 + currentMinute;
        
        // all possible pickup times
        const allTimes = [
            'ASAP', '9:00', '9:30', '10:00',
            '10:30', '11:00', '11:30', '12:00',
            '12:30', '13:00', '13:30', '14:00',
            '14:30', '15:00', '15:30', '16:00',
            '16:30', '17:00', '17:30', '18:00',
            '18:30', '19:00', '19:30', '20:00',
            '20:30', '21:00', '21:30', '22:00' 
        ];

        // filter times and only show times from now to future
        const filteredTimes = allTimes.filter(time => {
            if(time === 'ASAP') return true;
            const [hourStr, minuteStr] = time.split(':');
            const hour = parseInt(hourStr);
            const minute = parseInt(minuteStr.split(' ')[0]);
            const timeInMinutes = hour * 60 + minute;
            return timeInMinutes >= currentTime;
        });
        

        setPickupTimes(filteredTimes);
    }, []);

    // selecting available times
    const handleSelect = (filteredTimes) => {
        console.log("Option:", filteredTimes);
        setSelectedPickupTime(filteredTimes);
        onSelect(filteredTimes);
        console.log("selected",selectedPickupTime);
    };

    useEffect(() => {
        console.log("selected(state):", selectedPickupTime);
    }, [selectedPickupTime]);

    

    return (
        <Dropdown>
          <Dropdown.Toggle variant="primary">
            {selectedPickupTime ? selectedPickupTime : 'Select Pickup Time'}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {pickupTimes.map((time, index) => (
              <Dropdown.Item key={index} onClick={() => handleSelect(time)}>
                {time}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
    );
}