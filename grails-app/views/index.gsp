<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  <asset:link rel="shortcut icon" href="favicon-ikmb.ico" type="image/x-icon"/>
  <title>Genomic Projects</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <!-- Bootstrap 3.3.6 -->
  <asset:stylesheet src="bootstrap/css/bootstrap.min.css"/>
  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">
  <!-- Theme style -->
  <asset:stylesheet src="dist/css/AdminLTE.min.css"/>
  <!-- iCheck -->
  <asset:stylesheet src="plugins/iCheck/square/blue.css"/>

  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->

  %{-- redirecting to dashboard --}%
  <sec:ifLoggedIn>
    ${response.sendRedirect("dashboard")}
  </sec:ifLoggedIn>
</head>

<body class="hold-transition login-page">
<div class="login-box">
  <div class="login-logo">
    <a href="../../index2.html"><b>Genome</b> Project</a>
  </div>
  <!-- /.login-logo -->
  <div class="login-box-body">
    <p class="login-box-msg"><g:message code="ikmb.login.box.message"/></p>
   
   <form action='${request.contextPath }/login/authenticate' method="POST">
   
    <g:if test='${params.error}'>
      <div class="alert alert-error login_message">${params.error}</div>
    </g:if>

    <g:if test='${flash}'>
      <div class="alert alert-error login_message">${flash.message}</div>
    </g:if>

      <div class="form-group has-feedback">
        <g:textField name="username" class="form-control" placeholder="username"/>
        %{-- <input type="email" class="form-control" placeholder="Email"> --}%
        <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
      </div>
      <div class="form-group has-feedback">
        <g:passwordField  name="password" class="form-control" placeholder="Password"/>
        %{-- <input type="password" class="form-control" placeholder="Password"> --}%
        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
      </div>
      <div class="row">
        <div class="col-xs-8">
          <div class="checkbox icheck">
            <label>
              <input type="checkbox" name="remember-me" /> <g:message code="ikmb.login.remember-me"/>
            </label>
          </div>
        </div>
        <!-- /.col -->
        <div class="col-xs-4">
          <g:submitButton name="login" value="login" class="btn btn-primary btn-block btn-flat"/>
          %{-- <button type="submit" class="btn btn-primary btn-block btn-flat">Sign In</button> --}%
        </div>
        <!-- /.col -->
      </div>
    </form>

  </div>
  <!-- /.login-box-body -->
</div>
<!-- /.login-box -->

<!-- jQuery 2.2.0 -->
<asset:javascript src="plugins/jQuery/jQuery-2.1.4.min.js"/>
<!-- Bootstrap 3.3.6 -->
<asset:javascript src="bootstrap/js/bootstrap.min.js"/>
<!-- iCheck -->
<asset:javascript src="plugins/iCheck/icheck.min.js"/>
<script>
  $(function () {
    $('input').iCheck({
      checkboxClass: 'icheckbox_square-blue',
      radioClass: 'iradio_square-blue',
      increaseArea: '20%' // optional
    });
  });
</script>
</body>
</html>