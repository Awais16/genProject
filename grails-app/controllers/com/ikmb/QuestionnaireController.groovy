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
        def questionnaires=questionnaireService.getUserQuestionnaires()
        // println questionnaires as JSON
        render(view:"home", model:[questionnaires: questionnaires])
    }

    def status(){
        flash.message="questionnaire status goes here"
        flash.type="alert-danger"
        flash.title="Questionnaire Status"

        render(view: "status")  
    }

}
