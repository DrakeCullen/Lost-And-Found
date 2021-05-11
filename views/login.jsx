import React from 'react';
import Layout from './layout';
import Message from './components/message'
import Navbar from './components/navbar'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBIcon } from 'mdbreact';


function Login(props) {
  return (
    <Layout title={props.title}>
      <MDBContainer>
  <MDBRow>
    <MDBCol md="6">
      <form>
        <p className="h5 text-center mb-4">Subscribe</p>
        <div className="grey-text">
          <MDBInput label="Your name" icon="user" group type="text" validate error="wrong"
            success="right" />
          <MDBInput label="Your email" icon="envelope" group type="email" validate error="wrong"
            success="right" />
        </div>
        <div className="text-center">
         
        </div>
      </form>
    </MDBCol>
  </MDBRow>
</MDBContainer>
    </Layout>
  );
}

module.exports = Login;
/*
return (
  <Layout title={props.title}>
    <Navbar />
    <h1>Log in</h1>
    <Message messages={props.errors} />
    <form method="POST" action="/login">
      <label>Email:
        <input type="text" name="email" required placeholder="Email" />
      </label><br />
      <label>Password:
        <input type="password" name="password" required placeholder="Password" />
      </label>
      <br /><br />
      <button type="submit">Log in</button> <br />
      <h2>Don't have an account yet?
        <a href="/register"> Sign up</a>
      </h2>
    </form>
  </Layout>
); */