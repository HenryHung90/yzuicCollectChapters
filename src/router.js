import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { firebase } from './firebase/firebase'

import Login from './views/Login/Login'
import Error from './views/Error/Error'
import Home from './views/Home/Home'

const App = () => {
  const [User, setUser] = useState("");
  const [IsAuth, setIsAuth] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        console.log(`User ${user._delegate.displayName} Login`)
        if (user) {
          setUser({
            UserName: user._delegate.displayName,
            UserEmail: user._delegate.email,
            UserPhoto: user._delegate.photoURL,
          })
          return setIsAuth(true)
        }
      }
    })
  }, [])

  if (IsAuth) {
    return (
      <Router>
        <Routes>
          <Route path='/Home' element={<Home Logout={() => { setIsAuth(false) }} User={User} />} />
          <Route path='/' element={<Home Logout={() => { setIsAuth(false) }} User={User} />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </Router>
    );
  } else {
    return (
      <Router>
        <Routes>
          <Route path='/test' element={<Home Logout={() => { setIsAuth(false) }} User={User} />} />
          <Route path='/Home' element={<Login Login={() => { setIsAuth(true) }} setUser={setUser} />} />
          <Route path='/' element={<Login Login={() => { setIsAuth(true) }} setUser={setUser} />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </Router>
    );
  }

}

export default App;
