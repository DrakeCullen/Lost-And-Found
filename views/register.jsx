import React from 'react';
import Layout from './layout';
import Message from './components/message';
import Navbar from './components/navbar'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBIcon } from 'mdbreact';
import { FaEnvelope, FaFacebookF, FaLinkedin, FaYoutube } from 'react-icons/fa'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Register(props) {
  return (
    <Layout title={props.title}>
      <Navbar />
      <div className="py-4" style={{ backgroundColor: "#131313", color: "white" }}>
        <div className='App d-flex flex-column align-items-center'>
          <h1>Register</h1>
          <Form style={{ width: '300px' }} method="POST" action="/register">
            <Form.Group>
              <Form.Label >First Name</Form.Label>
              <Form.Control type='text' name="firstName" required placeholder="First Name" value={(props.firstName) ? props.firstName : null} />
            </Form.Group>
            <Form.Group>
              <Form.Label className="mt-3">Last Name</Form.Label>
              <Form.Control type='text' name="lastName" required placeholder="Last Name" value={(props.lastName) ? props.lastName : null}/>
            </Form.Group>
            <Form.Group>
              <Form.Label className="mt-3">Email</Form.Label>
              <Form.Control type='text' name="email" required placeholder="Email" value={(props.email) ? props.email : null}/>
            </Form.Group>
            <Form.Group>
              <Form.Label className="mt-3">Password</Form.Label>
              <Form.Control type="password" name="password" required placeholder="**********" value={(props.password) ? props.password : null}/>
            </Form.Group>
            <Form.Group>
              <Form.Label className="mt-3">Password</Form.Label>
              <Form.Control type="password" name="password1" required placeholder="Enter password again" value={(props.password1) ? props.password1 : null}/>
            </Form.Group>
            <Button type='submit' className="mt-3 mb-3 btn-success">Sign Up</Button>
          </Form>
          <h4 className="text-center pt-4" style={{ fontSize: '1.4rem' }}>Are you looking to sign in?
            </h4>
            <Button href="/login"> Sign in</Button>
        </div>
        <Message messages={props.errors} />
      </div>
    </Layout>
  );
}

module.exports = Register;



{/* <Layout title={props.title}>

         
         
          <input type="text" name="email" required placeholder="Email" />
        </label><br />
        <label>
          <input type="password" name="password" required placeholder="Password" />
        </label><br />
        <label>
          <input type="password" name="password1" required placeholder="Re-enter password" />
        </label>
        <br /> <br />
        <button type="submit">Sign up</button>
        <br /> <br />
        <h2>Already have an account? <a href="/login">Log in</a></h2>
      </form>
    </Layout> */}