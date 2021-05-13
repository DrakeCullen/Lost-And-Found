import React from 'react'
import Layout from './layout'
import Banner from './components/banner'
import Item from './components/item'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Posts from './components/posts';



function Index(props) {
  return (
    <Layout title={props.title}>
      <Banner />
      <Posts posts={props.posts} action="/login" phrase='View Post'/>
    </Layout>
  );
}

module.exports = Index;
