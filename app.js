$(document).ready(function(){

  var timerID,
  currentRequest;

  function handleError(error){
    updateWord(error.responseText);
  }

  function getNewWord(){
    updateWord("Please Wait for Word.");

    if(currentRequest){
      currentRequest.abort();
    };

    repeatedlyAppendPeriods();
    currentRequest = $.get({url: "http://oseberg.io/interview/word_generator.php", success: updateWord})
    .fail(handleError);
  };

  function updateWord(newWord){
    console.log("Updating word....");
    $("#word").text(newWord);
    clearInterval(timerID);
  }

  function appendSinglePeriod(){
    $("#word").append(".");
  };

  function repeatedlyAppendPeriods(){
    timerID = setInterval(appendSinglePeriod,1000)
  }

  function currentlyDisplayedWord(){
    return $("#word").text()
  }

  function transformWord(){
    console.log("Updating word....");
    if(currentRequest){
      currentRequest.abort();
    };
    repeatedlyAppendPeriods();

    var builtURL = "http://oseberg.io/interview/shifter.php?word="+currentlyDisplayedWord()
    currentRequest = $.get({url: builtURL, success: updateWord})
    .fail(handleError);
  };

  $("#get-word").on("click", getNewWord);
  $("#transform-word").on("click", transformWord);
});
