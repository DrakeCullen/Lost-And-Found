import React from 'react';
import {
    MDBNavbar,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBContainer,
    MDBNavbarToggler,
    MDBIcon
} from 'mdb-react-ui-kit';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';




export default function item(props) {
    let url = '/post/' + JSON.stringify(props.posts._id).replaceAll('"', '');
    return (
        <Form method="POST" action={`/deletePost/${props.posts._id}`}>
        <Card style={{ flex: 1 }} className="mx-4 my-5">
            <Card.Img className="ml-1 mr-1 mt-auto" top width="100%" src={props.posts.img.replaceAll('&#x2F;', '/')} />
            <Card.Body>
                <Card.Title>{props.posts.title}</Card.Title>
                <Card.Text>
                    {props.posts.description}
                </Card.Text>
                <Card.Text>
                 Contact user at:   {props.posts.contact}
                </Card.Text>
                <Button style={{backgroundColor:'red'}} type='submit'>Delete</Button>
            </Card.Body>
        </Card>
        </Form>
    );
}

