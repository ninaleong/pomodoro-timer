import React, { useState, useEffect } from 'react'; //useState manages internal app state. useEffect handles side effects.
import shiba from './shiba_inu_icon.webp';
import './App.css';

const POMODORO_DURATION_15 = 15 * 60;
const POMODORO_DURATION_25 = 25 * 60;
const POMODORO_DURATION_30 = 30 * 60;
const POMODORO_DURATION_60 = 60 * 60;
const POMODORO_BREAK = 0;

function App() {
  //create a state variable for the amount of seconds left in the timer
  const [secondsLeft, setSecondsLeft] = useState<number>(POMODORO_BREAK);

  //create a state variable that tracks if the timer is running or not
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const [selectedTimer, setSelectedTimer] = useState('');

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
    if(secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } 
    //if the timer reaches 0, it's time to walk the Shiba :)
    else if (secondsLeft === 0 && isRunning) {
      //setIsRunning(false);
      alert('Time to walk the Shiba!');
    }

    //clean the old interval whenever isRunning or secondsLeft states change
    //or the component unmounts in order to prevent overlapping timers
    return () => clearInterval(interval);
  }, [secondsLeft]);

  //convert seconds into MM:SS formatting
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleTimer = (id: '15-minutes' | '25-minutes' | '30-minutes' | '60-minutes' | 'reset') => {
    resetTimer(id);
    setSelectedTimer(id);
    //setIsRunning((prev) => !(prev));
  };

  //manually set the isRunning state to false to stop the timer
  //manually reset the secondsLeft to the predetermined pomorodo time constant
  const resetTimer = (id: '15-minutes' | '25-minutes' | '30-minutes' | '60-minutes' | 'reset') => {
    
    if(id !== 'reset') {
      setIsRunning(true);
    } else {
      setIsRunning(false);
    }

    switch(id) {
      case '15-minutes':
        setSecondsLeft(POMODORO_DURATION_15);
        break;
      case '25-minutes':
        setSecondsLeft(POMODORO_DURATION_25);
        break;
      case '30-minutes':
        setSecondsLeft(POMODORO_DURATION_30);
        break;
      case '60-minutes':
          setSecondsLeft(POMODORO_DURATION_60);
          break;
      default:
        setSecondsLeft(POMODORO_BREAK);
    }
  };

  return (
    <div className="App">
      <h1>Shiba Pomodoro Timer</h1>
      <header className="App-header">
        <img src={shiba} className="App-logo" alt="logo" />
          <div className="timer">
            {formatTime(secondsLeft)}
            <div className="buttons">
              <button onClick={() => handleTimer('15-minutes')}>
                {selectedTimer === '15-minutes' ? 'Pause' : '15 Minutes'}
              </button>
              <button onClick={() => handleTimer('25-minutes')}>
                {selectedTimer === '25-minutes' ? 'Pause' : '25 Minutes'}
              </button>
              <button onClick={() => handleTimer('30-minutes')}>
                {selectedTimer === '30-minutes' ? 'Pause' : '30 Minutes'}
              </button>
              <button onClick={() => handleTimer('60-minutes')}>
                {selectedTimer === '60-minutes' ? 'Pause' : '60 Minutes'}
              </button><br></br>
              <button onClick={() => handleTimer('reset')} className="reset">Reset Timer</button>
            </div>
          </div>
      </header>
    </div>
  );
}

export default App;
