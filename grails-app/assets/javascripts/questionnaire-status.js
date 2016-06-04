var DZHK = DZHK || {};

DZHK.QUESTIONNAIRE_RESPONSE_DATA=":D";
DZHK.QUESTIONNAIRE_DATA=":D";

DZHK.status={};

DZHK.status.resumeFromGroup=0;
DZHK.status.init=function(){
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
		rowHtml+="<td>resume</td>"
	}


	rowHtml+="</tr>";
	$(selector).append(rowHtml);
};

DZHK.status.generateTableHtml=function(selector){
	$(selector).html("<table class='table table-hover' id='group-detail-table'><thead><tr><th>Title</th><th>Details</th><th>Status</th></tr></thead></table>");
	return "#group-detail-table";
};
