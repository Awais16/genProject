var DZHK = DZHK || {};

DZHK.quest={};
DZHK.QUESTIONNAIRE_DATA=":D";

//for producing quiestionnaire response json
DZHK.QUESTIONNAIRE_RESPONSE_DATA={
  "resourceType" : "QuestionnaireResponse",
  "identifier" : {}, // Unique id for this set of answers
  "questionnaire" : "here comes the id from the questionnaire object", // Form being answered
  "status" : "in-progress", // R!  in-progress | completed | amended
  "subject" : {}, // The subject of the questions
  "author" : {}, // Person who received and recorded the answers
  "authored" : "<dateTime>", // Date this version was authored
  "source" : {}, // The person who answered the questions 
  "group" : {} // add from recieved questionnaire
};


DZHK.quest.currentGroup=0;
DZHK.quest.currentQuestion=0;

DZHK.quest.init=function(){
	
	//initialized with first group;
	this.initGroup(DZHK.QUESTIONNAIRE_DATA.group.group);
};

//to set the progress title
DZHK.quest.setProgressTitle=function(title){
	$(".progress-group .progress-text").text(title);
};

DZHK.quest.setProgressNumber=function(current,total){
	$(".progress-group .progress-number").html("<b>"+current+"</b>/"+total);
	this.setProgress((current/total)*100);
};

DZHK.quest.setProgress=function(percent){
	$(".progress-group .progress .progress-bar").width(percent+"%");
};

DZHK.quest.setGroupTitle=function(groupTitle){
	$(".group-title").text(groupTitle);
};

DZHK.quest.setGroupText=function(groupText){
	$(".group-text").text(groupText);
};

DZHK.quest.initGroup=function(groups){
	this.currentGroup=0;
	this.setGroup(groups[this.currentGroup]);
	this.initQuestion(groups[this.currentGroup].question);
};

DZHK.quest.setGroup=function(group){
	this.setGroupTitle(group.linkId);
	this.setGroupText(group.title);
};

DZHK.quest.initQuestion=function(questions){

	//set progress
	this.setProgressTitle("Group questions progress");
	this.setProgressNumber(this.currentQuestion+1,questions.length);
	this.currentQuestion=0;
	this.renderQuestion(questions[this.currentQuestion]);
};

DZHK.quest.setQuestionText=function(question){
	$(".question-text").text(question);
};

DZHK.quest.renderQuestion=function(question){
	//render questionniare ui
	this.setQuestionText(question.text);
	
	//apply factory pattern for different type of questions to generate controls
	
};

DZHK.quest.initControl=function(){
	//set back, next, save controls etc; hook events
};