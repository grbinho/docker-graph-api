import { createAsyncDispatch } from './helpers';
import ImageActions from './definition/ImageActions';

const dockerServiceUrl = 'http://localhost:4000';
const imageActions = new ImageActions(createAsyncDispatch, dockerServiceUrl);

export default imageActions;