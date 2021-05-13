import React from 'react';
import Layout from '../layout';
import Message from './message'
import Nav from './authentNavbar'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBIcon } from 'mdbreact';
import { FaEnvelope, FaFacebookF, FaLinkedin, FaYoutube } from 'react-icons/fa'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function post(props) {
    let action = "/post/"
    if (props.post)
        action += props.post._id ? props.post._id : ''
    return (
        <Layout title={props.title}>
            <Nav />
            <div className="py-4" style={{ backgroundColor: "#131313", color: "white" }}>
                <div className='App d-flex flex-column align-items-center'>
                    <h1>{props.title}</h1>
                    <Message messages={props.errors} />
                    <Form method="POST" style={{ width: '300px' }} action={action}>
                        <Form.Group>
                            <Form.Label >Title</Form.Label>
                            <Form.Control type='text' required placeholder="Lost Blue Hydroflask" name="title" value={(props.post.title) ? props.post.title : null} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label >Description</Form.Label>
                            <Form.Control type='textarea' required placeholder="Enter description here" name="description" value={(props.post.description) ? props.post.description : null} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label >Contact</Form.Label>
                            <Form.Control type='text' required placeholder="hello@gmail.com" name="contact" value={(props.post.contact) ? props.post.contact : null} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label >Image URL</Form.Label>
                            <Form.Control type='text' required placeholder="https://dogpicture.com" name="img" value={(props.post.img) ? props.post.img.replaceAll('&#x2F;', '/') : null} />
                        </Form.Group>
                        <Button className="btn-success mt-3" type="submit">Save</Button>
                        <br /> <br />
                    </Form>
                    <h4 className="text-center pt-4" style={{ fontSize: '1.4rem' }}>Did you change your mind?</h4>
                    <Button className="btn-warning text-center" href="/dashboard">Cancel </Button>
            </div>
            </div>
        </Layout >
    );
}

module.exports = post;

