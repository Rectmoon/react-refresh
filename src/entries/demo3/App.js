import React, { Component } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button, ComplexA } from 'ts-react-component'

/** =>
  import Button from 'ts-react-component/lib/components/Button'
  import 'ts-react-component/lib/components/Button/index.css'
 */

export default class App extends Component {
  render () {
    return (
      <div className='app'>
        <Header title='我是demo3' />
        <Button foo='demo3-button' />

        <hr />

        <ComplexA />

        <Footer />
      </div>
    )
  }
}
