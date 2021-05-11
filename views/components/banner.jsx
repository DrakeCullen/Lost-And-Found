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
import Navbar from './navbar'

export default function banner() {
  return (
    <header className="">
      <Navbar />
      <div
        className='p-5 text-center bg-image'
        style={{ backgroundImage: "url('https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.readytodesign.com%2Fimages%2Ftop-bnr-8.jpg&f=1&nofb=1')", backgroundSize: 'cover', height: 300 }}
      >
        <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='text-white'>
              <h1 className='mb-3'>Lost and Found</h1>
              <h4 className='mb-3'>Find your lost items instantly online!</h4>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}