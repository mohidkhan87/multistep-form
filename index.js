//  Step 1 Forms
let borrowerLegalForm1 = $("#borrower-legal-form-1");
let borrowerLegalForm1Validator = borrowerLegalForm1.validate();
let borrowerIndividualForm1 = $("#borrower-individual-form-1");
let borrowerIndividualForm1Validator = borrowerIndividualForm1.validate();
let borrowerLegalOrIndividual = true;

//   Step 2 Forms

let lendorLegalForms = [];
let lendorLegalFormIds = [];

let lendorIndividualForms = [];
let lendorIndividualFormIds = [];

let lendorLegalOrIndividual = true;
let lendorFormLength = 1;

function getLendorForms(length) {
  for (let i = 1; i <= length; i++) {
    // Lender Legal Forms
    lendorLegalForms[i] = $("#lendor-legal-form-" + i);
    lendorLegalFormIds[i] = $(lendorLegalForms[i]).attr("id");
    // Lender Individual Forms
    lendorIndividualForms[i] = $("#lendor-individual-form-" + i);
    lendorIndividualFormIds[i] = $(lendorIndividualForms[i]).attr("id");
    console.log($("#" + lendorLegalFormIds[i]));
    console.log($("#" + lendorIndividualFormIds[i]));
  }
  console.log("---------------------------------------------------------");
}
getLendorForms(lendorFormLength);

//   Step 3 Form
var loanForm = $("#loanForm");
var loanFormValidator = loanForm.validate();

//   Step 4 Form
var recitalsForm = $("#recitals-form");
var recitalsFormValidator = recitalsForm.validate();

//   Step 5 Form
var definitionForm = $("#dynamic-definition-form");
var definitionFormValidator = definitionForm.validate();

$("#demo").steps({
  transitionEffect: 2,
  transitionEffectSpeed: 200,
  onChange: function (currentIndex, newIndex, stepDirection) {
    // Changing Right Display for each step change
    changeDisplay(currentIndex);
    // step1
    if (currentIndex === 0) {
      if (stepDirection === "forward") {
        if (borrowerLegalOrIndividual) {
          return borrowerLegalForm1.valid();
        } else {
          return borrowerIndividualForm1.valid();
        }
      }
      if (stepDirection === "backward") {
        borrowerLegalForm1.resetForm();
        borrowerIndividualForm1.resetForm();
      }
    }
    // step2
    let flag = true;
    if (currentIndex === 1) {
      if (stepDirection === "forward") {
        if (lendorLegalOrIndividual) {
          for (let i = 1; i <= lendorFormLength; i++) {
            if (!$("#" + lendorLegalFormIds[i]).valid()) {
              flag = false;
            }
          }
          return flag;
        } else {
          for (let i = 1; i <= lendorFormLength; i++) {
            if (!$("#" + lendorIndividualFormIds[i]).valid()) {
              flag = false;
            }
          }
          return flag;
        }
      }
      if (stepDirection === "backward") {
        for (let i = 1; i <= lendorFormLength; i++) {
          $("#" + lendorLegalFormIds[i])
            .validate()
            .resetForm();
          $("#" + lendorIndividualFormIds[i])
            .validate()
            .resetForm();
        }
      }
    }
    // step3
    if (currentIndex === 2) {
      if (stepDirection === "forward") {
        return loanForm.valid();
      }
      if (stepDirection === "backward") {
        loanFormValidator.resetForm();
      }
    }
    // step4
    if (currentIndex === 3) {
      if (stepDirection === "forward") {
        return recitalsForm.valid();
      }
      if (stepDirection === "backward") {
        recitalsFormValidator.resetForm();
      }
    }
    // step5
    if (currentIndex === 4) {
      if (stepDirection === "forward") {
        return definitionForm.valid();
      }
      if (stepDirection === "backward") {
        definitionFormValidator.resetForm();
      }
    }
    return true;
  },
  onFinish: function () {
    console.log(borrowerLegalForm1);
  },
});

function changeDisplay(currentStep) {
  let display_steps = document.getElementsByClassName("display-steps");
  for (let i = 0; i < display_steps.length; i++) {
    display_steps[i].style.display = "none";
  }
  let displayElement = document.getElementById("display-step-" + currentStep);
  if (displayElement) {
    displayElement.style.display = "block";
  }
}
// Step 1
function toggleFormBorrower(type, id) {
  let form_id = -1;
  switch (type) {
    case "borrower-legal":
      form_id = id;
      $("#borrower-legal-radio-1").prop("checked", true);
      $("#borrower-individual-form-" + form_id).hide();
      $("#borrower-legal-form-" + form_id).show();
      $("#legal-display-1").show();
      $("#individual-display-1").hide();
      borrowerLegalOrIndividual = true;
      break;
    case "borrower-individual":
      form_id = id;
      $("#borrower-individual-radio-1").prop("checked", true);
      $("#borrower-legal-form-" + form_id).hide();
      $("#borrower-individual-form-" + form_id).show();
      $("#legal-display-1").hide();
      $("#individual-display-1").show();
      borrowerLegalOrIndividual = false;
      break;
    default:
      break;
  }
}

