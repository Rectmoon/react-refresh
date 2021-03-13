import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'
import { Button, Tabs } from 'ts-react-component'
export default class App extends Component {
  render () {
    return (
      <div className='app'>
        <Header />
        <Button foo='hello' />
        {/* <Tabs /> */}
        <Footer />
      </div>
    )
  }
}
