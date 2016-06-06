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

			    %{-- completed but not submitted yet i.e status==2 --}%
			    <g:if test="${resp && resp.status==2}">

				    <div id="popup-submit" class="alert alert-info alert-dismissible">
				    	<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>

	                	<h4>
	                		<i class="icon fa fa-info"></i>
	                		<g:message code="ikmb.fill.completed-not-submitted-dialog-header"/>
	                	</h4>
	                	<p id="popup-submit-msg"><g:message code="ikmb.fill.completed-not-submitted-dialog-msg"/></p>

	                	<div>
	                		<button class="btn btn-success" id="popup-bt-submit"><g:message code="ikmb.fill.completed-not-submitted-dialog-bt"/></button>
	                	</div>
	              	</div>

	            </g:if>

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
				    		<div class="col-md-6 question-answer"></div>
				    	</div>
				  </div><!-- /.box-body -->
				  <div class="box-footer question-controls">
				    	<button type="button" class="btn btn-primary btn-lg" id="bt-back"><i class="fa fa-chevron-left" aria-hidden="true"></i>  <g:message code='ikmb.fill.bt.previous'/></button>
				    	<button type="button" class="btn btn-primary btn-lg" id="bt-next"><g:message code='ikmb.fill.bt.next'/>  <i class="fa fa-chevron-right" aria-hidden="true"></i></button>
				  </div><!-- box-footer -->
				</div><!-- /.box -->


				%{-- to put hiddent data like dialogs etc --}%
				<div>
					
				%{-- html for save modal --}%
					<div class="modal fade" tabindex="-1" role="dialog" id="modal-save">
					  <div class="modal-dialog modal-sm">
					    <div class="modal-content">
					      <div class="modal-header">
					        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					        <h4 class="modal-title">Save Questionnaire</h4>
					      </div>
					      <div class="modal-body">
					        <p id="modal-save-msg">Its recommended to save once you complete a group!</p>
					      </div>
					      <div class="modal-footer">
					        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					        <button type="button" class="btn btn-primary" id="bt-modal-save">
							<i class="fa fa-cog fa-lg"></i>
					        Save</button>
					      </div>
					    </div><!-- /.modal-content -->
					  </div><!-- /.modal-dialog -->
					</div><!-- /.modal -->

					<div class="modal fade" tabindex="-1" role="dialog" id="modal-submit">
					  <div class="modal-dialog modal-sm">
					    <div class="modal-content">
					      <div class="modal-header">
					        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					        <h4 class="modal-title">Submit Questionnaire</h4>
					      </div>
					      <div class="modal-body">
					        <p id="modal-submit-msg">Questionnaire is complete, you can submit now.(After submission you won't be able to edit it anymore)</p>
					      </div>
					      <div class="modal-footer">
					        <button type="button" class="btn btn-default" id="bt-modal-submit-cancel">Submit Later</button>
					        <button type="button" class="btn btn-primary" id="bt-modal-submit">
							<i class="fa fa-cog fa-lg"></i>
					        Submit</button>
					      </div>
					    </div><!-- /.modal-content -->
					  </div><!-- /.modal-dialog -->
					</div><!-- /.modal -->

				</div>
				<script type="text/javascript" charset="utf-8">

					//on ready
					$(function() {

					  DZHK.QUESTIONNAIRE_DATA="${qJson}";
					  DZHK.QUESTIONNAIRE_DATA=DZHK.QUESTIONNAIRE_DATA.replace(/&quot;/g,'"');
					  DZHK.QUESTIONNAIRE_DATA=JSON.parse(DZHK.QUESTIONNAIRE_DATA);
					  
					  //adding repsonse data
					  DZHK.QUESTIONNAIRE_RESPONSE_DATA.questionnaire=DZHK.QUESTIONNAIRE_DATA.id; //identifier in json
					  DZHK.QUESTIONNAIRE_SAVE_URL="<g:createLink controller='questionnaireResponse' action='saveQR' absolute='true'></g:createLink>";
					  DZHK.USER_QUESTIONNAIRE_ID="${userQuestId}";

					 	<g:if test="${resp}">
					  		<g:if test="${resp.status==1}">
					  			DZHK.QUESTIONNAIRE_RESPONSE_DATA="${resp.data}";
					  			DZHK.QUESTIONNAIRE_RESPONSE_DATA=JSON.parse(DZHK.QUESTIONNAIRE_RESPONSE_DATA.replace(/&quot;/g,'"'));
					 			DZHK.quest.currentGroup=${resp.resumeFromGroup};
					  		</g:if>
					  		<g:if test="${resp.status==2}">
					  			DZHK.QUESTIONNAIRE_RESPONSE_DATA="${resp.data}";
					  			DZHK.QUESTIONNAIRE_RESPONSE_DATA=JSON.parse(DZHK.QUESTIONNAIRE_RESPONSE_DATA.replace(/&quot;/g,'"'));
					  		</g:if>
						</g:if>
						<g:else>
							DZHK.quest.initResponseFromQuestionnaire();
						</g:else>

					  DZHK.quest.init();
					  
					});
				</script>
				
			</body>
		</html>