/**
* for creating different type of questionnaire ui;
*@author Awais
*
*/

var DZHK = DZHK || {};

/**
*Generic Super Answer Class to inherit from 
*more like an abstract class 
*
*@constructor
*@param Fhir question object
* 
*/
DZHK.Answer=function(question){
	this.question=question;
};

DZHK.Answer.prototype.question={};

/**
* To generate html for the response.
* @return string html for response interaction 
*/
DZHK.Answer.prototype.generateUI=function(){
	return "<div>:)</div>";
};

/**
*use it to save different type of answers
*/
DZHK.Answer.prototype.saveAnswer=function(){
	alert("Implement a sub class");
};

/**
*to render the ui, adding listeners and saving response collected
*
*/
DZHK.Answer.prototype.render=function(selector){
	$(selector).html("default Render:"+this.generateUI());
};


DZHK.Answer.prototype.haveSubGroup=function(){
	if(this.question.group){
		return true;
	}
	return false;
}

DZHK.Answer.prototype.haveReferenceToValueSet=function(){
	if(this.question.options){
		if(this.question.options.reference){
			return true;
		}
	}
	return false;
}


DZHK.Answer.prototype.parseExtension=function(){
	var self=this;
	var ext={
		type:null,
		code:"",
		orientation:"vertical" //default Orientation;
	};

	try{
		if(this.question.extension && this.question.extension.length>0){
			for (var i = this.question.extension.length - 1; i >= 0; i--) {
				//this.question.extension[i]
				var type=this.checkExtensionFromUrl(this.question.extension[i]);
				if(type=="questionnaire-questionControl"){
					ext.type=type;
					ext.code=this.question.extension[i].valueCodeableConcept.coding[0].code;
				}else if(type=="questionnaire-choiceOrientation"){
					ext.orientation=this.question.extension[i].valueCode;
				}
			}
		}else{
			console.log("no extension found");
		}
	}catch(ex){
		console.error("problem parsing extension for question linkId"+self.question.linkId);
	}
	return ext;

};
DZHK.Answer.prototype.checkExtensionFromUrl=function(extension){
	
	if(typeof extension.url == "string"){
		return extension.url.substr(extension.url.lastIndexOf("/")+1,extension.url.length);
	}else{
		//undefined!
		return "undefined"
	}

};

DZHK.Answer.prototype.checkValueCodeableConcept=function(extension){
	if(typeof extension.valueCodeableConcept == "object"){
		return true;
	}else{
		return false;
	}
};

//TODO: improve, save as property.
DZHK.Answer.prototype.getAnswerSelector=function(){
	return "answer-"+((this.question.linkId).replace(/\./g,'-'));
};


DZHK.Answer.prototype.onChangeCallBack=function(type,answer){

};


DZHK.Answer.prototype.refill=function(selector){
	if(this.question.answer){
		if(this.question.answer instanceof Array ){
			if(this.question.answer.length>0){
				this.fillAnswer(selector);
			}
		}else{
			this.fillAnswer(selector);
		}
	}
};

DZHK.Answer.prototype.fillAnswer=function(selector){
	//subclass implementations!
};


/**
* Sub classes for each specific type
* TextAnswer will generate TextArea
*/

DZHK.TextAnswer=function(){};
DZHK.TextAnswer=function(question){
	this.question=question;
};
DZHK.TextAnswer.prototype=new DZHK.Answer;
DZHK.TextAnswer.prototype.constructor=new DZHK.Answer;
DZHK.TextAnswer.prototype.generateUI=function(){
	var html=
			"<div class='form-group'>"+
                "<div id='"+this.getAnswerSelector()+"'>"+
                    "<textarea class='form-control' rows='3' placeholder='Enter ...'></textarea>"+
                "</div>"+
            "</div>";
    return html;
};
DZHK.TextAnswer.prototype.render=function(selector){
	var self=this;
	$(selector).html(this.generateUI());
	this.refill(selector);
	var input=$(selector+" #"+this.getAnswerSelector()+" textarea");
	$(input).change(function(){
		self.question.answer={
			"valueText":$(this).val()
		}
	});	
};

DZHK.TextAnswer.prototype.fillAnswer=function(selector){
	$(selector+" #"+this.getAnswerSelector()+" textarea").text(this.question.answer.valueText);
};


