import React, { memo } from 'react'
import useWhyDidYouUpdate from './useWhyDidYouUpdate'

export default memo(props => {
  console.log(`--- memo noIsEqual re-render ---`)
  useWhyDidYouUpdate(`ChildMemoNoIsEqual ${props.extaPropsName}`, props)

  return (
    <div>
      <p>
        extaPropsName is: <strong>{props.extaPropsName}</strong>
      </p>
      <p>number is : {props.number}</p>
    </div>
  )
})
