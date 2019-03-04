// stock tale
const stocksList = ['FB', 'AAPL', 'TSLA', 'GOOGL'];
const validationList = [];

// Populate a list of all the symbols
// $(document).ready(function(){
const validate = function(){
  event.preventDefault(); 


  const symbolURL = `https://api.iextrading.com/1.0/ref-data/symbols`;

  $.ajax({
    url: symbolURL,
    method: 'GET'
  })
  .then(function(response) {

    console.log(response);
    console.log(response[101].symbol);
    
    for(let i = 0; validationList.length; i++){
      console.log(response[i].symbol); 
      const stockSymbol = response[i].symbol;
      validationList.push(stockSymbol);

    }
    console.log(validationList);
    
  })


};
// });

$(`#symbol-List`).on('click', validate);

// Function to call the Logo

// const displayLogo = function(event){
//   event.preventDefault(); 
//   const symbol = $(this).attr('data-name');
  

// }


// Here we run our AJAX call to the EXTrading API
const displayInfo = function(event){

event.preventDefault(); 

// Get the symbol used to research

const symbol = $(this).attr('data-name');
const queryURL = `https://api.iextrading.com/1.0/stock/${symbol}/batch?types=quote,news&range=1m&last=1`;

const logoURL = `https://api.iextrading.com/1.0/stock/${symbol}/logo`;

$.ajax({
  url: queryURL,
  method: 'GET'
})

.then(function(response) {

    console.log(response);  
    // Creating a div to hold the stock
    const stockDiv = $('<div>').addClass('stock');

    // Storing the company name
    const companyName = response.quote.companyName;

    // Creating an element to display the company name
    const nameHolder = $('<p>').text(`Company Name: ${companyName}`);
    
    // Appending the name to our stockDiv
    stockDiv.append(nameHolder);

    // Logo
    $.ajax({
      url: logoURL,
      method: 'GET'
    })
    
    .then(function(response) {

      console.log(response.url)

      const logoSymbol = $(`<img src="${response.url}">`)
      
      stockDiv.append(logoSymbol);
    }) //End of logoURL

    
    // Storing the stock symbol
    const stockSymbol = response.quote.symbol;

    // Creating an element to display the stock symbol
    const symbolHolder = $('<p>').text(`Stock Symbol: ${stockSymbol}`);

    // Appending the symbol to our stockDiv
    stockDiv.append(symbolHolder);

    // Storing the price
    const stockPrice = response.quote.latestPrice;

    // Creating an element to display the price
    const priceHolder = $('<p>').text(`Stock Price: $${stockPrice}`);

    // Appending the price to our stockDiv
    stockDiv.append(priceHolder);

    // Storing the first news summary
    const companyNews = response.news[0].summary;

    // Creating an element to display the news summary
    const summaryHolder = $('<p>').text(`News Headline: ${companyNews}`);

    // Appending the summary to our stockDiv
    stockDiv.append(summaryHolder);

    // Finally adding the stockDiv to the DOM
    // Until this point nothing is actually displayed on our page
    $('#stock-info').prepend(`<hr>`);
    $('#stock-info').prepend(stockDiv); 

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
    
    
    // Adding the button to the buttons-view div
    $('#buttons-view').append(newButton);
    
  }
};

// Clicking on the button creates a new button
const addButton = function(event) {
 
  // event.preventDefault() prevents the form from trying to submit itself.
  event.preventDefault();
 

  // This line will grab the text from the input box
  const stock = $('#input').val().trim();
  
  // The stock from the text box is then added to our array
  stocksList.push(stock);
  console.log(stocksList);

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






