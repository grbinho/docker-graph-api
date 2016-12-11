import { Actions as ImageActions } from '../actions/definition/ImageActions';

const images = (state = [], action) => {
  switch (action.type) {
    case ImageActions.RECEIVED_IMAGES: {
      console.log('Received images action: ', action);
      return [
        ...action.payload
      ];
    }
    default: return state;
  }
};

export default images;