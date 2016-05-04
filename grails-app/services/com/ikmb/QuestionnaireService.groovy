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

		def haveAccessToQuestionnaire(String questionnaireId){
			def user = springSecurityService.isLoggedIn() ?
	            springSecurityService.loadCurrentUser() :
	            null
	    	if (user) {

	    		Questionnaire questionnaire= Questionnaire.findById(questionnaireId)
	         	def questionnaires= UserQuestionnaire.findAllByUserAndQuestionnaire(user,questionnaire)
	         	if(questionnaires.size()>0){
	         		return true
	         	}
	        }
	        return false
		}

	    def serviceMethod() {

	    }
	}
