var DZHK = DZHK || {};

DZHK.QUESTIONNAIRE_RESPONSE_DATA=":D";
DZHK.QUESTIONNAIRE_DATA=":D";
DZHK.USER_QUESTIONNAIRE_ID="0";
DZHK.QUESTIONNAIRE_RESPONSE_ID="0";
DZHK.QUESTIONNAIRE_SAVE_URL=":D";

DZHK.status={};
DZHK.status.resumeFromGroup=0;


DZHK.status.init=function(){

	var self=this;
	/*$("#bt-status-submit").click(function(){
		self.onSubmit();
	});*/

	//#questionnaire-details
	if(DZHK.QUESTIONNAIRE_DATA.group && DZHK.QUESTIONNAIRE_DATA.group.group){
		var selector=this.generateTableHtml("#questionnaire-details");
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
		rowHtml+="<td>"+group.question.length+" "+qText+"</td>";
	}

	//status column
	if(index<this.resumeFromGroup){
		//hopefully previous are filled
		rowHtml+="<td><i class='fa fa-check text-success' aria-hidden='true'></i></td>"
		
	}else if(index==this.resumeFromGroup){
		//resume from here
		if(this.resumeStatus==3){
			rowHtml+="<td>submitted</td>";
		}else{
			rowHtml+="<td>resume</td>";
		}
	}
	rowHtml+="</tr>";
	$(selector).append(rowHtml);
};

DZHK.status.generateTableHtml=function(selector){
	$(selector).html("<table class='table table-hover' id='group-detail-table'><thead><tr><th>Title</th><th>Details</th><th>Status</th></tr></thead></table>");
	return "#group-detail-table";
};

DZHK.status.onSubmit=function(){
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
			self.onSuccessfullSave(data,selector);
		}
		else{
			self.onSaveFailed(data,selector);
		}
	}).error(function(jqXHT,textStatus,errorThrown){
		//$(btSelector+" i").removeClass("fa-spin");
		//self.onSaveFailed({error:"Unable save please try again later."});
	});

};