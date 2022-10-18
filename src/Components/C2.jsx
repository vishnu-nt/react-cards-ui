import React from 'react'
import { withOverride } from '../utils/withOverride';

const C2 = (props) => {
  return (
    <div className='ml-1'>
        <div>Default C2</div>
        {props.children}
    </div>
  )
}

export default withOverride(C2, 'C2');
