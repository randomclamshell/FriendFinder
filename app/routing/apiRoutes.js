//setting up the link to the table data from friends.js 
const friendsData = require("../data/friends");

module.exports = function (app) {

  //this is to retrive the data that was submitted from the survey
  app.get("/data/friends", function (req, res) {
    res.JSON(friendsData);
  })



  app.post("/data/friends", function (req, res) {
    //this is going to hold the new friend object
    const newFriend = {
      name: "",
      photo: "",
      scoreDifference: 1000
    };

    const userData = req.body;
    const userScores = friendsData.scores;

    const totalDifference = 0;


    for (var i = 0; i < friendsData.length; i++) {

      console.log(friendsData[i]);
      totalDifference = 0;

      for (var j = 0; i < friendsData[i].scores[j]; j++) {

        totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friendsData[i].scores[j]));
        
      }
      if (totalDifference <= newFriend.scoreDifference) {

        newFriend.name = friendsData[i].name;
        newFriend.photo = friendsData[i].photo;
        newFriend.scoreDifference = totalDifference;
      }
    }

    friendsData.push(userData);
    res.JSON(newFriend);

  });
};