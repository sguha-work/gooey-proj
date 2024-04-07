import StatusCode from "../constants/status-codes.constant.js";
import fetch from 'node-fetch';
class Service {
    static instance = null;
    constructor() {
        if (Service.instance instanceof Service) {
            return Service.instance
        }
        Service.instance = this
    }
    async image(payload) {
        console.log(payload);
        try {
            const response = await fetch("https://api.gooey.ai/v2/Img2Img/", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + process.env["GOOEY_SECREAT_KEY"],
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            console.log('response',response);
            return Promise.resolve({
                status: StatusCode.post.ok,
                data: response
            });
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
export default Service;