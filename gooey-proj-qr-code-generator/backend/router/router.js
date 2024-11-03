import Controller from "../controllers/controller.js";
const controller = new Controller();
const Router = {
    'post': {
        '/qr': (request, response) => {
            try {
                controller.qr(request, response);
            } catch (e) {
                console.log("Error in router", e);
            }
        },
        '/image/upload': (request, response) => {
            try {
                controller.imageUpload(request, response);
            } catch (e) {
                console.log("Error in router", e);
            }
        },
        '/file/upload': (request, response) => {
            try {
                controller.imageUpload(request, response);
            } catch (e) {
                console.log("Error in router", e);
            }
        }
    },

    'get': {
        '/image/get/:id': (request, response, __dirname) => {
            try {
                controller.imageDownload(request, response, __dirname);
            } catch (e) {
                console.log("Error in router", e);
            }
        },
    }


}
export default Router;