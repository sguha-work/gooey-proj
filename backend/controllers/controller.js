

import CommonController from './common.controller.js';
import Service from '../services/service.js';
const commonController = new CommonController();
const service = new Service();
class Controller {
  static instance = null;
  constructor() {
    if (Controller.instance instanceof Controller) {
      return Controller.instance
    }
    Controller.instance = this
  }
  async image(request, response) {
    return await commonController.handleRequest(request, service.image, response);
  };
  async imageUpload(request, response) {
    return await commonController.handleRequest(request, service.imageUpload, response);
  };
  imageDownload(request, response, __dirname) {console.log(__dirname);
    const id = request.params.id;
    response.sendFile(`${__dirname}/uploads/${id}`);
  };
}
export default Controller;
