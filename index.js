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
      $('#legal-display-1').show();
      $('#individual-display-1').hide();
      break;
    case 'borrower-individual':
      form_id = id.substring(26)
      $('#borrower-legal-form-' + form_id).hide();
      $('#borrower-individual-form-' + form_id).show();
      $('#legal-display-1').hide();
      $('#individual-display-1').show();
      break;
    default:
      break;
  }
}

// Company
function borrowerLegalCompanyHandler(event){
  let eventValue = event.target.value;
  let id = event.target.id.substring(23)
  document.getElementById("display-borrower-legal-company-input-" + id).innerHTML = eventValue;
}
// Address
function borrowerLegalAdressHandler(event){
  let eventValue = event.target.value;
  
  let id = event.target.id.substring(23)
  document.getElementById("display-borrower-legal-address-input-" + id).innerHTML = eventValue;
}
// Register Number
function borrowerLegalRegNumberHandler(event){
  let eventValue = event.target.value;
  let id = event.target.id.substring(25)
  document.getElementById("display-borrower-legal-regNumber-input-" + id).innerHTML = eventValue;
}
// Country
function borrowerLegalCountryHandler(event){
  let eventValue = event.target.value;
  let id = event.target.id.substring(23)
  document.getElementById("display-borrower-legal-country-input-" + id).innerHTML = eventValue;
}
// Defined
function borrowerLegalDefinedHandler(event){
  let eventValue = event.target.value;
  let id = event.target.id.substring(23)
  document.getElementById("display-borrower-legal-defined-input-" + id).innerHTML = eventValue;
}

// Firstname
function borrowerIndividualFirstnameHandler(event){
  let eventValue = event.target.value;
  let id = event.target.id.substring(30)
  document.getElementById("display-borrower-individual-firstname-input-" + id).innerHTML = eventValue;
}
// Lastname
function borrowerIndividualLastnameHandler(event){
  let eventValue = event.target.value;
  let id = event.target.id.substring(29)
  document.getElementById("display-borrower-individual-lastname-input-" + id).innerHTML = eventValue;
}
// Address
function borrowerIndividualAddressHandler(event){
  let eventValue = event.target.value;
  let id = event.target.id.substring(28)
  document.getElementById("display-borrower-individual-address-input-" + id).innerHTML = eventValue;
}
// Defined
function borrowerIndividualDefinedHandler(event){
  let eventValue = event.target.value;
  let id = event.target.id.substring(28)
  document.getElementById("display-borrower-individual-defined-input-" + id).innerHTML = eventValue;
}

