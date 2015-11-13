$(document).ready(function(){
var playerArray = [];
var initiativeObject = {};
var currentPass = 1;
//
//add player
//
var addPlayer = function(playerName, initiativeValue, numOfPasses) {
    subObject = { "name": playerName,"init": initiativeValue,"passes":numOfPasses };
    playerArray.push(subObject);
};
var displayPlayers = function(array) {
  var playerHtml = '';
  for (var i = 0; i < array.length; i++) {
    playerHtml += '<p class="player"><button class="btn btn-primary" type="button">';
    //for (var key in playerArray[i]) {
      playerHtml += array[i]["name"];
      playerHtml += ' <span class="badge">Init '+array[i]["init"]+'</span> ';
      playerHtml += ' <span class="badge">Passes '+array[i]["passes"]+'</span> ';
    //}
    playerHtml += '</button></p>';
   }
  $('.displayPlayers').html(playerHtml);
};
$('.addPlayerBtn').on('click', function(){
  var playerNameInp = $('#playerNameInp').val();
  var initiativeRoll = $('#initiativeRoll').val();
  var numOfPasses = $('#numOfPasses').val();
  player = addPlayer(playerNameInp, initiativeRoll, numOfPasses);
  playerArray = _.sortBy(playerArray, "init").reverse();
  displayPlayers(playerArray);
  //$('.displayPlayers').text(JSON.stringify(_.sortBy(playerArray, "init").reverse(), null, 2));
});
});
