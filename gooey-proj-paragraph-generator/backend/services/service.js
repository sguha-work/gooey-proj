import StatusCode from "../constants/status-codes.constant.js";
import fetch from 'node-fetch';
// import ImageProcessService from "./image-process.service.js";
class Service {
    static instance = null;
    //#imageProcessService = new ImageProcessService();
    constructor() {
        if (Service.instance instanceof Service) {
            return Service.instance
        }
        Service.instance = this;
    }
    async generatePara(payload) {

        try {
            const stream = await fetch(process.env.GOOEY_API_PATH, {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + process.env["GOOEY_SECRET_KEY"],
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            if (stream.status === 500) {
                const resptext=await stream.text();
                console.log(resptext);
                throw {
                    status: StatusCode.post["upstream-service-unavailable"],
                    message:  resptext
                    
                }
            }
            const result = await stream.json()
            Logger.log('response', result);
            return Promise.resolve({
                status: StatusCode.post.ok,
                data: result
            });
        } catch (error) {
            return Promise.reject(error);
        }
    }

}
export default Service;
