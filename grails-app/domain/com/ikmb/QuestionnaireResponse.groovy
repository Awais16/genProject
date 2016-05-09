package com.ikmb

class QuestionnaireResponse {

	Questionnaire questionnaire
	
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
