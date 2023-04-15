import React, { useState } from 'react';
import './css/Register.css';
import { Input, Button} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import {auth, googleProvider, db} from '../database/firebase';
import {FcGoogle} from 'react-icons/fc';
import Dialog from './Dialog';

export default function Register() {

  const navigate = useNavigate();

  const [displayDialog, setDisplayDialog] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleGoogleSignUp = () => {
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
          setDisplayDialog(true);
          navigate('/login');
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

  const handleClose = () => {
    setDisplayDialog(false);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      authUser.user.updateProfile({
        displayName: fullName
      })
      .then(() => {
        db.collection('users').doc(authUser.user.uid).set({
          name: fullName,
          email: email,
          photo: authUser.user.photoURL,
          uid: authUser.user.uid
        })
        .then(() => {
          setDisplayDialog(true);
          navigate('/login');
        })
        .catch((error) => {
          console.log(error);
        })
      })
      .catch((error) => {
        console.log(error);
      })
    })
    .catch((error) => {
      console.log(error);
    })
    setFullName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  }

  return (
    <div className='register'>
      <div className='register__container'>
        <h1>My Blog</h1>
        <form>
          <h5>Full Name</h5>
          <div className="fullNameDiv">
            <Input type='text' disableUnderline fullWidth value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>
          <h5>E-mail</h5>
          <div className="emailDiv">
            <Input type='email' disableUnderline fullWidth defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <h5>Password</h5>
          <div className="passwordDiv">
            <Input type='password' disableUnderline fullWidth defaultValue={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <h5>Confirm Password</h5>
          <div className="confirmPasswordDiv">
            <Input type='password' disableUnderline fullWidth defaultValue={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          <Button variant='contained' onClick={handleSignUp} type='submit' className='register__signUpButton'>Sign Up</Button>
          <Button onClick={handleGoogleSignUp} variant='contained' className='googleSignUp'><FcGoogle className='googleLogo' />Sign Up</Button>
        </form>
        <p>
          By registering you agree to the My Blog Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
        </p>
        <Button component={Link} to='/login' variant='contained' className='goToLoginButton'>Sign In</Button>
      </div>
      <Dialog displayDialog={displayDialog} handleClose={handleClose} dialogTitle='User Registered' dialogDescription='User Registered Successfully!' dialogButton='Close' />
    </div>
  )
}
