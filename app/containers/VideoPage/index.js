/*
 *
 * VideoPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectVideoPage from './selectors';
import styles from './styles.css';

import Video from 'components/Video'
import Paper from 'material-ui/Paper';
import Ratings from 'components/Ratings';

export class VideoPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    var id=this.props.routeParams.videoId;
    return (
      <div className={ styles.videoPage }>
      This is VideoPage container {id}!
      </div>
    );
  }
}
// <Video className={styles.url} videoProp={this.props.videoProp}></Video>
// <Ratings rate={this.props.rate} videoId={id} rating={this.props.videoProp.ratings}/>
// <div className={styles.title}>{this.props.videoProp.name}</div>

const mapStateToProps = selectVideoPage();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoPage);
