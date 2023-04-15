import React, {useState} from 'react';
import './css/Login.css';
import { Input, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import {auth, googleProvider, db} from '../database/firebase';
import {FcGoogle} from 'react-icons/fc';

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    auth.signInWithPopup(googleProvider)
    .then((result) => {
      const user = result.user;
      if(user){
        db.collection('users').doc(user.uid).set({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          uid: user.uid
        })
        .then(() => {
          navigate('/');
        })
        .catch((error) => {
          console.log(error);
        })
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

    const handleSignIn = e => {
      e.preventDefault();
      auth.signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        navigate('/');
      })
      .catch((error) => {
        alert(error.message);
      })
    }

  return (
    <div className='login'>
      <div className='login__container'>
      <h1>My Blog</h1>
        <form>
          <h5>E-mail</h5>
          <div className="email">
            <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)} disableUnderline fullWidth />
          </div>
          <h5>Password</h5>
          <div className="password">
            <Input type='password' value={password} onChange={(e) => setPassword(e.target.value)} disableUnderline fullWidth />
          </div>
          <Button variant='contained' onClick={handleSignIn} type='submit' className='login__signInButton'>Sign In</Button>
          <Button onClick={handleGoogleSignIn} variant='contained' className='googleSignUp'><FcGoogle className='googleLogo' />Sign In</Button>
        </form>
        <p>
          By signing-in you agree to the Blog Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
        </p>
        <Button component={Link} to='/register' variant='contained' className='goToRegisterButton'>Sign Up</Button>
      </div>
    </div>
  )
}
