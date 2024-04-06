import CommonController from './common.controller.js';
import Service from '../services/service.js';
const commonController = new CommonController();
const service = new Service();
class Controller {
  static instance = null;
  constructor() {
    if(Controller.instance instanceof Controller){
      return Controller.instance
    }
    Controller.instance = this 
  }
  async image(request, response) {console.log("inside controller")
    return await commonController.handleRequest(request, service.image, response);
  };
}
export default Controller;
