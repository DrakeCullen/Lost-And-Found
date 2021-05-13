import React from 'react'
import Layout from './layout'
import Banner from './components/authBanner'
import Item from './components/item'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Posts from './components/postsDelete';

function deletePost(props) {
  return (
    <Layout title={props.title}>
      <Banner name={props.user.firstName} desc="Be careful, deletion is permanent!"/>
      <Posts posts={props.posts} url="deletePost" action="/deletePost" phrase='Delete Post'/>
    </Layout>
  );
}


  
module.exports = deletePost;
