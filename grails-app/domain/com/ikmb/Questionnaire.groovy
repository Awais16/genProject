package com.ikmb

class Questionnaire {

	String name
	int type
	String identifier
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
