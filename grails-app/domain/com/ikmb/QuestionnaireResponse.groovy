package com.ikmb

class QuestionnaireResponse {

	UserQuestionnaire userQuestionnaire

	int status //0 not started, 1 started but incomplete, 2 completed, 3 submitted
    
    int resumeFromGroup

    String data
	Date lastUpdated
  	Date dateCreated

    static constraints = {
    }

    static mapping={
    	columns {
	      	data type: 'text'
            resumeFromGroup defaultValue: 0
    	}
    }

}
