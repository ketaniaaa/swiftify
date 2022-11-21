const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "5693254345msh210c1f64ca7ef9ap1c28fcjsn0b60a0ba5298",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };
  var staticLyricsUrl = "https://spotify23.p.rapidapi.com/track_lyrics/?id="; //fetch lyrics endpoint
  var staticTracksUrl = "https://spotify23.p.rapidapi.com/tracks/?ids="; //fetch tracks once using ids and string the ids together rather than indiv api calls 
  //urls 
  const folkloreUrl = [
    "0Jlcvv8IykzHaSmj49uNW8",
    "7l2tmgUhV7Y2aJHjiszifg",
    "3zwMVvkBe2qIKDObWgXw4N",
    "2QDyYdZyhlP2fp79KZX8Bi",
    "5enxwA8aAbwZbf5qCHORXi",
    "1gWRnZ52AK1ZUvpjjTteKf",
    "1ubvV5ECkm6nSI6g1HmbBK",
    "0aV5uARAknQgYhBaK944FP",
    "1P17dC1amhFzptugyAO7Il",
    "32mVHdy0bi1XKgr0ajsBlG",
    "7lxADouiWFkwR7ZV2GKUcH", //back to december
    "5P2bHCDM2tsgIaYWsZMhu5",
    "5P2bHCDM2tsgIaYWsZMhu5",
    "5P2bHCDM2tsgIaYWsZMhu5",
    "5P2bHCDM2tsgIaYWsZMhu5",
    "5P2bHCDM2tsgIaYWsZMhu5",

    /*
    "4R2kfaDFhslZEMJqAFNpdd",
    "2Eeur20xVqfUoM3Q7EFPFt",
    "4pvb0WLRcMtbPGmtejJJ6y",
    "1MgV7FIyNxIG7WzMRJV5HC",
    "7DAB0lFAvDT0Nhw5BjBqt1",
      "6KJqZcs9XDgVck7Lg9QOTC",
      "3hUxzQpSfdDqwM3ZTFQY0K",
      "7kt9e9LFSpN1zQtYEl19o1",
      "2NmsngXHeC1GQ9wWrzhOMf",
      "6VsvKPJ4xjVNKpI8VVZ3SV",
      "2QDyYdZyhlP2fp79KZX8Bi",
      "08fa9LFcFBTcilB3iq2e2A",
      "5kI4eCXXzyuIUXjQra0Cxi",
      "7MbT4I8qGntX4fMdqMQgke",
      "6MWoRt97mnSTXZhu3ggi9C",*/
  ];
  
  async function getFolklore() {
    data = [];
    finalData = []
    var wordsToSearch = ["Love", "Him", "go", "stay", "no", "boyfriend", "boy", "ex", "never", "her", "baby", "you", "he", "his", "we", "us", "21", "18", "19", "lover", "miss", "wish", "mine", "yours", "tears", "dead", "dying", "cry", "tears", "stayed", "left", "gone", "not","leave","leaving" ];
  
    for (var z = 0; z < folkloreUrl.length; z++) {
      var totalMatches = 0;
     //////////////////////////////////////////////////////////////////////////////////////// //BUILDING OBJECT
      var dataObject = {
        name: "",
        id: folkloreUrl[z],
        searchWords: {},
        totalMatches: 0,
        totals: {
          totalWordsSearched: 0,
          
        },
      };
  
     //////////////////////////////////////////////////////////////////// //FETCHING TRACK LYRICS
      var trackId = folkloreUrl[z];
      var response = await fetch(staticLyricsUrl + trackId, options).catch(
        (err) => console.error("error:" + err)
      );
      const folkloreData = await response.json();
      const linedata = folkloreData.lyrics.lines;
      var lyrics = linedata.map((x) => x.words);
  
      //BUILDING FREQUENCY OF SEARCH WORDS IN LYRICS
      for (var k = 0; k < wordsToSearch.length; k++) {
        var count = 0;
        for (var i = 0; i < lyrics.length; i++) {
          var stringArray = lyrics[i].split(" ");
          for (var j = 0; j < stringArray.length; j++) {
            stringArray[j] = stringArray[j].replace(/[,"()?]/g, "").toLowerCase();
            if (wordsToSearch[k].toLowerCase() === stringArray[j]) {
              count++;
            }
          }
        }
        dataObject.searchWords[wordsToSearch[k]] = count;
        totalMatches += count;
      }
  
      dataObject.totals["totalWordsSearched"] = wordsToSearch.length;
      dataObject["totalMatches"] = totalMatches; //making this value easy to access 
      data.push(dataObject);
    }
  
    /////////////////////////////////////////////////////////////////////////////////////////////////////FETCHING TRACK DETAILS
    trackUrl = staticTracksUrl + folkloreUrl.join(","); //trying to make on call instead of invidually adding in the track ids 
    var trackDetails = await fetch(trackUrl, options)
      .then((res) => res.json())
      .catch((err) => console.error("error:" + err));
  
    for (var k = 0; k < trackDetails.tracks.length; k++) {
      newDataObject = data[k];
      newDataObject.name = trackDetails.tracks[k].name;
      finalData.push(newDataObject)
    }
  
    //   var new_data;
    //   for (var j = 0; j < response.tracks.length; j++) {
    //     new_data[j] = {
    //       song: response.tracks[j].name,
    //       total: data[j],
    //     };
    //   }
    //   new_data.sort(function (a, b) {
    //     return a.total - b.total;
    //   });
    console.log(finalData);



//start d3 calls 
var margin = {top: 30, right: 30, bottom: 30, left: 30},
  width = 750 - margin.left - margin.right,
  height = 750 - margin.top - margin.bottom;

var svg = d3.select("#dataArtworkExam")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

var myColor = d3.scaleLinear()
  .range(["#D86E7A", "#310D11"])
  .domain([1,100])


  var randomX = d3.randomUniform(0, 600),
  randomY = d3.randomUniform(0, 660);

  // create a tooltip
  var examtooltip = d3.select("#dataArtworkExam")
  .append("div")
  .style("opacity", 0)
  .attr("class", "examtooltip")
  .style("background-color", "rgba(255, 255, 255, 0.474)")
  .style("border", "solid")
  .style("padding", "5px")
  .style("padding", "5px")
  .style("align-items", "center")
  .text("");

//move tooltip 

var mouseover = function(d) {
  examtooltip.style("opacity", 1)
  d3.select(this)
  .style("stroke", "black")
  .style("opacity", 1)
}
var mousemove = function(event, d) {
    var matrix = this.getScreenCTM()
  .translate(+ this.getAttribute("x"), + this.getAttribute("y"));
  examtooltip
    .html("the track '" + d.name + "' has " + d.totalMatches + "break-up word matches")
   .style("left", (window.pageXOffset + matrix.e + 15) + "px")
    .style("top", (window.pageYOffset + matrix.f - 30)+ "px")
}
var mouseleave = function(d) {
  examtooltip.style("opacity", 0)
  d3.select(this)
  .style("stroke", "none")
  .style("opacity", 0.9)
}

  svg.selectAll()
    .data(finalData, function(d) {return d.name+':'+d.totalMatches;})
    .enter()
    .append("rect")
      .attr("x", randomX)
      .attr("y", randomY)
      .attr("width", 50 )
      .attr("class","examSvg")
      .attr("height", 50 )
      .style("fill", function(d) { return myColor(d.totalMatches)} )
      .style("stroke-width", 2)
      .style("stroke", "none")
      .style("opacity", 0.9)
      .style("padding", "2px")
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)



  }
  getFolklore();