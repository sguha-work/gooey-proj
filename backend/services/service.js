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
        try {
            const stream = await fetch("https://api.gooey.ai/v2/Img2Img/", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + process.env["GOOEY_SECREAT_KEY"],
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            const result = await stream.json()
            console.log('response',result);
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