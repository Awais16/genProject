package com.ikmb

import grails.plugin.springsecurity.annotation.Secured

@Secured(['ROLE_PARTICIPANTS'])
class QuestionnaireController {

    def index() { }


    def list(){}
}
