/*
 *
 * VideoList
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectVideoList from './selectors';
import styles from './styles.css';
import * as actions from './actions';
import Paper from 'material-ui/Paper';
import VideoBox from 'components/VideoBox';
import LazyLoad from 'react-lazyload';
import LazyLoader from 'components/LazyLoader';

export class VideoList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillRender() {
  }
  loadVideos() {
    var page=this.props.videolist.lazypage;
    var limit=6;
    var skip=page*limit;
    var obj={
      limit,
      skip,
      page,
    };
    console.log(obj);
    this.props.onLoadFetchData(obj);
  }
  render() {
    var list=this.props.videolist.videoList;
    var vidlist=[];
    var lazyloadz=[];
    for(var i in list) {
      vidlist.push(<VideoBox goto={this.props.goto} rate={this.props.rate} key={list[i]._id} nos={i} videoProp={list[i]}/>);
    }
    for(var j=0;j<=this.props.videolist.lazypage;j++) {
      var show=(j==this.props.videolist.lazypage)?styles.lazyloadshow:'';
      lazyloadz.push(<LazyLoad key={'lazyVideos'+j} z={j} height={200}>
        <div className={styles.lazyload+' '+show}>
          <LazyLoader className={styles.lazyloader} once={true} z={j} callbackfn={this.loadVideos.bind(this)}/>
        </div>
      </LazyLoad>);
    }

    return (
      <div className={ styles.videoList }>
        <Paper className={styles.container}>
          <div className={styles.vidlist}>
            {vidlist}
          </div>
          <div className={styles.lazyloaders}>
            {lazyloadz}
          </div>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = selectVideoList();

function mapDispatchToProps(dispatch) {
  return {
    onLoadFetchData: (data) => dispatch(actions.fetchVideos(data)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoList);
