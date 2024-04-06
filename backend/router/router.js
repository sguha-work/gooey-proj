import Controller from "../controllers/controller.js";
const controller = new Controller();
const Router = {
    'post': {
        '/image': (request, response) => {
            try {
                controller.image(request, response);
            } catch (e) {
                console.log("Error in router", e);
            }
        }
    },
    'get': {

    }

}
export default Router;