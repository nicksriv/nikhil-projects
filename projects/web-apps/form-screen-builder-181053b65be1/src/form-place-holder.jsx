import React from 'react';
import PropTypes from 'prop-types';

export default class PlaceHolder extends React.Component {
  render() {
    let classes = 'form-place-holder';
    if(!this.props.show){
      classes += ' minimal-dropzone';
    }
    return (
      
      <div className={classes} >
        {this.props.show && <div>{this.props.text}</div>}
      </div>
    );
  }
}

PlaceHolder.propTypes = {
  text: PropTypes.string,
  show: PropTypes.bool,
};

PlaceHolder.defaultProps = {
  text: 'Dropzone',
  show: false,
};
