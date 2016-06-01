<%@ page import="com.ikmb.QuestionnaireService" %>
<%
    def questionnaireService = grailsApplication.classLoader.loadClass('com.ikmb.QuestionnaireService').newInstance()
%>
<html>
	<head>
		<title>Questionnaires</title>
		<meta name="layout" content="main-lte" />
		<asset:stylesheet src="questionnaire.css"/>
		</head>
		<body>
			<div class="box box-default" style="margin-top: 10px">
				<div class="box-header with-border">
					<h3 class="box-title">Questionnaire Overview</h3>
					<a class="questionnaire_help" data-toggle="modal" data-target="#myModal" href="#">
						<i class="fa fa-question"> help</i>
					</a>
					<div class="float_clear"></div>
					
				<div class="box-body">

					<g:if test="${questionnaires.size()>0}">

					<br/>
					<table class="table table-striped table-hover">
						<tbody>
							<tr>
								<th> Name </th>
								<th> Available Since </th>
								<th> </th>
							</tr>
							<g:each in="${questionnaires}" var="q">
								<tr>
									<td>${q.questionnaire.name}</td>
									<td class='moment-since'>${q.dateCreated}</td>
									<td>
										<a class="btn btn-primary" href="<g:createLink action='status' id='${q.questionnaire.id}'></g:createLink>">details</a>
									</td>
								</tr>
							</g:each>

						</tbody>
					</table>
					</g:if>
					<g:else>
						<p>
						In den nächsten Tagen werden hier die Fragebögen für Sie erscheinen. Den Link zum Ernährungsfragebogen finden Sie oben in der Navigationsleiste.
						</p>

					</g:else>					
				</div>
				<!-- /.box-body -->
			</div>

			<!-- Help modal -->
			<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
							<h4 class="modal-title" id="myModalLabel">Help <i class="fa fa-question"></i></h4>
						</div>
						<div class="modal-body">
							List of questionnaires that you can fill will be available here.
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
			</div>
		</body>
	</html>