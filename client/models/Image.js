export default class DockerImage {
  constructor(apiModel) {
    this.id = apiModel.Id;
    this.respository = apiModel.Size;
    this.tag = apiModel.Size;
  }
};

