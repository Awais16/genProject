/**
*Getting DZHK,quest scope, 
*@author Awais
*/

var DZHK = DZHK || {};

DZHK.quest={};
DZHK.QUESTIONNAIRE_DATA=":D";
DZHK.QUESTIONNAIRE_SAVE_URL=":D";
DZHK.USER_QUESTIONNAIRE_ID=":D";
DZHK.QUESTIONNAIRE_RESPONSE_ID="";
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
	this.initSaveModal();
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
	$(".subgroup").remove();
	var groups=DZHK.QUESTIONNAIRE_RESPONSE_DATA.group.group;
	this.setGroup(groups[this.currentGroup]);
	this.initQuestion(groups[this.currentGroup].question);
};

DZHK.quest.setGroup=function(group){
	this.setGroupTitle(group.linkId);
	this.setGroupText(group.title);
	this.setGroupDesc(group.text);
};


//TODO: resume from here for direct condition on main question ie. group b/3
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
		this.processGroups(".main-box",qAnswer,qAnswer.question.group);
	}else{
		//console.log
	}
};

DZHK.quest.processGroups=function(selector,qAnswer,groupArray){
	for (var i = 0; i < groupArray.length; i++) {
		this.processSubGroup(selector,qAnswer,groupArray[i]);
	}
};


//question can have groups
//groups can have groups or questions

DZHK.quest.processSubGroup=function(selector,qAnswer,group){

	//generate SubGroup Html
	var newSelector=this.generateSubGroupHtml(selector,group);
	if(group.text){
		$("#"+this.getDashedGroupId(group.linkId)+"-head").text("Block# "+group.linkId+" : "+group.text);
	}

	if(group.extension && group.extension.length>0){
		for (var i = group.extension.length - 1; i >= 0; i--) {
			var extension=group.extension[i].url.substr(group.extension[i].url.lastIndexOf("/")+1);
			if(extension=="questionnaire-enableWhen"){
				this.groupEnableExtension(newSelector,qAnswer,group,group.extension[i]);
			}else{
				console.warn("unhandled other group extensions");
			}
		}
	}else{
		console.log("no extension found for this group");
	}
	this.groupOrQuestionFlow(newSelector,group,qAnswer);
};

DZHK.quest.groupOrQuestionFlow=function(selector,group,qAnswer){
	if(group.question){
		this.renderSubGroupQuestions(selector,group);
	}else if(group.group){
		this.processGroups(selector,qAnswer,group.group);
	}
};

DZHK.quest.groupEnableExtension=function(selector,qAnswer,group,ext){
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
	if(conditionQuestion.valueString==qAnswer.question.linkId){
		
		$("#"+self.getDashedGroupId(group.linkId)).hide();
		//handling multiple listener for same question with different answer
		qAnswer.conditionalEvents.push({
			groupSelector:"#"+self.getDashedGroupId(group.linkId),
			conditionQuestion:conditionQuestion,
			conditionAnswer:conditionAnswer
		});
	}else{
		//TODO: search already answered question!
		console.warn("not implemented:enable when condition is in other group");
	}
};

DZHK.quest.generateSubGroupHtml=function(selector,group){
	$(selector).append("<div class='box subgroup' id='"+this.getDashedGroupId(group.linkId)+"'>"+
			"<div class='box-header with-border'><h3 class='box-title' id='"+this.getDashedGroupId(group.linkId)+"-head'> Block# "+group.linkId+"</h3></div>"+
			"<div class='box-body'><div class='col-md-offset-1' id='"+this.getDashedGroupId(group.linkId)+"-main'></div></div>"+
			"</div>");
	return "#"+this.getDashedGroupId(group.linkId)+"-main";
};


DZHK.quest.getDashedGroupId=function(groupId){
	return "group-"+((groupId).replace(/\./g,'-'));
};

DZHK.quest.renderSubGroupQuestions=function(selector,group){
	//var selector="#"+this.getDashedGroupId(group.linkId)+" .question-area";
	for (var i = 0; i < group.question.length; i++) {
		var question=group.question[i];
		var qAnswer=this.factory.createAnswerClass(question);

		var qHtml="<div class='row'><div row='col-md-5'><h4>"+question.text+"</h4></div>";
		qHtml+="<div class='col-md-5' id='"+qAnswer.getAnswerSelector()+"'></div></div>";

		$(selector).append(qHtml);
		qAnswer.render(selector+" #"+qAnswer.getAnswerSelector());
	}
};

DZHK.quest.saveQuestionnaireResposne=function(){
	$("#modal-save-msg").text("It is recommended to save questionnaire after completion of every group");
	$('#modal-save').modal('show');
};

DZHK.quest.makeAjaxRequestion=function(){
	var self=this;
	$.ajax({
		method:"POST",
		url:DZHK.QUESTIONNAIRE_SAVE_URL,
		data:{id:DZHK.QUESTIONNAIRE_RESPONSE_ID,data:JSON.stringify(DZHK.QUESTIONNAIRE_RESPONSE_DATA),"userQuestionnaire.id":DZHK.USER_QUESTIONNAIRE_ID,status:"0"}
	})
	.done(function(data){
		$("#bt-modal-save i").removeClass("fa-spin");
		if(data.saved){
			self.onSuccessfullSave(data);
		}
		else{
			self.onSaveFailed(data);
		}
	}).error(function(jqXHT,textStatus,errorThrown){
		$("#bt-modal-save i").removeClass("fa-spin");
		self.onSaveFailed({error:"Unable save please try again later."});
	});

};

DZHK.quest.onSuccessfullSave=function(data){
	DZHK.QUESTIONNAIRE_RESPONSE_ID=data.questionnaireResponse.id;
	$("#modal-save-msg").text("Questionnaire saved successfully...");
	$("#modal-save").addClass("modal-success");
	setTimeout(function(){
		$("#modal-save").removeClass("modal-success");
		$('#modal-save').modal('hide');
	},1500);
};

DZHK.quest.onSaveFailed=function(data){
	$("#modal-save-msg").text(data.error);
	$("#modal-save").addClass("modal-warning");
};

DZHK.quest.initSaveModal=function(){
	var self=this;
	$('#modal-save').modal({show:false}).on('hide.bs.modal',function(){
		$("#bt-modal-save i").removeClass("fa-spin");
		$("#modal-save").removeClass("modal-success");
		$("#modal-save").removeClass("modal-warning");
	});

	//add click save listner
	$("#bt-modal-save").click(function(){
		//add spinner class ;)
		$("#bt-modal-save i").addClass("fa-spin");
		//change text;
		self.makeAjaxRequestion(); //for the time being save it as
	});

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
	this.saveQuestionnaireResposne();
};

/**
*called when all groups are finished!
*/
DZHK.quest.questionnaireFinished=function(){
	//change status and save!
	alert("Questionnaire Finished !!!");
	console.log(DZHK.QUESTIONNAIRE_RESPONSE_DATA);
};