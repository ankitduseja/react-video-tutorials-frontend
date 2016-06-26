/**
*
* Video
*
*/

import React from 'react';
import { default as VideoPlayer, Controls, Play, Mute, Seek, Fullscreen, Time, Overlay } from 'react-html5video';
import styles from './styles.css';
import config from 'config.js';

class Video extends React.Component {
  render() {
    return (
      <div className={ styles.video }>
        <VideoPlayer
            onCanPlayThrough={() => {
                // Do stuff
            }}
            width={180}>
            <source src={config.backendDomain+'/'+this.props.videoProp.url} type="video/webm" />
        </VideoPlayer>
      </div>
    );
  }
}
// <Controls>
//   <Play className/>
//   <Seek />
//   <Time />
//   <Mute />
//   <Fullscreen />
// </Controls>
// <VideoPlayer controls autoPlay loop muted
//     poster="http://sourceposter.jpg"
//     onCanPlayThrough={() => {
//         // Do stuff
//     }}>
//     <source src="http://sourcefile.webm" type="video/webm" />
// </VideoPlayer>
export default Video;
