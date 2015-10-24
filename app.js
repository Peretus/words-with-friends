$(document).ready(
  
  function doYourDance(){

    var timerID,
      currentRequest;

    function handleError(error){
      updateWord(error.responseText);
    }

    function abortCurrentRequest(){
      if(currentRequest){
        currentRequest.abort();
      };
    }

    function currentlyActiveRequest(){
      return currentRequest.readyState !== 4;
    }

    function getNewWord(){
      updateWord("Please Wait for Word.");
      abortCurrentRequest();
      repeatedlyAppendPeriods();
      currentRequest = $.get({url: "http://oseberg.io/interview/word_generator.php", success: updateWord})
      .fail(handleError);
    }

    function updateWord(newWord){
      $("#word").text(newWord);
      clearInterval(timerID);
    }

    function appendSinglePeriod(){
      $("#word").append(".");
    }

    function repeatedlyAppendPeriods(){
      timerID = setInterval(appendSinglePeriod,1000);
    }

    function currentlyDisplayedWord(){
      return $("#word").text();
    }

    function transformWord(){
      if(!currentlyActiveRequest() && currentRequest.status == 200){
        var builtURL = "http://oseberg.io/interview/shifter.php?word="+currentlyDisplayedWord();
        updateWord("Please Wait for Transformation.");
        repeatedlyAppendPeriods();
        currentRequest = $.get({url: builtURL, success: updateWord})
        .fail(handleError);  
      };
    }

    $("#get-word").on("click", getNewWord);
    $("#transform-word").on("click", transformWord);
  }
  
);
