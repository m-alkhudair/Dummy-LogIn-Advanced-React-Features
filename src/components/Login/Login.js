import React, { useState, useEffect } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // Runs on each key stroke and only sets form as valid when email includes '@' and password is >6
  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);

    // setFormIsValid(
    //   event.target.value.includes('@') && enteredPassword.trim().length > 6
    // );
  };

  // This has the same logic as the handler above, we will use Effect improve this situation
  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    // setFormIsValid(
    //   event.target.value.trim().length > 6 && enteredEmail.includes('@')
    // );
  };

  // So we want to use Effet to run this logic in one place but having two dependencies, when they change, they trigger the code:
  useEffect(() => {
    // notice the same logic from the twin functions above, but with a small tweek and we commented out the that specific logic in said above functions
    // We need to add the dependencies or else the function will only run once (the first time).
    // if the depenencies "argument" was omitted, the function will always run every time the component is re-evaluated (state changes with each key stroke, and this is effectively like putting the logic outside of the useEffect()), this will creat an infinate loop
    // Now with the dependencies, if either one of their value change, the funciton will re-run, if none of them change the function will not run

    // Now this code will run on every keystroke (without the setTimeout()) because the state changes on every keystroke
    // In more complex cases that involve for ex http requests this would be too much network traffic. also for every key stroke react check whether it should update the dom
    // So now we need an Effect that does some clean up work
    // De-boucing: when the user make a paus after typing then we check validity, by using setTimeout() a function built into the browser.
    const identifier = setTimeout(() => {
      console.log('Checking form validity');
      setFormIsValid(
        enteredEmail.trim().length > 6 && enteredEmail.includes('@')
      );
    }, 500);

    // this has to return a function and only a function, this is for Clean Up. This a Clean Up Function.
    // This clean up function will run before the function above does except for the very first time and whenever the component housing this is reused (unmounds from the dom).
    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [enteredEmail, enteredPassword]);
  // Notice we're only updating the state here, it is only considered a side effect if we listen ot every key stroke and save that entered data and trigger another action in response. Side effect of user entering data. Can be use for many action that should be executed in response to any action.

  // IMPORTANT DEMONSTRATION must understan how useEffect works: A SUMMARY
  // If we add only the first argument, this will run when the componenet first mounts and then also for every state update, onBlur events and every keystroke
  // Because useEffct always runs after every component render cycle.
  // UPON ADDING and EMPTY array: now this only excute only the very first time the component mounts
  // now if we add a dependency, it will run the first time and anytime the dependency changes
  useEffect(() => {
    console.log('EFFECT RUNNING');

    // Now given that the second argument is an empty array the cleanpu function will not run unless when the component is removed from the dom, ex when we log in (the form is removed)!
    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, [])

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            // notice the onBlurs and their handlers, triggers when we unfocus from the input
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
