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
        // return recitalsForm.valid();
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
// Step 1
function toggleFormBorrower(type, id) {
  let form_id = -1;
  switch (type) {
    case 'borrower-legal':
      form_id = id.substring(21);
      $('#borrower-individual-form-' + form_id).hide();
      $('#borrower-legal-form-' + form_id).show();
      break;
    case 'borrower-individual':
      form_id = id.substring(26)
      $('#borrower-legal-form-' + form_id).hide();
      $('#borrower-individual-form-' + form_id).show();
      break;
    default:
      break;
  }
}
let borrowerTarget = $("#dynamic-borrower-forms");
let borrowerForms = 1;
function add_borrower_form() {
  borrowerForms++;
  let div = document.createElement("div");
  div.setAttribute("id", "borrower-form-div-" + borrowerForms);
  div.innerHTML = '<div class="options">'+
                    '<div class="legal field">'+
                      '<input type="radio" id="borrower-legal-radio-'+borrowerForms+'" name="borrower-radio-'+borrowerForms+'" checked />'+
                        '<label for="borrower-legal-radio-'+borrowerForms+'" id="borrower-legal-radio-'+borrowerForms+'" onclick="toggleFormBorrower(\'borrower-legal\', \'borrower-legal-radio-'+borrowerForms+'\')">Legal Entity</label>'+
                      '<div class="custom-radio"></div>'+
                    '</div>'+
                    '<div class="individual field">'+
                      '<input type="radio" id="borrower-individual-radio-'+borrowerForms+'" name="borrower-radio-'+borrowerForms+'" />'+
                      '<label for="borrower-individual-radio-'+borrowerForms+'" id="borrower-individual-radio-'+borrowerForms+'" onclick="toggleFormBorrower(\'borrower-individual\',\'borrower-individual-radio-'+borrowerForms+'\')">Individual'+
                      '</label>'+
                      '<div class="custom-radio"></div>'+
                    '</div>'+
                  '</div>'+
                  '<form id="borrower-legal-form-'+borrowerForms+'" class="legal-form">'+
                    '<p for="">Company Name</p>'+
                    '<input type="text" placeholder="Company Name" name="companyName1" onKeyUp="inputHandler(event)0 "value="" required />'+
                    '<p for="">Registered Address</p>'+
                    '<input type="text" placeholder="Registered Address" onKeyUp="inputHandler(event)" name="registeredAddress1" value="" required />'+
                    '<p for="">Registration Number</p>'+
                    '<input type="text" placeholder="Registration Number" onKeyUp="inputHandler(event)" name="registrationNumber1" value="" required />'+
                    '<p for="">Registration Country</p>'+
                    '<select name="registrationCountry1" onchange="inputHandler(event)" required>'+
                      '<option value="Afganistan">Afghanistan</option>'+
                      '<option value="Albania">Albania</option>'+
                      '<option value="Algeria">Algeria</option>'+
                      '<option value="American Samoa">American Samoa</option>'+
                      '<option value="Andorra">Andorra</option>'+
                      '<option value="Angola">Angola</option>'+
                      '<option value="Anguilla">Anguilla</option>'+
                      '<option value="Antigua & Barbuda">Antigua & Barbuda</option>'+
                      '<option value="Argentina">Argentina</option>'+
                      '<option value="Armenia">Armenia</option>'+
                      '<option value="Aruba">Aruba</option>'+
                    '</select>'+
                    '<p for="">Defined as...</p>'+
                    '<input type="text" placeholder="Defined as..." onKeyUp="inputHandler(event)" name="definedAs1" value="" required />'+
                  '</form>'+
                  '<form id="borrower-individual-form-'+borrowerForms+'" class="individual-form">'+
                    '<p for="">First name</p>'+
                    '<input type="text" placeholder="First name" name="firstName1" onKeyUp="inputHandler(event)" value="" required />'+
                    '<p for="">Last name</p>'+
                    '<input type="text" placeholder="Last Name" name="lastName1" onKeyUp="inputHandler(event)" value="" required />'+
                    '<p for="">Address</p>'+
                    '<input type="text" placeholder="Address" name="address1" onKeyUp="inputHandler(event)" value="" required />'+
                    '<p for="">Defined as..</p>'+
                    '<input type="text" placeholder="Defined as.." name="definedIndividual1" onKeyUp="inputHandler(event)" value="" required />'+
                  '</form><button class="removebtn" type="button" onclick="remove_borrower_form(' + borrowerForms + ')">Delete <i class="fa fa-minus"></i></button>'
  borrowerTarget.append(div);
}
function remove_borrower_form(id){
  borrowerForms--;
  $('#borrower-form-div-' + id).remove();
}
// Step 2
function toggleForm(type, id) {
  let form_id = -1;
  switch (type) {
    case 'lender-legal':
      form_id = id.substring(19);
      $('#lendor-individual-form-' + form_id).hide();
      $('#lendor-legal-form-' + form_id).show();
      break;
    case 'lender-individual':
      form_id = id.substring(24)
      $('#lendor-legal-form-' + form_id).hide();
      $('#lendor-individual-form-' + form_id).show();
      break;
    default:
      break;
  }
}
let lendorTarget = $("#dynamic-lendor-forms");
let lendorForms = 1;
function add_lendor_form() {
  lendorForms++;
  let div = document.createElement("div");
  div.setAttribute("id", "form-div-" + lendorForms);
  div.innerHTML = '<div class="options">'+
                    '<div class="legal field">'+
                      '<input type="radio" id="lendor-legal-radio-'+lendorForms+'" name="lendor-radio-'+lendorForms+'" checked />'+
                        '<label for="lendor-legal-radio-'+lendorForms+'" id="lendor-legal-radio-'+lendorForms+'" onclick="toggleForm(\'lender-legal\', \'lendor-legal-radio-'+lendorForms+'\')">Legal Entity</label>'+
                      '<div class="custom-radio"></div>'+
                    '</div>'+
                    '<div class="individual field">'+
                      '<input type="radio" id="lendor-individual-radio-'+lendorForms+'" name="lendor-radio-'+lendorForms+'" />'+
                      '<label for="lendor-individual-radio-'+lendorForms+'" id="lendor-individual-radio-'+lendorForms+'" onclick="toggleForm(\'lender-individual\',\'lendor-individual-radio-'+lendorForms+'\')">Individual'+
                      '</label>'+
                      '<div class="custom-radio"></div>'+
                    '</div>'+
                  '</div>'+
                  '<form id="lendor-legal-form-'+lendorForms+'" class="legal-form">'+
                    '<p for="">Company Name</p>'+
                    '<input type="text" placeholder="Company Name" name="companyName1" onKeyUp="inputHandler(event)0 "value="" required />'+
                    '<p for="">Registered Address</p>'+
                    '<input type="text" placeholder="Registered Address" onKeyUp="inputHandler(event)" name="registeredAddress1" value="" required />'+
                    '<p for="">Registration Number</p>'+
                    '<input type="text" placeholder="Registration Number" onKeyUp="inputHandler(event)" name="registrationNumber1" value="" required />'+
                    '<p for="">Registration Country</p>'+
                    '<select name="registrationCountry1" onchange="inputHandler(event)" required>'+
                      '<option value="Afganistan">Afghanistan</option>'+
                      '<option value="Albania">Albania</option>'+
                      '<option value="Algeria">Algeria</option>'+
                      '<option value="American Samoa">American Samoa</option>'+
                      '<option value="Andorra">Andorra</option>'+
                      '<option value="Angola">Angola</option>'+
                      '<option value="Anguilla">Anguilla</option>'+
                      '<option value="Antigua & Barbuda">Antigua & Barbuda</option>'+
                      '<option value="Argentina">Argentina</option>'+
                      '<option value="Armenia">Armenia</option>'+
                      '<option value="Aruba">Aruba</option>'+
                    '</select>'+
                    '<p for="">Defined as...</p>'+
                    '<input type="text" placeholder="Defined as..." onKeyUp="inputHandler(event)" name="definedAs1" value="" required />'+
                  '</form>'+
                  '<form id="lendor-individual-form-'+lendorForms+'" class="individual-form">'+
                    '<p for="">First name</p>'+
                    '<input type="text" placeholder="First name" name="firstName1" onKeyUp="inputHandler(event)" value="" required />'+
                    '<p for="">Last name</p>'+
                    '<input type="text" placeholder="Last Name" name="lastName1" onKeyUp="inputHandler(event)" value="" required />'+
                    '<p for="">Address</p>'+
                    '<input type="text" placeholder="Address" name="address1" onKeyUp="inputHandler(event)" value="" required />'+
                    '<p for="">Defined as..</p>'+
                    '<input type="text" placeholder="Defined as.." name="definedIndividual1" onKeyUp="inputHandler(event)" value="" required />'+
                  '</form><button class="removebtn" type="button" onclick="remove_lendor_form(' + lendorForms + ')">Delete <i class="fa fa-minus"></i></button>'
  lendorTarget.append(div);
}
function remove_lendor_form(id){
  console.log(id)
  lendorForms--;
  $('#form-div-' + id).remove();
}
// Step 3
function loanHandler(event) {
  let id = event.target.id;
  document.getElementById('display' + id).innerHTML = ' ' + event.target.value;
}

