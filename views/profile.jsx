import React from 'react';
import Layout from './layout';
import Message from './components/message';
import Banner from './components/authBanner'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: props.messages,
      title: props.title,
      msg: "",
      email: props.user.email,
      firstName: props.user.firstName,
      lastName: props.user.lastName,
    };
    // this is not working with static server-side rendering React
    //this.handleSubmit = this.handleSubmit.bind(this);
    //this.handleInputChange = this.handleInputChange.bind(this);
  }

  render() {
    return (
      <Layout title={this.state.title}>
        <Banner name={this.props.user.firstName} desc="Update your profile!" />
        <Message messages={this.state.messages} />
        <div className="py-4" style={{ backgroundColor: "#131313", color: "white" }}>
          <div className='App d-flex flex-column align-items-center'>
            <form method="POST" onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label className="mt-3">Email</Form.Label>
                <Form.Control type="text" name="email" required value={this.state.email} onChange={this.handleInputChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label className="mt-3">First Name</Form.Label>
                <Form.Control type="text" name="fname" required value={this.state.firstName} onChange={this.handleInputChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label className="mt-3">Last Name</Form.Label>
                <Form.Control type="text" name="lname" required value={this.state.lastName} onChange={this.handleInputChange} />
              </Form.Group>
              <Button className="btn-success mt-3" type="submit">Update</Button>
            </form>
            <h4 className="text-center pt-4" style={{ fontSize: '1.4rem' }}>Did you change your mind?</h4>
            <Button className="btn-warning" href="/dashboard">Cancel </Button>
          </div>
        </div>
      </Layout>
    );
  }


  handleInputChange(event) {
    //const target = event.target;
    //const name = target.name;
    //const value = target.value;
    this.setState({
      // ES6 variable as property name syntax
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('/profile',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.state.email,
          fname: this.state.firstName,
          lname: this.state.lastName
        }),
      })
      .then(result => result.json())
      .then(json => {
        this.setState({
          msg: json.msg,
          email: json.email,
          firstName: json.firstName,
          lastName: json.lastName,
        });
      })
  }
}

module.exports = Profile;