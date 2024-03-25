# R.I.F.T.
<p align = center>
<img src = "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/752/104/datas/gallery.jpg">
</p>

## Overview
Remote Infantry Field Tracker for efficient medical personnel dispatch which tracks live GPS location and health data. 
## Inspiration
While brainstorming project topics, we came up with the idea of having fast response times when dispatching medical help on the battlefield. The possibility of this technology being realised through wearable devices intrigued us, thus we decided to attempt **TERRA API**'s challenge for the best application for military use.
## What it does
Tracks the health data of soldiers on the battlefield through wearable devices, which are then sent to a remote field commander/operator. This data allows rapid feedback on which soldiers might be injured and the potential severity of their injury so that appropriate medical personnel can be dispatched. Additional functionalities such as pinning certain soldiers, adaptive markers, as well as highlighting those with critical status have also been implemented.
## How we built it
The front end was built using HTML/CSS/JavaScript, alongside the Google Maps API, which allowed us to display the live location of a group of soldiers in real time on a geographically accurate map. The data is retrieved from a Node.js server hosted by ngrok, which retrieves live data from a Bangle.js2 wearable smartwatch. Further extensibility for other wearables is also allowed through a TERRA API-based Kotlin application.
## What we learned

Due to it being the first hackathon experience for most of the group, working in a new environment, with all the tools provided has allowed us to gain insight into real-world software development. The unexpected errors which arose, although challenging to fix, managed to teach us about the intricacies of multiple frameworks that we used within the project.
## What's next for R.I.F.T.

Due to hardware limitations, the GPS data cannot be streamed to the client, only medical data is available. Therefore, we would like to successfully implement GPS data into our application. 

## Built with
`google-maps-api` `espruino.js` `terra-api` `javascript` `html5` `css3`
