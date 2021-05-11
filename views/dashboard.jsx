import React from 'react'
import Layout from './layout'
import Nav from './components/authentNavbar'
import Item from './components/item'
function Dashboard(props) {
  return (
    <Layout title={props.title}>
      <Nav />
      <Item />
      <h1>{props.title}</h1>
      <h2>Student Grades</h2>
      <h3>Welcome, {props.user.email}</h3>
      <a href="/courses/">Courses</a> | <a href="/users/profile">Profile</a> | <a href="/logout">Log out</a>
    </Layout>
  );
}

module.exports = Dashboard;
