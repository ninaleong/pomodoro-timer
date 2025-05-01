import React, { useState, useEffect } from 'react'; //useState manages internal app state. useEffect handles side effects.
import shiba from './shiba_inu_icon.webp';
import './App.css';

const POMODORO_DURATION = 25 * 60; // a constant holding 25 minutes in our timer

function App() {
  //create a state variable for the amount of seconds left in the timer
  const [secondsLeft, setSecondsLeft] = useState<number>(POMODORO_DURATION);

  //create a state variable that tracks if the timer is running or not
  const [isRunning, setIsRunning] = useState<boolean>(false);

  //useEffect runs everytime isRunning or secondsLeft states change
  //used to start/stop the countdown
  useEffect(() => {

    //variable to store the interval ID. 
    //NodeJS.Timeout is a timeout object specific to Node.js
    //For other browser apps, number is used instead
    let interval: NodeJS.Timeout; //NodeJS Timeout object

    //if the timer is active and not at zero,
    //decrease the seconds left by 1
    //1000 is the delay in milliseconds. 1000 milliseconds = 1 second
    if(isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } 
    //if the timer reaches 0, it's time to walk the Shiba :)
    else if (secondsLeft === 0) {
      setIsRunning(false);
      alert('Time to walk the Shiba!');
    }

    //clean the old interval whenever isRunning or secondsLeft states change
    //or the component unmounts in order to prevent overlapping timers
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  //convert seconds into MM:SS formatting
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  //manually set the isRunning state to false to stop the timer
  //manually reset the secondsLeft to the predetermined pomorodo time constant
  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(POMODORO_DURATION);
  };

  return (
    <div className="App">
      <h1>Shiba Pomodoro Timer</h1>
      <header className="App-header">
        <img src={shiba} className="App-logo" alt="logo" />
          <div className="timer">
            {formatTime(secondsLeft)}
            <div className="buttons">
              <button onClick={() => setIsRunning(!isRunning)}>
                {isRunning ? 'Pause' : 'Start'}
              </button><br></br>
              <button onClick={resetTimer} className="reset">Reset Timer</button>
            </div>
          </div>
      </header>
    </div>
  );
}

export default App;
