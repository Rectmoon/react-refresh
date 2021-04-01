import React, { useState } from 'react'
import Child from './Child'
import ChildMemo from './ChildMemo'
import ChildMemoNoIsEqual from './ChildMemoNoIsEqual'
import ChildUseMemo from './ChildUseMemo'
import Empty from './Empty'

export default function App () {
  const [step, setStep] = useState(0)
  const [count, setCount] = useState(0)
  const [number, setNumber] = useState(0)

  const handleSetStep = () => {
    setStep(step + 1)
  }

  const handleSetCount = () => {
    setCount(count + 1)
  }

  const handleCalNumber = () => {
    setNumber(count + step)
  }

  return (
    <div>
      <button onClick={handleSetStep}>step is : {step} </button>
      <button onClick={handleSetCount}>count is : {count} </button>
      <button onClick={handleCalNumber}>numberis : {number} </button>
      <h3>Empty</h3>
      <Empty />
      <hr />
      <br />
      <h3>Child</h3>
      <Child number={number} />
      <hr />
      <br />
      <h3>ChildMemo</h3>
      <ChildMemo step={step} number={number} />
      <hr />
      <br />
      <h3>ChildMemoNoIsEqual</h3>
      <ChildMemoNoIsEqual step={step} number={number} extaPropsName='step' />
      <hr />
      <br />
      <h3>ChildMemoNoIsEqual</h3>
      <ChildMemoNoIsEqual count={count} number={number} extaPropsName='count' />
      <hr />
      <br />
      <h3>ChildMemoNoIsEqual</h3>
      <ChildMemoNoIsEqual number={number} extaPropsName='nothing' />
      <hr />
      <br />
      <h3>ChildUseMemo</h3>
      {/* <ChildUseMemo step={step} number={number} /> */}
    </div>
  )
}
