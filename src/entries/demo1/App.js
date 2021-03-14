import React, { Component } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Button from '../../libs/tsc-un-extract/components/Button'
export default class App extends Component {
  render () {
    return (
      <div className='app'>
        <Header title='我是demo1' />
        <Button foo='hello' />
        <Footer />
      </div>
    )
  }
}
