

// Here we run our AJAX call to the EXTrading API
const displayInfo = function(event){

event.preventDefault(); 

// Get the symbol used to research
const symbol = $(`#find`).val().trim();
const queryURL = `https://api.iextrading.com/1.0/stock/${symbol}/batch?types=quote,news&range=1m&last=1`;


// const numberVal = $('#number').val().trim();

$.ajax({
  url: queryURL,
  method: 'GET'
})

.then(function(response) {

  // See table of information
  console.log(response);
 
  // console.log(numberVal);

  // console.log(response.response.docs[0].headline);
  // const front = (response.response);
  //     $(`#results`).text(front.docs[0].headline.main);




})
$(`#find`).val("");
};

$(`#run-search`).on('click', displayInfo);

// Function for displaying stock data


