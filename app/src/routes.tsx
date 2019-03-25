import * as React from 'react'
import { Route } from 'react-router'
import Layout from './components/layout'
import Home from './components/home'
import FAQ from './components/faq'
import Policy from './components/policy'

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
    <Route exact path='/faq' component={FAQ} />
    <Route exact path='/policy' component={Policy} />
  </Layout>
)