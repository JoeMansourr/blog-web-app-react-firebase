import React, { useState } from 'react';
import {TextField, Button, Input} from '@mui/material';
import './css/PostBox.css';
import { storage, db, auth } from '../database/firebase';
import { AiFillHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';

export default function PostBox({ postId }) {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };  
      
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async () => {
    const user = auth.currentUser;
    const name = user.displayName;
  
    const storageRef = storage.ref();
    const imageRef = storageRef.child(image.name);
  
    await imageRef.put(image);
  
    const imageURL = await imageRef.getDownloadURL();
  
    db.collection('Post').add({
      postTitle: title,
      imageURL: imageURL,
      postDescription: description,
      postAuthor: name,
      postTimestamp: new Date(),
      userId: user.uid,
    }).then(() => {
      setTitle('');
      setImage(null);
      setDescription('');
    }).catch((error) => {
      console.error('Error adding document: ', error);
    });
  };  

  return (
    <div className='postBox'>
        <Link to='/'>
          <AiFillHome color='#000' size={40} className='home' />
        </Link>
        <div className="postBox__title">
            <h1>Create Post</h1>
        </div>
        <div className="postBox__container">
            <TextField
                label="Title"
                variant="outlined"
                value={title}
                onChange={handleTitleChange}
                className='text-field'
            />

            <TextField
                label="Description"
                variant="outlined"
                multiline
                rows={4}
                value={description}
                onChange={handleDescriptionChange}
                className='text-field'
            />

            <Input type='file' onChange={handleImageChange} fullWidth disableUnderline placeholder={image ? image.name : "Choose an image"} />

            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                className='button'
                >
                Create Post
            </Button>
        </div>
    </div>
  );
}
