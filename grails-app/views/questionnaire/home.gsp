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
					Overview of questionniare goes here

					<table class="table table-striped table-hover">
						<tbody>
							<tr>
								<th> Name </th>
								<th> Status</th>
								<th></th>
								<th> Created </th>
							</tr>
							<g:each in="${questionnaires}" var="q">
								<tr>
									<td>${q.questionnaire.name}</td>
									<td> -- </td>
									<td><a class="label label-success" href="<g:createLink action='status' id='${q.questionnaire.id}'></g:createLink>">details</a></td>
									<td>${q.dateCreated}</td>
								</tr>
							</g:each>

						</tbody>
					</table>
					
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