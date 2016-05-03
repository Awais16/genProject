package com.ikmb

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class UserQuestionnaireController {

    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond UserQuestionnaire.list(params), model:[userQuestionnaireCount: UserQuestionnaire.count()]
    }

    def show(UserQuestionnaire userQuestionnaire) {
        respond userQuestionnaire
    }

    def create() {
        respond new UserQuestionnaire(params)
    }

    @Transactional
    def save(UserQuestionnaire userQuestionnaire) {
        if (userQuestionnaire == null) {
            transactionStatus.setRollbackOnly()
            notFound()
            return
        }

        if (userQuestionnaire.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond userQuestionnaire.errors, view:'create'
            return
        }

        userQuestionnaire.save flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.created.message', args: [message(code: 'userQuestionnaire.label', default: 'UserQuestionnaire'), userQuestionnaire.id])
                redirect userQuestionnaire
            }
            '*' { respond userQuestionnaire, [status: CREATED] }
        }
    }

    def edit(UserQuestionnaire userQuestionnaire) {
        respond userQuestionnaire
    }

    @Transactional
    def update(UserQuestionnaire userQuestionnaire) {
        if (userQuestionnaire == null) {
            transactionStatus.setRollbackOnly()
            notFound()
            return
        }

        if (userQuestionnaire.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond userQuestionnaire.errors, view:'edit'
            return
        }

        userQuestionnaire.save flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.updated.message', args: [message(code: 'userQuestionnaire.label', default: 'UserQuestionnaire'), userQuestionnaire.id])
                redirect userQuestionnaire
            }
            '*'{ respond userQuestionnaire, [status: OK] }
        }
    }

    @Transactional
    def delete(UserQuestionnaire userQuestionnaire) {

        if (userQuestionnaire == null) {
            transactionStatus.setRollbackOnly()
            notFound()
            return
        }

        userQuestionnaire.delete flush:true

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.deleted.message', args: [message(code: 'userQuestionnaire.label', default: 'UserQuestionnaire'), userQuestionnaire.id])
                redirect action:"index", method:"GET"
            }
            '*'{ render status: NO_CONTENT }
        }
    }

    protected void notFound() {
        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.not.found.message', args: [message(code: 'userQuestionnaire.label', default: 'UserQuestionnaire'), params.id])
                redirect action: "index", method: "GET"
            }
            '*'{ render status: NOT_FOUND }
        }
    }
}
