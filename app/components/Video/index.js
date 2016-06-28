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

  }
  render() {
    var videoSpot=<div data-cname='VideoCover' onClick={this.openVideo.bind(this)} className={styles.cover} style={{width:this.props.width,height:this.props.height}}>
      <PlayIcon className={styles.playicon} color={'white'} style={{width:80,height:80}}/>
    </div>;
    if (this.state.vstate=='video' && this.props.activeVideo===true) {
    videoSpot=<video onPlay={this.onPlay.bind(this)} key={this.props.via+'_'+this.props.videoProp._id}
          controls={true}
          autoPlay={true}
          width={this.props.width}>
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
