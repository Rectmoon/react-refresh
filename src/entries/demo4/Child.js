import React from 'react'

export default function Child (props) {
  console.log(`--- re-render ---`)
  return (
    <div>
      <p>number is : {props.number}</p>
    </div>
  )
}
