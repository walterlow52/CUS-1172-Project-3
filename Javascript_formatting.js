const quiz_application = {
  app_view: "#view_intro",
  app_question: -1,
  app_quiz: "",
  app_model: {},
  app_correct: 0,
  app_incorrect: 0
}

async function fetch_data (id, quiz_i) {
let network = "";
  if (quiz_i == "questions") {
   network = 'https://my-json-server.typicode.com/walterlow52/CUS-1172-Project-3/questions'
}
  else if (quiz_i == "questions2") {
   network = 'https://my-json-server.typicode.com/walterlow52/CUS-1172-Project-3_quiz2/questions2'
}
let network_data = `${network}/${id}`;
const retrieve = await fetch(network_data);
const data = await retrieve.json();

quiz_application.app_model = data;
question_view(quiz_application);
update(quiz_application);

document.getElementById("totalCorrect").innerHTML = quiz_application.app_correct + quiz_application.app_incorrect;
  if (id == 1) {
   document.getElementById("totalIncorrect").innerHTML = 0;
}
  else {
   document.getElementById("totalIncorrect").innerHTML = +(((quiz_application.app_correct / (quiz_application.app_correct + quiz_application.app_incorrect)) * 100).toFixed(2));
}
  return (data);
}

document.addEventListener('DOMContentLoaded', () => {
  quiz_application.app_view = "#view_intro";
  quiz_application.app_model = {
    action: "questions",
    action_quiz2: "questions2"
}
  update(quiz_application);
	
document.querySelector("#quiz_view").onclick = (e) => {
  handle_quiz(e)
  }
});

let user_name = "";
let quiz_timeSeconds = 0;

function handle_quiz(e) {
  if (quiz_application.app_view == "#view_intro") {
   user_name = document.getElementById("userName").value;
    if (user_name == "") {
     user_name = "@unknown_quiz_user";
}
  if (e.target.dataset.action == "questions") {
   time = setInterval(timer, 1000);
   minute_i = document.getElementById("quiz_minutes");
   second_i = document.getElementById("quiz_seconds");
   quiz_application.app_quiz = "questions";
   quiz_application.app_question = 0;
   fetch_data(quiz_application.app_question + 1, quiz_application.app_quiz);
}
  else if (e.target.dataset.action == "questions2") {
   time = setInterval(timer, 1000);
   minute_i = document.getElementById("quiz_minutes");
   second_i = document.getElementById("quiz_seconds");
   quiz_application.app_quiz = "questions2";
   quiz_application.app_question = 0;
   fetch_data(quiz_application.app_question + 1, quiz_application.app_quiz);
   }
}

if (quiz_application.app_view == "#MC_view") {
 if (e.target.dataset.action == "submit") {
  let MC_choices = document.getElementsByName("MC");
  let MC_response;
  for (let i = 0; i < MC_choices.length; i++) {
    if (MC_choices[i].checked) {
     MC_response = MC_choices[i].value;
   }
}

isCorrect = check_answer(MC_response, quiz_application.app_model);
  if (isCorrect) {
   quiz_application.app_correct++;
}
  else {
   quiz_application.app_incorrect++;
}
grading_view(isCorrect);
update(quiz_application);
feedback_view(isCorrect);
  }
}
	
if (quiz_application.app_view == "#trueORfalse_view") {
 if (e.target.dataset.action == "answer") {
  isCorrect = check_answer(e.target.dataset.answer, quiz_application.app_model);
   if (isCorrect) {
    quiz_application.app_correct++;
}
   else {
    quiz_application.app_incorrect++;
}
grading_view(isCorrect);
update(quiz_application);
feedback_view(isCorrect);
  }
}	
	
if (quiz_application.app_view == "#text_view") {
 if (e.target.dataset.action == "submit") {
  user_text_response = document.querySelector(`#${quiz_application.app_model.choices}`).value;
  isCorrect = check_answer(user_text_response, quiz_application.app_model);
  if (isCorrect) {
   quiz_application.app_correct++;
}
  else {
   quiz_application.app_incorrect++;
}
grading_view(isCorrect);
update(quiz_application);
feedback_view(isCorrect);
  }
}
	
if (quiz_application.app_view == "#checkbox_view") {
 if (e.target.dataset.action == "submit") {
  var checkbox = document.getElementsByName("checkbox");
  var checkbox_response = [];
    for (var i = 0; i < checkbox.length; i++) {
     if (checkbox[i].checked) {
      checkbox_response.push(checkbox[i].value);
  }
}	
isCorrect = check_answer(checkbox_response, quiz_application.app_model);
  if (isCorrect) {
   quiz_application.app_correct++;
}
  else {
   quiz_application.app_incorrect++;
}
grading_view(isCorrect);
update(quiz_application);
feedback_view(isCorrect);
  }
}	
	
if (quiz_application.app_view == "#list_view") {
 if (e.target.dataset.action == "submit") {
  let list_choices = document.getElementsByName("list");
  let list_response = [];
  for (var i = 0; i < list_choices.length; i++) {
    if (list_choices[i].checked) {
     list_response.push(list_choices[i].value);
   }
}

isCorrect = check_answer(list_response, quiz_application.app_model);
  if (isCorrect) {
   quiz_application.app_correct++;
}
  else {
   quiz_application.app_incorrect++;
}
grading_view(isCorrect);
update(quiz_application);
feedback_view(isCorrect);
  }
}		
	
if (quiz_application.app_view == "#completion") {
 clearInterval(time);
	
 let grade = +(((quiz_application.app_correct / (quiz_application.app_incorrect + quiz_application.app_correct)) * 100).toFixed(2));
  if (grade >= 80) {
   document.getElementById("end_of_quiz").innerHTML = "Final Score: " + grade + "% <br> Congratulations " + user_name + ", you have passed the quiz!";
}
  else {
   document.getElementById("end_of_quiz").innerHTML = "Final Score: " + grade + "% <br> Sorry " + user_name + ", you have failed this quiz.";
}
	
if (e.target.dataset.action == "return_page") {
 quiz_timeSeconds = 0;
 second_i.innerHTML = timer_function(0);
 minute_i.innerHTML = timer_function(0);
	
quiz_application.app_view = "#view_intro";
quiz_application.app_question = -1,
quiz_application.app_quiz = "",
quiz_application.app_model = {},
quiz_application.app_correct = 0,
quiz_application.app_incorrect = 0
quiz_application.app_model = {
   action: "questions",
   action_quiz2: "questions2"
}
update(quiz_application);
}
 else if (e.target.dataset.action == "quiz_again") {
  quiz_timeSeconds = 0;
  second_i.innerHTML = timer_function(0);
  minute_i.innerHTML = timer_function(0);
  time = setInterval(timer, 1000);
	
quiz_application.app_question = 0,
quiz_application.app_correct = 0,
quiz_application.app_incorrect = 0
fetch_data(quiz_application.app_question + 1, quiz_application.app_quiz);
      }
   }  
}
	
