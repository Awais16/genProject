/**
* for creating different type of questionnaire ui;
**/

var DZHK = DZHK || {};

/**
*Generic Super Answer Class to inherit from 
*more like an abstract class 
*/
DZHK.Answer=function(question){
	var tempQ=question;
	this.question=question;
};

DZHK.Answer.prototype.question={};
DZHK.Answer.prototype.generateUI=function(){
	return "<div>:)</div>";
};

//use it to save different type of answers
DZHK.Answer.prototype.saveAnswer=function(){
	alert("Implement a sub class");
};

DZHK.Answer.prototype.render=function(selector){
	$(selector).html("defaul Render:"+this.generateUI());
};


/** Sub classes for each specific type
*	TextAnswer will generate TextArea
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
//can use integerClass generate ui function, validation may differ later
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
		default:
			console.error("unsupported answer type:"+question.type);
	}
	return new this.answerClass(question);
};
