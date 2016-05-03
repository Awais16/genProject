	package com.ikmb

	import grails.transaction.Transactional

	@Transactional
	class QuestionnaireService {
		def springSecurityService
		def getUserQuestionnaires(){
			def user = springSecurityService.isLoggedIn() ?
	            springSecurityService.loadCurrentUser() :
	            null
	    	if (user) {
	         	return UserQuestionnaire.findAllByUser(user)
	        }
		
		}

	    def serviceMethod() {

	    }
	}
