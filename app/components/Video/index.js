/**
*
* Video
*
*/

import React from 'react';
import { default as VideoPlayer, Controls, Play, Mute, Seek, Fullscreen, Time, Overlay } from 'react-html5video';
import styles from './styles.css';
import config from 'config.js';
import IconButton from 'material-ui/IconButton';
import PlayIcon from 'material-ui/svg-icons/av/play-circle-filled';
class Video extends React.Component {
  constructor() {
    super();
    this.state={
      vstate:'cover',
    };
  }
  componentWillMount() {
    if (this.props.via=='page') {
      this.setState({vstate:'video'});
    } else {
      this.setState({vstate:'cover'});
    }
  }
  openVideo() {
    this.setState({vstate:'video'});
    if(this.props.onPlay) {
      this.props.onPlay(this.props.videoProp._id);
    }
  }
  onPlay() {
    if(this.props.onPlay) {
      this.props.onPlay(this.props.videoProp._id);
    }
  }
  render() {
    if (this.state.vstate=='video' && this.props.activeVideo!==true && this.refs['videoref'] && this.refs['videoref'].paused!=true) {
      this.refs['videoref'].pause();
    }
    var videoSpot=<div data-cname='VideoCover' onClick={this.openVideo.bind(this)} className={styles.cover}>
      <PlayIcon className={styles.playicon} color={'white'} style={{width:80,height:80}}/>
    </div>;
    if (this.state.vstate=='video') {
    videoSpot=<video className={styles.videoplayer} ref='videoref' onPlay={this.onPlay.bind(this)} key={this.props.via+'_'+this.props.videoProp._id}
          controls={true}
          autoPlay={true}
          >
          <source src={config.backendDomain+'/'+this.props.videoProp.url} type="video/mp4" />
      </video>;
    }
    return (
      <div className={ styles.video }>
        {videoSpot}
      </div>
    );
  }
}
export default Video;
