import com.ikmb.SecRole
import com.ikmb.SecUser
import com.ikmb.SecUserSecRole
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
    }
    def destroy = {
    }
}
