import React from 'react';
import './css/Blog.css';
import Header from './Header';
import Post from './Post';
import {db} from '../database/firebase';
import { useQuery } from 'react-query';
import { Pulsar } from '@uiball/loaders';

export default function Blog() {
  const fetchPosts = async () => {
    const response = await db.collection('Post').get();
    const data = response.docs.map(doc => {
      const postData = doc.data();
      postData.postId = doc.id;
      return postData;
    });
    return data;
  }  

  const {isLoading, data} = useQuery('posts', fetchPosts);

  if(isLoading){
    return(
      <div className="spinner">
        <Pulsar size={35} color='#000' />
      </div>
    ) 
  }

  return (
    <div className='blog'>
        <Header />
        {data && data.map(post => {
          return(
            <>
              <Post key={post.postId} postTitle={post.postTitle} imageURL={post.imageURL} userAvatar={post.userAvatar} postAuthor={post.postAuthor} postTimestamp={post.postTimestamp} postDescription={post.postDescription} postId={post.postId} />
            </>
          )
        })}
    </div>
  )
}