DZHK.DateAnswer=function(question){
	this.question=question;
};
DZHK.DateAnswer.prototype=new DZHK.Answer;
DZHK.DateAnswer.prototype.constructor=new DZHK.Answer;
DZHK.DateAnswer.prototype.generateUI=function(){
	var html=
			"<div class='form-group'>"+
                "<div class='input-group date' id='"+this.getAnswerSelector()+"'>"+
                    "<input type='text' class='form-control' />"+
                    "<span class='input-group-addon'>"+
                        "<span class='glyphicon glyphicon-calendar'></span>"+
                    "</span>"+
                "</div>"+
            "</div>";
    return html;
};
DZHK.DateAnswer.prototype.render=function(selector){
	var that=this;
	$(selector).html(this.generateUI());
	this.refill(selector);
	var dateFormat='L'
	//check extensions for only year input
	if(this.question.extension){
		for (var i = this.question.extension.length - 1; i >= 0; i--) {
			var type=this.checkExtensionFromUrl(this.question.extension[i]);
			if(type=="entryFormat"){
				dateFormat=this.question.extension[i].valueString;
			}
		}
	}

	var answerDatePicker=$(selector+" #"+that.getAnswerSelector()).datetimepicker({
		locale: 'de',
		format: dateFormat,
		viewMode:'years'
	});

	//save answer
	$(answerDatePicker).on("dp.change",function(e){
		that.question.answer={
			"valueDate":e.date.format("L")
		}
	});
};

DZHK.DateAnswer.prototype.fillAnswer=function(selector){
	$(selector+" #"+this.getAnswerSelector()+" input").val(this.question.answer.valueDate);
};


DZHK.DateTimeAnswer=function(question){
	this.question=question;
};
DZHK.DateTimeAnswer.prototype=new DZHK.Answer;
DZHK.DateTimeAnswer.prototype.constructor=new DZHK.Answer;
DZHK.DateTimeAnswer.prototype.generateUI=function(){
	var html=
			"<div class='form-group'>"+
                "<div class='input-group date' id='"+this.getAnswerSelector()+"'>"+
                    "<input type='text' class='form-control' />"+
                    "<span class='input-group-addon'>"+
                        "<span class='glyphicon glyphicon-calendar'></span>"+
                    "</span>"+
                "</div>"+
            "</div>";
    return html;
};
DZHK.DateTimeAnswer.prototype.render=function(selector){
	var that=this;
	$(selector).html(this.generateUI());
	this.refill(selector);
	//initiate datetimepicker
	var answerDatePicker=$(selector+" #"+this.getAnswerSelector()).datetimepicker({
		sideBySide:true,
		locale: 'de',
		format:"MM.DD.YYYY HH:mm"
	});

	//save answer
	$(answerDatePicker).on("dp.change",function(e){
		that.question.answer={
			"valueDateTime":e.date.format("MM.DD.YYYY HH:mm") //(ISO 8601)
		}
	});
};

DZHK.DateTimeAnswer.prototype.fillAnswer=function(selector){
	$(selector+" #"+this.getAnswerSelector()+" input").val(this.question.answer.valueDateTime);
};


/**
*time class from dateTime
*/

DZHK.TimeAnswer=function(question){
	this.question=question;
};
DZHK.TimeAnswer.prototype=new DZHK.DateTimeAnswer;
DZHK.TimeAnswer.prototype.constructor=new DZHK.DateTimeAnswer;

DZHK.TimeAnswer.prototype.render=function(selector){
	var that=this;
	$(selector).html(this.generateUI());
	this.refill(selector);
	//initiate datetimepicker
	var answerDatePicker=$(selector+" #"+this.getAnswerSelector()).datetimepicker({
		sideBySide:true,
		locale: 'de',
		format:"HH:mm"
	});

	//save answer
	$(answerDatePicker).on("dp.change",function(e){
		that.question.answer={
			"valueTime":e.date.format("HH:mm") //(ISO 8601)
		}
	});
};

DZHK.TimeAnswer.prototype.fillAnswer=function(selector){
	$(selector+" #"+this.getAnswerSelector()+" input").val(this.question.answer.valueTime);
};