// Step 4
let recitalsTarget = $("form#recitals-form");
let recitals = 1;
function recitals_fields() {
  recitals++;
  let div = document.createElement("div");
  div.setAttribute("class", "removerecital" + recitals);
  div.innerHTML = '<label for="">Recitals</label><div class="recital-row"><div class="input-with-error"><input type="text" placeholder="Recitals" onKeyUp="recitalsInputHandler(event)" name="recitals[]" class="rect-input" id="rect-input-' + recitals + '" required /></div><button class="removebtn" type="button" onclick="remove_recital_field(' + recitals + ')"> <i class="fa fa-minus"></i></button></div>'
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
    input += '<div class="form-text"><span id="display-recitals-input-' + (i + 1) + '">INPUT ' + (i + 1) + '</span></div>'
  }
  let target = $(".display-recitals-inputs");
  target.html(input);
}
function recitalsInputHandler(event) {
  let eventValue = event.target.value;
  let id = event.target.id.substring(11)
  document.getElementById("display-recitals-input-" + id).innerHTML = eventValue;
}
showInputs();

// Step 5
let definitionTarget = $("#dynamic-definition-forms");
let definitionForms = 1;
function add_definition_form() {
  definitionForms++;
  let form = document.createElement("form");
  form.setAttribute("id", "definition-form-" + definitionForms);
  form.innerHTML = '<hr><p>Definitions</p><input type="text" onKeyUp="definitionInputHandler(event)" id="definition-input-' + definitionForms + '" placeholder="Definitions" name="definition" required /><p>Meaning</p><input type="text" onKeyUp="definitionInputHandler(event)" id="meaning-input-' + definitionForms + '" placeholder="Meaning" name="meaning" required /><button class="removebtn" type="button" onclick="remove_definition_form(' + definitionForms + ')">Delete <i class="fa fa-minus"></i></button>'
  definitionTarget.append(form);
  showDefinitionInputs()
}
function remove_definition_form(id) {
  definitionForms--;
  $('#definition-form-' + id).remove();
  showDefinitionInputs()
}
function showDefinitionInputs() {
  let numberOfForms = $('#dynamic-definition-forms').children().length;;
  console.log(numberOfForms);
  let input = '';
  for (var i = 0; i < numberOfForms; i++) {
    input += '<div class="form-text"><div class="form-table"><p class="definition" id="display-definition-input-' + (i + 1) + '">INPUT Definition</p><p class="meaning" id="display-meaning-input-' + (i + 1) + '">INPUT Meaning</p></div></div>'
  }
  let target = $(".display-definition-inputs");
  target.html(input);
}
function definitionInputHandler(event) {
  let type = event.target.id.substring(0, 7)
  let eventValue = event.target.value;
  if (type === "meaning") {
    let id = event.target.id.substring(14)
    document.getElementById("display-meaning-input-" + id).innerHTML = eventValue;
  } else {
    let id = event.target.id.substring(17)
    document.getElementById("display-definition-input-" + id).innerHTML = eventValue;
  }
}
showDefinitionInputs();