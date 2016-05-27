package com.ikmb

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

import grails.converters.*

@Transactional(readOnly = true)
class QuestionnaireResponseController {

    def questionnaireService

    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond QuestionnaireResponse.list(params), model:[questionnaireResponseCount: QuestionnaireResponse.count()]
    }

    def show(QuestionnaireResponse questionnaireResponse) {
        respond questionnaireResponse
    }

    def create() {
        respond new QuestionnaireResponse(params)
    }

    @Transactional
    def save(QuestionnaireResponse questionnaireResponse) {
        if (questionnaireResponse == null) {
            transactionStatus.setRollbackOnly()
            notFound()
            return
        }

        if (questionnaireResponse.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond questionnaireResponse.errors, view:'create'
            return
        }

        questionnaireResponse.save flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.created.message', args: [message(code: 'questionnaireResponse.label', default: 'QuestionnaireResponse'), questionnaireResponse.id])
                redirect questionnaireResponse
            }
            '*' { respond questionnaireResponse, [status: CREATED] }
        }
    }

    def edit(QuestionnaireResponse questionnaireResponse) {
        respond questionnaireResponse
    }

    @Transactional
    def update(QuestionnaireResponse questionnaireResponse) {
        if (questionnaireResponse == null) {
            transactionStatus.setRollbackOnly()
            notFound()
            return
        }

        if (questionnaireResponse.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond questionnaireResponse.errors, view:'edit'
            return
        }

        questionnaireResponse.save flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.updated.message', args: [message(code: 'questionnaireResponse.label', default: 'QuestionnaireResponse'), questionnaireResponse.id])
                redirect questionnaireResponse
            }
            '*'{ respond questionnaireResponse, [status: OK] }
        }
    }

    @Transactional
    def delete(QuestionnaireResponse questionnaireResponse) {

        if (questionnaireResponse == null) {
            transactionStatus.setRollbackOnly()
            notFound()
            return
        }

        questionnaireResponse.delete flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.deleted.message', args: [message(code: 'questionnaireResponse.label', default: 'QuestionnaireResponse'), questionnaireResponse.id])
                redirect action:"index", method:"GET"
            }
            '*'{ render status: NO_CONTENT }
        }
    }

    protected void notFound() {
        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.not.found.message', args: [message(code: 'questionnaireResponse.label', default: 'QuestionnaireResponse'), params.id])
                redirect action: "index", method: "GET"
            }
            '*'{ render status: NOT_FOUND }
        }
    }

    def test(){
        render "just a test dude!"
    }

    def saveQR(QuestionnaireResponse questionnaireResponse){
        def resp=questionnaireService.saveQuestionnaireResponse(questionnaireResponse);
        render resp as JSON
    }
}
