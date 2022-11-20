const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "5693254345msh210c1f64ca7ef9ap1c28fcjsn0b60a0ba5298",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };

  //calls to get ids and then a call to get lyrics for each id of folklore
  var staticLyricsUrl = "https://spotify23.p.rapidapi.com/track_lyrics/?id=";
  var staticTracksUrl = "https://spotify23.p.rapidapi.com/tracks/?ids=";
  //change the following to be dynamic
  const folkloreUrl = [
    "0Jlcvv8IykzHaSmj49uNW8",
    "4R2kfaDFhslZEMJqAFNpdd",
    "2Eeur20xVqfUoM3Q7EFPFt",
    "4pvb0WLRcMtbPGmtejJJ6y",
    "1MgV7FIyNxIG7WzMRJV5HC",
    "0ZNU020wNYvgW84iljPkPP",
      "6KJqZcs9XDgVck7Lg9QOTC",
      "3hUxzQpSfdDqwM3ZTFQY0K",
      "7kt9e9LFSpN1zQtYEl19o1",
      "2NmsngXHeC1GQ9wWrzhOMf",
      "6VsvKPJ4xjVNKpI8VVZ3SV",
      "2QDyYdZyhlP2fp79KZX8Bi",
      "08fa9LFcFBTcilB3iq2e2A",
      "5kI4eCXXzyuIUXjQra0Cxi",
      "7MbT4I8qGntX4fMdqMQgke",
      "6MWoRt97mnSTXZhu3ggi9C",
  ];
  
  async function getFolklore() {
    data = [];
    finalData = []
    var wordsToSearch = ["I", "we", "us", "love", "sorry" ,"goodbye" ,"stay", "go", "hello", "know"];
  
    for (var z = 0; z < folkloreUrl.length; z++) {
      var totalMatches = 0;
      //BUILDING OBJECT
      var dataObject = {
        name: "",
        id: folkloreUrl[z],
        searchWords: {},
        totals: {
          totalWordsSearched: 0,
          totalMatches: 0,
        },
      };
  
      //FETCHING TRACK LYRICS
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
      dataObject.totals["totalMatches"] = totalMatches;
      data.push(dataObject);
    }
  
    //FETCHING TRACK DETAILS
    trackUrl = staticTracksUrl + folkloreUrl.join(",");
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
  }
  getFolklore();