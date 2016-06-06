<html>
	<head>
		<title><g:message code="ikmb.main.Questionnaires"/></title>
		<meta name="layout" content="main-lte" />
		<asset:stylesheet src="questionnaire.css"/>
		<asset:javascript src="questionnaire-status.js"/>
		</head>
		<body>
			<br/>
			<div>
			<div class="alert alert-danger alert-dismissible" style="display:none;" id="alert-fail">
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                <h4><i class="icon fa fa-ban"></i> Alert!</h4>
                <span id='alert-fail-msg'>Failed :(</span>
              </div>

             </div>
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
							<table class="table table-hover table-bordered">
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
									%{-- change With switch --}%
									<g:if test="${uqResponse.status==true}">
										<g:if test="${uqResponse.UQResponse.status==0}">
											<td><g:message code="ikmb.status.not-yet-started"/></td>
										</g:if>
										<g:elseif test="${uqResponse.UQResponse.status==1}">
											<td class='bg-gray'><g:message code="ikmb.status.in-progress"/></td><td>last updated: <span class='moment-since '>${uqResponse.UQResponse.lastUpdated}</span></td>
										</g:elseif>
										<g:elseif test="${uqResponse.UQResponse.status==2}">
											<td class='bg-aqua'><g:message code="ikmb.status.completed-not-submitted"/></td><td>completed : <span class='moment-since'>${uqResponse.UQResponse.lastUpdated}</span></td>
										</g:elseif>
										<g:elseif test="${uqResponse.UQResponse.status==3}">
											<td class='bg-success'><g:message code="ikmb.status.submitted"/></td><td>submitted: <span class='moment-since'>${uqResponse.UQResponse.lastUpdated}</span></td>
										</g:elseif>
									</g:if>
									<g:else>
										<td class='bg-warning'><g:message code="ikmb.status.not-yet-started"/></td>
									</g:else>
								</tr>
								<tr>
									<td colspan="3"><h4 class='text-center'><b>Group Details</b></h4></td>
								</tr>
								<tr>
									<td colspan="3" id="questionnaire-details"></td>
								</tr>
							</table>
						</div>
					</div>
				</div>
				<!-- /.box-body -->
				<div class="box-footer">
					%{-- change With switch --}%
					<g:if test="${uqResponse.status==true}">
						<g:if test="${uqResponse.UQResponse.status==0}">
							<a class="btn btn-primary" href="<g:createLink action='fill' id='${qid}'></g:createLink>"><g:message code="ikmb.status.bt.start-filling"/></a>
						</g:if>
						<g:elseif test="${uqResponse.UQResponse.status==1}">
							<a class="btn btn-primary" href="<g:createLink action='fill' id='${qid}'></g:createLink>"><g:message code="ikmb.status.bt.resume"/></a>
						</g:elseif>
						<g:elseif test="${uqResponse.UQResponse.status==2}">
							<a class="btn btn-primary" href="<g:createLink action='fill' id='${qid}'></g:createLink>"><g:message code="ikmb.status.bt.edit"/></a>
							<a class="btn btn-success" href="#" id="bt-status-submit"><g:message code="ikmb.status.bt.submit"/></a>
						</g:elseif>
						<g:elseif test="${uqResponse.UQResponse.status==3}">
							%{-- this questionnaire is already submitted --}%
						</g:elseif>
					</g:if>
					<g:else>
						<a class="btn btn-primary" href="<g:createLink action='fill' id='${qid}'></g:createLink>"><g:message code="ikmb.status.bt.start-filling"/></a>
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
							Page to show the status of the questionnaire
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
			</div>

			<script type="text/javascript" charset="utf-8">
					//on ready
					$(function() {
						//making it more discriptive
						$(".moment-since").each(function(index,element){
							$(this).text(moment($(this).text()).fromNow());
						});

						//get response and update the data in questionnaire resposne
						//loop all the groups and name the text.

						DZHK.QUESTIONNAIRE_DATA="${userQuestionnaire.questionnaire.data}";
				  		DZHK.QUESTIONNAIRE_DATA=JSON.parse(DZHK.QUESTIONNAIRE_DATA.replace(/&quot;/g,'"'));
						DZHK.status.currentGroup=0;
						<g:if test="${uqResponse.status}">
							DZHK.status.resumeStatus=${uqResponse.UQResponse.status};
				  			DZHK.QUESTIONNAIRE_RESPONSE_DATA="${uqResponse.UQResponse.data}";
				  			DZHK.QUESTIONNAIRE_RESPONSE_DATA=JSON.parse(DZHK.QUESTIONNAIRE_RESPONSE_DATA.replace(/&quot;/g,'"'));
				 			DZHK.status.resumeFromGroup=${uqResponse.UQResponse.resumeFromGroup};
						</g:if>

						DZHK.QUESTIONNAIRE_SAVE_URL="<g:createLink controller='questionnaireResponse' action='saveQR' absolute='true'></g:createLink>";
					  	DZHK.USER_QUESTIONNAIRE_ID="${userQuestionnaire.id}";

						DZHK.status.init();

					});
			</script>

		</body>
	</html>