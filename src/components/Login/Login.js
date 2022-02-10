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
    setFormIsValid(
      enteredEmail.trim().length > 6 && enteredEmail.includes('@')
    );
  }, [enteredEmail, enteredPassword]);
  // Notice we're only updating the state here, it is only considered a side effect if we listen ot every key stroke and save that entered data and trigger another action in response. Side effect of user entering data. Can be use for many action that should be executed in response to any action.

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
