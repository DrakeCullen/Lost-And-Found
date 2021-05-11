import React from 'react'
import Layout from './layout'
import Banner from './components/banner'

function Index(props) {
  return (
    <Layout title={props.title}>
      <Banner />
    </Layout>

  );
}

module.exports = Index;