package com.ikmb

import grails.plugin.springsecurity.annotation.Secured

@Secured(['ROLE_ADMIN', 'ROLE_PARTICIPANTS'])
class DashboardController {
    def index() { }
}
