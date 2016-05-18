/**
*Getting DZHK,quest scope, 
*@author Awais
*/

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

DZHK.quest.extensions=[]; //just for reference

DZHK.quest.currentGroup=0;
DZHK.quest.currentQuestion=0;
DZHK.quest.factory={};

DZHK.quest.init=function(){
	
	this.factory= new DZHK.AnswerFactory(); //to generate AnwerTypes check QuestionFactory.js



	//initialized with first group;
	var groupToCopy=$.extend(true,{},DZHK.QUESTIONNAIRE_DATA.group);
	DZHK.QUESTIONNAIRE_RESPONSE_DATA.group=groupToCopy;
	this.initGroup();

	this.initControl();	
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
	$(".group-title2").text(groupText);
};
DZHK.quest.setGroupDesc=function(desc){
	$(".group-text").text(desc);
};

DZHK.quest.initGroup=function(){
	var groups=DZHK.QUESTIONNAIRE_RESPONSE_DATA.group.group;
	this.setGroup(groups[this.currentGroup]);
	this.initQuestion(groups[this.currentGroup].question);
};

DZHK.quest.setGroup=function(group){
	this.setGroupTitle(group.linkId);
	this.setGroupText(group.title);
	this.setGroupDesc(group.text);
};

DZHK.quest.initQuestion=function(questions){
	//set progress
	this.setProgressTitle("Group questions progress");
	this.setProgressNumber(this.currentQuestion+1,questions.length);
	this.renderQuestion(questions[this.currentQuestion]);
	this.currentQuestion++;
};

DZHK.quest.setQuestionText=function(question){
	$(".question-text").text(question);
};

DZHK.quest.renderQuestion=function(question){
	
	//render questionniare ui
	this.setQuestionText(question.text);
	
	//apply factory pattern for different type of questions to generate controls
	var qAnswer=this.factory.createAnswerClass(question);
	qAnswer.render(".question-answer");
	
};

/**
*set back, next, save controls etc; hook events
*/
DZHK.quest.initControl=function(){
	var self=this;

	$("#bt-back").click(function(){
		//save state? check if answer exists.
	});

	$("#bt-next").click(function(){
		if(self.currentGroup<DZHK.QUESTIONNAIRE_RESPONSE_DATA.group.group.length){
			var groupQuestionsLength=DZHK.QUESTIONNAIRE_RESPONSE_DATA.group.group[self.currentGroup].question.length;
			if(self.currentQuestion<groupQuestionsLength){
				//self.currentQuestion++;
				self.initGroup();
			}else if(self.currentQuestion==groupQuestionsLength){
				//next group from start
				self.groupFinished(DZHK.QUESTIONNAIRE_DATA.group.group[self.currentGroup]);
				self.currentQuestion=0;	
				self.currentGroup++;
				if(self.currentGroup<DZHK.QUESTIONNAIRE_RESPONSE_DATA.group.group.length){
					self.initGroup();
				}else{
					self.questionnaireFinished();
				}
			}
		}else{
			self.questionnaireFinished();
		}
	});

};

/**
*called when group is finished!
*/
DZHK.quest.groupFinished=function(group){
	alert("group finished event:"+ group.linkId);
}

/**
*called when all groups are finished!
*/
DZHK.quest.questionnaireFinished=function(){
	//change status and save!

	alert("Questionnaire Finished !!!");
	console.log(DZHK.QUESTIONNAIRE_RESPONSE_DATA);
};