let minute_i = "";
let second_i = "";
let time = 0;
	
function timer() {
  ++quiz_timeSeconds;
  second_i.innerHTML = timer_function(quiz_timeSeconds % 60);
  minute_i.innerHTML = timer_function(parseInt(quiz_timeSeconds / 60));
}
	
function timer_function (num) {
  var html_timer = num + "";
   if (html_timer.length < 2) {
    return "0" + html_timer;
} else {
    return html_timer;
  }
}
	
function feedback_view (correct_answer) {
  if (!correct_answer) {
   new Promise(function (resolve, reject) {
   setTimeout(resolve, 1000);
}).then(function () {
  if (!correct_answer) {
   quiz_explanation();
   update(quiz_application);
}
});
}
  if (correct_answer) {
   new Promise(function (resolve, reject) {
   setTimeout(resolve, 1000);
}).then(function () {
   update_question(quiz_application);
   question_view(quiz_application);
   update(quiz_application);
   document.getElementById('quiz_view').click();
});
}
}

function grading_view (isCorrect) {
  if (isCorrect == true) {
   quiz_application.app_view = "#positive";
}
  else {
   quiz_application.app_view = "#negative";
  }
}
	
function quiz_explanation() {
  quiz_application.app_view = "#explanation_id";
}

function next (e) {
  update_question(quiz_application);
  question_view(quiz_application);
  update(quiz_application);
}

function check_answer (user_answer, model) {
  if (quiz_application.app_model.type == "checkbox" || quiz_application.app_model.type == "multi_text") {
   if (JSON.stringify(user_answer) === JSON.stringify(model.answer)) {
    return true;
  }
}
  else {
   if (user_answer == model.answer) {
    return true;
   }
}
return false;
}

let quiz_questions = 20;

function update_question (quiz_application) {
  if (quiz_application.app_question < (quiz_questions - 1)) {
   quiz_application.app_question = quiz_application.app_question + 1;
   fetch_data(quiz_application.app_question + 1, quiz_application.app_quiz);
}
  else {
   quiz_application.app_question = -2;
   quiz_application.app_model = {};
  }
}
	
function question_view (quiz_application) {
  if (quiz_application.app_question == -2) {
   quiz_application.app_view = "#completion";
   return;
}
	
  if (quiz_application.app_model.type == "MC") {
   quiz_application.app_view = "#MC_view";
}
  else if (quiz_application.app_model.type == "true_false") {
   quiz_application.app_view = "#trueORfalse_view";
}
  else if (quiz_application.app_model.type == "text") {
   quiz_application.app_view = "#text_view";
}
  else if (quiz_application.app_model.type == "checkbox") {
   quiz_application.app_view = "#checkbox_view";
}
  else if (quiz_application.app_model.type == "list") {
   quiz_application.app_view = "#list_view";
}
}

function update (quiz_application) {
  const html_element = template_view(quiz_application.app_model, quiz_application.app_view)
  document.querySelector("#quiz_view").innerHTML = html_element;
}
	
const template_view = (model, view) => {
  template_source = document.querySelector(view).innerHTML;
  var template = Handlebars.compile(template_source);
  var html_app_element = template({...model, ...quiz_application})
  return html_app_element
}
