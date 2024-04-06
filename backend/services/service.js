class Service {
    static async login() {
        try{
            return Promise.resolve();
        } catch(error) {
            return Promise.reject(error);
        }
    }
}
export default Service;