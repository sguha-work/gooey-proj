import Controller from "../controllers/controller.js";
const controller = new Controller();
const Router = {
    'post': {
        '/generate-para': (request, response) => {
            try {
                controller.generatePara(request, response);
            } catch (e) {
                Logger.log("Error in router", e);
            }
        }
    },
}

export default Router;
