//search google play store for mobile apps that supports active transport

const { default: scraper } = await import("google-play-scraper"); // Import play store scraper 
const { default: converter } = await import("json-2-csv");
const { default: fs } = await import("fs"); //Import the module to use files

//Function to translate the result of the request in CSV
//and write it into the file resultScrapingRequest.txt
csv2file = function(msg){
    msg.forEach(element => {
        delete element['descriptionHTML'];
        delete element['scoreText'];
        delete element['histogram.1'];
        delete element['histogram.2'];
        delete element['histogram.3'];
        delete element['histogram.4'];
        delete element['histogram.5'];
        delete element['originalPrice'];
        delete element['discountEndDate'];
        delete element['currency'];
        delete element['priceText'];
        delete element['offersIAP'];
        delete element['IAPRange'];
        delete element['androidVersion'];
        delete element['androidVersionText'];
        delete element['androidMaxVersion'];
        delete element['developerId'];
        delete element['developerAddress'];
        delete element['developerInternalID'];
        delete element['icon'];
        delete element['headerImage'];
        delete element['screenshots'];
        delete element['video'];
        delete element['categories'];        
        delete element['previewVideo'];
        delete element['preregister'];
        delete element['earlyAccessEnabled'];
        delete element['adSupported'];
        delete element['videoImage'];
        delete element['isAvailableInPlayPass']
    });
    csv = converter.json2csv(msg, {delimiter : {field : '||'}})
    fs.appendFile("resultScrapingRequest.txt", csv, (err)=>{
            if(err){ console.log("Error in appendFile."); return truelog(err);}
     	});
    console.log("Request fullfield.");
};


// Documentation for the scraper module :
// https://www.geeksforgeeks.org/data-scraping-for-android-apps-using-google-play-scraper-in-node-js/

//List of country we search in
//au
//br
//fr
//sa
//th
//us

//List of search by exact string
// active transportation
// active mobility
// active travel
// active commute - might not work for exact string

  scraper.search({
    term: "\"travel survey\"", //search exact phrasing using \"string\"
    country: "au",
    num: 250,
    fullDetail: true
  }).then(csv2file, console.log);

// transportation walk
// transportation bicycle
// commute walk
// commute bicycle

  scraper.search({
    term: "transport walk pedestrian",
    country: "au",
    num: 250,
    fullDetail: true
  }).then(csv2file, console.log);

//search for info of a specific app
  scraper.app({appId: 'br.com.mobilicidade.bikebrasilia'}).then(console.log, console.log);
  
