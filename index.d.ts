export const version: string;

export class Client{
  constructor();
  
public start();
public addurl(url: string);
public removeurl(url: string);
public uptime(url: string, interval: number);
public clear();
public setinterval(interval: number);
public stop();
public stopuptime();
public allurls();
}