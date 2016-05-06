import com.ikmb.SecRole
import com.ikmb.SecUser
import com.ikmb.SecUserSecRole
import com.ikmb.Questionnaire
import com.ikmb.UserQuestionnaire

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


    	String qJson= '{"resourceType":"Questionnaire","id":"DZHK-OMICS-Studie-Fragebogen","language":"de","text":{"status":"generated","div":"<div>Todo</div>"},"identifier":[{"use":"official","value":"DZHK",}],"version":"1.0","status":"draft","date":"2016-05-03","publisher":"http://ikmb.uni-kiel.de","telecom":[{"system":"email","value":"f.schrinner@ikmb.uni-kiel.de",}],"subjectType":["Patient"],"contained":[{"resourceType":"ValueSet","id":"v2-0136","meta":{"profile":["http://hl7.org/fhir/StructureDefinition/valueset-shareable-definition"]},"text":{"status":"additional","div":"<div>!-- Snipped for Brevity --></div>"},"url":"http://hl7.org/fhir/ValueSet/v2-0136","version":"2.8.2","name":"v2 Yes/no Indicator","status":"active","experimental":true,"publisher":"HL7, Inc","contact":[{"telecom":[{"system":"other","value":"http://hl7.org"}]}],"description":"FHIR Value set/code system definition for HL7 v2 table 0136 ( Yes/no Indicator)","codeSystem":{"extension":[{"url":"http://hl7.org/fhir/StructureDefinition/valueset-oid","valueUri":"urn:oid:n/a"}],"system":"http://hl7.org/fhir/v2/0136","caseSensitive":false,"concept":[{"code":"N","display":"Nein",},{"code":"Y","display":"Ja",}]}}],"group":{"linkId":"root","text":"Herzlich Willkomen! Wir freuen uns darüber, dass Sie an unserer Studie teilnehmen.","required":true,"repeats":false,"group":[{"linkId":"B1","title":"Heutiges Datum und Probenentnahme","text":"","required":true,"repeats":false,"question":[{"linkId":"1","text":"Heutiges Datum","type":"date","required":true,"repeats":false,},{"linkId":"2","text":"Datum und Uhrzeit der Stuhlprobenentnahme","type":"dateTime","required":true,"repeats":false,}]},{"linkId":"B2","title":"Allgemeines","text":"Zu beginn haben wir einige allgemeine Fragen zu ihrer Person.","required":true,"repeats":false,"question":[{"extension":[{"url":"http://hl7.org/fhir/StructureDefinition/questionnaire-questionControl","valueCodeableConcept":{"coding":[{"system":"https://www.hl7.org/fhir/valueset-questionnaire-question-control.html","code":"radio-button","display":"Radio Button",}],"text":"radio-button"}},{"url":"http://hl7.org/fhir/StructureDefinition/questionnaire-choiceOrientation","valueCode":"horizontal"}],"linkId":"3","text":"Geschlecht:","type":"choice","required":true,"repeats":false,"option":[{"code":"w","display":"weiblich"},{"code":"m","display":"männllich"}],},{"linkId":"4","text":"Geburtsdatum:","type":"date","required":true,"repeats":false,},{"extension":[{"url":"http://hl7.org/fhir/StructureDefinition/minValue","valueInteger":50},{"url":"http://hl7.org/fhir/StructureDefinition/maxValue","valueInteger":300},{"url":"http://hl7.org/fhir/StructureDefinition/questionnaire-units","valueString":"cm"}],"concept":[],"linkId":"5","text":"Körpergröße (cm):","type":"integer","required":true,"repeats":false,}{"extension":[{"url":"http://hl7.org/fhir/StructureDefinition/minValue","valueInteger":30},{"url":"http://hl7.org/fhir/StructureDefinition/maxValue","valueInteger":500},{"url":"http://hl7.org/fhir/StructureDefinition/questionnaire-units","valueString":"kg"}],"linkId":"6","text":"Körpergewicht (kg):","type":"integer","required":true,"repeats":false,},{"linkId":"7","text":"Welchen höchsten allgemeinbildenden Schulabschluss haben Sie?","type":"choice","required":true,"repeats":false,"extension":[{"url":"http://hl7.org/fhir/StructureDefinition/questionnaire-questionControl","valueCodeableConcept":{"coding":[{"system":"https://www.hl7.org/fhir/valueset-questionnaire-question-control.html","code":"radio-button","display":"Radio Button",}],"text":"radio-button"}}],"option":[{"code":"Ich gehe noch zur Schule","display":"Ich gehe noch zur Schule"},{"code":"Volks-/Hauptschulabschluss (bzw.9.Klasse)","display":"Volks-/Hauptschulabschluss (bzw.9.Klasse)"},{"code":"Realschulabschluss/mittlere Reife (bzw. 10. Klasse)","display":"Realschulabschluss/mittlere Reife (bzw. 10. Klasse)"},{"code":"Fachhochschulreife","display":"Fachhochschulreife"},{"code":"Hochschulreife/Abitur","display":"Hochschulreife/Abitur"},{"code":"Ich habe keinen Schulabschluss","display":"Ich habe keinen Schulabschluss"}]}{"linkId":"8","text":"Welchen beruflichen Ausbildungsabschluss haben Sie? (Mehrfachantworten möglich)","type":"choice","required":true,"repeats":false,"extension":[{"url":"http://hl7.org/fhir/StructureDefinition/questionnaire-questionControl","valueCodeableConcept":{"coding":[{"system":"https://www.hl7.org/fhir/valueset-questionnaire-question-control.html","code":"check-box","display":"Check-box",}],"text":"check-box"}}],"option":[{"code":"Betriebliche Berufsausbildung (Lehre, Facharbeiterausbildung)","display":"Betriebliche Berufsausbildung (Lehre, Facharbeiterausbildung)"},{"code":"Berufsfach-/Handels-/Fachschulabschluss","display":"Berufsfach-/Handels-/Fachschulabschluss"},{"code":"Fachhochschulabschluss","display":"Fachhochschulabschluss"},{"code":"Universitäts-/Hochschulabschluss","display":"Universitäts-/Hochschulabschluss"},{"code":"keinen beruflichen Abschluss","display":"keinen beruflichen Abschluss"},{"code":"Noch in beruflicher Ausbildung","display":"Noch in beruflicher Ausbildung"},{"code":"Noch im Studium","display":"Noch im Studium"}]}{"linkId":"9","text":"Sind Sie zurzeit erwerbstätig?","type":"open-choice","required":true,"repeats":false,"extension":[{"url":"http://hl7.org/fhir/StructureDefinition/questionnaire-questionControl","valueCodeableConcept":{"coding":[{"system":"https://www.hl7.org/fhir/valueset-questionnaire-question-control.html","code":"radio-button","display":"Radio Button",}],"text":"radio-button"}}],"option":[{"code":"Vollzeit","display":"Vollzeit"},{"code":"Teilzeit/stundenweise","display":"Teilzeit/stundenweise"},{"code":"Rentner/Frührentner","display":"Rentner/Frührentner"},{"code":"Arbeitslos/arbeitssuchend","display":"Arbeitslos/arbeitssuchend"},{"code":"Hausfrau/Hausmann/Erziehungsurlaub","display":"Hausfrau/Hausmann/Erziehungsurlaub"},{"code":"other","display":"sonstiges"}]}{"linkId":"10","text":"Welcher Art ist Ihre körperliche Aktivität in Schule/Ausbildung/Beruf?","type":"choice","required":true,"repeats":false,"extension":[{"url":"http://hl7.org/fhir/StructureDefinition/questionnaire-questionControl","valueCodeableConcept":{"coding":[{"system":"https://www.hl7.org/fhir/valueset-questionnaire-question-control.html","code":"radio-button","display":"Radio Button",}],"text":"radio-button"}}],"option":[{"code":"vorwiegend sitzende Tätigkeit","display":"vorwiegend sitzende Tätigkeit"},{"code":"vorwiegend stehende Tätigkeit","display":"vorwiegend stehende Tätigkeit"}]}{"linkId":"11","text":"Welches Ausmaß hat Ihre körperliche Aktivität in Schule/Ausbildung/Beruf?","type":"choice","required":true,"repeats":false,"extension":[{"url":"http://hl7.org/fhir/StructureDefinition/questionnaire-questionControl","valueCodeableConcept":{"coding":[{"system":"https://www.hl7.org/fhir/valueset-questionnaire-question-control.html","code":"radio-button","display":"Radio Button",}],"text":"radio-button"}}],"option":[{"code":"schwere bis mittelschwere Tätigkeit","display":"schwere bis mittelschwere Tätigkeit"},{"code":"leichte körperliche Tätigkeit","display":"leichte körperliche Tätigkeit"}{"code":"keine nennenswerte körperliche Tätigkeit","display":"keine nennenswerte körperliche Tätigkeit"}]}{"linkId":"12","text":"Wie leben Sie?","type":"open-choice","required":true,"repeats":false,"extension":[{"url":"http://hl7.org/fhir/StructureDefinition/questionnaire-questionControl","valueCodeableConcept":{"coding":[{"system":"https://www.hl7.org/fhir/valueset-questionnaire-question-control.html","code":"radio-button","display":"Radio Button",}],"text":"radio-button"}}],"option":[{"code":"allein","display":"allein"},{"code":"in fester Partnerschaft / verheiratet / WG","display":"Teilzeit/stundenweise"},{"code":"other","display":"sonstiges"}]}{"linkId":"13","text":"Sind Sie in Deutschland geboren?","type":"choice","required":true,"repeats":false,"options":{"reference":"#v2-0136"},"group":[{"extension":[{"extension":[{"url":"question","valueString":"13"},{"url":"answer","valueCoding":{"system":"http://hl7.org/fhir/v2/0136","code":"N","display":"Nein"}}],"url":"http://hl7.org/fhir/StructureDefinition/questionnaire-enableWhen"}],"linkId":"13/1/","required":"true","question":[{"linkId":"13/1/1","text":"Wenn nicht in Deutschland, in welchem Land sind Sie geboren?","type":"string","required":true,"repeate":false}]}]}]}]}}';

    	def q=new Questionnaire(name:"DZHK",type: 0, data:qJson,identifier: "DZHK-OMICS-Studie-Fragebogen")
        q.save()

        def userQuestionnaire= new UserQuestionnaire(user:adminUser,questionnaire:q);
        userQuestionnaire.save()

    }
    def destroy = {
    }
}
