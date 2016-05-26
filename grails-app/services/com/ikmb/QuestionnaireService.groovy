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

		def getUserQuestionnaireById(String questionnaireId){
			def user = springSecurityService.isLoggedIn() ?
	            springSecurityService.loadCurrentUser() :
	            null
	    	if (user) {
	    		Questionnaire questionnaire= Questionnaire.findById(questionnaireId)
	         	def userQuestionnaire= UserQuestionnaire.findByUserAndQuestionnaire(user,questionnaire)
	         	return userQuestionnaire
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

		def getUserQuestionnaireResponse(String userQuestionnaireId){
			def user = springSecurityService.isLoggedIn() ?
	            springSecurityService.loadCurrentUser() :
	            null
	    	if (user) {
	    		def userQuestionnaire=UserQuestionnaire.findById(userQuestionnaireId);
	    		return QuestionnaireResponse.findByUserQuestionnaire(userQuestionnaire)
	    	}
		}

		def saveQuestionnaireResponse(QuestionnaireResponse qr){
			def user = springSecurityService.isLoggedIn() ?
	            springSecurityService.loadCurrentUser() :
	            null
	    	if (user) {
	    		def userQuestionnaire=UserQuestionnaire.findByIdAndUser(qr.userQuestionnaire.id,user);
	    		if(userQuestionnaire){
	    			def ret=qr.save(flush:true)
	    			if (!ret) {
					    ret.errors.each {
					        println it
					    }
					    return [saved:false,error:" Unable to save the response"]
					}else{
						return [saved:true,questoinnaireResponse:ret]
					}

	    		}else{
	    			return [saved:false,error:" Unable to get this user questionnaire."]
	    		}
	    	}
		}

	    def serviceMethod() {

	    }
	}
