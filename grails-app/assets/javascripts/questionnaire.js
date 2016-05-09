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
	this.currentQuestion=0;
	this.setGroup(groups[this.currentGroup]);

	//set progress
	this.setProgressTitle("Group questions progress");
	totalQuestions=groups[this.currentGroup].question.length;
	this.setProgressNumber(this.currentQuestion+1,totalQuestions);

}
DZHK.quest.setGroup=function(group){
	this.setGroupTitle(group.linkId);
	this.setGroupText(group.title);
};

DZHK.quest.renderQuestion=function(question){
	//generate question ui according question extension
};

DZHK.quest.setControl=function(){
	//set back, next, save controls etc;
}

