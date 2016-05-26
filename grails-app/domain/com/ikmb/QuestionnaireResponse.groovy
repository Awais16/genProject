package com.ikmb

class QuestionnaireResponse {

	UserQuestionnaire userQuestionnaire

	int status

    String data
	Date lastUpdated
  	Date dateCreated

    static constraints = {
    }

    static mapping={
    	columns {
	      	data type: 'text'
    	}
    }

}
