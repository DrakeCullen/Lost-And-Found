import React from 'react';
import Layout from './layout';
import Message from './components/message'
import Navbar from './components/navbar'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBIcon } from 'mdbreact';
import { FaEnvelope, FaFacebookF, FaLinkedin, FaYoutube } from 'react-icons/fa'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Login(props) {
  return (
    <Layout title={props.title}>
      <Navbar />
      <div className="py-4" style={{ backgroundColor: "#131313", color: "white" }}>
        <div className='App d-flex flex-column align-items-center'>
          <h1>Login</h1>
          <Form style={{ width: '300px' }} method="POST" action="/login">
            <Form.Group>
              <Form.Label >Email</Form.Label>
              <Form.Control type='text' required placeholder="hello@gmail.com" name="email" value={(props.email) ? props.email : null}/>
            </Form.Group>
            <Form.Group>
              <Form.Label className="mt-3">Password</Form.Label>
              <Form.Control type='password' required placeholder="**********" name="password"/>
            </Form.Group>
            <Button type='submit' className="mt-3 mb-3 btn-success">Login</Button>
          </Form>
          <h4 className="text-center pt-4" style={{ fontSize: '1.4rem' }}>Do you need to create a new account?
            </h4>
            <Button href="/register"> Sign up</Button>
        </div>
        <Message messages={props.errors} />
      </div>
    </Layout>
  );
}

module.exports = Login;
