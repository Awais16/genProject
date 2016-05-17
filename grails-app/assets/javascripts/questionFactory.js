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
	$(selector).html("defaul Render:"+this.generateUI());
};



DZHK.Answer.prototype.parseExtension=function(){

	var ext={
		type:"",
		code:"",
		orientation:"vertical" //default Orientation;
	};
	
	if(this.question.extension.length>0){
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
	}
	return ext;

};
DZHK.Answer.prototype.checkExtensionFromUrl=function(extension){
	
	if(typeof extension.url == "string"){
		var type=extension.url.substr(extension.url.lastIndexOf("/")+1,extension.url.length);
		//console.log(type);
		return type
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
                "<div id='answer-"+this.question.linkId+"'>"+
                    "<textarea class='form-control' rows='3' placeholder='Enter ...'></textarea>"+
                "</div>"+
            "</div>";
    return html;
};
DZHK.TextAnswer.prototype.render=function(selector){
	var self=this;
	$(selector).html(this.generateUI());
	var input=$(selector+" #answer-"+this.question.linkId+" textarea");
	$(input).change(function(){
		self.question.answer={
			"valueText":$(this).val()
		}
	});	
};


DZHK.DateAnswer=function(question){
	this.question=question;
};
DZHK.DateAnswer.prototype=new DZHK.Answer;
DZHK.DateAnswer.prototype.constructor=new DZHK.Answer;
DZHK.DateAnswer.prototype.generateUI=function(){
	var html=
			"<div class='form-group'>"+
                "<div class='input-group date' id='answer-"+this.question.linkId+"'>"+
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
	//initiate datetimepicker
	var answerDatePicker=$(selector+" #answer-"+this.question.linkId).datetimepicker({
		locale: 'de',
		format: 'L'
	});

	//save answer
	$(answerDatePicker).on("dp.change",function(e){
		that.question.answer={
			"valueDate":e.date.format("L")
		}
	});
};



DZHK.DateTimeAnswer=function(question){
	this.question=question;
};
DZHK.DateTimeAnswer.prototype=new DZHK.Answer;
DZHK.DateTimeAnswer.prototype.constructor=new DZHK.Answer;
DZHK.DateTimeAnswer.prototype.generateUI=function(){
	var html=
			"<div class='form-group'>"+
                "<div class='input-group date' id='answer-"+this.question.linkId+"'>"+
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
	//initiate datetimepicker
	var answerDatePicker=$(selector+" #answer-"+this.question.linkId).datetimepicker({
		sideBySide:true,
		locale: 'de' 
	});

	//save answer
	$(answerDatePicker).on("dp.change",function(e){
		that.question.answer={
			"valueDateTime":e.date.format() //(ISO 8601)
		}
	});
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
                "<div id='answer-"+this.question.linkId+"'>"+
                    "<input type='text' class='form-control'/>"+
                "</div>"+
            "</div>";
    return html;
};
DZHK.IntegerAnswer.prototype.render=function(selector){
	var self=this;
	$(selector).html(this.generateUI());
	var input=$(selector+" #answer-"+this.question.linkId+" input");
	$(input).change(function(){
		self.question.answer={
			"valueInteger":$(this).val()
		}
	});	
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
DZHK.IntegerAnswer.prototype.render=function(selector){
	var self=this;
	$(selector).html(this.generateUI());
	var input=$(selector+" #answer-"+this.question.linkId+" input");
	$(input).change(function(){
		self.question.answer={
			"valueString":$(this).val()
		}
	});	
};


/**
*	ChoiceAnswer Class inherited from integer
*/
DZHK.ChoiceAnswer=function(question){
	this.question=question;
};
DZHK.ChoiceAnswer.prototype=new DZHK.Answer;
DZHK.ChoiceAnswer.prototype.constructor=new DZHK.Answer;

DZHK.ChoiceAnswer.prototype.generateUI=function(){
	var ext=this.parseExtension();
	
	var html="";
	if(ext.type=="questionnaire-questionControl"){
		if(ext.code=="radio-button"){
				html= "<div class='form-group' id='"+"answer-"+this.question.linkId+"'>";
					for (var i = 0; i < this.question.option.length; i++) {
						html+="<label ";
						var br="";
						if(ext.orientation=="horizontal"){
							html+=" class='radio-inline' >";
						}else{
							html+=" >"
							br="<br/>"
						}
						html+="<input type='radio' name='iCheck' value='"+this.question.option[i].code+"'/> "+
						this.question.option[i].display+
						"</label>"+br;
					}
				html+="</div>";
		}else if(ext.code=="check-box"){
			//more or less same.
			html= "<div class='form-group' id='"+"answer-"+this.question.linkId+"'>";
					for (var i = 0; i < this.question.option.length; i++) {
						html+="<label ";
						var br="";
						if(ext.orientation=="horizontal"){
							html+=" class='radio-inline' >";
						}else{
							html+=" >"
							br="<br/>"
						}
						html+="<input type='checkbox' name='iCheck' value='"+this.question.option[i].code+"'/> "+
						this.question.option[i].display+
						"</label>"+br;
					}
				html+="</div>";

		}
	}
	return html;
}

DZHK.ChoiceAnswer.prototype.render=function(selector){
	// have to check options
	var self= this; 
	
	//check extensions
	//TODO: start from here 
	$(selector).html(this.generateUI());

	var checkBoxAnswer=[];

	var ext=this.parseExtension();
	if(ext.type=="questionnaire-questionControl" && ext.code=="radio-button"){
		$(selector+" #answer-"+this.question.linkId+" input[type='radio']").iCheck({
			radioClass: 'iradio_flat-blue'
		}).on("ifClicked",function(event){
			//TODO: start from here

			//answer=this.value;
			//store the answer;
			var ans=this.value;
			self.question.answer={
				"valueChoice":ans
			}
		});
	}else if(ext.type=="questionnaire-questionControl" && ext.code=="check-box"){
		$(selector+" #answer-"+this.question.linkId+" input[type='checkbox']").iCheck({
			checkboxClass: 'icheckbox_flat-blue'
		}).on("ifChecked",function(event){
			//answer=this.value;
			//alert("add to answer:"+this.value);
		});
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
		default:
			console.error("unsupported answer type:"+question.type);
	}
	return new this.answerClass(question);
};
