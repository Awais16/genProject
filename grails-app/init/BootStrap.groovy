import com.ikmb.SecRole
import com.ikmb.SecUser
import com.ikmb.SecUserSecRole
import com.ikmb.Questionnaire

class BootStrap {

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
		SecUserSecRole.withSession {
			it.flush()
			it.clear()
    	}

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


    	def questionnaire= new Questionnaire(name:"SF1",type: 0, data:"{\"question\":\"whatever\"}",identifier: "questionnaire1");
    	questionnaire.save();
    	new Questionnaire(name:"SF2",type: 0, data:"{\"question\":\"whatever json\"}",identifier: "questionnaire2").save();
    	

    }
    def destroy = {
    }
}
