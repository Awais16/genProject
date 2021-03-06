package com.ikmb

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional
import grails.converters.*
import grails.plugin.springsecurity.annotation.Secured


@Transactional(readOnly = true)


class QuestionnaireController {

    def questionnaireService
    
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Questionnaire.list(params), model:[questionnaireCount: Questionnaire.count()]
    }

    def show(Questionnaire questionnaire) {
        respond questionnaire
    }

    def create() {
        respond new Questionnaire(params)
    }

    @Transactional
    def save(Questionnaire questionnaire) {
        if (questionnaire == null) {
            transactionStatus.setRollbackOnly()
            notFound()
            return
        }

        if (questionnaire.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond questionnaire.errors, view:'create'
            return
        }

        questionnaire.save flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.created.message', args: [message(code: 'questionnaire.label', default: 'Questionnaire'), questionnaire.id])
                redirect questionnaire
            }
            '*' { respond questionnaire, [status: CREATED] }
        }
    }

    def edit(Questionnaire questionnaire) {
        respond questionnaire
    }

    @Transactional
    def update(Questionnaire questionnaire) {
        if (questionnaire == null) {
            transactionStatus.setRollbackOnly()
            notFound()
            return
        }

        if (questionnaire.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond questionnaire.errors, view:'edit'
            return
        }

        questionnaire.save flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.updated.message', args: [message(code: 'questionnaire.label', default: 'Questionnaire'), questionnaire.id])
                redirect questionnaire
            }
            '*'{ respond questionnaire, [status: OK] }
        }
    }

    @Transactional
    def delete(Questionnaire questionnaire) {

        if (questionnaire == null) {
            transactionStatus.setRollbackOnly()
            notFound()
            return
        }

        questionnaire.delete flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.deleted.message', args: [message(code: 'questionnaire.label', default: 'Questionnaire'), questionnaire.id])
                redirect action:"index", method:"GET"
            }
            '*'{ render status: NO_CONTENT }
        }
    }

    protected void notFound() {
        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.not.found.message', args: [message(code: 'questionnaire.label', default: 'Questionnaire'), params.id])
                redirect action: "index", method: "GET"
            }
            '*'{ render status: NOT_FOUND }
        }
    }

    def home(){
        def userquestionnaires=questionnaireService.getUserQuestionnaires()
        def username=questionnaireService.getLoggedInUserName()
        render(view:"home", model:[questionnaires: userquestionnaires,username:username])
    }

    def status(){
        // flash.message="questionnaire status goes here"
        // flash.type="alert-success"
        // flash.title="Questionnaire Status"
        if(!params.id){
            flash.message=message(code:"ikmb.controller.questionnaire.no-access-msg")
            flash.type="alert-warning"
            flash.title="No Access"
            redirect(controller:"questionnaire",action:"home")
            return
        }else{
            def userQuestionnaire=questionnaireService.getUserQuestionnaireById(params.id)
            if(userQuestionnaire){
                def uqStatus=questionnaireService.getUserQuestionnaireStatus(params.id)
                //def q=[uqResponse:uqStatus,userQuestionnaire:userQuestionnaire]
                //render q as JSON
                def username=questionnaireService.getLoggedInUserName()
                render(view:"status",model:[qid:params.id,uqResponse:uqStatus,userQuestionnaire:userQuestionnaire,username:username])
            }else{
                flash.message=message(code:"ikmb.controller.questionnaire.no-access-msg")
                flash.type="alert-warning"
                flash.title="No Access"
                redirect(controller:"questionnaire",action:"home")
                return
            }
        }
        
    }

    def fill(){
        if(!params.id){
            flash.message=message(code:"ikmb.controller.questionnaire.not-found-msg")
            flash.type="alert-warning"
            flash.title="No Access"
            redirect(controller:"questionnaire",action:"home")
        }else{
            def uq=questionnaireService.getUserQuestionnaireById(params.id)
            if(!uq){
                flash.message=message(code:"ikmb.controller.questionnaire.no-access-msg")
                flash.type="alert-warning"
                flash.title="No Access"
                redirect(controller:"questionnaire",action:"home")
            }

            def uqStatus=questionnaireService.getUserQuestionnaireStatus(params.id)
            def username=questionnaireService.getLoggedInUserName()

            //check response status
            if(uqStatus.status){
                switch(uqStatus.UQResponse.status){
                    case 0:
                        //starting
                        render(view: "fill", model:[qJson:uq.questionnaire.data, qName:uq.questionnaire.name,userQuestId:uq.id,username:username])
                        break
                    case 1:
                        //resume from the group
                        render(view: "fill", model:[qJson:uq.questionnaire.data, qName:uq.questionnaire.name,userQuestId:uq.id,resp:uqStatus.UQResponse,username:username])
                        break
                    case 2:
                        //editing
                        render(view: "fill", model:[qJson:uq.questionnaire.data, qName:uq.questionnaire.name,userQuestId:uq.id,resp:uqStatus.UQResponse,username:username])
                        break
                    case 3:
                        //already submitted
                        flash.message=message(code:"ikmb.service.questionnaire.already-submitted")
                        flash.type="alert-warning"
                        flash.title="Already submitted"
                        redirect(controller:"questionnaire",action:"home")
                        break
                    default:
                        render(view: "fill", model:[qJson:uq.questionnaire.data, qName:uq.questionnaire.name,userQuestId:uq.id,username:username])
                        break
                }
            }else{
                //no response, starting from scratch
                render(view: "fill", model:[qJson:uq.questionnaire.data, qName:uq.questionnaire.name,userQuestId:uq.id,username:username])
            }
            
        }
    }

}
