import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { FaTwitter, FaFacebookF, FaLinkedin, FaYoutube} from 'react-icons/fa'


function footer() {
    return (
        <MDBFooter style={{ backgroundColor: "#1561F0", color: "white" }} className="font-small pt-4 mt-4">
            <MDBContainer fluid className="text-center text-md-left">
                <MDBRow>
                <MDBCol md="3"> </MDBCol>
                    <MDBCol md="6">
                        <h5 className="title">Thank you for checking out the website!</h5>
                        <p>
                            We are always working to improve customer experience. Follow us on social media:
                        </p>
                        <div style={{fontSize: '2.5vw' }}>
                        <FaTwitter className="mx-2 "/>
                        <FaFacebookF className="mx-2" />
                        <FaLinkedin className="mx-2" />
                        <FaYoutube className="mx-2" />
                        </div>
                    </MDBCol>
                  
                </MDBRow>
            </MDBContainer>
            <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                <div className="footer-copyright text-center py-3">
                    <MDBContainer fluid >
                        &copy; {new Date().getFullYear()} Copyright: Drake Cullen
        </MDBContainer>
                </div>
            </div>
        </MDBFooter>
    );
}

module.exports = footer;