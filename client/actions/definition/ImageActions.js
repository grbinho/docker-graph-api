import { DockerImage } from '../../models/Image';

const Actions = {
  GET_IMAGES: 'GET_IMAGES',
  RECEIVED_IMAGES: 'RECEIVED_IMAGES'
};

class ImageActions {
  constructor(asyncDispatchFactory, dockerServiceUrl) {
    this.asyncDispatchFactory = asyncDispatchFactory;
    this.dockerServiceUrl = dockerServiceUrl;
  }

  getImagesAction() {
    const url = `${this.dockerServiceUrl}/images`;
    const method = 'get';
    const action = {
      type: Actions.RECEIVED_IMAGES
    };
    const transformResultPayload = (images) => images.map((im) => new Image(im));

    return this.asyncDispatchFactory(url, method, action, transformResultPayload);
  }
}






export default ImageActions;
export { Actions };
