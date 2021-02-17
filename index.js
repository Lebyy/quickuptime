const fetch = require("node-fetch")
const {
  Database
} = require('instant.db');
const db = new Database('./quickuptime.json');

/**
 *
 *
 * @class Client
 */
class Client {
  constructor() {
    this.urls = db.get("urls")
    this.int = db.get("interval")
    this.innit = () => db.set("urls", [])
    this.push = (content) => db.push("urls", content)
    this.pull = (content) => db.pull("urls", content)
    this.get = () => {
      return db.get("urls")
    }
    this.set = (content) => db.set("interval", content)
    this.interval;
    this.intervalsingle;
  }

  /**
   *
   *
   * @return {boolean} Return true if sucess 
   * @memberof Client
   */
  async start(log) {
    let urls = this.get()
    if (urls === null) throw new Error(`No url's were found, add one before continuing.`);
    let int = this.int || 60000
    urls.forEach((url) => {
    this.interval = setInterval(async () => {
    let response = await fetch(url);
    if(log === true){
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
   * @return {boolean} Return true if sucess 
   * @memberof Client
   */
  async addurl(url) {
    if (typeof(url) != 'string') throw new Error(`Expected url to be string, recieved ${typeof(url)}`);
    if (!url) throw new Error(`Missing URL, please specify a url to remove.`);
    this.innit()
    this.push(url)
    return true;
  }

  /**
   *
   *
   * @param {string} url The url to remove
   * @return {boolean} Return true if sucess  
   * @memberof Client
   */
  async removeurl(url) {
    if (typeof(url) != 'string') throw new Error(`Expected url to be string, recieved ${typeof(url)}`);
    this.pull(url)
    return true;
  }

  /**
   *
   *
   * @param {string} url The url to ping
   * @param {number} interval The time in ms to ping the url after
   * @return {boolean} Return true if sucess 
   * @memberof Client
   */
  async uptime(url, interval, log) {
    let int = interval || 60000
    let intervalstart = setInterval(async () => {
    const response = await fetch(url);
    if(log === true){
    console.log(response)
    }
    }, int);
    this.intervalsingle = intervalstart
    return true;
  }

  /**
   *
   *
   * @return {boolean} Return true if sucess 
   * @memberof Client
   */
  async clear() {
    db.deleteAll()
    return true;
  }

  /**
   *
   *
   * @param {number} interval The time in ms to ping the url after
   * @return {boolean} Return true if sucess 
   * @memberof Client
   */
  async setinterval(interval) {
    if (typeof(interval) != 'number') throw new Error(`Expected interval to be number, recieved ${typeof(interval)}`);
    this.set(interval)
    return true;
  }

  /**
   *
   *
   * @return {boolean} Return true if sucess  
   * @memberof Client
   */
  async stop() {
    if (!this.interval) throw new Error(`The pinging of the link(s) supplied has not started yet.`);
    clearInterval(this.interval)
    return true
  }

  /**
   *
   *
   * @return {boolean} Return true if sucess  
   * @memberof Client
   */
  async stopuptime() {
    if (!this.intervalsingle) throw new Error(`The pinging of the link supplied has not started yet.`);
    clearInterval(this.intervalsingle)
    return true
  }

  /**
   *
   *
   * @return {boolean} Return true if sucess 
   * @memberof Client
   */
  async allurls() {
    let urls = this.get() || null
    if (!urls === null) throw new Error(`No URL's found, you have not added any url(s) yet.`);
    return this.get()
  }


}


module.exports = {
  version: require('./package.json').version,
  Client: Client
}
