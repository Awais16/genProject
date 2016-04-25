<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>AdminLTE 2 | Dashboard</title>
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
    <!-- Theme style -->
    <asset:stylesheet src="dist/css/AdminLTE.min.css"/>
    <!-- AdminLTE Skins. Choose a skin from the css/skins
         folder instead of downloading all of them to reduce the load. -->
    <asset:stylesheet src="dist/css/skins/_all-skins.min.css"/>

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    <title>
        <g:layoutTitle default="Gnome Project"/>
    </title>
     <g:layoutHead />
  </head>
<body class="hold-transition skin-blue layout-top-nav">
<div class="wrapper">
  
  <header class="main-header">
    <nav class="navbar navbar-static-top">
      <div class="container">

        <div class="navbar-header">
          <a href="#" class="navbar-brand"><b>IKMB</b> GNOME PROJECT</a>
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse">
            <i class="fa fa-bars"></i>
          </button>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="navbar-collapse">

        <ul class="nav navbar-nav">
            <li>
                <a href="${createLink(uri:'/questionnaire/')}">
                    <i class="fa fa-file-text-o margin-r-5"></i> Questionnaire
                </a>
            </li>
            <li>
                <a  href="${createLink(uri:'/appointments/')}">
                    <i class="fa fa-plus margin-r-5"></i> Appointments
                </a>
            </li>
        </ul>
        
          <ul class="nav navbar-nav navbar-right">
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
        <g:layoutBody />
    </div>
</div>

</div>



<!-- come footer-->


<!-- adding javascripts -->

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
    
</body>
</html>



