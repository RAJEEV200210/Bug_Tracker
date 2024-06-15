import React, { useState } from 'react';

const TimeTracker = ({ task }) => {
    const [timeSpent, setTimeSpent] = useState(0);
    const [isTracking, setIsTracking] = useState(false);

    const startTracking = () => {
        setIsTracking(true);
    };

    const stopTracking = () => {
        setIsTracking(false);
        // Here you would typically update the time spent on the task in your data store
    };

    return (
        <div className="time-tracker">
            <h3>Time Tracker</h3>
            <p>Time Spent: {timeSpent} hours</p>
            {isTracking ? (
                <button onClick={stopTracking}>Stop</button>
            ) : (
                <button onClick={startTracking}>Start</button>
            )}
        </div>
    );
};

export default TimeTracker;
