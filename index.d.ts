export const version: string;

export class Client{
  constructor();
  
public start(log: boolean);
public uniquestart(log: boolean, uniqueid:string);
public addurl(url: string);
public uniqueaddurl(url: string, uniqueid:string);
public removeurl(url: string);
public uniqueremoveurl(url: string, uniqueid:string);
public uptime(url: string, interval: number);
public clear();
public uniqueclear(uniqueid:string);
public setinterval(interval: number);
public uniquesetinterval(interval: number, uniqueid:string);
public stop();
public uniquestop();
public stopuptime();
public allurls();
public uniqueallurls(uniqueid:string);
}