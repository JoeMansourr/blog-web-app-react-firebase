import React, { useState, useLayoutEffect } from 'react';
import { TextField, Button, Input } from '@mui/material';
import './css/PostBox.css';
import { storage, db, auth } from '../database/firebase';
import { useParams, Link } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';

export default function EditPost() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [postID, setPostID] = useState(null);
  const [author, setAuthor] = useState('');

  const { postId } = useParams();

  useLayoutEffect(() => {
    const fetchPostData = async () => {
      const docRef = await db.collection('Post').doc(postId).get();
      const postData = docRef.data();
      if (postData) {
        setTitle(postData.postTitle);
        setDescription(postData.postDescription);
        setImage(postData.imageURL);
        setPostID(postId);
        setAuthor(postData.postAuthor);
      }
    };
    fetchPostData();
  }, [postId]);

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
    if (!user) {
      console.error('User is not authenticated');
      return;
    }

    const name = user.displayName;
    const storageRef = storage.ref();

    if (image) {
      const imageRef = storageRef.child(image.name);
      await imageRef.put(image);
      const imageURL = await imageRef.getDownloadURL();
      db.collection('Post')
        .doc(postID)
        .update({
          postTitle: title,
          imageURL: imageURL,
          postDescription: description,
          postAuthor: name,
          postTimestamp: new Date(),
        })
        .then(() => {
          console.log('Document successfully updated!');
        })
        .catch((error) => {
          console.error('Error updating document: ', error);
        });
    } else {
      db.collection('Post')
        .doc(postID)
        .update({
          postTitle: title,
          postDescription: description,
          postAuthor: name,
          postTimestamp: new Date(),
        })
        .then(() => {
          console.log('Document successfully updated!');
        })
        .catch((error) => {
          console.error('Error updating document: ', error);
        });
    }
  };

  return (
    <div className='postBox'>
        <Link to='/'>
          <AiFillHome color='#000' size={40} className='home' />
        </Link>
        <div className='postBox__title'>
            <h1>Edit Post</h1>
        </div>
        <div className='postBox__container'>
            <TextField
              label='Title'
              variant='outlined'
              value={title}
              onChange={handleTitleChange}
              className='text-field'
            />
    
            <TextField
              label='Description'
              variant='outlined'
              multiline
              rows={4}
              value={description}
              onChange={handleDescriptionChange}
              className='text-field'
            />
    
            <Input
              type='file'
              onChange={handleImageChange}
              fullWidth
              disableUnderline
              placeholder={image ? image.name : 'Choose an image'}
            />

            <label>Author: {author}</label>

            <Button
              variant='contained'
              color='primary'
              onClick={handleSubmit}
              className='button'
            >
            Update Post
            </Button>
        </div>
    </div>
    )
}