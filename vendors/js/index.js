// $('.legal-btn').on('click', function(){
//   console.log('Clicked')
// })

function toggleForm(name) {
  switch (name) {
    case 'legal':
      $('.legal-form').show();
      $('.individual-form').hide();
      break;
    case 'individual':
      $('.individual-form').show();
      $('.legal-form').hide();
      break;
    case 'legal-lender':
      $('.legal-form1').show();
      $('.individual-form1').hide();
      break;
    case 'individual-lender':
      $('.individual-form1').show();
      $('.legal-form1').hide();
      break;

    default:
      break;
  }
}

// Handle inputs on change

function inputHandler(e) {

let eventName = e.target.name;
let eventValue = e.target.value;
// let selectedText = $(e.val());

// $('#aioConceptName').find(":selected").text();

$('.'+eventName)[0].innerHTML = eventValue
// console.log($('.'+eventName)[0]);
  
}