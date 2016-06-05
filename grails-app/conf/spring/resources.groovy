// Place your Spring DSL code here
beans = {
	// de locale by default
	localeResolver(org.springframework.web.servlet.i18n.SessionLocaleResolver) {
      defaultLocale = new Locale("de","DE")
      java.util.Locale.setDefault(defaultLocale)
   }
}
