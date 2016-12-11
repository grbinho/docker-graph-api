import { Actions as ImageActions } from '../actions/definition/ImageActions';

const images = (state = [], action) => {
  switch (action.type) {
    case ImageActions.RECEIVED_IMAGES: {
      return [
        ...action.payload
      ];
    }
  }
};

export default images;