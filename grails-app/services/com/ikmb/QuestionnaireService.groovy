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

		def getUserQuestionnaireById(String userQuestionnaireId){
			def user = springSecurityService.isLoggedIn() ?
	            springSecurityService.loadCurrentUser() :
	            null
	    	if (user) {
	    		//Questionnaire questionnaire= Questionnaire.findById(questionnaireId)
	         	def userQuestionnaire= UserQuestionnaire.findByIdAndUser(userQuestionnaireId,user)
	         	return userQuestionnaire
	        }
		}

		def haveAccessToQuestionnaire(String userQuestionnaireId){
			def user = springSecurityService.isLoggedIn() ?
	            springSecurityService.loadCurrentUser() :
	            null
	    	if (user) {
	    		//Questionnaire questionnaire= Questionnaire.findById(questionnaireId)
	         	def questionnaires= UserQuestionnaire.findAllByIdAndUser(userQuestionnaireId,user)
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
	    		def ret= QuestionnaireResponse.findByUserQuestionnaire(userQuestionnaire)
	    		return ret;
	    	}
		}

		def getUserQuestionnaireStatus(String userQuestionnaireId){
			def uqResponse=getUserQuestionnaireResponse(userQuestionnaireId)
			if(uqResponse){
				return [status: true, UQResponse:uqResponse]
			}else{
				return [status: false, error:"response not found"]
			}
		}

		def saveQuestionnaireResponse(QuestionnaireResponse qr){			
			def user = springSecurityService.isLoggedIn() ?
	            springSecurityService.loadCurrentUser() :
	            null
	    	if (user && qr) {
	    		//if have access to that userQuestionnaire. Valid for one copy of same quesionnaire for timebeing
	    		def userQuestionnaire=UserQuestionnaire.findByIdAndUser(qr.userQuestionnaire.id,user)
	    		def existingResponse= QuestionnaireResponse.findByUserQuestionnaire(userQuestionnaire)
	    		
	    		//check if already exists a response
	    		if(existingResponse){
	    			
	    			//already submitted can't edit anymore
		    		if(existingResponse.status==3){ 
		    			return [saved:false,error:message(code:"ikmb.service.questionnaire.alread-submitted")]
		    		}
	    			//response for this userquestionnaire already exists
	    			existingResponse.status=qr.status
	    			existingResponse.data=qr.data
	    			existingResponse.resumeFromGroup=qr.resumeFromGroup
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
					    return [saved:false,error:message(code:"ikmb.service.questionnaire.response-not-saved")]
					}else{
						return [saved:true,questionnaireResponse:ret]
					}
	    		}else{
	    			return [saved:false,error:message(code:"ikmb.service.questionnaire.not-found")]
	    		}
	    	}else{
	    		return [saved:false,error:message(code:"ikmb.service.questionnaire.not-found")]
	    	}
		}

	    def serviceMethod() {

	    }
	}
