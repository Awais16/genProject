package com.ikmb

import grails.plugin.springsecurity.annotation.Secured

class DashboardController {
	def questionnaireService
    def index() { 
    	def username=questionnaireService.getLoggedInUserName()
    	render(view: "index" , model:[username:username])
    	
    }
}
