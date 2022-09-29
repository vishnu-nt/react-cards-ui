import React from 'react'

const OverrideComponent = (props) => {
  return (
    <div>
        <div>Override Component</div>
        {props.children}
    </div>
  )
}

export default OverrideComponent;
