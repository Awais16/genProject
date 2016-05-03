package com.ikmb

class UserQuestionnaire {

	Questionnaire questionnaire

	Date dateCreated

	static belongsTo=SecUser
	static hasMany= [user: SecUser]

}
