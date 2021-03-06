// Same thing as $(document).ready(function()
$(function(){
  // $(document).ready(function(){
// stock tale
const stocksList = ['FB', 'AAPL', 'TSLA', 'GOOGL'];
const validationList = [];

// Hide the Modal at the beginning
const hideMod = function(){
$(`.modal-dialog`).hide();
console.log("Hide at the top");

};

// Call the hide function
hideMod();


// Global Variables
let newsArticle = "";
let logoSymbol = "";
// Populate a list of all the symbols

const validate = function () {
  // event.preventDefault(); 


  const symbolURL = `https://api.iextrading.com/1.0/ref-data/symbols`;

  $.ajax({
    url: symbolURL,
    method: 'GET'
  })
    .then(function (response) {

      // console.log(response);
      // console.log(response[101].symbol);

      for (let i = 0; i < response.length; i++) {

        const stockSymbol = (response[i].symbol);
        // console.log(stockSymbol); 
        // console.log([i]); 
        validationList.push(stockSymbol);

      }
      // console.log(validationList);

    })


};
// });

// Create the table when the table while the page loads
$(document).ready(validate);

// Function to call the Logo
// const getLogo = function(){

//    event.preventDefault(); 
//        // Logo
//        $.ajax({
//         url: logoURL,
//         method: 'GET'
//       })

//       .then(function(response) {

//         console.log(response.url)
//         const stockSid = $('<div>').addClass('stockSide');
//         const logoSymbol = $(`<img src="${response.url}">`)


//         stockSid.append(logoSymbol);
//         $(`#stock-side`).prepend(logoSymbol)
//       }) //End of logoURL

// }


// Here we run our AJAX call to the EXTrading API
const displayInfo = function (event) {

  event.preventDefault();

  // Get the symbol used to research

  const symbol = $(this).attr('data-name');
  const queryURL = `https://api.iextrading.com/1.0/stock/${symbol}/batch?types=quote,news&range=1m&last=1`;

  const logoURL = `https://api.iextrading.com/1.0/stock/${symbol}/logo`;

  const newsURL = `https://api.iextrading.com/1.0/stock/${symbol}/news`;

  $.ajax({
    url: queryURL,
    method: 'GET'
  })

    .then(function (response) {

      console.log(response);
      // Creating a div to hold the stock
      const stockDiv = $('<div>').addClass('stock');

      // Storing the company name
      const companyName = response.quote.companyName;

      // Creating an element to display the company name
      const nameHolder = $('<h3>').text(`Company Name: ${companyName}`);

      // Appending the name to our stockDiv
      stockDiv.append(nameHolder);

      // Storing the price
      const stockPrice = response.quote.latestPrice;

      // Creating an element to display the price
      const priceHolder = $('<p>').text(`Stock Price: $${stockPrice}`);

      // Appending the price to our stockDiv
      stockDiv.append(priceHolder);




      // Finally adding the stockDiv to the DOM
      // Until this point nothing is actually displayed on our page
      $('#stock-info').prepend(`<hr>`);
      $('#stock-info').prepend(stockDiv);
      // getLogo ();



      count = 0;
      // News 10
      $.ajax({
        url: newsURL,
        method: 'GET'
      })

        .then(function (response) {

          console.log(response);

          for (let i = 0; i < 10; i++) {

            // global newsArticle above 
            newsArticle = (response[i].headline);
            console.log(newsArticle);
            console.log([i]);

            // Creating an element to display the news summary
            const summaryHolder = $('<p>').text(`News Headline: ${newsArticle}`);

            // Appending the summary to our stockDiv
            stockDiv.append(summaryHolder);
            count++
          }

        }) //End News

      // Logo
      $.ajax({
        url: logoURL,
        method: 'GET'
      })

        .then(function (response) {

          console.log(response.url)
          // const stockSid = $('<div>').addClass('stock');
          console.log(count);
          const logoSymbol = $(`<img class="image"src="${response.url}">`)


          // stockDiv.append(logoSymbol);
          // $(`#stock-side`).prepend(logoSymbol);
          $(`#stock-info`).prepend(logoSymbol);
        }) //End of logoURL

    })  //end of queryURL

};




// Display the buttons
// Function for displaying stock symobl in the boxes
const renderButtons = function () {

  // Deleting the stocks prior to adding new stocks
  // (this is necessary otherwise you will have repeat buttons)
  $('#buttons-view').empty();

  // Looping through the array of stocks
  for (let i = 0; i < stocksList.length; i++) {
    // Creating the button
    const newButton = $('<button type="submit" class="btn btn-default">');
    //  const space = $(`&nbsp`);
    // Add type="submit" class="btn btn-default" to the button to make it look nicer

    // Adding a class of stock-btn to our button
    newButton.addClass('stock-btn');

    // Adding a data-attribute
    newButton.attr('data-name', stocksList[i]);

    // Providing the initial button text
    newButton.text(stocksList[i]);

    // const space = $(`&nbsp`).html();
    const space = (`<i>  </i>`);
    // $('#buttons-view').append(space);

    // Adding the button to the buttons-view div
    $('#buttons-view').append(newButton, space);

  }
};

// Clicking on the button creates a new button
const addButton = function (event) {

  // event.preventDefault() prevents the form from trying to submit itself.
  event.preventDefault();


  // This line will grab the text from the input box and make upper case as well as trim no spaces
  const stock = $('#input').val().trim().toUpperCase();

  // The stock from the text box is then added to our array


  var check = 0;
  console.log(`beginning ${check}`);
  for (let i = 0; i < validationList.length; i++) {
    const checkSymbol = validationList[i];
    // console.log(checkSymbol); 
    console.log(`in for loop ${check}`);
    if (checkSymbol === stock) {
      check = 1;
      break;
      // }else{
      //   check = true;
      //   console.log(`Not equal ${check}`);
    }

  };

  // Make sure the new Stock is not pushed if  
  // console.log(stocksList);
  console.log(`before append stock button ${check}`);
  if (check === 0) {
    // alert("Stock symbol is not valid. Please try again");
    // Calling the Modal
    $('#myModal').on('shown.bs.modal', function () {
      $('#myInput').trigger('focus')
    });
    // Allowing the display of th Modal
    $('.modal-dialog').show();
    console.log("show up!!");

  } else {
    stocksList.push(stock);
  };


  // Deletes the contents of the input
  $('#input').val('');

  // calling render which handles the processing of our stock array
  renderButtons();
};

// Even listener for #add-stock button
$('#add-symbol').on('click', addButton);

// Adding a click event listener to all elements with a class of 'stock-btn'
$('#buttons-view').on('click', '.stock-btn', displayInfo);

// Calling the renderButtons function to display the initial buttons
renderButtons();

// Function to empty out the articles
const clear = function () {
  $('#stock-info').empty();
}


//  .on('click') function associated with the clear button
$('#clear-all').on('click', clear);

$(`.close`).on("click", function () {
  hideMod();
});

// Clear the Alert Button
$(`#alertB`).on("click", function () {
  hideMod();

});


})