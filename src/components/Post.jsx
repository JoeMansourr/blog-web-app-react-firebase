import React from 'react';
import './css/Post.css';
import { Avatar } from '@mui/material';
import { firebase } from '../database/firebase';
import { MdOutlineModeEditOutline, MdDelete } from 'react-icons/md';
import { auth } from '../database/firebase';
import { Link } from 'react-router-dom';

export default function Post({imageURL, postTitle, userAvatar, postAuthor, postTimestamp, postDescription, postId, userId}) {
    
    const user = auth.currentUser;
    const name = user?.displayName;

    const formattedTimestamp = postTimestamp instanceof firebase.firestore.Timestamp
    ? postTimestamp.toDate().toLocaleString()
    : '';

    const deletePost = (postId) => {
        const postRef = firebase.firestore().collection('Post').doc(postId);
        postRef.delete();
    }
  
    return (
    <div className='post'>
        <div className="post__container">
            <div className="post__image">
                <img src={imageURL} alt="post" />
            </div>
            <div className="post__content">
                <div className="post__title">
                    <h1>{postTitle}</h1>
                    {
                        postAuthor === name && (
                            <>
                                <Link to={`/edit-post/${postId}`}>
                                    <MdOutlineModeEditOutline color='#000' size={30} cursor={'pointer'} />
                                </Link>
                                <MdDelete color='#000' size={30} cursor={'pointer'} onClick={() => deletePost(postId)} />
                            </>
                        )
                    }
                </div>
                <div className="user__status">
                    <div className="post__userAvatar">
                        <Avatar className='userAvatar' src={userAvatar} />
                    </div>

                    <div className="post__user">
                        <span>{postAuthor}</span>
                    </div>
                    
                    <div className="post__timestamp">
                        <span>{formattedTimestamp}</span>
                    </div>
                </div>
                <div className="post__description">
                    <p>{postDescription}</p>
                </div>
            </div>
        </div>
    </div>
  )
}
