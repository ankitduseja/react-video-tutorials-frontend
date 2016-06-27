/*
 *
 * VideoPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { push, replace } from 'react-router-redux';
import selectVideoPage from './selectors';
import styles from './styles.css';

import * as actions from './actions';
import { openSnackBar, closeSnackBar, videoRate, checkCookie } from 'containers/App/actions';
import Divider from 'material-ui/Divider';
import Video from 'components/Video'
import Paper from 'material-ui/Paper';
import Ratings from 'components/Ratings';

export class VideoPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state={
      routeChange:false,
    };
  }
  componentWillMount() {
    this.loadCookieAndVideo();
  }
  componentDidUpdate() {
    this.loadCookieAndVideo();
  }
  loadCookieAndVideo() {
    if(this.props.app.cookieLoad===false) {
      this.props.checkCookie();
    } else {
        this.changeRouteToHome();
    }
    if(this.props.app.cookieLoad===true && this.props.app.sessionId!=null && this.props.videopage.video==null && this.props.videopage.loading=='idle') {
      this.loadVideo();
    }
  }
  loadVideo() {
    var obj={
      videoId:this.props.routeParams.videoId,
    }
    this.props.onLoadFetchData(obj);
  }
  changeRouteToHome() {
    if(this.props.app.cookieLoad===true && this.props.app.sessionId==null && this.state.routeChange===false) {
        this.setState({routeChange:true});
        this.props.replaceRoute('/');
    }
  }
  render() {[]
    var id=this.props.routeParams.videoId;
    var page=<Paper className={ styles.container }>
      Loading...
    </Paper>;
    if (this.props.app.cookieLoad===true) {
      if(this.props.videopage.video!=null) {
        page=<Paper className={ styles.container}>
          <div className={styles.vidbox}><Video activeVideo={true} onPlay={null} width={600} height={300} via={'page'} className={styles.video} videoProp={this.props.videopage.video}></Video></div>
          <div className={styles.titlebox}>
            <div className={styles.ratings}><Ratings rate={this.props.onRating} videoId={this.props.videopage.video._id} rating={this.props.videopage.video.ratings}/></div>
            <div className={styles.title}>{this.props.videopage.video.name}</div>
          </div>
          <Divider/>
          <div className={styles.desc}>{this.props.videopage.video.description}</div>
        </Paper>;
      }
    }
    return (
      <div className={ styles.videoPage }>
        {page}
      </div>
    );
  }
}

const mapStateToProps = selectVideoPage();

function mapDispatchToProps(dispatch) {
  return {
    checkCookie: () => dispatch(checkCookie()),
    changeRoute: (url) => dispatch(push(url)),
    replaceRoute: (url) => dispatch(replace(url)),
    onRating: (data) => dispatch(videoRate(data)),
    onLoadFetchData: (data) => dispatch(actions.fetchVideo(data)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoPage);