/**
*	IntegerAnswer Class
*/
DZHK.IntegerAnswer=function(question){
	this.question=question;
};
DZHK.IntegerAnswer.prototype=new DZHK.Answer;
DZHK.IntegerAnswer.prototype.constructor=new DZHK.Answer;
DZHK.IntegerAnswer.prototype.generateUI=function(){
	var html=
			"<div class='form-group'>"+
                "<div id='"+this.getAnswerSelector()+"'>"+
                    "<input type='text' class='form-control'/>"+
                "</div>"+
            "</div>";
    return html;
};
DZHK.IntegerAnswer.prototype.render=function(selector){
	var self=this;
	$(selector).html(this.generateUI());
	this.refill(selector);
	var input=$(selector+" #"+this.getAnswerSelector()+" input");
	$(input).change(function(){
		self.question.answer={
			"valueInteger":$(this).val()
		}
	});	
};

DZHK.IntegerAnswer.prototype.fillAnswer=function(selector){
	$(selector+" #"+this.getAnswerSelector()+" input").val(this.question.answer.valueInteger);
};

/**
*	StringAnswer Class inherited from integer
*/
DZHK.StringAnswer=function(question){
	this.question=question;
};
DZHK.StringAnswer.prototype=new DZHK.IntegerAnswer;
DZHK.StringAnswer.prototype.constructor=new DZHK.IntegerAnswer;
//can use integerClass generate ui function, validation may differ TODO: add validations later, if required
DZHK.StringAnswer.prototype.render=function(selector){
	var self=this;
	$(selector).html(this.generateUI());
	this.refill(selector);
	var input=$(selector+" #"+this.getAnswerSelector()+" input");
	$(input).change(function(){
		self.question.answer={
			"valueString":$(this).val()
		}
	});	
};


DZHK.StringAnswer.prototype.fillAnswer=function(selector){
	$(selector+" #"+this.getAnswerSelector()+" input").val(this.question.answer.valueString);
};


/**
*	ChoiceAnswer Class inherited from Answer
*/
DZHK.ChoiceAnswer=function(question){
	this.question=question;
};
DZHK.ChoiceAnswer.prototype=new DZHK.Answer;
DZHK.ChoiceAnswer.prototype.constructor=new DZHK.Answer;

DZHK.ChoiceAnswer.prototype.generateUI=function(ext){
	
	var html="";
	if(ext.type=="questionnaire-questionControl"){
		if(ext.code=="radio-button"){
				html= "<div id='"+this.getAnswerSelector()+"'>";
					for (var i = 0; i < this.question.option.length; i++) {
						html+="<div class='form-group'><label ";
						if(ext.orientation=="horizontal"){
							html+=" class='radio-inline' >";
						}else{
							html+=" >";
						}
						html+="<input type='radio' name='"+this.getAnswerSelector()+"-radio' value='"+this.question.option[i].code+"'/> "+
						this.question.option[i].display+
						"</label></div>";
					}
				html+="</div>";
		}else if(ext.code=="check-box"){
			//more or less same.
			html= "<div id='"+this.getAnswerSelector()+"'>";
					for (var i = 0; i < this.question.option.length; i++) {
						html+="<div class='form-group'><label ";
						if(ext.orientation=="horizontal"){
							html+=" class='radio-inline' >";
						}else{
							html+=" >";
						}
						html+="<input type='checkbox' name='iCheck' value='"+this.question.option[i].code+"'/> "+
						this.question.option[i].display+
						"</label></div>";
					}
				html+="</div>";

		}else{
			html="unsupported! questioncontrol extension type";
		}
	}
	return html;
}

