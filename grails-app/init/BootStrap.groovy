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

		def adminUser = new SecUser('admin', 'admin-ikmb786').save()
		//def staffUser = new SecUser('staff', 'staff').save()
		def participantUser = new SecUser('user', 'user-ikmb453').save()

		SecUserSecRole.create adminUser, adminRole
		//SecUserSecRole.create staffUser, staffRole
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

//        def q1FilePath= "resources/genome_motivation_questionnaire.min.json"
//        def q2FilePath = "resources/genome_questionnaire.min.json"
//        
//        def q1Json = grailsApplication.getParentContext().getResource("classpath:$q1FilePath").getInputStream().getText()
//        def q2Json = grailsApplication.getParentContext().getResource("classpath:$q2FilePath").getInputStream().getText()
//
//        def q1=new Questionnaire(name:"Motiviation Questionnaire",type: 0, data:q1Json ,identifier: "Motiviation questionnaire")
//        q1.save()
//    	
//        def q2=new Questionnaire(name:"DZHK-OMICS-Studie-Fragebogen",type: 0, data:q2Json ,identifier: "DZHK-OMICS-Studie-Fragebogen")
//        q2.save()
//
        //add it for admin
//        def userQuestionnaire= new UserQuestionnaire(user:adminUser,questionnaire:q1);
//        userQuestionnaire.save()
//        userQuestionnaire= new UserQuestionnaire(user:adminUser,questionnaire:q2);
//        userQuestionnaire.save()

        //load users
        def filePath= "resources/DIfE-Zugangscodes.csv"
        def userData=grailsApplication.getParentContext().getResource("classpath:$filePath").getInputStream()
        userData.eachCsvLine { tokens -> 
        
            //generate all the users and assign them participant roles
            def pUser= new SecUser(tokens[2],tokens[3])
            pUser.save()
            SecUserSecRole.create pUser, participantRole

            //assign them above questionnaire
            //userQuestionnaire= new UserQuestionnaire(user:pUser,questionnaire:q1);
            //userQuestionnaire.save()
            //userQuestionnaire= new UserQuestionnaire(user:pUser,questionnaire:q2);
            //userQuestionnaire.save()

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
