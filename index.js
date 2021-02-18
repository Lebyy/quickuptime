const fetch = require("node-fetch")
const {
  Database
} = require('instant.db');
const db = new Database('./quickuptime.json');
const ms = require("ms")
/**
 *
 *
 * @class Client
 */
class Client {
  constructor() {
    this.urls = db.get("urls");
    this.int = db.get("interval");
    this.push = (content) => db.push("urls", content);
    this.pull = (content) => db.pull("urls", content);
    this.get = () => {
    return db.get("urls")
    }
    this.set = (content) => db.set("interval", content);
    this.interval;
    this.intervalsingle;
  }

  /**
   *
   *
   * @return {boolean} Return's true if sucess 
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
   * @return {boolean} Return's true if sucess 
   * @memberof Client
   */
   addurl(url) {
    if (typeof(url) != 'string') throw new Error(`Expected url to be string, recieved ${typeof(url)}`);
    if (!url) throw new Error(`Missing URL, please specify a url to remove.`);
    this.push(url)
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
    this.pull(url)
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
    let int = interval || 60000
    int = ms(int)
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
   * @param {number} interval The time in ms to ping the url after
   * @return {boolean} Return's true if sucess 
   * @memberof Client
   */
   setinterval(interval) {
    if (typeof(interval) != 'number') throw new Error(`Expected interval to be number, recieved ${typeof(interval)}`);
    interval = ms(interval)
    this.set(interval)
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


}


module.exports = {
  version: require('./package.json').version,
  Client: Client
}