// Step 2
function toggleForm(type, id) {
  let form_id = -1;
  switch (type) {
    case 'lender-legal':
      form_id = id.substring(19);
      $('#lendor-individual-form-' + form_id).hide();
      $('#lendor-legal-form-' + form_id).show();
      $('#lendor-legal-display-' + form_id).show();
      $('#lendor-individual-display-' + form_id).hide();
      break;
    case 'lender-individual':
      form_id = id.substring(24)
      $('#lendor-legal-form-' + form_id).hide();
      $('#lendor-individual-form-' + form_id).show();
      $('#lendor-legal-display-' + form_id).hide();
      $('#lendor-individual-display-' + form_id).show();
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
                    '<input type="text" placeholder="Company Name" onKeyUp="lenderLegalCompanyHandler(event)" id="lender-legal-company-'+lendorForms+'" required />'+
                    '<p for="">Registered Address</p>'+
                    '<input type="text" placeholder="Registered Address" onKeyUp="lenderLegalAdressHandler(event)" id="lender-legal-address-'+lendorForms+'" required />'+
                    '<p for="">Registration Number</p>'+
                    '<input type="text" placeholder="Registration Number" onKeyUp="lenderLegalRegNumberHandler(event)" id="lender-legal-regNumber-'+lendorForms+'" required />'+
                    '<p for="">Registration Country</p>'+
                    '<select onchange="lenderLegalCountryHandler(event)" id="lender-legal-country-'+lendorForms+'" required>'+
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
                    '<input type="text" placeholder="Defined as..." onKeyUp="lenderLegalDefinedHandler(event)" id="lender-legal-defined-1" required />'+
                  '</form>'+
                  '<form id="lendor-individual-form-'+lendorForms+'" class="individual-form">'+
                    '<p for="">First name</p>'+
                    '<input type="text" placeholder="First name" onKeyUp="lenderIndividualFirstnameHandler(event)" id="lender-individual-firstname-'+lendorForms+'" required />'+
                    '<p for="">Last name</p>'+
                    '<input type="text" placeholder="Last Name" onKeyUp="lenderIndividualLastnameHandler(event)" id="lender-individual-lastname-'+lendorForms+'" required />'+
                    '<p for="">Address</p>'+
                    '<input type="text" placeholder="Address" onKeyUp="lenderIndividualAddressHandler(event)" id="lender-individual-address-'+lendorForms+'" required />'+
                    '<p for="">Defined as..</p>'+
                    '<input type="text" placeholder="Defined as.." onKeyUp="lenderIndividualDefinedHandler(event)" id="lender-individual-defined-'+lendorForms+'" required />'+
                  '</form><button class="removebtn" type="button" onclick="remove_lendor_form(' + lendorForms + ')">Delete <i class="fa fa-minus"></i></button>'
  lendorTarget.append(div);
  showLenderInputs();
}
function remove_lendor_form(id){
  console.log(id)
  lendorForms--;
  $('#form-div-' + id).remove();
  showLenderInputs();
}
// Company
function lenderLegalCompanyHandler(event){
  let eventValue = event.target.value;
  let id = event.target.id.substring(21)
  document.getElementById("display-lender-legal-company-input-" + id).innerHTML = eventValue;
}
// Address
function lenderLegalAdressHandler(event){
  let eventValue = event.target.value;
  let id = event.target.id.substring(21)
  document.getElementById("display-lender-legal-address-input-" + id).innerHTML = eventValue;
}
// Register Number
function lenderLegalRegNumberHandler(event){
  let eventValue = event.target.value;
  let id = event.target.id.substring(23)
  document.getElementById("display-lender-legal-regNumber-input-" + id).innerHTML = eventValue;
}
// Country
function lenderLegalCountryHandler(event){
  let eventValue = event.target.value;
  let id = event.target.id.substring(21)
  document.getElementById("display-lender-legal-country-input-" + id).innerHTML = eventValue;
}
// Defined
function lenderLegalDefinedHandler(event){
  let eventValue = event.target.value;
  let id = event.target.id.substring(21)
  document.getElementById("display-lender-legal-defined-input-" + id).innerHTML = eventValue;
}

// Firstname
function lenderIndividualFirstnameHandler(event){
  let eventValue = event.target.value;
  let id = event.target.id.substring(28)
  document.getElementById("display-lender-individual-firstname-input-" + id).innerHTML = eventValue;
}
// Lastname
function lenderIndividualLastnameHandler(event){
  let eventValue = event.target.value;
  let id = event.target.id.substring(27)
  document.getElementById("display-lender-individual-lastname-input-" + id).innerHTML = eventValue;
}
// Address
function lenderIndividualAddressHandler(event){
  let eventValue = event.target.value;
  let id = event.target.id.substring(26)
  document.getElementById("display-lender-individual-address-input-" + id).innerHTML = eventValue;
}
// Defined
function lenderIndividualDefinedHandler(event){
  let eventValue = event.target.value;
  let id = event.target.id.substring(26)
  document.getElementById("display-lender-individual-defined-input-" + id).innerHTML = eventValue;
}

function showLenderInputs() {
  let input = '';
  for (var i = 0; i < lendorForms; i++) {
    input += '<div>'+
                '<div class="legal-form" id="lendor-legal-display-'+lendorForms+'">'+
                  '<div class="form-text">'+
                    '<p>'+
                      '<span id="display-lender-legal-company-input-'+(i+1)+'">INPUT 1 LIMITED</span>, a company incorporated under the laws of'+
                      '<span id="display-lender-legal-country-input-'+(i+1)+'">INPUT 4</span> having its registered address at'+
                      '<span id="display-lender-legal-address-input-'+(i+1)+'">INPUT 2</span> and have in its registration number as'+
                      '<span id="display-lender-legal-regNumber-input-'+(i+1)+'">INPUT 3</span> (hereinafter referred to as the "'+
                      '<span id="display-lender-legal-defined-input-'+(i+1)+'">INPUT 5</span>")of the first part'+
                    '</p>'+
                  '</div>'+
                '</div>'+
                '<div class="individual-form" id="lendor-individual-display-'+lendorForms+'">'+
                  '<div class="form-text">'+
                    '<p>'+
                      '<span id="display-lender-individual-firstname-input-'+(i+1)+'">INPUT 1 </span>'+
                      '<span id="display-lender-individual-lastname-input-'+(i+1)+'">INPUT 2</span> of'+
                      '<span id="display-lender-individual-address-input-'+(i+1)+'">INPUT 3</span> (hereinafter referred to as the "'+
                      '<span id="display-lender-individual-defined-input-'+(i+1)+'">INPUT 4</span>") of the second part'+
                    '</p>'+
                  '</div>'+
                '</div>'+
              '</div><hr>';
  }
  let target = $(".display-lender-inputs");
  target.html(input);
}
showLenderInputs();
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