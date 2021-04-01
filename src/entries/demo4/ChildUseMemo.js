import React, { useMemo } from 'react'

export default props => {
  console.log(`--- component re-render ---`)
  return useMemo(() => {
    console.log(`--- useMemo re-render ---`)
    return (
      <div>
        <p>number is : {props.number}</p>
      </div>
    )
  }, [props.number])
}
