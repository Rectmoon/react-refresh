import React, { Component } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Button from '../../libs/tsc-extract/components/Button'
import '../../libs/tsc-extract/components/Button/index.css'

export default class App extends Component {
  render () {
    return (
      <div className='app'>
        <Header title='我是demo2' />
        <Button foo='hello' />
        <Footer />
      </div>
    )
  }
}
