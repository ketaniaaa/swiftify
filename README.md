# swiftify - interactive media project


## This website is deployed on Netlify so please use the netlify link NOT github-pages

This is a website that I created for my course Interactive Media 3B at the University of Witswaterstrand. This is a static website, with only front-end development. The task for this semester has been to create a site to hold assigned essays via [Blog Posts](https://swiftify.netlify.app/pages/blog.html) , [design documentation](https://swiftify.netlify.app/pages/design.html) and data visualizations. The main focus regarding the technical element of this project was to use the D3 library to create data visualizations that embody a narrative with data from a web API. My chosen API was the Spotify Web API and I have created a site that explores the data about Taylor Swift. For the course, I have focused my visualizations around Taylor Swifts most recent albums as of November 2022 (not including re-recording records such as Red (Taylor's Version) and Fearless (Taylor's Version)) being Midnights, Folklore and Evermore.

external api's:
- [D3.js](https://d3js.org/)
- [jQuery](https://jquery.com/)
-[Figma](https://www.figma.com/file/nXSbUGQVQb5hufBDDgLNSY/Swiftify?node-id=0%3A1)
-[Handlebars](https://handlebarsjs.com/)
-[Spotify](https://developer.spotify.com/documentation/web-api/)


Click here: [Swiftify](https://swiftify.netlify.app/)

I have hosted the site on Netlify for faster deployment  at **https://swiftify.netlify.app/** 

It is ***crucial*** to use the Netlify url rather than GitHub Pages because my API call ball uri that I have put on the Spotify Developer Dashboard is https://swiftify.netlify.app/ 
If you do not use this link, you will not be able to view any visualizations or the site at all because there will be an INCORRECT_URI alert that will prevent the use of the 
github site! This link allows the OAuth process to be returned :)!

![Home Page](https://github.com/ketaniaaa/swiftify/blob/main/assets/home.png) 


### To-Do 
- media queries 
- update static array for indiv albums 
- fix back navigation for visualizations 
- use playback sdk and embeds for further music plays 
- fix mobile wireframes 
- update planning docs
- research image quality loading 
- add more microformatting and change current classes to ids aka update json ld and meta for album pages 
- improve seo for new charts 




