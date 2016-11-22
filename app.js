/********************************

 Project: jagBot
 Author: Jason Cooper

********************************/


module.exports = function(robot) {

  //`.hear` command listens for a specific phrase anywhere in the Slack room. You don't have to mention
  //your Hubot in order to get a response.
  robot.hear(/Hello, jagBot!/, function(res) {
    return res.send("Cheerio!");
  });

  //`.respond` is similar to `.hear`, except it will only be triggered when someone specifically mentions
  //the Hubot using `@`, or sends a direct message
  robot.respond(/Tell me a Jag fact/, function(res) {

    var jagFacts = ['Enrico Ferrari declared the Jaguar E-Type "the most beautiful car ever made."','The Jaguar C-type, built for the 1953 Le Mans, was the first car with drum brakes.', 'Jaguar was founded by Sir William Lyons and William Walmsley as the Swallow Sidecar Company in 1922.', 'The Jaguar XJ220 was confirmed the fastest production car in the world at the time after Martin Brundle recorded a speed of 217 mph (349 km/h) on the Nardo track in Italy.', "Steve McQueen owned one of 16 “XKSS” models and kept it for 10 years. The car cost him his license twice, and sold it. But he quickly bought it back."];

    function getRandomJagFact() {
      var randomJagFact = getRandomIntInclusive(0,jagFacts.length-1);
      return jagFacts[randomJagFact];
    }

    return res.send(getRandomJagFact());
  });

  robot.respond(/Show me the (.*)/i, function(msg) {

    var jagModel;
    jagModel = msg.match[1];
    var jagModelIntro = "Here is the ";
    var jagModelURL = "http://jasonpaxtoncooper.com/jagbot/";
    var jagModelPic;
    var datestamp = "?" + Date.now();

    switch(jagModel) {
      case "XKR":
        jagModelPic = "xkr.jpg" + datestamp;
        break;
      case "XJR":
        jagModelPic = "xjr.jpg" + datestamp;
        break;
      case "XJS":
        jagModelPic = "xjs.jpg" + datestamp;
        break;
      case "XJ220":
        jagModelPic = "xj220.jpg" + datestamp;
        break;
      case "XKE":
        jagModelPic = "xke.jpg" + datestamp;
        break;
      default:
        jagModel = "";
        jagModelIntro = "I couldn't find that Jag model.";
        jagModelURL = "";
        jagModelPic = "";
    };

    return msg.reply(jagModelIntro + jagModel + " " + jagModelURL + jagModelPic);
  });

  robot.respond(/Can you find me an (.*)/i, function(msg) {

    var jagModel;
    jagModel = msg.match[1];
    var jagModelIntro = "Here are some ";
    var jagModelURL = "http://www.autotrader.com/cars-for-sale/Jaguar/";

    return msg.reply(jagModelIntro + jagModel + "s for sale: " + jagModelURL + jagModel);
  });
};

// Returns a random integer between min (included) and max (included)
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
