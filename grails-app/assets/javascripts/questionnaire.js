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


DZHK.quest.initResponseFromQuestionnaire=function(){
	var groupToCopy=$.extend(true,{},DZHK.QUESTIONNAIRE_DATA.group);
	DZHK.QUESTIONNAIRE_RESPONSE_DATA.group=groupToCopy;
};

DZHK.quest.init=function(){
	
	this.factory= new DZHK.AnswerFactory(); //to generate AnwerTypes check QuestionFactory.js

	//initialized with first group;
	this.initGroup();
	this.initControl();	
	this.initSaveModal();
	this.initSubmitModal();
	this.initPopUpSubmitButton();
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
	if(groups[this.currentGroup].question){
		this.initQuestion(groups[this.currentGroup].question);
	}else{
		//handle empty group
		//TODO: Fix it later! group can have group or questions. question can have group
	}
	
};

DZHK.quest.setGroup=function(group){
	this.setGroupTitle(group.linkId);
	this.setGroupText(group.title);
	this.setGroupDesc(group.text);
};

//TODO: resume from here for direct condition on main question ie. group b/3
DZHK.quest.initQuestion=function(questions){
	//disabling progress text
	//this.setProgressTitle("Group questions progress");
	this.setProgressNumber(this.currentQuestion+1,questions.length);
	this.renderQuestion(questions[this.currentQuestion]);
};

DZHK.quest.setQuestionText=function(question){
	$(".question-text").html(question);
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

	//TODO: for single conditional answer! for now
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
		//if its refilled?
		if(qAnswer.question.answer && qAnswer.question.answer.length>0){
			qAnswer.onChangeCallBack("",qAnswer.question.answer);
		}
		
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
		qHtml+="<div class='col-md-5' id='"+qAnswer.getAnswerSelector()+"-sub'></div></div>";

		$(selector).append(qHtml);
		qAnswer.render(selector+" #"+qAnswer.getAnswerSelector()+"-sub");

		 if(qAnswer.haveSubGroup()){
		 	this.processGroups("#"+qAnswer.getAnswerSelector(),qAnswer,qAnswer.question.group);
		 }

	}
};

DZHK.quest.saveQuestionnaireResposne=function(){
	$("#modal-save-msg").text("It is recommended to save questionnaire after completion of every group");
	$('#modal-save').modal('show');
};

DZHK.quest.makeAjaxRequest=function(status,btSelector,selector){
	var self=this;
	$.ajax({
		method:"POST",
		url:DZHK.QUESTIONNAIRE_SAVE_URL,
		data:{id:DZHK.QUESTIONNAIRE_RESPONSE_ID,data:JSON.stringify(DZHK.QUESTIONNAIRE_RESPONSE_DATA),"userQuestionnaire.id":DZHK.USER_QUESTIONNAIRE_ID,status:status,resumeFromGroup:self.currentGroup}
	})
	.done(function(data){
		//console.log(data);
		$(btSelector+" i").removeClass("fa-spin"); //#bt-modal-save
		if(data.saved){
			self.onSuccessfullSave(data,selector);
		}
		else{
			self.onSaveFailed(data,selector);
		}
	}).error(function(jqXHT,textStatus,errorThrown){
		$(btSelector+" i").removeClass("fa-spin");
		self.onSaveFailed({error:"Unable save please try again later."});
	});

};

DZHK.quest.onSuccessfullSave=function(data,selector){
	DZHK.QUESTIONNAIRE_RESPONSE_ID=data.questionnaireResponse.id;
	$(selector+"-msg").text("Questionnaire saved successfully...");
	$(selector).addClass("modal-success");
	setTimeout(function(){
		$(selector).removeClass("modal-success");
		$(selector).modal('hide');
		if(data.questionnaireResponse.status==3){
			window.location="/questionnaire/home"
		}
	},1000);
};

DZHK.quest.onSaveFailed=function(data,selector){
	$(selector+"-msg").text(data.error);
	$(selector).addClass("modal-warning");
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
		self.makeAjaxRequest("1","#bt-modal-save","#modal-save");
	});
};

