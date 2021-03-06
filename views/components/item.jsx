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
const hex2ascii = require('hex2ascii')



export default function item(props) {
    let url = '/post/' + JSON.stringify(props.posts._id).replaceAll('"', '');
    return (
        <Card style={{ flex: 1 }} className="mx-4 my-5">
            <Card.Img className="ml-1 mr-1 mt-auto" top width="100%" src={props.posts.img.replaceAll('&#x2F;', '/')} />
            <Card.Body>
                <Card.Title>{props.posts.title}</Card.Title>
                <Card.Text>
                    {props.posts.description}
                </Card.Text>
                <Card.Text>
                 Contact information:   {props.posts.contact}
                </Card.Text>
                <Button href={`${props.action}/${props.posts._id}`}>{props.phrase}</Button>
            </Card.Body>
        </Card>
    );
}