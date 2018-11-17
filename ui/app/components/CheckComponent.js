// @flow 

import React from 'react';

const Check = (props) => {
  return props.active ? <React.Fragment>{props.children}</React.Fragment> : null
}

export default Check