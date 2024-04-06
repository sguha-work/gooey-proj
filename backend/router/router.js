import Controller from "../controllers/controller.js"
const Router = {
    'post': {
        '/image': (request, response)=>Controller.login(request, response)
    },
    'get': {

    }
    
}
export default Router;