<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->
<!-- BEGIN HEAD -->
<head>
<meta charset="utf-8"/>
<title>{{ App\Setting::get('site_title') }} | Login</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<meta http-equiv="Content-type" content="text/html; charset=utf-8">
<!-- BEGIN GLOBAL MANDATORY STYLES -->
{{ Html::style('https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all') }}
{{ Html::style('assets/global/plugins/font-awesome/css/font-awesome.min.css') }}
{{ Html::style('assets/global/plugins/simple-line-icons/simple-line-icons.min.css') }}
{{ Html::style('assets/global/plugins/bootstrap/css/bootstrap.min.css') }}
{{ Html::style('assets/global/plugins/uniform/css/uniform.default.css') }}
{{ Html::style('assets/global/plugins/bootstrap-toastr/toastr.min.css') }}
<!-- END GLOBAL MANDATORY STYLES -->
<!-- BEGIN PAGE LEVEL STYLES -->
{{ Html::style('assets/admin/pages/css/login.css') }}
<!-- END PAGE LEVEL SCRIPTS -->
<!-- BEGIN THEME STYLES -->
{{ Html::style('assets/global/css/components-md.css') }}
{{ Html::style('assets/global/css/plugins-md.css') }}
{{ Html::style('assets/admin/layout4/css/layout.css') }}
{{ Html::style('assets/admin/layout4/css/custom.css') }}

<!-- END THEME STYLES -->
<link rel="shortcut icon" href="{{ URL::to('/') }}/assets/admin/layout4/img/remove-icon-small.png"/>

<style>
    #disclaimer {
      margin: 20px auto;
      /*
        background: #efefef;
        border-radius:6.5px;
        padding: 30px;
        width: 400px;
        
        border: 1px solid #ffffff;
        box-shadow: 1px 1px 1px 1px #333333;
    */}
    .center-block {
        margin-left:34%;
    }
    
    .clearfix {
      clear:both;
    }

    @media only screen {
    .center-block {
        margin-left:15%;
        margin-right:15%;
        text-align: center;
        
    }
     .col-md-offset-1 {
    margin-left: 10px;
   }
}
@media (min-width:989px){
    .center-block {
        margin-left:35%;
        margin-right:35%;
        text-align: center;
        
    }
}
</style>

</head>
<body class="page-md login center-block">
    <div class="menu-toggler sidebar-toggler"></div>
    <div class="logo">
        {{-- <a href="#">
       <img src="{{ URL::to('/') }}/assets/admin/layout4/img/logo.png"/>
        </a> --}}
                    <h2 class="text-info">{{ Lang::get('messages.login-title') }}</h2>
    </div>
    <div class="col-md-4 center-block">
        <div class="panel panel-default">
            <div class="panel-body">
                {{ Form::open(array('class'=>'form-horizontal')) }}
                    <div class="form-body">
                        <div class="form-title">
                            <h3 class="form-title">{{ Lang::get('messages.sign-in') }}</h3>
                        </div>
                        <div class="alert alert-danger display-hide">
                            <button class="close" data-close="alert"></button>
                            <span>{{ Lang::get('messages.any-uname-password') }}</span>
                        </div>
                        <div class="form-group form-md-line-input">
                            <div class="input-icon">
                                {{ Form::text('email', null, array('class' => 'form-control')) }}
                                <label>{{ Lang::get('messages.username') }}</label>
                                <i class="fa fa-envelope-o"></i>
                                <div class="form-control-focus"></div>
                                @if ($errors->has('email'))
                                <div class="text-danger pull-left">
                                    {{ $errors->first('email') }}
                                </div>
                                @endif
                            </div>
                        </div>
                        <div class="form-group form-md-line-input">
                            <div class="input-icon">
                                {{ Form::password('password', array('class' => 'form-control')) }}
                                <label >{{ Lang::get('messages.password') }}</label>
                                <span class="help-block">{{ Lang::get('messages.enter-password') }}</span>
                                <i class="fa fa-key"></i>
                                <div class="form-control-focus"></div>    
                                @if ($errors->has('password'))
                                <div class="text-danger pull-left">
                                    {{ $errors->first('password') }}
                                </div>
                                @endif
                            </div>   
                        </div>
                        <div class="form-group form-md-line-input">
                            <div class="col-md-6">
                                <div class="md-checkbox-list">
                                    <div class="md-checkbox">
                                        {{ Form::checkbox('remember_me',null,null, array('class'=>'md-check','id'=>'checkbox11111')) }}
                                        <label for="checkbox11111"> 
                                        <span></span>
                                        <span class="check"></span>
                                        <span class="box"></span>
                                        {{ Lang::get('messages.remember-me') }} </label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <a href="/password/reset">Forgot you password?</a>
                            </div>
                        </div>
                        <div class="form-actions">
                            {{ Form::submit(Lang::get('messages.login'), array('class' => 'btn green btn-block uppercase')) }}
                        </div>
                    </div>
                {{ Form::close() }}
                <!-- END LOGIN FORM -->
            </div>
        </div>
    </div>

    <br class="clearfix" />
    <div class="copyright">
            &copy; {{ date('Y') }} <a class="text-info" href="http://www.rentrax.io" title="{{ Lang::get('messages.rentrax-simplified') }}" target="_blank">{{ Lang::get('messages.rentrax') }}</a>
    </div>

    <!-- BEGIN CORE JQUERY PLUGINS -->
    <!--[if lt IE 9]>
    {{ Html::script('assets/global/plugins/respond.min.js') }}    
    {{ Html::script('assets/global/plugins/excanvas.min.js') }}    
    <![endif]-->
    {{ Html::script('assets/global/plugins/jquery.min.js') }}    
    {{ Html::script('assets/global/plugins/jquery-migrate.min.js') }}    
    {{ Html::script('assets/global/plugins/bootstrap/js/bootstrap.min.js') }}    
    {{ Html::script('assets/global/plugins/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js') }}    
    {{ Html::script('assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js') }}    
    {{ Html::script('assets/global/plugins/jquery.blockui.min.js') }}    
    {{ Html::script('assets/global/plugins/jquery.cokie.min.js') }}    
    {{ Html::script('assets/global/plugins/uniform/jquery.uniform.min.js') }} 
    {{ Html::script('assets/global/plugins/bootstrap-toastr/toastr.min.js') }}
    <!-- END CORE JQUERY PLUGINS -->

    <!-- BEGIN PAGE LEVEL PLUGINS -->
    {{ Html::script('assets/global/plugins/jquery-validation/js/jquery.validate.min.js') }}    
    <!-- END PAGE LEVEL PLUGINS -->

    <!-- BEGIN PAGE LEVEL SCRIPTS -->
    {{ Html::script('assets/global/scripts/metronic.js') }}    
    {{ Html::script('assets/admin/layout4/scripts/layout.js') }}    
    {{--{{ Html::script('assets/admin/layout4/scripts/demo.js') }}
    {{ Html::script('assets/admin/pages/scripts/login.js') }}--}}
    <!-- END PAGE LEVEL SCRIPTS -->
<script>
    jQuery(document).ready(function() {     
    //Metronic.init(); // init metronic core components
    Layout.init(); // init current layout
    //Login.init();
    //Demo.init();
    });
</script>
{!! Toastr::render() !!}
</body>
</html>