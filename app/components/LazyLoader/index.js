/**
*
* LazyLoader
*
*/

import React from 'react';


class LazyLoader extends React.Component {
  componentDidMount=() => {
    this.props.callbackfn(this.props.z);
  }
  render() {
    return (
      <div>
      </div>
    );
  }
}

LazyLoader.propTypes = {
  callbackfn: React.PropTypes.func,
}

export default LazyLoader;
