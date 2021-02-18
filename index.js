const fetch = require("node-fetch")
const {
    Database
} = require('instant.db');
const db = new Database('./quickuptime.json');
const wumpfetch = require('wumpfetch');
const axios = require('axios');
const got = require('got');
/**
 *
 *
 * @class Client
 */
class Client {
    constructor(data) {
        this.urls = db.get("urls")
        this.int = db.get("interval")
        this.uniqueint = (id) => db.get(`interval_${id}`)

        if (!Array.isArray(this.urls)) db.set('urls', []);
        if (!Array.isArray(this.int)) db.set('interval', []);

        this.push = (content) => db.push("urls", content)
        this.uniquepush = (content, id) => db.push(`urls_${id}`, content)
        this.pull = (content) => db.pull("urls", content)
        this.uniquepull = (content, id) => db.pull(`urls_${id}`, content)

        this.get = () => {
            return db.get("urls")
        }
        this.getunique = (id) => {
            return db.get(`urls_${id}`)
        }

        this.set = (content) => db.set("interval", content)
        this.uniqueset = (content, id) => db.set(`interval_${id}`, content)

        this.interval;
        this.intervalsingle;
        this.intervalunique;

        if (data) {
            this.httpclient = data.httpclient
        }
        if (this.httpclient !== "node-fetch" || this.httpclient !== "got" || this.httpclient !== "wumpfetch") {
            this.httpclient = "node-fetch"
        }
    }

    /**
     *
     *
     * @return {boolean} Return's true if sucess
     * @param {boolean} log Whether to log the response in console or not.
     * @param {string} uniqueid The unique id for the dataset
     * @memberof Client
     */
    async start(log) {
        if (typeof(log) != 'boolean') throw new Error(`Expected the log option to be boolean, recieved ${typeof(boolean)}`);
        let urls = this.get()
        if (urls === null) throw new Error(`No url's were found, add one before continuing.`);
        let starthttpclient = this.httpclient
        let int = this.int || 60000
        let response;
        urls.forEach((url) => {
            this.interval = setInterval(async () => {
                if (starthttpclient === "node-fetch") {
                    response = await fetch(url);
                }
                if (starthttpclient === "wumpfetch") {
                    response = await wumpfetch(url, {
                        chaining: false
                    });
                }
                if (starthttpclient === "got") {
                    response = await got(url);
                }
                if (starthttpclient === "axios") {
                    response = await axios.get(url)
                }
                if (log === true) {
                    console.log(response)
                }
            }, int);
        });
        return true
    }

    /**
     *
     *
     * @return {boolean} Return's true if sucess 
     * @param {boolean} log Whether to log the response in console or not.
     * @param {string} uniqueid The unique id for the dataset
     * @memberof Client
     */
    async uniquestart(log, uniqueid) {
        if (typeof(log) != 'boolean') throw new Error(`Expected the log option to be boolean, recieved ${typeof(boolean)}`);
				if (!uniqueid) throw new Error(`Expected to receive a uniqueid but recieved none`);
        let urls = this.getunique(uniqueid)
        if (urls === null) throw new Error(`No url's were found, add one before continuing.`);
        let starthttpclient = this.httpclient
        let int = this.uniqueint(uniqueid) || 60000
        let response;
        urls.forEach((url) => {
            this.intervalunique = setInterval(async () => {
                if (starthttpclient === "node-fetch") {
                    response = await fetch(url);
                }
                if (starthttpclient === "wumpfetch") {
                    response = await wumpfetch(url, {
                        chaining: false
                    });
                }
                if (starthttpclient === "got") {
                    response = await got(url);
                }
                if (starthttpclient === "axios") {
                    response = await axios.get(url)
                }
                if (log === true) {
                    console.log(response)
                }
            }, int);
        });
        return true
    }

    /**
     *
     *
     * @param {string} url The url to add
     * @return {boolean} Return's true if sucess 
     * @memberof Client
     */
    addurl(url) {
        if (typeof(url) != 'string') throw new Error(`Expected url to be string, recieved ${typeof(url)}`);
        if (!url) throw new Error(`Missing URL, please specify a url to add.`);
        this.push(url)
        return true;
    }

    /**
     *
     *
     * @param {string} url The url to add
     * @param {string} uniqueid The unique id for the dataset
     * @return {boolean} Return's true if sucess 
     * @memberof Client
     */
    uniqueaddurl(url, uniqueid) {
        if (typeof(url) != 'string') throw new Error(`Expected url to be string, recieved ${typeof(url)}`);
        if (!url) throw new Error(`Missing URL, please specify a url to add.`);
        if (!uniqueid) throw new Error(`Expected to receive a uniqueid but recieved none`);
				let check = db.get(`urls_${uniqueid}`)
        if (!Array.isArray(check)) db.set(`urls_${uniqueid}`, []);
        this.uniquepush(url, uniqueid)
        return true;
    }


    /**
     *
     *
     * @param {string} url The url to remove
     * @return {boolean} Return's true if sucess  
     * @memberof Client
     */
    removeurl(url) {
        if (typeof(url) != 'string') throw new Error(`Expected url to be string, recieved ${typeof(url)}`);
        if (!url) throw new Error(`Missing URL, please specify a url to remove.`);
				this.pull(url)
        return true;
    }

