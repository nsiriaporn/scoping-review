//search for mobile apps that supports active transport in Apple App Store

const { default: scraper } = await import("app-store-scraper"); // Import app store scraper 
const { default: converter } = await import("json-2-csv");
const { default: fs } = await import("fs"); //Import the module to use files


//Function to translate the result of the request in CSV
//and write it into the file resultScrapingRequest.txt
csv2file = function(msg){
    msg.forEach(element => {
        //Remove the fields that may contain new line symbols.
        // Might not be enough
        delete element['icon'];
        delete element['genreIds'];
        delete element['primaryGenreId'];
        delete element['size'];
        delete element['screenshots'];
        delete element['ipadScreenshots'];
        delete element['appletvScreenshots'];
    }); 
    csv = converter.json2csv(msg, {delimiter : {field : '||'}})
    fs.appendFile("resultScrapingRequest.txt", csv, (err)=>{
            if(err){ console.log("Error in appendFile."); return truelog(err);}
     	});
    console.log("Request fullfield.");
};

/* available info: id, appId, title, url, description, icon, genres, genreIds, primaryGenre, primaryGenreId, contentRating,
  languages, size, requiredOsVersion, released, updated, releaseNotes, version, price, currency, free,
  developerId, developer, developerUrl, developerWebsite, score, reviews, currentVersionScore,
  currentVersionReviews, screenshots, ipadScreenshots, appletvScreenshots, supportedDevices */

//List of country searched in :
//au
//br
//fr
//sa
//th
//us

//Searches for the exact string :
// "active transportation"
// "active commute"
// "active travel"
// "active mobility"

scraper.search({
    term: "\"travel survey\"",  //search for exact phrasing using \"string\"
    country: "us",
    num: 250,
    fullDetail: true
  }).then(csv2file, console.log);

//Search for keywords :
// transportation walk pedestrian
// transportation bike bicycle cycle

scraper.search({
    term: "transportation cycle bicycle",
    country: "us",
    num: 250,
    fullDetail: true
  }).then(csv2file, console.log);
