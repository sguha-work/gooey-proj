import CommonController from './common.controller.js';
import Service from '../services/service.js';
const commonController = CommonController.CommonControllerInstance;

class Controller {
  static async login(request, response) {
    return await commonController.handleRequest(request, Service.login, response);
  };
}
export default Controller;