    /**
     *
     *
     * @param {string} url The url to remove
     * @param {string} uniqueid The unique id for the dataset
     * @return {boolean} Return's true if sucess  
     * @memberof Client
     */
    uniqueremoveurl(url, uniqueid) {
        if (typeof(url) != 'string') throw new Error(`Expected url to be string, recieved ${typeof(url)}`);
        if (!url) throw new Error(`Missing URL, please specify a url to remove.`);
				if (!uniqueid) throw new Error(`Expected to receive a uniqueid but recieved none`);
				this.uniquepull(url, uniqueid)
        return true;
    }

    /**
     *
     *
     * @param {string} url The url to ping
     * @param {number} interval The time in ms to ping the url after
     * @return {boolean} Return's true if sucess 
     * @memberof Client
     */
    async uptime(url, interval, log) {
        if (typeof(url) != 'string') throw new Error(`Expected url to be string, recieved ${typeof(url)}`);
        if (typeof(interval) != 'number') throw new Error(`Expected interval to be number, recieved ${typeof(interval)}`);
        if (typeof(log) != 'boolean') throw new Error(`Expected the log option to be boolean, recieved ${typeof(boolean)}`);
        let int = interval || 60000
        let uptimehttpclient = this.httpclient
        let response;
        let intervalstart = setInterval(async () => {
            if (uptimehttpclient === "node-fetch") {
                response = await fetch(url);
            }
            if (uptimehttpclient === "wumpfetch") {
                response = await wumpfetch(url, {
                    chaining: false
                });
            }
            if (uptimehttpclient === "got") {
                response = await got(url);
            }
            if (uptimehttpclient === "axios") {
                response = await axios.get(url)
            }
            if (log === true) {
                console.log(response)
            }
        }, int);
        this.intervalsingle = intervalstart
        return true;
    }

    /**
     *
     *
     * @return {boolean} Return's true if sucess 
     * @memberof Client
     */
    clear() {
        db.deleteAll()
        return true;
    }

    /**
     *
     *
     * @return {boolean} Return's true if sucess
     * @param {string} uniqueid The unique id for the dataset 
     * @memberof Client
     */
    uniqueclear(uniqueid) {
        if (!uniqueid) throw new Error(`Expected to receive a uniqueid but recieved none`);
				db.delete(`urls_${uniqueid}`)
        db.delete(`uniqueinterval_${uniqueid}`)
        return true;
    }

    /**
     *
     *
     * @param {number} interval The time in ms to ping the url after
     * @return {boolean} Return's true if sucess 
     * @memberof Client
     */
    setinterval(interval) {
        if (typeof(interval) != 'number') throw new Error(`Expected interval to be number, recieved ${typeof(interval)}`);
        this.set(interval)
        return true;
    }

    /**
     *
     *
     * @param {number} interval The time in ms to ping the url after
     * @param {string} uniqueid The unique id for the dataset 
     * @return {boolean} Return's true if sucess 
     * @memberof Client
     */
    uniquesetinterval(interval, uniqueid) {
        if (typeof(interval) != 'number') throw new Error(`Expected interval to be number, recieved ${typeof(interval)}`);
        if (!uniqueid) throw new Error(`Expected to receive a uniqueid but recieved none`);
				this.uniqueset(interval, uniqueid)
        return true;
    }

    /**
     *
     *
     * @return {boolean} Return's true if sucess  
     * @memberof Client
     */
    stop() {
        if (!this.interval) throw new Error(`The pinging of the link(s) supplied has not started yet.`);
        clearInterval(this.interval)
        return true
    }

    /**
     *
     *
     * @return {boolean} Return's true if sucess
     * @param {string} uniqueid The unique id for the dataset   
     * @memberof Client
     */
    uniquestop() {
        if (!uniqueid) throw new Error(`Expected to receive a uniqueid but recieved none`);
				let interval = this.intervalunique || null
        if (interval === null) throw new Error(`The pinging of the link(s) supplied has not started yet.`);
				clearInterval(this.intervalunique)
        return true
    }

    /**
     *
     *
     * @return {boolean} Return's true if sucess  
     * @memberof Client
     */
    stopuptime() {
        if (!this.intervalsingle) throw new Error(`The pinging of the link supplied has not started yet.`);
        clearInterval(this.intervalsingle)
        return true
    }

    /**
     *
     *
     * @return {object} Return's the url's
     * @memberof Client
     */
    allurls() {
        let urls = this.get() || null
        if (!urls === null) throw new Error(`No URL's found, you have not added any url(s) yet.`);
        return urls
    }

    /**
     *
     *
     * @return {object} Return's the url's
     * @param {string} uniqueid The unique id for the dataset
     * @memberof Client
     */
    uniqueallurls(uniqueid) {
        if (!uniqueid) throw new Error(`Expected to receive a uniqueid but recieved none`);
				let urls = this.getunique || null
				if (!urls === null) throw new Error(`No URL's found, you have not added any url(s) yet.`);
        return urls
    }

}


module.exports = {  
    version: require('./package.json').version,
    Client: Client
}
   
