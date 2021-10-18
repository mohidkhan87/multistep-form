//  Step 1 Forms
var legalFrm = $("#legalFrm");
var legalFrmValidator = legalFrm.validate();

//   var individualFrm = $("#individualFrm");
//   var individualFrmValidator = individualFrm.validate();

//   Step 2 Forms
var legalFrm1 = $("#legalFrm1");
var legalFrm1Validator = legalFrm1.validate();

//   Step 3 Form
var loanForm = $("#loanForm");
var loanFormValidator = loanForm.validate();

//   Step 4 Form
var recitalsForm = $("#recitals-form");
var recitalsFormValidator = recitalsForm.validate();

//   Step 5 Form
var definitionFrm = $("#definitionFrm");
var definitionFrmValidator = definitionFrm.validate();

$("#demo").steps({
  transitionEffect: 2,
  transitionEffectSpeed: 200,
  onChange: function (currentIndex, newIndex, stepDirection) {
    console.log(currentIndex, newIndex, stepDirection)
    // Changing Right Display for each step change
    changeDisplay(currentIndex)
    // step1
    if (currentIndex === 0) {
      if (stepDirection === "forward") {
        // return legalFrm.valid();
        //   return individualFrm.valid();
      }
      if (stepDirection === "backward") {
        // legalFrmValidator.resetForm();
        //   individualFrmValidator.resetForm();
      }
    }
    // step2
    if (currentIndex === 1) {
      if (stepDirection === "forward") {
        // return legalFrm1.valid();
      }
      if (stepDirection === "backward") {
        // legalFrm1Validator.resetForm();
      }
    }
    // step3
    if (currentIndex === 2) {
      if (stepDirection === "forward") {
        // return loanForm.valid();
      }
      if (stepDirection === "backward") {
        // loanFormValidator.resetForm();
      }
    }
    // step4
    if (currentIndex === 3) {
      if (stepDirection === "forward") {
        recitalsFormValidator.resetForm();
        return recitalsForm.valid();
      }
      if (stepDirection === "backward") {
        // recitalsFormValidator.resetForm();
      }
    }
    // step5
    if (currentIndex === 4) {
      if (stepDirection === "forward") {
        // return definitionFrm.valid();
      }
      if (stepDirection === "backward") {
        // definitionFrmValidator.resetForm();
      }
    }
    return true;
  },
  onFinish: function () {
    alert("Agreement Completed");
  },
});




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
  $('.' + eventName)[0].innerHTML = eventValue;
}

function changeDisplay(currentStep) {
  let display_steps = document.getElementsByClassName("display-steps");
  for (let i = 0; i < display_steps.length; i++) {
    display_steps[i].style.display = 'none'
  }
  let displayElement = document.getElementById("display-step-" + currentStep);
  if (displayElement) {
    displayElement.style.display = 'block';
  }
}

// Step 4
let recitalsTarget = $("form#recitals-form");
let recitals = 1;
function recitals_fields() {
  recitals++;
  let div = document.createElement("div");
  div.setAttribute("class", "removerecital" + recitals);
  div.innerHTML = '<label for="">Recitals</label><div class="recital-row"><div class="input-with-error"><input type="text" placeholder="Recitals" onKeyUp="recitalsInputHandler(event)" name="recitals[]" class="rect-input" id="rect-input-'+recitals+'" required /></div><button class="removebtn" type="button" onclick="remove_recital_field('+recitals+')"> <i class="fa fa-minus"></i></button></div>'
  recitalsTarget.append(div);
  showInputs();
}
function remove_recital_field(id) {
  recitals--;
  $('.removerecital' + id).remove();
  showInputs();
}
function showInputs() {
  let inputs = document.getElementsByName('recitals[]');
  let input = '';
  for (var i = 0; i < inputs.length; i++) {
      input += '<div class="form-text"><span id="display-recitals-input-' + (i+1) + '">INPUT ' + (i+1) +'</span></div>'
  }
  let target = $(".display-recitals-inputs");
  target.html(input);
}
function recitalsInputHandler(event){
  let eventValue = event.target.value;
  let id = event.target.id.substring(11)
  document.getElementById("display-recitals-input-" + id).innerHTML = eventValue;
}
showInputs();