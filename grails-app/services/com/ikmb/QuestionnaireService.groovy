	package com.ikmb

	import grails.transaction.Transactional
	import grails.converters.*

//TODO: cleanup this later

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
	    		def userQuestionnaire=UserQuestionnaire.findById(userQuestionnaireId)
	    		//println userQuestionnaire as JSON
	    		def ret= QuestionnaireResponse.findByUserQuestionnaire(userQuestionnaire)
	    		return ret;
	    	}
		}

		def saveQuestionnaireResponse(QuestionnaireResponse qr){			
			def user = springSecurityService.isLoggedIn() ?
	            springSecurityService.loadCurrentUser() :
	            null
	    	if (user && qr) {
	    		//if have access to that userQuestionnaire. Valid for one copy of same quesionnaire for timebeing
	    		def userQuestionnaire=UserQuestionnaire.findByIdAndUser(qr.userQuestionnaire.id,user);
	    		def existingResponse= QuestionnaireResponse.findByUserQuestionnaire(userQuestionnaire);
	    		
	    		//check if already exists a response
	    		if(existingResponse){
	    			//response for this userquestionnaire already exists
	    			existingResponse.status=qr.status
	    			existingResponse.data=qr.data
	    			existingResponse.userQuestionnaire=qr.userQuestionnaire
	    			qr= existingResponse
	    		}

	    		//else it will create new record
	    		if(userQuestionnaire){
	    			def ret=qr.save(flush:true)
	    			if (!ret) {
					    ret.errors.each {
					        println it
					    }
					    return [saved:false,error:" Unable to save the response"]
					}else{
						return [saved:true,questionnaireResponse:ret]
					}
	    		}else{
	    			return [saved:false,error:" Unable to get this user questionnaire."]
	    		}
	    	}else{
	    		return [saved:false,error:" Unable to get this user questionnaire."]
	    	}
		}

	    def serviceMethod() {

	    }
	}