/**
*set back, next, save controls etc; hook events
*/
DZHK.quest.initControl=function(){

	var self=this;
	$("#bt-back").click(function(){
		//console.log("back g:"+self.currentGroup+" "+"q:"+self.currentQuestion);
		if(self.currentQuestion>0){
			self.currentQuestion--;
		}else{
			//first question
			//check group
			if(self.currentGroup>0){
				//set previous group + last question of that group;
				self.currentGroup--;
				self.currentQuestion=DZHK.QUESTIONNAIRE_RESPONSE_DATA.group.group[self.currentGroup].question.length-1;
			}else{
				console.log("first group,first question, can't go back anymore");
				$("#bt-back").prop("disabled",true);
			}
		}
		self.initGroup();
		if(self.currentGroup<DZHK.QUESTIONNAIRE_RESPONSE_DATA.group.group.length || self.currentQuestion<DZHK.QUESTIONNAIRE_RESPONSE_DATA.group.group[self.currentGroup].question.length){
			$("#bt-next").prop("disabled",false);
		}

	});

	$("#bt-next").click(function(){
		// console.log("next g:"+self.currentGroup+" "+"q:"+self.currentQuestion);
		if(self.currentQuestion<DZHK.QUESTIONNAIRE_RESPONSE_DATA.group.group[self.currentGroup].question.length-1){
			self.currentQuestion++;
		}else{
			//last question rendered already
			//check group
			if(self.currentGroup<DZHK.QUESTIONNAIRE_RESPONSE_DATA.group.group.length-1){
				//load next group questions
				self.groupFinished(DZHK.QUESTIONNAIRE_DATA.group.group[self.currentGroup]);
				self.currentQuestion=0;
				self.currentGroup++;
				//event: group finished
			}else{
				//last group already done
				self.questionnaireFinished();
				$("#bt-next").prop("disabled",true);
			}
		}

		self.initGroup();
		//re-enable back button
		if(self.currentGroup>0 || self.currentQuestion>0){
			$("#bt-back").prop("disabled",false);
		}

	});

};

/**
*called when group is finished!
*/
DZHK.quest.groupFinished=function(group){
	console.log("group finished event:"+ group.linkId);
	if(group.question.length>1){
		this.saveQuestionnaireResposne();
	}
};

/**
*called when all groups are finished!
*/
DZHK.quest.questionnaireFinished=function(){
	//change status and save!
	//alert("Questionnaire Finished !!! not submitted yet");
	//console.log(DZHK.QUESTIONNAIRE_RESPONSE_DATA);
	//this.makeAjaxRequest("2");
	$('#modal-submit').modal('show');
};

DZHK.quest.initSubmitModal=function(){
	var self=this;
	$('#modal-submit').modal({show:false}).on('hide.bs.modal',function(){
		$("#bt-modal-submit i").removeClass("fa-spin");
		$("#modal-submit").removeClass("modal-success");
		$("#modal-submit").removeClass("modal-warning");
	});

	//add click save listner
	$("#bt-modal-submit").click(function(){
		//add spinner class ;)
		$("#bt-modal-submit i").addClass("fa-spin");
		//change text;
		self.makeAjaxRequest("3","#bt-modal-submit","#modal-submit"); //for the time being save it as
	});

	$("#bt-modal-submit-cancel").click(function(){
		//add spinner class ;)
		$("#bt-modal-submit-cancel i").addClass("fa-spin");
		//change text;
		self.makeAjaxRequest("2","#bt-modal-submit","#modal-submit"); //for the time being save it as
	});
};

// dialog-bt-submit
DZHK.quest.initPopUpSubmitButton=function(){
	var self=this;
	$("#popup-bt-submit").click(function(){
		self.makeAjaxRequest("3","#popup-bt-submit","#popup-submit");
	});
};



/**
*when questionnaire is submitted right after
*/

DZHK.quest.submitQuestionnaireResponse=function(){
	//change status in response and make ajax request to submit the questionnareResponse
};