DZHK.ChoiceAnswer.prototype.render=function(selector){
	// have to check options
	var self= this; 
	if(!(this.question.answer instanceof Array)){
		this.question.answer=[];
	}

	if(this.haveReferenceToValueSet()){
		//rederWithReferred value
		this.renderWithRef(selector);
	}else{
		//check extensions
		var ext=this.parseExtension();
		
		if(ext.type){
			$(selector).html(this.generateUI(ext));
			this.refill(selector);
			if(ext.type=="questionnaire-questionControl" && ext.code=="radio-button"){
				$(selector+" #"+this.getAnswerSelector()+" input[type='radio']").iCheck({
					radioClass: 'iradio_flat-blue'
				}).on("ifClicked",function(event){
					//answer=this.value;
					//store the answer;
					var ans=this.value;

					self.question.answer=[]; //one radiobutton at a time;
					self.question.answer.push({
						"code":ans,
						"display":$(this).parent().parent().text().trim()
					});
					self.onChangeCallBack(ext.code,self.question.answer); //to handle enable when out in group
				});
			}else if(ext.type=="questionnaire-questionControl" && ext.code=="check-box"){
				$(selector+" #"+this.getAnswerSelector()+" input[type='checkbox']").iCheck({
					checkboxClass: 'icheckbox_flat-blue'
				}).on("ifChecked",function(event){
					//answer=this.value;

					var ans=this.value;
					var answer={
					 	code:ans,
					 	display:$(this).parent().parent().text().trim()
					};
					self.question.answer.push(answer);
					self.onChangeCallBack(ext.code,self.question.answer); //to handle enable when out in group
				}).on("ifUnchecked",function(event){
					 var answer={
					 	code:this.value,
					 	display:$(this).parent().parent().text().trim()
					 };
					self.removeCheckBoxAnswer(answer);
					self.onChangeCallBack(ext.code,self.question.answer); //to handle enable when out in group
				});
			}
		}else{
			console.error("unsupported extension type!");
			$(selector).html("");
		}
	}

};

DZHK.ChoiceAnswer.prototype.renderWithRef=function(selector){
	var self=this;
	var valueSetRefId=this.question.options.reference.substr(this.question.options.reference.indexOf("#")+1);
	var valueset=this.getValueSet(valueSetRefId);
	if(valueset){
		var generatedHtml="";
		if(valueset.codeSystem && valueset.codeSystem.concept){
			generatedHtml=this.generateUIWithValueSet(valueset.codeSystem.concept);
		}else if(valueset.expansion && valueset.expansion.contains){
			generatedHtml=this.generateUIWithValueSet(valueset.expansion.contains);
		}
		$(selector).html(generatedHtml);
		this.refill(selector);

		$(selector+" #"+this.getAnswerSelector()+" input[type='radio']").iCheck({
		radioClass: 'iradio_flat-blue'
		}).on("ifClicked",function(event){
			//answer=this.value;
			//store the answer;
			var ans=this.value;
			self.question.answer=[{
				"code":ans,
				"display":$(this).parent().parent().text().trim() //todo: mayeb add later the uri/system as well
			}];
			self.onChangeCallBack("radio-button",self.question.answer);
		});
	}else{
		console.warn("Warning: can't find valueset: "+valuesetRefId);
	}

};

DZHK.ChoiceAnswer.prototype.getValueSet=function(valueSetRefId){
	if(DZHK.QUESTIONNAIRE_DATA.contained && DZHK.QUESTIONNAIRE_DATA.contained.length>0 ){
		for (var i = DZHK.QUESTIONNAIRE_DATA.contained.length - 1; i >= 0; i--) {
			if(valueSetRefId==DZHK.QUESTIONNAIRE_DATA.contained[i].id){
				return DZHK.QUESTIONNAIRE_DATA.contained[i];
			}
		}
	}
	return false;
};

DZHK.ChoiceAnswer.prototype.generateUIWithValueSet=function(codingArray){
	var htmlString="";
	if(codingArray.length>0){
		htmlString="<div id='"+this.getAnswerSelector()+"'>";
	}
	for (var i = 0; i < codingArray.length; i++) {
		htmlString+="<div class='form-group'><label><input type='radio' name='"+this.getAnswerSelector()+"-radio' value='"+codingArray[i].code+"'/> "+codingArray[i].display+"</label></div>";
	}
	if(codingArray.length>0){
		htmlString+="</div>";
	}
	return htmlString;
};

DZHK.ChoiceAnswer.prototype.containsGroup=function(){
	console.error("not implemented yet: contains-Group");
};

DZHK.ChoiceAnswer.prototype.removeCheckBoxAnswer=function(answer){
	for (var i = this.question.answer.length - 1; i >= 0; i--) {
		if (this.question.answer[i].code == answer.code) {
           this.question.answer.splice(i,1);
        }
	}
};


DZHK.ChoiceAnswer.prototype.containsOptionsReference=function(){
	console.error("not implemented yet: contains reference to valueset");
};