// Company
function borrowerLegalCompanyHandler(event) {
  let eventValue = event.target.value;
  let id = event.target.id.substring(23);
  document.getElementById(
    "display-borrower-legal-company-input-" + id
  ).innerHTML = eventValue;
}
// Address
function borrowerLegalAdressHandler(event) {
  let eventValue = event.target.value;

  let id = event.target.id.substring(23);
  document.getElementById(
    "display-borrower-legal-address-input-" + id
  ).innerHTML = eventValue;
}
// Register Number
function borrowerLegalRegNumberHandler(event) {
  let eventValue = event.target.value;
  let id = event.target.id.substring(25);
  document.getElementById(
    "display-borrower-legal-regNumber-input-" + id
  ).innerHTML = eventValue;
}
// Country
function borrowerLegalCountryHandler(event) {
  let eventValue = event.target.value;
  let id = event.target.id.substring(23);
  document.getElementById(
    "display-borrower-legal-country-input-" + id
  ).innerHTML = eventValue;
}
// Defined
function borrowerLegalDefinedHandler(event) {
  let eventValue = event.target.value;
  let id = event.target.id.substring(23);
  document.getElementById(
    "display-borrower-legal-defined-input-" + id
  ).innerHTML = eventValue;
}
// Firstname
function borrowerIndividualFirstnameHandler(event) {
  let eventValue = event.target.value;
  let id = event.target.id.substring(30);
  document.getElementById(
    "display-borrower-individual-firstname-input-" + id
  ).innerHTML = eventValue;
}
// Lastname
function borrowerIndividualLastnameHandler(event) {
  let eventValue = event.target.value;
  let id = event.target.id.substring(29);
  document.getElementById(
    "display-borrower-individual-lastname-input-" + id
  ).innerHTML = eventValue;
}
// Address
function borrowerIndividualAddressHandler(event) {
  let eventValue = event.target.value;
  let id = event.target.id.substring(28);
  document.getElementById(
    "display-borrower-individual-address-input-" + id
  ).innerHTML = eventValue;
}
// Defined
function borrowerIndividualDefinedHandler(event) {
  let eventValue = event.target.value;
  let id = event.target.id.substring(28);
  document.getElementById(
    "display-borrower-individual-defined-input-" + id
  ).innerHTML = eventValue;
}

