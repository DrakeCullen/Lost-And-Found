import React from 'react'
import Layout from './layout'
import Banner from './components/authBanner'
import Item from './components/item'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Posts from './components/posts';

function userPosts(props) {
  return (
    <Layout title={props.title}>
      <Banner name={props.user.firstName} desc="Edit any of your posts below!"/>
      <Posts posts={props.posts} url='post' action="/post" phrase='Edit Post'/>
    </Layout>
  );
}

module.exports = userPosts;
