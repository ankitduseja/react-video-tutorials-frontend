/**
*
* Ratings
*
*/

import React from 'react';
import Rating from 'react-rating';
import styles from './styles.css';
import EmptyStar from 'material-ui/svg-icons/toggle/star-border';
import FullStar from 'material-ui/svg-icons/toggle/star';

class Ratings extends React.Component {
  componentWillMount() {

  }
  onRate(r) {
    this.props.rate({rating:r,videoId:this.props.videoId})
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
        <Rating
          empty={<EmptyStar/>}
          full={<FullStar/>}
          onClick={this.onRate.bind(this)}
          initialRate={avg}/>
      </div>
    );
  }
}

export default Ratings;
