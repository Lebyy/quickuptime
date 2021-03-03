# ✨ Quick Uptime

[![downloadsBadge](https://img.shields.io/npm/dt/quickuptime?style=for-the-badge)](https://npmjs.com/quickuptime)
[![versionBadge](https://img.shields.io/npm/v/quickuptime?style=for-the-badge)](https://npmjs.com/quickuptime)
[![doc](https://img.shields.io/badge/Documentation-Click%20here-blue?style=for-the-badge)](https://quickuptime.js.org)

Quick Uptime is a powerful module which allows you to Uptime any website


## 🔖 Features

-   ⏱️ Easy to use!
-   🔄 Provides Uptime
-   📁 Support for any website
-   ⚙️ Customizable
-   🚀 Super-powerful
-   🕸️ User Friendly
-   🔗 Multiple http clients supported
-   🇹 Typings supported!
-   ⏰ Uses ms for timings!
-   and much more!

## 📌 Installation

```js
npm install quickuptime
```

### 🏷 Example Code :

```js
// Load the Package
const quickuptime = require('quickuptime')
let data = {
httpclient: "node-fetch" // wumpfetch, got, axios and superagent supported!
}
const client = new quickuptime.Client(data)

// Starts uptiming the url's stored in the db within an interval of 60000ms or the time configured.
await client.start(true) 
await client.uniquestart(true, uniqueid)
await client.uniquestartall(true)

// Adds the url to the database.
client.addurl(url) 
client.uniqueaddurl(url, uniqueid)

// Removes the specific url from the database if exists.
client.removeurl(url) 
client.uniqueremoveurl(url, uniqueid)

// Sets up a temp pinger which will ping the url supplied every interval supplied. (You can also provide the time as 10d!)
await client.uptime(url, interval, true) 

// Clear all the data present.
client.clear() 

// Clears only the data of the specific unique user id
client.uniqueclear(uniqueid)

// Sets the time in ms to ping the urls after. (You can also provide the time as 10d!)
client.setinterval(interval)
client.uniquesetinterval(interval, uniqueid)

// Stops the pinging process.
client.stop() 
client.uniquestop(uniqueid)

// Stops the temp pinging process.
client.stopuptime() 

// Returns all/user's of the urls present in the database in an array form.
client.allurls() 
client.uniqueallurls(uniqueid)
client.alluniqueurls()

```

## 🚀 Documentation 

https://quickuptime.js.org/


## 📝 Support Server

<a href="https://discord.gg/anyF4j3MUu"><img src="https://invidget.switchblade.xyz/anyF4j3MUu"/></a>
<br><br>
</div>
