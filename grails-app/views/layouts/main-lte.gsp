<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <asset:link rel="shortcut icon" href="favicon-ikmb.ico" type="image/x-icon"/>
    
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <!-- Bootstrap 3.3.5 -->
    <asset:stylesheet src="bootstrap/css/bootstrap.min.css"/>
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"/>
    <!-- Ionicons -->
    <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"/>
    <!-- jvectormap -->
    <asset:stylesheet src="plugins/jvectormap/jquery-jvectormap-1.2.2.css"/>

    <asset:stylesheet src="build/css/bootstrap-datetimepicker.min.css"/>

    <asset:stylesheet src="plugins/iCheck/all.css"/>
    
    <!-- Theme style -->
    <asset:stylesheet src="dist/css/AdminLTE.min.css"/>
    <!-- AdminLTE Skins. Choose a skin from the css/skins
         folder instead of downloading all of them to reduce the load. -->
    <asset:stylesheet src="dist/css/skins/all-skins.min.css"/>

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    <title>
        <g:layoutTitle default="Genome Project"/>
    </title>

<!-- jQuery 2.1.4 -->
    <asset:javascript src="plugins/jQuery/jQuery-2.1.4.min.js"/>
    <!-- Bootstrap 3.3.5 -->
    <asset:javascript src="bootstrap/js/bootstrap.min.js"/>
    <!-- FastClick -->
    <asset:javascript src="plugins/fastclick/fastclick.min.js"/>
    <!-- AdminLTE App -->
    <asset:javascript src="dist/js/app.min.js"/>
    <!-- Sparkline -->
    <asset:javascript src="plugins/sparkline/jquery.sparkline.min.js"/>
    <!-- jvectormap -->
    <asset:javascript src="plugins/jvectormap/jquery-jvectormap-1.2.2.min.js"/>
    <asset:javascript src="plugins/jvectormap/jquery-jvectormap-world-mill-en.js"/>
    <!-- SlimScroll 1.3.0 -->
    <asset:javascript src="plugins/slimScroll/jquery.slimscroll.min.js"/>
    <!-- ChartJS 1.0.1 -->
    <asset:javascript src="plugins/chartjs/Chart.min.js"/>

    <asset:javascript src="moment.js"/>
    <asset:javascript src="moment-with-locales.js"/>

    <asset:javascript src="build/js/bootstrap-datetimepicker.min.js"/>

    <asset:javascript src="plugins/iCheck/icheck.min.js"/>

    <asset:javascript src="main-ikmb.js"/>
    
     <g:layoutHead />
  </head>
<body class="hold-transition skin-blue layout-top-nav">
<div class="wrapper">
  
  <header class="main-header">
    <nav class="navbar navbar-static-top">
      <div class="container">

        <div class="navbar-header">
          <a href="${createLink(uri:'/dashboard')}" class="navbar-brand"><b>IKMB</b> GENOME PROJECT</a>
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse">
            <i class="fa fa-bars"></i>
          </button>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="navbar-collapse">

        <ul class="nav navbar-nav">
            <li>
                <a href="${createLink(uri:'/questionnaire/home')}" >
                    <i class="fa fa-file-text-o margin-r-5"></i><g:message code="ikmb.navigation.questionnaire" />
                </a>
            </li>
            <li>
                <a  href="https://recruitment.ikmb.uni-kiel.de/appointment/" target="_blank">
                    <i class="fa fa-plus margin-r-5"></i><g:message code="ikmb.navigation.appointments" />
                </a>
            </li>
            <li>
                <a  href="#" data-toggle="modal" data-target="#modal-disclaimer">
                    <i class="fa fa-cutlery margin-r-5"></i><g:message code="ikmb.navigation.nutrition-questionnaire-dife" />
                </a>
            </li>
        </ul>
        
          <ul class="nav navbar-nav navbar-right">
            <g:if test="${username}">
                <li>
                    <a>
                        <i class="fa fa-user" aria-hidden="true"></i>
                        <span>${username}</span>
                    </a>
                </li>
            </g:if>
            <li>
                <a href="${createLink(uri:'/logoff')}" >
                    <i class="fa fa-sign-out margin-r-5"></i> Sign out
                </a>
            </li>
          </ul>
        </div>
    </div>
    </nav>
    </header>

    <!-- Full Width Column -->
    <div class="content-wrapper">
        <div class="container">

    <!-- 
            displaing info,errors
            flash.message="message detail"
            flash.type="alert-info" // can be alert-danger,-info,-warning,-success
            flash.title="Header text"
            
            -->
            <g:if test="${flash.message}">
            <div class="alert ${flash.type} alert-dismissible" style="margin-top:2px;">
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                    <h4><i class="icon fa fa-info"></i> ${flash.title}</h4>
                    ${flash.message}
            </div>
            </g:if>
            <g:layoutBody />


            <div style="dispaly:none;">
                %{-- html for save modal --}%
                    <div class="modal fade" tabindex="-1" role="dialog" id="modal-disclaimer">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title"><i class="fa fa-exclamation-circle fa-lg text-warning" aria-hidden="true"></i> <g:message code="ikmb.main.disclaimer.title"/></h4>
                          </div>
                          <div class="modal-body">
                            <p><g:message code="ikmb.main.disclaimer.msg"/></p>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            <a href='https://sms.dife.de/' target="_blank" class="btn btn-primary">
                            <i class="fa fa-external-link fa-lg"></i>
                            <g:message code="ikmb.main.disclaimer.bt-go"/></a>
                          </div>
                        </div><!-- /.modal-content -->
                      </div><!-- /.modal-dialog -->
                    </div><!-- /.modal -->
            <div>
        </div>
    </div>

</div>  <!--wrapper-->



<!-- come footer-->


<!-- adding javascripts -->

<script type="text/javascript" charset="utf-8">
  var AdminLTEOptions = {
    //Enable sidebar expand on hover effect for sidebar mini
    //This option is forced to true if both the fixed layout and sidebar mini
    //are used together
    //sidebarExpandOnHover: true,
    //BoxRefresh Plugin
    enableBoxRefresh: true,
    //Bootstrap.js tooltip
    enableBSToppltip: true
  };


  $(function() {

    DZHK.init();

  });

</script>
    
</body>
</html>



