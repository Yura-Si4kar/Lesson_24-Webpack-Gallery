export default class RequestHandler{
    constructor(url) {
        this.url = url;
    }

    static getQueryString(query) {
        let result = '';

        for (let key in query) {
            result += result ? '&' : '?';
            result += `${key}=${query[key]}`;
        }

        return result;
    }

    getList(query = {}) {
        return fetch(this.url + RequestHandler.getQueryString(query)).then(
            (res) => res.json(),
        );
    }
}