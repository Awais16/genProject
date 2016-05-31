import com.ikmb.SecRole
import com.ikmb.SecUser
import com.ikmb.SecUserSecRole
import com.ikmb.Questionnaire
import com.ikmb.UserQuestionnaire

import org.grails.plugins.csv.*

class BootStrap {

    def grailsApplication

    def init = { servletContext ->
    	def adminRole = new SecRole('ROLE_ADMIN').save()
    	def participantRole = new SecRole('ROLE_PARTICIPANTS').save()
    	def staffRole = new SecRole('ROLE_STAFF').save()

		def adminUser = new SecUser('admin', 'admin').save()
		def staffUser = new SecUser('staff', 'staff').save()
		def participantUser = new SecUser('user', 'user').save()

		SecUserSecRole.create adminUser, adminRole
		SecUserSecRole.create staffUser, staffRole
		SecUserSecRole.create participantUser, participantRole
		

    	//if request map is enabled in application.groovy
    	//initalizing security requestmap rules
  	
  	 //   	for (String url in [
	 //      '/', '/error', '/index', '/index.gsp', '/**/favicon.ico', '/shutdown',
	 //      '/assets/**', '/**/js/**', '/**/css/**', '/**/images/**',
	 //      '/login', '/login.*', '/login/*',
	 //      '/logout', '/logout.*', '/logout/*']) {
	 //   		new Requestmap(url: url, configAttribute: 'permitAll').save()
		// }
		// new Requestmap(url: '/dashboard/**',    configAttribute: 'IS_AUTHENTICATED_REMEMBERED').save()


        def filePath = "resources/genome_questionnaire.min.json"
        def qJson = grailsApplication.getParentContext().getResource("classpath:$filePath").getInputStream().getText()
    	
        def q=new Questionnaire(name:"DZHK v4",type: 0, data:qJson ,identifier: "DZHK-OMICS-Studie-Fragebogen");
        q.save()

        def userQuestionnaire= new UserQuestionnaire(user:adminUser,questionnaire:q);
        userQuestionnaire.save()

        //load users
        filePath= "resources/DIfE-Zugangscodes.csv"
        def userData=grailsApplication.getParentContext().getResource("classpath:$filePath").getInputStream()
        userData.eachCsvLine { tokens -> 
        
            //generate all the users and assign them participant roles
            def pUser= new SecUser(tokens[2],tokens[3])
            pUser.save()
            SecUserSecRole.create pUser, participantRole

            //assign them above questionnaire
            userQuestionnaire= new UserQuestionnaire(user:pUser,questionnaire:q);
            userQuestionnaire.save()
        }

        //flushing all ?
        SecUserSecRole.withSession {
            it.flush()
            it.clear()
        }

    }

    def destroy = {
    }
}
