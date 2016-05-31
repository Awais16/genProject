import grails.plugin.springsecurity.SecurityConfigType

// Added by the Spring Security Core plugin:
grails.plugin.springsecurity.userLookup.userDomainClassName = 'com.ikmb.SecUser'
grails.plugin.springsecurity.userLookup.authorityJoinClassName = 'com.ikmb.SecUserSecRole'
grails.plugin.springsecurity.authority.className = 'com.ikmb.SecRole'
grails.plugin.springsecurity.logout.postOnly = false

grails.plugin.springsecurity.auth.loginFormUrl = '/'
grails.plugin.springsecurity.successHandler.defaultTargetUrl = '/dashboard/'
grails.plugin.springsecurity.failureHandler.defaultFailureUrl = '/?error=Unable to login, please try again'

// grails.plugin.springsecurity.rejectIfNoRule = true
// grails.plugin.springsecurity.fii.rejectPublicInvocations = false

// grails.plugin.springsecurity.controllerAnnotations.staticRules = [
// 	[pattern: '/',               access: ['permitAll']],
// 	[pattern: '/error',          access: ['permitAll']],
// 	[pattern: '/index',          access: ['permitAll']],
// 	[pattern: '/index.gsp',      access: ['permitAll']],
// 	[pattern: '/shutdown',       access: ['permitAll']],
// 	[pattern: '/assets/**',      access: ['permitAll']],
// 	[pattern: '/**/js/**',       access: ['permitAll']],
// 	[pattern: '/**/css/**',      access: ['permitAll']],
// 	[pattern: '/**/images/**',   access: ['permitAll']],
// 	[pattern: '/**/favicon.ico', access: ['permitAll']],
// 	[pattern: '/dbconsole/**', access: ['permitAll']]
// ]

// grails.plugin.springsecurity.filterChain.chainMap = [
// 	[pattern: '/assets/**',      filters: 'none'],
// 	[pattern: '/**/js/**',       filters: 'none'],
// 	[pattern: '/**/css/**',      filters: 'none'],
// 	[pattern: '/**/images/**',   filters: 'none'],
// 	[pattern: '/**/favicon.ico', filters: 'none'],
// 	[pattern: '/**',             filters: 'JOINED_FILTERS']
// ]

grails.plugin.springsecurity.securityConfigType = SecurityConfigType.InterceptUrlMap
grails.plugin.springsecurity.interceptUrlMap = [
	[pattern: '/',               access: ['permitAll']],
   [pattern: '/error',          access: ['permitAll']],
   [pattern: '/index',          access: ['permitAll']],
   [pattern: '/index.gsp',      access: ['permitAll']],
   [pattern: '/shutdown',       access: ['permitAll']],
   [pattern: '/assets/**',      access: ['permitAll']],
   [pattern: '/**/js/**',       access: ['permitAll']],
   [pattern: '/**/css/**',      access: ['permitAll']],
   [pattern: '/**/images/**',   access: ['permitAll']],
   [pattern: '/**/favicon.ico', access: ['permitAll']],
   [pattern: '/login/**',       access: ['permitAll']],
   [pattern: '/logout/**',      access: ['permitAll']],

	  [pattern: '/dashboard/**', access: ['IS_AUTHENTICATED_REMEMBERED']],

    [pattern: '/questionnaire/home/**', access:['ROLE_PARTICIPANTS','ROLE_ADMIN']],
    [pattern: '/questionnaire/status/**', access:['ROLE_PARTICIPANTS','ROLE_ADMIN']],
    [pattern: '/questionnaire/fill/**', access:['ROLE_PARTICIPANTS','ROLE_ADMIN']],
    [pattern: '/questionnaireResponse/saveQR/**', access:['ROLE_PARTICIPANTS','ROLE_ADMIN']],

    [pattern: '/questionnaire/**',  access: ['ROLE_ADMIN']],
    [pattern: '/userquestionnaire/**',  access: ['ROLE_ADMIN']],
    [pattern: '/questionnaireresponse/**',  access: ['ROLE_ADMIN']],
    [pattern: '/secuser/**',  access: ['ROLE_ADMIN']],
    [pattern: '/dbconsole/**', access: ['ROLE_ADMIN']]
    
    /*'/person/*':         ['IS_AUTHENTICATED_REMEMBERED'],
    '/post/followAjax':  ['ROLE_USER'],
    '/post/addPostAjax': ['ROLE_USER', 'IS_AUTHENTICATED_FULLY'],
    '/**':               ['IS_AUTHENTICATED_ANONYMOUSLY']*/
]

//grails.plugins.springsecurity.securityConfigType = SecurityConfigType.Requestmap