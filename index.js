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

//   Step 3 Form
var loanForm = $("#loanForm");
var loanFormValidator = loanForm.validate();

//   Step 4 Form
var recitalsForm = $("#recitals-form");
var recitalsFormValidator = recitalsForm.validate();

//   Step 5 Form
var definitionForm = $("#dynamic-definition-form");
var definitionFormValidator = definitionForm.validate();

let options;
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
        var forms = $("#dynamic-lendor-forms form");
        forms.each(function (index) {
          if (!$("#" + $(this).attr("id")).valid()) {
            flag = false;
          }
        });
        return flag;
      }
      if (stepDirection === "backward") {
        var forms = $("#dynamic-lendor-forms form");
        forms.each(function (index) {
          $("#" + $(this).attr("id"))
            .validate()
            .resetForm();
        });
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
    let data_json = {
      step1: {
        legal: {},
        individual: {},
      },
      step2: {
        legal: [],
        individual: [],
      },
      step3: {
        amount: "",
        currency: "",
        moratorium: "",
        interestRate: "",
        loanDuration: "",
        useOfLoan: "",
      },
      step4: [],
      step5: {
        definition: [],
        meaning: [],
      },
      formIds: {
        legalForm: [],
        individualForm: [],
      },
    };
    if (borrowerLegalOrIndividual) {
      data_json.step1.legal.company = $("#borrower-legal-company-1").val();
      data_json.step1.legal.address = $("#borrower-legal-address-1").val();
      data_json.step1.legal.registrationNumber = $(
        "#borrower-legal-regNumber-1"
      ).val();
      data_json.step1.legal.country = $("#borrower-legal-country-1").val();
      data_json.step1.legal.defined = $("#borrower-legal-defined-1").val();
    } else {
      data_json.step1.individual.firstname = $(
        "#borrower-individual-firstname-1"
      ).val();
      data_json.step1.individual.lastname = $(
        "#borrower-individual-lastname-1"
      ).val();
      data_json.step1.individual.address = $(
        "#borrower-individual-address-1"
      ).val();
      data_json.step1.individual.defined = $(
        "#borrower-individual-defined-1"
      ).val();
    }

    for (let i = 0; i < formIds.length; i++) {
      let obj = {};
      let name = formIds[i].name;
      if (name === "individual") {
        $("form#lendor-individual-form-" + formIds[i].id + " input").each(function () {
          var input = $(this);
          var type = input.attr("onKeyUp");
          if (type === "lenderIndividualFirstnameHandler(event)") {
            obj.firstname = input.val();
          } else if (type === "lenderIndividualLastnameHandler(event)") {
            obj.lastname = input.val();
          } else if (type === "lenderIndividualAddressHandler(event)") {
            obj.address = input.val();
          } else if (type === "lenderIndividualDefinedHandler(event)") {
            obj.defined = input.val();
          }
        });
        data_json.step2.individual.push(obj);
      } else {
        $("form#lendor-legal-form-" + formIds[i].id + " input").each(function () {
          var input = $(this);
          var type = input.attr("onKeyUp");
          if (type === "lenderLegalCompanyHandler(event)") {
            obj.company = input.val();
          } else if (type === "lenderLegalAdressHandler(event)") {
            obj.address = input.val();
          } else if (type === "lenderLegalRegNumberHandler(event)") {
            obj.registrationNumber = input.val();
          } else if (type === "lenderLegalDefinedHandler(event)") {
            obj.defined = input.val();
          }
        });
        $("form#lendor-legal-form-" + formIds[i].id + " select").each(function () {
          var input = $(this);
          var type = input.attr("onchange");

          if (type === "lenderLegalCountryHandler(event)") {
            obj.country = input.val();
          }
        });
        data_json.step2.legal.push(obj);
      }
    }
    data_json.step3.amount = $("#LoanAmount").val();
    data_json.step3.currency = $("#LoanCurrency").val();
    data_json.step3.moratorium = $("#Moratorium").val();
    data_json.step3.interestRate = $("#InterestRate").val();
    data_json.step3.loanDuration = $("#LoanDuration").val();
    data_json.step3.useOfLoan = $("#UseOfLoan").val();
    $("form#recitals-form input[type=text]").each(function () {
      var input = $(this);
      data_json.step4.push(input.val());
    });
    $("form#dynamic-definition-form input[type=text]").each(function () {
      var input = $(this);
      let id = input.attr("id");
      let type = id.substring(0, 1);
      if (type === "d") {
        data_json.step5.definition.push(input.val());
      } else {
        data_json.step5.meaning.push(input.val());
      }
    });
    console.log(data_json);
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
let formIds = [
  {
    id: 1,
    name: "lendor-legal-form-1",
  },
];
// let formId = "";
function toggleForm(type, id) {
  let form_id = -1;
  switch (type) {
    case "lender-legal":
      form_id = id;
      $("#lendor-legal-radio-" + id).prop("checked", true);
      $("#lendor-individual-form-" + form_id).hide();
      $("#lendor-legal-form-" + form_id).show();
      $("#lendor-legal-display-" + form_id).show();
      $("#lendor-individual-display-" + form_id).hide();
      // Add form type
      formIds = formIds.map((obj) =>
        obj.id === form_id
          ? { ...obj, name: "lendor-legal-form-" + form_id }
          : obj
      );

      lendorLegalOrIndividual = true;
      break;
    case "lender-individual":
      form_id = id;
      $("#lendor-individual-radio-" + id).prop("checked", true);
      $("#lendor-legal-form-" + form_id).hide();
      $("#lendor-individual-form-" + form_id).show();
      $("#lendor-legal-display-" + form_id).hide();
      $("#lendor-individual-display-" + form_id).show();
      // Add form type
      formIds = formIds.map((obj) =>
        obj.id === form_id
          ? { ...obj, name: "individual" }
          : obj
      );

      break;
    default:
      break;
  }
}
let lendorTarget = $("#dynamic-lendor-forms");
let lendorForms = 1;
let formType;
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
    ')"><i class="fa fa-minus"></i> Remove</button>';
  lendorTarget.append(div);
  formType = {
    id: lendorForms,
    name: "legal",
  };
  formIds.push(formType);
  lendorFormLength = $(".display-lender-inputs").children().length;
  showLenderInputs();
}
function remove_lendor_form(id) {
  $("#form-div-" + id).remove();
  lendorFormLength = $(".display-lender-inputs").children().length;
  $("#display-lender-both-" + id).remove();
  // remove form id
  formIds = formIds.filter((obj) => obj.id !== id);
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
  let input = "<div id='display-lender-both-" + lendorForms + "'>";
  // for (var i = 0; i < lendorForms; i++) {
  if (lendorForms > 1) {
    input += "<p style='text-align:center;'>AND</p>";
  }
  input +=
    '<div class="legal-form" id="lendor-legal-display-' +
    lendorForms +
    '">' +
    '<div class="form-text">' +
    "<p>" +
    '<span id="display-lender-legal-company-input-' +
    lendorForms +
    '">INPUT 1 LIMITED</span>, a company incorporated under the laws of ' +
    '<span id="display-lender-legal-country-input-' +
    lendorForms +
    '">INPUT 4</span> having its registered address at ' +
    '<span id="display-lender-legal-address-input-' +
    lendorForms +
    '"> INPUT 2</span> and have in its registration number as ' +
    '<span id="display-lender-legal-regNumber-input-' +
    lendorForms +
    '"> INPUT 3</span> (hereinafter referred to as the "' +
    '<span id="display-lender-legal-defined-input-' +
    lendorForms +
    '">INPUT 5</span>")of the first part' +
    "</p>" +
    "</div>" +
    "</div>" +
    '<div class="individual-form" id="lendor-individual-display-' +
    lendorForms +
    '">' +
    '<div class="form-text">' +
    "<p>" +
    '<span id="display-lender-individual-firstname-input-' +
    lendorForms +
    '">INPUT 1 </span>' +
    " " +
    '<span id="display-lender-individual-lastname-input-' +
    lendorForms +
    '">INPUT 2</span> of ' +
    '<span id="display-lender-individual-address-input-' +
    lendorForms +
    '">INPUT 3</span> (hereinafter referred to as the "' +
    '<span id="display-lender-individual-defined-input-' +
    lendorForms +
    '">INPUT 4</span>") of the second part' +
    "</p>" +
    "</div>" +
    "</div>" +
    "</div>";
  // }
  let target = $(".display-lender-inputs");
  target.append(input);
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
}
function remove_recital_field(id) {
  $(".removerecital" + id).remove();
  $("#recitals-" + id).remove();
}
function recitalsInputHandler(event) {
  let eventValue = event.target.value;
  let id = event.target.id.substring(11);
  document.getElementById("recitals-" + id).innerHTML = eventValue;
}

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
    ')"><i class="fa fa-minus"></i> Remove</button>';
  definitionTarget.append(div);
  definitionDisplay.append(displayDef);
  definitionDisplay.append(displayMean);
}
function remove_definition_form(id) {
  $("#definition-form-" + id).remove();
  $("#definition-" + id).remove();
  $("#meaning-" + id).remove();
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
  let eventName = event.target.name;
  let eventValue = event.target.value;
  $("#" + eventName)[0].innerHTML = eventValue;
}
