/**
 *
 *
 * @class Client
 */
export class Client {
    constructor(data: any);
    urls: any;
    int: any;
    uniqueint: (id: any) => any;
    push: (content: any) => Database<any>;
    uniquepush: (content: any, id: any) => Database<any>;
    pull: (content: any) => Database<any>;
    uniquepull: (content: any, id: any) => Database<any>;
    get: () => any;
    getunique: (id: any) => any;
    set: (content: any) => void;
    uniqueset: (content: any, id: any) => void;
    httpclient: any;
    /**
     *
     *
     * @return {boolean} Return's true if sucess
     * @param {boolean} log Whether to log the response in console or not.
     * @param {string} uniqueid The unique id for the dataset
     * @memberof Client
     */
    start(log: boolean): boolean;
    /**
     *
     *
     * @return {boolean} Return's true if sucess
     * @param {boolean} log Whether to log the response in console or not.
     * @param {string} uniqueid The unique id for the dataset
     * @memberof Client
     */
    uniquestart(log: boolean, uniqueid: string): boolean;
    /**
 *
 *
 * @return {boolean} Return's true if sucess
 * @param {boolean} log Whether to log the response in console or not.
 * @memberof Client
 */
    uniquestartall(log: boolean): boolean;
    /**
     *
     *
     * @param {string} url The url to add
     * @return {boolean} Return's true if sucess
     * @memberof Client
     */
    addurl(url: string): boolean;
    /**
     *
     *
     * @param {string} url The url to add
     * @param {string} uniqueid The unique id for the dataset
     * @return {boolean} Return's true if sucess
     * @memberof Client
     */
    uniqueaddurl(url: string, uniqueid: string): boolean;
    /**
     *
     *
     * @param {string} url The url to remove
     * @return {boolean} Return's true if sucess
     * @memberof Client
     */
    removeurl(url: string): boolean;
    /**
     *
     *
     * @param {string} url The url to remove
     * @param {string} uniqueid The unique id for the dataset
     * @return {boolean} Return's true if sucess
     * @memberof Client
     */
    uniqueremoveurl(url: string, uniqueid: string): boolean;
    /**
     *
     *
     * @param {string} url The url to ping
     * @param {number} interval The time in ms to ping the url after
     * @return {boolean} Return's true if sucess
     * @memberof Client
     */
    uptime(url: string, interval: number, log: any): boolean;
    intervalsingle: any;
    /**
     *
     *
     * @return {boolean} Return's true if sucess
     * @memberof Client
     */
    clear(): boolean;
    /**
     *
     *
     * @return {boolean} Return's true if sucess
     * @param {string} uniqueid The unique id for the dataset
     * @memberof Client
     */
    uniqueclear(uniqueid: string): boolean;
    /**
     *
     *
     * @param {number} interval The time to ping the url after
     * @return {boolean} Return's true if sucess
     * @memberof Client
     */
    setinterval(interval: number): boolean;
    /**
     *
     *
     * @param {number} interval The time to ping the url after
     * @param {string} uniqueid The unique id for the dataset
     * @return {boolean} Return's true if sucess
     * @memberof Client
     */
    uniquesetinterval(interval: number, uniqueid: string): boolean;
    /**
     *
     *
     * @return {boolean} Return's true if sucess
     * @memberof Client
     */
    stop(): boolean;
    /**
     *
     *
     * @return {boolean} Return's true if sucess
     * @param {string} uniqueid The unique id for the dataset
     * @memberof Client
     */
    uniquestop(uniqueid: string): boolean;
    /**
     *
     *
     * @return {boolean} Return's true if sucess
     * @memberof Client
     */
    stopuptime(): boolean;
    /**
     *
     *
     * @return {Array} Return's the url's
     * @memberof Client
     */
    allurls(): any[];
    /**
     *
     *
     * @return {Array} Return's the url's
     * @param {string} uniqueid The unique id for the dataset
     * @memberof Client
     */
    uniqueallurls(uniqueid: string): any[];
    /**
 *
 *
 * @return {Array} Return's the url's
 * @memberof Client
 */
    alluniqueurls(): any[];
}
import { Database } from "instant.db";
export declare const version: any;
