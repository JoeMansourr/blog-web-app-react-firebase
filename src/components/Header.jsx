import React, { useState, useEffect } from 'react';
import './css/Header.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { firebase, auth } from '../database/firebase';
import 'firebase/auth';

export default function Header() {

  const refreshPage = () => {
    window.location.reload();
  }

  const ButtonStyle = {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 600,
    color: '#000'
  }

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, [])

  const handleLogout = (e) => {
    e.preventDefault();
    firebase.auth().signOut()
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    })
  }

  const user = auth.currentUser;
  const name = user?.displayName;

  return (
    <div className='header'>
        <div className="header__title">
            <h1 onClick={refreshPage}>My Blog</h1>
        </div>
        <div className="header__userStatus">
          {
            isLoggedIn ? (
              <>
                <Button component={Link} to='/create-post' variant='text' style={ButtonStyle}>Create a Post</Button>
                <Button onClick={handleLogout} variant='text' style={ButtonStyle}>{`Logout (${name})`}</Button>
              </>
            ) : (
              <>
                <Button component={Link} to='/login' variant='text' style={ButtonStyle}>Login</Button>
                <Button component={Link} to='/register' variant='text' className='btnRegister' style={ButtonStyle}>Register</Button>
              </>
            )
          }
        </div>
    </div>
  )
}
