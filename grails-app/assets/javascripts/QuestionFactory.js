/**
* for creating different type of questionnaire ui;
**/

var DZHK = DZHK || {};

DZHK.Answer=function(question){
	this.question=question;
};

DZHK.Answer.prototype.question={};
DZHK.Answer.prototype.generateUI=function(){
	return "<div>This is default answer ui</div>";
};

DZHK.Answer.prototype.saveAnswer=function(){
	alert("Implement a sub class");
};

DZHK.TextAnswer=DZHK.Answer;
DZHK.DateAnswer=DZHK.Answer;
DZHK.DateTimeAnswer=DZHK.Answer;


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
	}
	return new this.answerClass(question);
};