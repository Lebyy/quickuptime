# ✨ Quick Uptime

[![downloadsBadge](https://img.shields.io/npm/dt/quickuptime?style=for-the-badge)](https://npmjs.com/quickuptime)
[![versionBadge](https://img.shields.io/npm/v/quickuptime?style=for-the-badge)](https://npmjs.com/quickuptime)
[![doc](https://img.shields.io/badge/Documentation-Click%20here-blue?style=for-the-badge)](https://quickuptime.js.org)

Quick Uptime is a powerful module which allows you to Uptime any website


## :bookmark: Features

-   ⏱️ Easy to use!
-   🔄 Provides Uptime
-   📁 Support for any website
-   ⚙️ Customizable
-   🚀 Super-powerful
-   🕸️ User Friendly
-   and much more!

## :pushpin:  Installation

```js
npm install quickuptime
```

### :label: Example Code :

```js
// Load the Package
const quickuptime = require('quickuptime')
const client = new quickuptime.Client()

// Starts uptiming the url's stored the in the db within an interval of 60000ms or the time configured in ms.
client.start() 

// Adds the url to the database.
client.addurl(url) 

// Removes the specific url from the database if exists.
client.removeurl() 

// Sets up a temp pinger which will ping the url supplied every interval supplied ms.
client.uptime(url, interval) 

// Clear all the data present.
client.clear() 

// Sets the time in ms to ping the urls after.
client.setinterval(interval)

// Stops the pinging process.
client.stop() 

// Stops the temp pinging process.
client.stopuptime() 

// Returns all of the urls present in the database in an array form.
client.allurls() 
```

## :rocket: Documentation 

https://quickuptime.js.org/


## 📝 Support Server

<a href="https://discord.gg/devs"><img src="https://invidget.switchblade.xyz/devs"/></a>
<br><br>
</div>
