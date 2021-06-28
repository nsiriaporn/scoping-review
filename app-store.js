#search for mobile apps that supports active transport in Apple App Store

scraper = require('app-store-scraper'); // Import app store scraper 
converter = require('json-2-csv');
fs = require('fs'); //Import the module to use files
process.chdir("C:\\Users\\jungg\\Jupyter Notebooks");// Change directory to write in the Jupyter notebook repository

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
        delete element['requiredOsVersion'];
        delete element['releaseNotes'];
        delete element['version'];
        delete element['currency'];
        delete element['free'];
        delete element['reviews'];
        delete element['currentVersionScore'];
        delete element['currentVersionReviews'];
        delete element['screenshots'];
        delete element['score'];
        delete element['developerUrl'];
        delete element['supportedDevices'];
        delete element['ipadScreenshots'];
        delete element['appletvScreenshots'];
        element['description'] = element['description'].replace(/\r?\n|\r/g, " ");  //app descriptions include new lines, this line is to take out the new lines
        /*
        delete element['androidVersionText'];
        delete element['developerId'];
        delete element['description'];
        delete element['developerEmail'];
        delete element['privacyPolicy'];
        delete element['developerInternalID'];
        delete element['genreId'];
        delete element['familyGenre'];
        delete element['familyGenreId'];
        delete element['icon'];
        delete element['headerImage'];
        delete element['screenshots'];
        delete element['video'];
        delete element['videoImage'];
        delete element['contentRating'];
        delete element['contentRatingDescription'];
        delete element['adSupported'];
        delete element['comments'];
        delete element['developerAddress'];
        delete element['recentChanges'];
        delete element['editorsChoice']*/
    }); 
    converter.json2csv(msg,(err,csv)=> {
        if(err){
            throw err;
        }
        fs.appendFile("resultScrapingRequest.txt", csv, function(err){
            if(err){ return truelog(err);}
        });
    });
    console.log("Request fullfield.");
};

/* available info: id, appId, title, url, description, icon, genres, genreIds, primaryGenre, primaryGenreId, contentRating,
  languages, size, requiredOsVersion, released, updated, releaseNotes, version, price, currency, free,
  developerId, developer, developerUrl, developerWebsite, score, reviews, currentVersionScore,
  currentVersionReviews, screenshots, ipadScreenshots, appletvScreenshots, supportedDevices */

// "active transport"
// "active transportation"
// "active commute"
// "active travel"
// "active mobility"
// "travel behavior"
// "travel behaviour"
// "travel survey"

scraper.search({
    term: "\"travel survey\"",  //search for exact phrasing 
    country: "us",
    num: 250,
    fullDetail: true
  }).then(csv2file, console.log);

// transport walk bike
// transport walking biking
// transport cycle bicycle
// transport cycling bicycling
// transportation walk bike
// transportation walking biking
// transportation cycle bicycle
// trasnportation cycling bicycling

scraper.search({
    term: "transportation cycle bicycle",
    country: "us",
    num: 250,
    fullDetail: true
  }).then(csv2file, console.log);
