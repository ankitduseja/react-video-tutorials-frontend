/**
*
* Ratings
*
*/

import React from 'react';
import Rating from 'react-rating';
import styles from './styles.css';

class Ratings extends React.Component {
  componentWillMount() {

  }
  onRate(r) {
    this.props.rate({rate:r,id:this.props.videoId})
  }
  render() {
    var sum=0;
    var rating=this.props.rating;
    for(var i in rating) {
      sum+=parseInt(rating[i],10);
    }
    var avg=sum/rating.length;
    return (
      <div className={ styles.ratings }>
        <Rating onClick={this.onRate.bind(this)} initialRate={avg}/>
      </div>
    );
  }
}

export default Ratings;
