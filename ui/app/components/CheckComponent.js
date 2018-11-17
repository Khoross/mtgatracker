// @flow 

import React from 'react';

export default CheckComponent = (props) => {
  return props.active ? <React.Fragment>{props.children}</React.Fragment> : null
}