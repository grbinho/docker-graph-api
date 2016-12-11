import React from 'react';
import { connect } from 'react-redux';
import imageActions from '../actions/imageActions';
import Image from './Image';

export class Images extends React.Component {
  componentWillMount() {
    if (this.props.dispatch) {
      const {dispatch} = this.props;

      dispatch(imageActions.getImagesAction());
    }
  }

  render() {
    const renderImages = () => {
      const {images} = this.props;

      return images.map((item) =>
        (<Image
          key={item.name} {... item}
        />)
      );
    };

    return (
      <ul>
        {renderImages()}
      </ul>
    )
  }
}

Images.propTypes = {
  dispatch: React.PropTypes.func,
  images: React.PropTypes.array
};

const mapStateToProps = (state) => (
  {
    images: state.images
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    dispatch
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Images);