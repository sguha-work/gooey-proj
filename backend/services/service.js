import StatusCode from "../constants/status-codes.constant.js";

class Service {
    static instance = null;
    constructor() {
        if (Service.instance instanceof Service) {
            return Service.instance
        }
        Service.instance = this
    }
    async image() {
        try {
            return Promise.resolve({
                status: StatusCode.post.ok
            });
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
export default Service;