<html>
	<head>
		<title>Questionnaires</title>
		<meta name="layout" content="main-lte" />
		<asset:stylesheet src="questionnaire.css"/>
		</head>
		<body>
			<div class="box box-default" style="margin-top: 10px">
				<div class="box-header with-border">
					<h3 class="box-title"><b>${userQuestionnaire.questionnaire.name}</b></h3>
					<a class="questionnaire_help" data-toggle="modal" data-target="#myModal" href="#">
						<i class="fa fa-question"> help</i>
					</a>
					<div class="float_clear"></div>
				<div class="box-body">
					<div class="row">
						<div class="col-md-10">
							<table class="table table-hover">
								<tr>
									<th>Name</th>
									<td>${userQuestionnaire.questionnaire.name}</td>
								</tr>
								<tr>
									<th>identifier</th>
									<td>${userQuestionnaire.questionnaire.identifier}</td>
								</tr>
								<tr>
									<th>Available since</th>
									<td class='moment-since'>${userQuestionnaire.dateCreated}</td>
								</tr>
								<tr>
									<th>Status</th>
									
									<g:if test="${uqResponse.status==true}">
										<g:if test="${uqResponse.UQResponse.status==0}">
											<td>Not started yet</td>
										</g:if>
										<g:elseif test="${uqResponse.UQResponse.status==1}">
											<td class='bg-gray'>in progress</td><td>last updated: <span class='moment-since '>${uqResponse.UQResponse.lastUpdated}</span></td>
										</g:elseif>
										<g:elseif test="${uqResponse.UQResponse.status==2}">
											<td class='bg-aqua'>completed, not submitted</td><td>completed : <span class='moment-since'>${uqResponse.UQResponse.lastUpdated}</span></td>
										</g:elseif>
										<g:elseif test="${uqResponse.UQResponse.status==3}">
											<td class='bg-success'>submitted</td><td>submitted: <span class='moment-since'>${uqResponse.UQResponse.lastUpdated}</span></td>
										</g:elseif>
									</g:if>
									<g:else>
										<td class='bg-warning'>Not started yet</td>
									</g:else>
								</tr>
								<tr>
									<td colspan="3">questonnaire group details here</td>
								</tr>
							</table>
						</div>
					</div>
				</div>
				<!-- /.box-body -->
				<div class="box-footer">
					<g:if test="${uqResponse.status==true}">
						<g:if test="${uqResponse.UQResponse.status==0}">
							<a class="btn btn-primary" href="<g:createLink action='fill' id='${qid}'></g:createLink>">Start Filling</a>
						</g:if>
						<g:elseif test="${uqResponse.UQResponse.status==1}">
							<a class="btn btn-primary" href="<g:createLink action='fill' id='${qid}'></g:createLink>">Resume</a>
						</g:elseif>
						<g:elseif test="${uqResponse.UQResponse.status==2}">
							<a class="btn btn-primary" href="<g:createLink action='fill' id='${qid}'></g:createLink>">Edit</a>
							<a class="btn btn-success" href="<g:createLink action='fill' id='${qid}'></g:createLink>">Submit</a>
						</g:elseif>
						<g:elseif test="${uqResponse.UQResponse.status==3}">
							
						</g:elseif>
					</g:if>
					<g:else>
						<a class="btn btn-primary" href="<g:createLink action='fill' id='${qid}'></g:createLink>">Start Filling</a>
					</g:else>

					
				</div>
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
							Help information goes here
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
			</div>
		</body>
	</html>