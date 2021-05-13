import React from 'react'
import Layout from './layout'
import Nav from './components/authentNavbar'
import Item from './components/item'
import Posts from './components/posts';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function otherUser(props) {
  let url = '/post/' + JSON.stringify(props.posts._id).replaceAll('"', '');
  return (
    <Layout title={props.title}>
      <Nav />
      <Card style={{width: '30%'}} className="mx-auto">
            <Card.Img className="ml-1 mr-1 mt-auto" top width="80%" src={props.posts.img.replaceAll('&#x2F;', '/')} />
            <Card.Body>
                <Card.Title>{props.posts.title}</Card.Title>
                <Card.Text>
                    {props.posts.description}
                </Card.Text>
                <Card.Text>
                 Contact user at:   {props.posts.contact}
                </Card.Text>
                <Button href={`/dashboard/${props.posts._id}`}>Go Back</Button>
            </Card.Body>
        </Card>
    </Layout>
  );
}
        
module.exports = otherUser;
