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
	$(".subgroups").remove();
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
	if(qAnswer.haveSubGroup()){
		this.processGroups(qAnswer,qAnswer.question.group);
	}else{
		//console.log
	}
};

DZHK.quest.processGroups=function(qAnswer,groupArray){
	for (var i = 0; i < groupArray.length; i++) {
		this.processSubGroup(qAnswer,groupArray[i]);
	}
};

//TODO: start from here, fix group hierarchies! recursion
//question can have groups
//groups can have groups or questions

DZHK.quest.processSubGroup=function(qAnswer,group){
	if(group.extension && group.extension.length>0){
		for (var i = group.extension.length - 1; i >= 0; i--) {
			var extension=group.extension[i].url.substr(group.extension[i].url.lastIndexOf("/")+1);
			if(extension=="questionnaire-enableWhen"){
				this.groupEnableExtension(qAnswer,group,group.extension[i]);
			}else{
				console.warn("unsupported: subgroup extension");
			}
		}
	}else{
		if(group.question){
			this.generateSubGroupHtml(group);
			this.renderSubGroupQuestions(group);
		}else{
			this.processGroups(qAnswer,group);
		}
	}
};

DZHK.quest.groupEnableExtension=function(qAnswer,group,ext){
	//check with response saved answer
	var self=this;
	var conditionQuestion={};
	var conditionAnswer={};

	//TODO: for single conditional answer! for timebeing
	for (var i = 0; i < ext.extension.length; i++) {
		if(ext.extension[i].url=="question"){
			conditionQuestion=ext.extension[i];
		}else if(ext.extension[i].url=="answer"){
			conditionAnswer=ext.extension[i];
		}
	}

	//if direct parent question
	if(true){
		//takecare of direct child first
		this.generateSubGroupHtml(group);
		qAnswer.onChangeCallBack=function(type,answer){
			qAnswer.afterChangeCallBack("#"+self.getDashedGroupId(group.linkId),conditionQuestion,conditionAnswer,type,answer);
		};

		if(group.question){
			this.renderSubGroupQuestions(group);
		}else if(group.group && group.group.length>0){
			console.log("subgroup got group! handle case!");
			this.processGroups(qAnswer,group.group);
		}
	}else{
		//TODO: search already answered question!
		console.warn("condition in other block");
	}
};

DZHK.quest.generateSubGroupHtml=function(group){
	$(".main-box").append("<div class='row subgroups' id='"+this.getDashedGroupId(group.linkId)+"' ><div class='box-group col-md-8'><div class='box'>"+
			"<div class='box-header with-border'><h3 class='box-title'> Block# "+group.linkId+"</h3></div>"+
			"<div class='box-body'><div class='col-md-offset-1 question-area'></div></div></div></div></div>");
};


DZHK.quest.getDashedGroupId=function(groupId){
	return "group-"+((groupId).replace(/\./g,'-'));
};

DZHK.quest.renderSubGroupQuestions=function(group){
	var selector="#"+this.getDashedGroupId(group.linkId)+" .question-area";

	for (var i = 0; i < group.question.length; i++) {
		var question=group.question[i];
		var qAnswer=this.factory.createAnswerClass(question);

		var qHtml="<div class='row'><div row='col-md-8'><h4>"+question.text+"</h4></div>";
		qHtml+="<div class='col-md-5' id='"+qAnswer.getAnswerSelector()+"'></div></div>";

		$(selector).append(qHtml);
		qAnswer.render("#"+qAnswer.getAnswerSelector());

	}
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
	console.log("group finished event:"+ group.linkId);
};

/**
*called when all groups are finished!
*/
DZHK.quest.questionnaireFinished=function(){
	//change status and save!
	alert("Questionnaire Finished !!!");
	console.log(DZHK.QUESTIONNAIRE_RESPONSE_DATA);
};