/**
*
* VideoBox
*
*/

import React from 'react';
import Video from 'components/Video'
import Paper from 'material-ui/Paper';
import Ratings from 'components/Ratings';
import styles from './styles.css';

class VideoBox extends React.Component {
  openPage() {
    this.props.goto('/video/'+this.props.videoProp._id);
  }
  render() {
    return (
      <Paper className={ styles.videoBox }>
        <Video className={styles.url} videoProp={this.props.videoProp}></Video>
        <Ratings rate={this.props.rate} videoId={this.props.videoProp._id} rating={this.props.videoProp.ratings}/>
        <div onClick={this.openPage.bind(this)} className={styles.title}>{this.props.videoProp.name}</div>
      </Paper>
    );
  }
}
// <div className={styles.desc}>{this.props.videoProp.description}</div>

export default VideoBox;
