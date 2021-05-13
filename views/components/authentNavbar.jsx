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
import { FaHome, FaUser, FaSignOutAlt, FaPost } from 'react-icons/fa'


export default function authentNavbar() {
  return (
    <div>
      <MDBNavbar expand='sm' light bgColor='white' className="mb-2 py-0">
        <MDBContainer fluid>
          <a href="/">
            <FaHome className="py-0 my-0" style={{ color: "black", fontSize: "1.5vw" }} />
          </a>
          <MDBNavbarToggler
            aria-controls='navbarExample01'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <MDBIcon fas icon='bars' />
          </MDBNavbarToggler>
          <div className='collapse navbar-collapse'>
            <MDBNavbarNav right >
              <MDBNavbarItem active>
              </MDBNavbarItem>
              <MDBNavbarItem active>
                <MDBNavbarLink className="py-0 my-0" aria-current='page' href='/dashboard' style={{ color: "black", fontSize: "1.5vw" }}>
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem active>
                <MDBNavbarLink className="py-0 my-0" aria-current='page' href='/post' style={{ color: "black", fontSize: "1.5vw" }}>
                |  New Post
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem active>
                <MDBNavbarLink className="py-0 my-0" aria-current='page' href='/userPosts' style={{ color: "black", fontSize: "1.5vw" }}>
                |  Edit Posts
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem active>
                <MDBNavbarLink className="py-0 my-0" aria-current='page' href='/deletePost' style={{ color: "black", fontSize: "1.5vw" }}>
                |  Delete Posts
                </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
            

            <a href="/users/profile">
              <FaUser className="py-0 my-0 " style={{ color: "black", fontSize: "1.5vw" }} />
            </a>
            <MDBNavbarLink className="py-0 my-0" href='/users/profile' style={{ color: "black", fontSize: "1.5vw" }}>Profile</MDBNavbarLink>

            <a href="/logout">
              <FaSignOutAlt className="py-0 my-0 " style={{ color: "black", fontSize: "1.5vw" }} />
            </a>
            <MDBNavbarLink className="py-0 my-0" href='/logout' style={{ color: "black", fontSize: "1.5vw" }}>Logout</MDBNavbarLink>
          </div>
        </MDBContainer>
      </MDBNavbar>
    </div>
  );
}