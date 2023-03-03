# swiftify - interactive media project

**This app is in development mode as it is a student project. This means only specfic accounts which I have added on the developer dashboard can view the application and Andre and Hanli have been added. **



 This website uses the Implicit Flow Auth flow because this is a client-side front-end application. Using the other flows requires server side requests for access tokens and this application is not ready for public release as yet. I would like to continue working on this post exam.  


## This website is deployed on Netlify so please use the netlify link NOT github-pages


![Home Page](https://github.com/ketaniaaa/swiftify/blob/main/assets/home.png) 



This is a website that I created for my course Interactive Media 3B at the University of Witswaterstrand. This is a static website, with only front-end development. The task for this semester has been to create a site to hold assigned essays via [Blog Posts](https://swiftify.netlify.app/pages/blog.html) , [design documentation](https://swiftify.netlify.app/pages/design.html) and [data visualizations](https://swiftify.netlify.app/pages/data.html). 


The main focus regarding the technical element of this project was to use the D3 library to create data visualizations that embody a narrative with data from a web API. My chosen API was the Spotify Web API and I have created a site that explores the data about Taylor Swift. For the course, I have focused my visualizations around Taylor Swifts most recent albums as of November 2022 (not including re-recording records such as Red (Taylor's Version) and Fearless (Taylor's Version)) being Midnights, Folklore and Evermore.

external api's:
- [D3.js](https://d3js.org/)
- [jQuery](https://jquery.com/)
-[Figma](https://www.figma.com/file/nXSbUGQVQb5hufBDDgLNSY/Swiftify?node-id=0%3A1)
-[Handlebars](https://handlebarsjs.com/)
-[Spotify](https://developer.spotify.com/documentation/web-api/)


Click here: [Swiftify](https://swiftify.netlify.app/)

I have hosted the site on Netlify for faster deployment  at **https://swiftify.netlify.app/** . Netlify uses the commits to my repo to update the deployment live.
It is ***crucial*** to use the Netlify url rather than GitHub Pages because my API callback uri that I have put on the Spotify Developer Dashboard is https://swiftify.netlify.app/ 
If you do not use this link, you will not be able to view any visualizations or the site at all because there will be an INCORRECT_URI alert that will prevent the use of the 
github site! This link allows the OAuth token to be returned :)! This is also why there are so many commits- I have had to use the deployed site to see changes rather than being able to use the live server.