DZHK.ChoiceAnswer.prototype.conditionalEvents=[];
DZHK.ChoiceAnswer.prototype.onChangeCallBack=function(type,answer){
	for (var i = this.conditionalEvents.length - 1; i >= 0; i--) {
		var c=this.conditionalEvents[i];
		if(this.question.linkId==c.conditionQuestion.valueString){
			if(true|| type=="radio-button"){ //for now its true
				if(c.conditionAnswer.valueCoding.code==answer[0].code){
					$(c.groupSelector).slideDown();
				}else{
					$(c.groupSelector).slideUp();
				}
			}
		}
	}
};

DZHK.ChoiceAnswer.prototype.addListener=function(conditions){
	conditionalEvents.push(conditions);
};

DZHK.ChoiceAnswer.prototype.fillAnswer=function(selector){
	var elements=$(selector+" #"+this.getAnswerSelector()+" input");
	//TODO: resume from here
	for (var i = this.question.answer.length - 1; i >= 0; i--) {
		for (var j = elements.length - 1; j >= 0; j--) {
			if(this.question.answer[i].code==$(elements[j]).val()){
				$(elements[j]).prop("checked",true);
				//this.onChangeCallBack("radio-button",this.question.answer);
			}
		}
	}
};


/**
*	OpenChoiceAnswer Class inherited from ChoiceAnswer
*/
DZHK.OpenChoiceAnswer=function(question){
	this.question=question;
};
DZHK.OpenChoiceAnswer.prototype=new DZHK.ChoiceAnswer;
DZHK.OpenChoiceAnswer.prototype.constructor=new DZHK.ChoiceAnswer;
DZHK.OpenChoiceAnswer.prototype.render=function(selector){
	//DZHK.Answer.prototype.render.call(this,selector);

	var self= this;

	if(!(this.question.answer instanceof Array)){
		this.question.answer=[];
	}

	if(this.haveReferenceToValueSet()){
		//rederWithReferred value
		this.renderWithRef(selector);
	}else{
		//check extensions
		var ext=this.parseExtension();

		if(ext.type){
			$(selector).html(this.generateUI(ext));
			var otherHtml="<div class='form-group'><input type='text' id='input-other' class='form-control' placeholder='other' disabled></div>";
			$(selector+" #"+this.getAnswerSelector()).append(otherHtml);
			
			this.refill(selector);
			
			if(ext.type=="questionnaire-questionControl" && ext.code=="radio-button"){
				$(selector+" #"+this.getAnswerSelector()+" #input-other").change(function(){
					self.question.answer[1]={
						"valueString":$(this).val()
					};
				});

				$(selector+" #"+this.getAnswerSelector()+" input[type='radio']").iCheck({
					radioClass: 'iradio_flat-blue'
				}).on("ifClicked",function(event){
					//store the answer;
					var ans=this.value;
					if(ans=="other"){
						$(selector+" #"+self.getAnswerSelector()+" #input-other").prop('disabled', false);
						if(self.question.answer && self.question.answer.length>1){
							$(selector+" #"+self.getAnswerSelector()+" #input-other").val(self.question.answer[1].valueString);
						}else{
							$(selector+" #"+self.getAnswerSelector()+" #input-other").val("");
						}
						otherAnswerString=self.getOtherStringAnswer();
						self.question.answer=[{
							"code":ans,
							"display":$(this).parent().parent().text().trim()
						}];
						self.question.answer[1]=otherAnswerString;
					}else{
						$(selector+" #"+self.getAnswerSelector()+" #input-other").val("");
						$(selector+" #"+self.getAnswerSelector()+" #input-other").prop('disabled', true);
						self.question.answer=[{
							"code":ans,
							"display":$(this).parent().parent().text().trim()
						}];
					}
					self.onChangeCallBack(ext.code,self.question.answer);
				});
			}else if(ext.type=="questionnaire-questionControl" && ext.code=="check-box"){

				var otherAnswerString={};
				$(selector+" #"+self.getAnswerSelector()+" #input-other").change(function(){
					otherAnswerString.valueString=$(this).val();
				});

				this.refill(selector);
				
				$(selector+" #"+self.getAnswerSelector()+" input[type='checkbox']").iCheck({
					checkboxClass: 'icheckbox_flat-blue'
				}).on("ifChecked",function(event){
					//answer=this.value;
					var ans=this.value;
					var otherAnswer={
						code:"other",
						display:""
					}

					//TODO: checbox with other option is valid?

					if(self.ifThisAnswerChecked(otherAnswer)){
						$(selector+" #"+self.getAnswerSelector()+" #input-other").prop('disabled', false);
						if(self.question.answer && self.question.answer.length>1){
							$(selector+" #"+self.getAnswerSelector()+" #input-other").val(self.question.answer[1].valueString);
						}else{
							$(selector+" #"+self.getAnswerSelector()+" #input-other").val("");
						}
						otherAnswerString=self.getOtherStringAnswer();
					}else{
						$(selector+" #"+self.getAnswerSelector()+" #input-other").prop('disabled', true);
						self.removeOtherValueStringFromAnswers();
					}

					var answer={
					 	code:ans,
					 	display:$(this).parent().parent().text().trim()
					 };
					self.question.answer.push(answer);
					self.onChangeCallBack(ext.code,self.question.answer);
				}).on("ifUnchecked",function(event){
					 var answer={
					 	code:this.value,
					 	display:$(this).parent().parent().text().trim()
					 };
					self.removeCheckBoxAnswer(answer);
					self.onChangeCallBack(ext.code,self.question.answer);
				});
			}
		}else{
			//console.error("unsupported type!");
		}
	}
};


