import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

// Note: storage in the browser: cookies or local storage.
// Here we will use local storage because it is easy to work with. built-in independent of react

function App() {
  // Without usEffect(), this will cause the data to be lost upon reloading or re-rendering
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // This would create an infinate loop! But inside useEffect() it will allow us to control when the code below runs
    //  IMPORTANT: this code will be executed AFTER the whole component is re-evaluated and ONLY if the specified dependencies change.
    // So when the app starts for the very first time. It will be considered that the dependencies have changed! so it will run. but after than no. in this case because we didn't specify any dependencies, this code will only run ONCE. This is exactly what we want at the moment.
   const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
   if (storedUserLoggedInInformation === '1') {
     setIsLoggedIn(true);
   }
  }, []);
  // Notice empty array not omitted

  
  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways

    // using local storage:
    // 1 meaning user logged in 0 meaning user not logged in
    // you can find this key-value paire in dev tools under local storage
    localStorage.setItem('isLoggedIn', '1') 
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
