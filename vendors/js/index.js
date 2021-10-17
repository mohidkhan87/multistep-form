// $('.legal-btn').on('click', function(){
//   console.log('Clicked')
// })

function toggleForm(name) {
  switch (name) {
    case 'legal':
      $('.legal-form').css('display', 'block');
      $('.individual-form').css('display', 'none');
      break;
    case 'individual':
      $('.individual-form').css('display', 'block');
      $('.legal-form').css('display', 'none');
      break;
    case 'legal-lender':
      $('.legal-form1').css('display', 'block');
      $('.individual-form1').css('display', 'none');
      break;
    case 'individual-lender':
      $('.individual-form1').css('display', 'block');
      $('.legal-form1').css('display', 'none');
      break;

    default:
      break;
  }
}