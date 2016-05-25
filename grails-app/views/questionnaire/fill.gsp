	<html>
		<head>
			<title>Questionnaires</title>
			<meta name="layout" content="main-lte" />
			<asset:stylesheet src="questionnaire.css"/>
			<asset:javascript src="questionFactory.js"/>
			<asset:javascript src="questionnaire.js"/>

			</head>
			<body>
			
				<br/>
				<section class="content-header">
			      <h1>
			        ${qName}
			        <small>Version 1.0</small>
			      </h1>
			    </section>
				
				<div class="box box-info" style="margin-top: 10px">
					<div class="box-header with-border">
						<h3 class="box-title group-title">Group#</h3>
						<div class="box-tools pull-right">
					      <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
					    </div>
					</div>
					<div class="box-body">
						<p><b class="group-title2">title</b></p>
						<p class="group-text">Generate questionniare forms along with the group status.</p>
					</div>
					<!-- /.box-body -->
					<div class="box-footer">
						<div class="progress-group">
			                    <span class="progress-text">Progress title</span>
			                    <span class="progress-number"><b>16</b>/20</span>

			                    <div class="progress sm">
			                      <div class="progress-bar progress-bar-aqua" style="width:80%"></div>
			                    </div>
			            </div>
					</div>
				</div>

				<div class="box box-solid box-primary first-box">
				  <div class="box-header with-border">
				    <h2 class="question-text">Question TExt</h2>
				  </div><!-- /.box-header -->
				  <div class="box-body main-box">
				    	<div class="row">
				    		<div class="col-md-5 question-answer"></div>
				    	</div>
				  </div><!-- /.box-body -->
				  <div class="box-footer question-controls">
				    	<button type="button" class="btn btn-primary btn-lg" id="bt-back">Previous</button>
				    	<button type="button" class="btn btn-primary btn-lg" id="bt-next">Next</button>
				  </div><!-- box-footer -->
				</div><!-- /.box -->


				%{-- to put hiddent data like dialogs etc --}%
				<div>
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
				</div>
				<script type="text/javascript" charset="utf-8">
				
					//on ready
					$(function() {

					  DZHK.QUESTIONNAIRE_DATA="${qJson}";
					  DZHK.QUESTIONNAIRE_DATA=DZHK.QUESTIONNAIRE_DATA.replace(/&quot;/g,'"');
					  DZHK.QUESTIONNAIRE_DATA=JSON.parse(DZHK.QUESTIONNAIRE_DATA);
					  
					  //adding repsonse data
					  DZHK.QUESTIONNAIRE_RESPONSE_DATA.questionnaire=DZHK.QUESTIONNAIRE_DATA.id;
					  DZHK.QUESTIONNAIRE_RESPONSE_DATA.group=DZHK.QUESTIONNAIRE_DATA.group;

					  DZHK.quest.init();

					});
				</script>
			</body>
		</html>