/**
* for creating different type of questionnaire ui;
**/

var DZHK = DZHK || {};

DZHK.Answer=function(question){
	var tempQ=question;
	alert
	this.question=question;
};

DZHK.Answer.prototype.question={};
DZHK.Answer.prototype.generateUI=function(){
	return "<div>This is default answer ui</div>";
};

DZHK.Answer.prototype.saveAnswer=function(){
	alert("Implement a sub class");
};

DZHK.Answer.prototype.render=function(selector){
	$(selector).html("defaul Render:"+this.generateUI());
};


DZHK.TextAnswer=function(){};
DZHK.TextAnswer.prototype=new DZHK.Answer;



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


DZHK.DateTimeAnswer=DZHK.Answer;
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

//factory pattern;
DZHK.AnswerFactory=function(){};
DZHK.AnswerFactory.prototype.answerClass=DZHK.TextAnswer;
DZHK.AnswerFactory.prototype.createAnswerClass=function(question){
	switch(question.type){
		case "date":
			this.answerClass=DZHK.DateAnswer;
		break;
		case "dateTime":
			this.answerClass=DZHK.DateTimeAnswer;
		break;

		default:
			console.log("unsupported answer type");
	}
	return new this.answerClass(question);
};
