import StatusCode from "../constants/status-codes.constant.js";
import fetch from 'node-fetch';
class Service {
    static instance = null;
    constructor() {
        if (Service.instance instanceof Service) {
            return Service.instance
        }
        Service.instance = this;
    }
    async genQR(payload) {
        try {
            console.log('payload', payload);
            const stream = await fetch(process.env.GOOEY_API_PATH, {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + process.env["GOOEY_SECREAT_KEY"],
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            const result = await stream.json()
            console.log('response', result);
            return Promise.resolve({
                status: StatusCode.post.ok,
                data: result
            });
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async imageUpload({ host, file }) {

        try {
            return Promise.resolve({
                status: StatusCode.post.ok,
                data: {
                    mediaName: file.filename,
                    origMediaName: file.originalname,
                    mediaSource: `http://${host}/image/get/${file.filename}`
                }
            });
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
export default Service;