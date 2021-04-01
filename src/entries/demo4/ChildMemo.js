import React, { memo } from 'react'
import useWhyDidYouUpdate from './useWhyDidYouUpdate'

const isEqual = (prevProps, nextProps) => {
  if (prevProps.number !== nextProps.number) {
    return false
  }
  return true
}

export default memo(props => {
  console.log(`--- memo isEqual re-render ---`)
  useWhyDidYouUpdate('ChildMemo', props)

  return (
    <div>
      <p>number is : {props.number}</p>
    </div>
  )
}, isEqual)