// Step 2
function toggleForm(type, id) {
  let form_id = -1;
  switch (type) {
    case "lender-legal":
      form_id = id;
      $("#lendor-legal-radio-1").prop("checked", true);
      $("#lendor-individual-form-" + form_id).hide();
      $("#lendor-legal-form-" + form_id).show();
      $("#lendor-legal-display-" + form_id).show();
      $("#lendor-individual-display-" + form_id).hide();
      lendorLegalOrIndividual = true;
      break;
    case "lender-individual":
      form_id = id;
      $("#lendor-individual-radio-1").prop("checked", true);
      $("#lendor-legal-form-" + form_id).hide();
      $("#lendor-individual-form-" + form_id).show();
      $("#lendor-legal-display-" + form_id).hide();
      $("#lendor-individual-display-" + form_id).show();
      lendorLegalOrIndividual = false;
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
  div.innerHTML =
    '<div class="options">' +
    "<div class=\"legal field\" onclick=toggleForm('lender-legal'," +
    lendorForms +
    ') ><input type="radio" id="lendor-legal-radio-' +
    lendorForms +
    '" name="lendor-radio-' +
    lendorForms +
    '" checked />' +
    '<label for="lendor-legal-radio-' +
    lendorForms +
    '" id="lendor-legal-radio-' +
    lendorForms +
    "'\">Legal Entity</label>" +
    '<div class="custom-radio"></div>' +
    "</div>" +
    "<div class=\"individual field\" onclick=toggleForm('lender-individual'," +
    lendorForms +
    ') ><input type="radio" id="lendor-individual-radio-' +
    lendorForms +
    '" name="lendor-radio-' +
    lendorForms +
    '" />' +
    '<label for="lendor-individual-radio-' +
    lendorForms +
    '" id="lendor-individual-radio-' +
    lendorForms +
    "'\">Individual" +
    "</label>" +
    '<div class="custom-radio"></div>' +
    "</div>" +
    "</div>" +
    '<form id="lendor-legal-form-' +
    lendorForms +
    '" class="legal-form" >' +
    '<p for="">Company Name</p>' +
    '<input type="text" placeholder="Company Name" onKeyUp="lenderLegalCompanyHandler(event)" id="lender-legal-company-' +
    lendorForms +
    '" name="lender-legal-company-' +
    lendorForms +
    '" required />' +
    '<p for="">Registered Address</p>' +
    '<input type="text" placeholder="Registered Address" onKeyUp="lenderLegalAdressHandler(event)" id="lender-legal-address-' +
    lendorForms +
    '" name="lender-legal-address-' +
    lendorForms +
    '" required />' +
    '<p for="">Registration Number</p>' +
    '<input type="text" placeholder="Registration Number" onKeyUp="lenderLegalRegNumberHandler(event)" id="lender-legal-regNumber-' +
    lendorForms +
    '" name="lender-legal-regNumber-' +
    lendorForms +
    '" required />' +
    '<p for="">Registration Country</p>' +
    '<select onchange="lenderLegalCountryHandler(event)" id="lender-legal-country-' +
    lendorForms +
    '" name="lender-legal-country-' +
    lendorForms +
    '" required>' +
    '<option value="Afganistan">Afghanistan</option>' +
    '<option value="Albania">Albania</option>' +
    '<option value="Algeria">Algeria</option>' +
    '<option value="American Samoa">American Samoa</option>' +
    '<option value="Andorra">Andorra</option>' +
    '<option value="Angola">Angola</option>' +
    '<option value="Anguilla">Anguilla</option>' +
    '<option value="Antigua & Barbuda">Antigua & Barbuda</option>' +
    '<option value="Argentina">Argentina</option>' +
    '<option value="Armenia">Armenia</option>' +
    '<option value="Aruba">Aruba</option>' +
    "</select>" +
    '<p for="">Defined as...</p>' +
    '<input type="text" placeholder="Defined as..." onKeyUp="lenderLegalDefinedHandler(event)" id="lender-legal-defined-' +
    lendorForms +
    '" name="lender-legal-defined-' +
    lendorForms +
    '" required />' +
    "</form>" +
    '<form id="lendor-individual-form-' +
    lendorForms +
    '" class="individual-form">' +
    '<p for="">First name</p>' +
    '<input type="text" placeholder="First name" onKeyUp="lenderIndividualFirstnameHandler(event)" id="lender-individual-firstname-' +
    lendorForms +
    '" name="lender-individual-firstname-' +
    lendorForms +
    '" required />' +
    '<p for="">Last name</p>' +
    '<input type="text" placeholder="Last Name" onKeyUp="lenderIndividualLastnameHandler(event)" id="lender-individual-lastname-' +
    lendorForms +
    '" name="lender-individual-lastname-' +
    lendorForms +
    '" required />' +
    '<p for="">Address</p>' +
    '<input type="text" placeholder="Address" onKeyUp="lenderIndividualAddressHandler(event)" id="lender-individual-address-' +
    lendorForms +
    '" name="lender-individual-address-' +
    lendorForms +
    '" required />' +
    '<p for="">Defined as..</p>' +
    '<input type="text" placeholder="Defined as.." onKeyUp="lenderIndividualDefinedHandler(event)" id="lender-individual-defined-' +
    lendorForms +
    '" name="lender-individual-defined-' +
    lendorForms +
    '" required />' +
    '</form><button class="removebtn" type="button" onclick="remove_lendor_form(' +
    lendorForms +
    ')">Delete <i class="fa fa-minus"></i></button>';
  lendorTarget.append(div);
  lendorFormLength = lendorForms;
  getLendorForms(lendorFormLength);
  showLenderInputs();
}
function remove_lendor_form(id) {
  console.log(id);
  lendorForms--;
  $("#form-div-" + id).remove();
  lendorFormLength = lendorForms;
  getLendorForms(lendorFormLength);
  showLenderInputs();
}
// Company
function lenderLegalCompanyHandler(event) {
  let eventValue = event.target.value;
  let id = event.target.id.substring(21);
  document.getElementById(
    "display-lender-legal-company-input-" + id
  ).innerHTML = eventValue;
}
// Address
function lenderLegalAdressHandler(event) {
  let eventValue = event.target.value;
  let id = event.target.id.substring(21);
  document.getElementById(
    "display-lender-legal-address-input-" + id
  ).innerHTML = eventValue;
}
// Register Number
function lenderLegalRegNumberHandler(event) {
  let eventValue = event.target.value;
  let id = event.target.id.substring(23);
  document.getElementById(
    "display-lender-legal-regNumber-input-" + id
  ).innerHTML = eventValue;
}
// Country
function lenderLegalCountryHandler(event) {
  let eventValue = event.target.value;
  let id = event.target.id.substring(21);
  document.getElementById(
    "display-lender-legal-country-input-" + id
  ).innerHTML = eventValue;
}
// Defined
function lenderLegalDefinedHandler(event) {
  let eventValue = event.target.value;
  let id = event.target.id.substring(21);
  document.getElementById(
    "display-lender-legal-defined-input-" + id
  ).innerHTML = eventValue;
}

// Firstname
function lenderIndividualFirstnameHandler(event) {
  let eventValue = event.target.value;
  let id = event.target.id.substring(28);
  document.getElementById(
    "display-lender-individual-firstname-input-" + id
  ).innerHTML = eventValue;
}
// Lastname
function lenderIndividualLastnameHandler(event) {
  let eventValue = event.target.value;
  let id = event.target.id.substring(27);
  document.getElementById(
    "display-lender-individual-lastname-input-" + id
  ).innerHTML = eventValue;
}
// Address
function lenderIndividualAddressHandler(event) {
  let eventValue = event.target.value;
  let id = event.target.id.substring(26);
  document.getElementById(
    "display-lender-individual-address-input-" + id
  ).innerHTML = eventValue;
}
// Defined
function lenderIndividualDefinedHandler(event) {
  let eventValue = event.target.value;
  let id = event.target.id.substring(26);
  document.getElementById(
    "display-lender-individual-defined-input-" + id
  ).innerHTML = eventValue;
}

function showLenderInputs() {
  let input = "";
  for (var i = 0; i < lendorForms; i++) {
    if (i > 0) {
      input += "<p style='text-align:center;'>AND</p>";
    }
    input +=
      "<div>" +
      '<div class="legal-form" id="lendor-legal-display-' +
      (i + 1) +
      '">' +
      '<div class="form-text">' +
      "<p>" +
      '<span id="display-lender-legal-company-input-' +
      (i + 1) +
      '">INPUT 1 LIMITED</span>, a company incorporated under the laws of ' +
      '<span id="display-lender-legal-country-input-' +
      (i + 1) +
      '">INPUT 4</span> having its registered address at ' +
      '<span id="display-lender-legal-address-input-' +
      (i + 1) +
      '"> INPUT 2</span> and have in its registration number as ' +
      '<span id="display-lender-legal-regNumber-input-' +
      (i + 1) +
      '"> INPUT 3</span> (hereinafter referred to as the "' +
      '<span id="display-lender-legal-defined-input-' +
      (i + 1) +
      '">INPUT 5</span>")of the first part' +
      "</p>" +
      "</div>" +
      "</div>" +
      '<div class="individual-form" id="lendor-individual-display-' +
      (i + 1) +
      '">' +
      '<div class="form-text">' +
      "<p>" +
      '<span id="display-lender-individual-firstname-input-' +
      (i + 1) +
      '">INPUT 1 </span>' +
      " " +
      '<span id="display-lender-individual-lastname-input-' +
      (i + 1) +
      '">INPUT 2</span> of ' +
      '<span id="display-lender-individual-address-input-' +
      (i + 1) +
      '">INPUT 3</span> (hereinafter referred to as the "' +
      '<span id="display-lender-individual-defined-input-' +
      (i + 1) +
      '">INPUT 4</span>") of the second part' +
      "</p>" +
      "</div>" +
      "</div>" +
      "</div>";
  }
  let target = $(".display-lender-inputs");
  target.html(input);
}
showLenderInputs();
// Step 3
function loanHandler(event) {
  let id = event.target.id;
  document.getElementById("display" + id).innerHTML = " " + event.target.value;
}

// Step 4
let recitalsTarget = $("form#recitals-form");
let displayStep3 = $("#display-step-3"); //  Parent Display
let recitals = 1;
function recitals_fields() {
  recitals++;
  let div = document.createElement("div");
  let displayDiv = document.createElement("div"); //  Child Display Div
  div.setAttribute("class", "removerecital" + recitals);
  displayDiv.setAttribute("id", "recitals-" + recitals); // set attr Child Display Div
  div.innerHTML =
    '<label for="">Recitals</label><div class="recital-row"><div class="input-with-error"><input type="text" placeholder="Recitals" onKeyUp="recitalsInputHandler(event)" name="recitals-' +
    recitals +
    '" class="rect-input" id="rect-input-' +
    recitals +
    '" required /></div><button class="removebtn" type="button" onclick="remove_recital_field(' +
    recitals +
    ')"> <i class="fa fa-minus"></i></button></div>';
  recitalsTarget.append(div);
  displayStep3.append(displayDiv); //  append child to parent

  // showInputs();
}
function remove_recital_field(id) {
  // recitals--;
  $(".removerecital" + id).remove();
  $("#recitals-" + id).remove();
  // showInputs();
}
// function showInputs() {
//   let input = "";
//   for (var i = 0; i < recitals; i++) {
//     input +=
//       '<div class="form-text"><span id="display-recitals-input-' +
//       (i + 1) +
//       '">INPUT ' +
//       (i + 1) +
//       "</span></div>";
//   }
//   let target = $(".display-recitals-inputs");
//   target.html(input);
// }
function recitalsInputHandler(event) {
  let eventValue = event.target.value;
  let id = event.target.id.substring(11);
  document.getElementById("recitals-" + id).innerHTML = eventValue;
}
// showInputs();

// Step 5
let definitionTarget = $("#dynamic-definition-form");
let definitionDisplay = $(".form-table");
let definitionForms = 1;
function add_definition_form() {
  definitionForms++;
  let div = document.createElement("div");
  let displayDef = document.createElement("p");
  let displayMean = document.createElement("p");
  div.setAttribute("id", "definition-form-" + definitionForms);
  displayDef.setAttribute("id", "definition-" + definitionForms);
  displayMean.setAttribute("id", "meaning-" + definitionForms);
  div.innerHTML =
    '<hr><p>Definitions</p><input type="text" onKeyUp="definitionInputHandler(event)" id="definition-input-' +
    definitionForms +
    '" placeholder="Definitions" name="definition-' +
    definitionForms +
    '" required /><p>Meaning</p><input type="text" onKeyUp="definitionInputHandler(event)" id="meaning-input-' +
    definitionForms +
    '" placeholder="Meaning" name="meaning-' +
    definitionForms +
    '" required /><button class="removebtn" type="button" onclick="remove_definition_form(' +
    definitionForms +
    ')">Delete <i class="fa fa-minus"></i></button>';

  //

  // let display =
  //   ' <div class="form-text"> ' +
  //   '<div class="form-table">' +
  //   '<p class="definition-input-' +
  //   definitionForms +
  //   '" id="display-definition-input-' +
  //   definitionForms +
  //   '">INPUT Definition</p>' +
  //   '<p class="meaning-input-' +
  //   definitionForms +
  //   '" id="display-meaning-input-' +
  //   definitionForms +
  //   '">INPUT Meaning</p>' +
  //   "</div>" +
  //   "</div>";

  //
  definitionTarget.append(div);
  definitionDisplay.append(displayDef);
  definitionDisplay.append(displayMean);
  console.log(displayDef);
  console.log(displayMean);
  // showDefinitionInputs();
}
function remove_definition_form(id) {
  // definitionForms--;
  $("#definition-form-" + id).remove();
  $("#definition-" + id).remove();
  $("#meaning-" + id).remove();
  // showDefinitionInputs();
}
function showDefinitionInputs() {
  let numberOfForms = $("#dynamic-definition-form").children().length;
  let input = "";
  for (var i = 0; i < numberOfForms; i++) {
    input +=
      '<div class="form-text"><div class="form-table"><p class="definition" id="display-definition-input-' +
      (i + 1) +
      '">INPUT Definition</p><p class="meaning" id="display-meaning-input-' +
      (i + 1) +
      '">INPUT Meaning</p></div></div>';
  }
  let target = $(".display-definition-inputs");
  target.html(input);
}
function definitionInputHandler(event) {
  // let id = event.target.id.substring(16, 18);
  let eventName = event.target.name;
  let eventValue = event.target.value;
  // if (type === "meaning") {
  // let id = event.target.id.substring(17);
  //   document.getElementById("display-meaning-input-" + id).innerHTML =
  //     eventValue;
  // } else {
  //   let id = event.target.id.substring(17);
  //   document.getElementById("display-definition-input-" + id).innerHTML =
  //     eventValue;
  // }
  $("#" + eventName)[0].innerHTML = eventValue;
  console.log($("#" + eventName)[0]);
}
// showDefinitionInputs();