DZHK.OpenChoiceAnswer.prototype.ifThisAnswerChecked=function(answer){
	for (var i = this.question.answer.length - 1; i >= 0; i--) {
		if (this.question.answer[i].code == answer.code) {
           return true;
        }
	}
	return false;
};
DZHK.OpenChoiceAnswer.prototype.removeOtherValueStringFromAnswers=function(){
	for (var i = this.question.answer.length - 1; i >= 0; i--) {
		if (this.question.answer[i].valueString) {
            this.question.answer.splice(i,1);
        }
	}
};
DZHK.OpenChoiceAnswer.prototype.getOtherStringAnswer=function(){
	for (var i = this.question.answer.length - 1; i >= 0; i--) {
		if (this.question.answer[i].valueString) {
            return this.question.answer[i];
        }
	}
	var newOtherAnswer={"valueString":""};
	this.question.answer.push(newOtherAnswer);
	return this.question.answer[this.question.answer.length-1];
};


DZHK.OpenChoiceAnswer.prototype.haveOtherStringAnswer=function(){
	for (var i = this.question.answer.length - 1; i >= 0; i--) {
		if (this.question.answer[i].valueString) {
            return true;
        }
	}
	return false;
};

DZHK.OpenChoiceAnswer.prototype.fillAnswer=function(selector){
	var elements=$(selector+" #"+this.getAnswerSelector()+" input");
	
	//TODO: resume from here
	for (var i = this.question.answer.length - 1; i >= 0; i--) {
		for (var j = elements.length - 1; j >= 0; j--) {
			if(this.question.answer[i].code==$(elements[j]).val()){
				$(elements[j]).prop("checked",true);
			}
			if(this.question.answer[i].code=="other"){
				$(selector+" #input-other").val(this.question.answer[1].valueString);
			}
		}
	}
};


/**
* factory to generate answer type objects
*factory pattern;
*/
DZHK.AnswerFactory=function(){};
DZHK.AnswerFactory.prototype.answerClass=DZHK.StringAnswer;
DZHK.AnswerFactory.prototype.createAnswerClass=function(question){
	switch(question.type){
		case "date":
			this.answerClass=DZHK.DateAnswer;
			break;
		case "dateTime":
			this.answerClass=DZHK.DateTimeAnswer;
			break;
		case "integer":
			this.answerClass=DZHK.IntegerAnswer;
			break;
		case "text":
			this.answerClass=DZHK.TextAnswer;
			break;
		case "string":
			this.answerClass=DZHK.StringAnswer;
			break;
		case "choice":
			this.answerClass=DZHK.ChoiceAnswer;
			break;
		case "open-choice":
			this.answerClass=DZHK.ChoiceAnswer;
			break;
		case "time":
			this.answerClass=DZHK.TimeAnswer;
			break;
		default:
			console.error("unsupported answer type:"+question.type);
	}
	return new this.answerClass(question);
};
