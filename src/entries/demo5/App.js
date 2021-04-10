import React, { Component } from 'react'

const AsyncModal = React.lazy(() =>
  import(/* webpackChunkName: "AsyncModal" */ '@/components/AsyncModal')
)

export default class App extends Component {
  state = {
    showModal: false
  }

  showModal = () => {
    this.setState({
      showModal: true
    })
  }

  render () {
    return (
      <div className='app'>
        <hr />
        <br />
        <span>
          <button onClick={this.showModal}>Click me1</button>
        </span>
        {this.state.showModal && (
          <React.Suspense fallback={<div>loading...</div>}>
            <AsyncModal />
          </React.Suspense>
        )}
      </div>
    )
  }
}
