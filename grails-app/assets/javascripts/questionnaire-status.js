var DZHK = DZHK || {};

DZHK.QUESTIONNAIRE_RESPONSE_DATA=":D";
DZHK.QUESTIONNAIRE_DATA=":D";
DZHK.USER_QUESTIONNAIRE_ID="";
DZHK.QUESTIONNAIRE_RESPONSE_ID="";
DZHK.QUESTIONNAIRE_SAVE_URL=":D";
DZHK.USERNAME="";

DZHK.status={};
DZHK.status.resumeFromGroup=0;


DZHK.status.init=function(){

	var self=this;
	$("#bt-status-submit").click(function(){
		self.onSubmit();
	});

	//#questionnaire-details
	if(DZHK.QUESTIONNAIRE_DATA.group && DZHK.QUESTIONNAIRE_DATA.group.group){
		var selector="#group-detail-table";
		var groups =DZHK.QUESTIONNAIRE_DATA.group.group;
		for (var i = 0; i < groups.length; i++){
			this.fillGroupDetail(selector,groups[i],i);
		}
	}else{
		//#questionnaire-details
		console.log("Dont have groups in json");
	}

};

DZHK.status.fillGroupDetail=function(selector,group,index){
	
	var rowHtml="<tr id='row-'"+index+">"
		+"<td>"+group.title+"</td>";
		// +"<td>"+group.text+"</td>";

	if(group.question){
		var qText="question"
		if(group.question.length>1){
			qText+="s";
		}
		rowHtml+="<td>"+group.question.length+"</td>";
	}

	//status column
	if(index<this.resumeFromGroup){
		//hopefully previous are filled
		rowHtml+="<td><i class='fa fa-check text-success' aria-hidden='true'></i></td>"
		
	}else if(index==this.resumeFromGroup){
		//resume from here
		if(this.resumeStatus==3){
			//rowHtml+="<td>submitted</td>";
		}else{
			rowHtml+="<td>resume</td>";
		}
	}
	rowHtml+="</tr>";
	$(selector).append(rowHtml);
};

DZHK.status.onSubmit=function(){

	//setting other values of quesitonnaireResponse json
	var mixIdentifier=DZHK.USER_QUESTIONNAIRE_ID+"-"+DZHK.QUESTIONNAIRE_RESPONSE_ID;
	DZHK.QUESTIONNAIRE_RESPONSE_DATA.id=mixIdentifier;
	DZHK.QUESTIONNAIRE_RESPONSE_DATA.identifier={
		use:"official", // usual | official | temp | secondary (If known)
		value : mixIdentifier // The value that is unique 
	};
	DZHK.QUESTIONNAIRE_RESPONSE_DATA.authored=moment().format(); //UTC
	var refObj={
		reference:DZHK.USERNAME,
		display:DZHK.USERNAME
	};
	DZHK.QUESTIONNAIRE_RESPONSE_DATA.subject=refObj;
	DZHK.QUESTIONNAIRE_RESPONSE_DATA.author=refObj;
	DZHK.QUESTIONNAIRE_RESPONSE_DATA.source=refObj;
	DZHK.QUESTIONNAIRE_RESPONSE_DATA.status="completed";

	//do the ajax request to save it :)
	var self=this;
	$.ajax({
		method:"POST",
		url:DZHK.QUESTIONNAIRE_SAVE_URL,
		data:{id:DZHK.QUESTIONNAIRE_RESPONSE_ID,data:JSON.stringify(DZHK.QUESTIONNAIRE_RESPONSE_DATA),"userQuestionnaire.id":DZHK.USER_QUESTIONNAIRE_ID,status:3,resumeFromGroup:"0"}
	})
	.done(function(data){
		console.log(data);
		//$(btSelector+" i").removeClass("fa-spin"); //#bt-modal-save
		if(data.saved){
			DZHK.QUESTIONNAIRE_RESPONSE_ID=data.questionnaireResponse.id;
			window.location.reload();
		}
		else{
			//display error and then hide it.
			$("#alert-fail-msg").text(data.error);
			$("#alert-fail").show();
		}
	}).error(function(jqXHT,textStatus,errorThrown){
		//display error
		$("#alert-fail-msg").text(errorThrown);
		$("#alert-fail").show();
	});

};