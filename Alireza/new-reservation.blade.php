@extends('frontend.layouts.master')

@section('content')
    <div ng-app="reservationApp" ng-controller="NewReservationController">
        @if (App\RentalTypeSetting::get($rental_type->id, 'one_page_reservation') == 1)
            <div data-ng-include="'/assets/frontend/angular/reservation/one-page/templates/new.html'"></div>
        @else
            <div data-ng-include="'/assets/frontend/angular/reservation/templates/new.html'"></div>
        @endif
    </div>
@stop

@section('scripts')
    @parent
    @if (App\Setting::get('payment_provider') === 'Stripe')
    <script src="https://js.stripe.com/v3/"></script>
    @endif    
    <script> 
    // Instance-level settings new
        @if (!$reservation_type)
        <?php $default_reservation_type = App\RentalTypeSetting::get($rental_type->id, 'default_reservation_type') ? App\RentalTypeSetting::get($rental_type->id, 'default_reservation_type') : 'immediate' ?>
        @else
         <?php $default_reservation_type = $reservation_type ?>   
        @endif
        var default_reservation_type = <?php echo json_encode($default_reservation_type); ?>;
        var hide_walk_in_order = {{ App\RentalTypeSetting::get($rental_type->id, 'hide_walk_in_order') ? App\RentalTypeSetting::get($rental_type->id, 'hide_walk_in_order') : 0 }};
        var reservation_is_enabled = {{ App\RentalTypeSetting::get($rental_type->id, 'reservation_is_enabled') ? App\RentalTypeSetting::get($rental_type->id, 'reservation_is_enabled') : 0 }};
        var duration_type = <?php echo json_encode(App\RentalTypeSetting::get($rental_type->id, 'reservation_type') ? App\RentalTypeSetting::get($rental_type->id, 'reservation_type') : 'flexible'); ?>;
        var is_admin = false;
        var is_online_reservation = 1;
        var locale = "{{ App\Setting::get('locale') }}";
        var site_title = "{{ App\Setting::get('site_title') }}";
        var currency_symbol = "{{ App\Setting::get('currency_symbol') }}";
        var client_address = "{{ preg_replace('/\s\s+/', ' ', App\Setting::get('address')) }}";
        var payment_is_enabled = {{ App\Setting::get('payment_is_enabled') }};
        var payment_provider = "{{ App\Setting::get('payment_provider') }}";
        <?php 
        
          $testmode = App\Setting::get("services_payment_testmode"); 
          $testmode = $testmode ? $testmode : false;
        
          $apiHost = $testmode ? config('services.cardconnect.apiTestHost') : config('services.cardconnect.apiHost');
          $apiPort = $testmode ? config('services.cardconnect.apiTestPort') : config('services.cardconnect.apiPort');
          
          $stripe_key = App\Setting::get('services_stripe_public_key');
          $stripe_testkey = App\Setting::get('services_stripe_public_testkey');
          $stripe_testkey = ($stripe_testkey !='')? $stripe_testkey : config('services.stripe.key'); // get config test key, if not set in store
                    
        ?>
        var payment_test_mode = {{ App\Setting::get("services_payment_testmode",0) }};
        var stripe_api_key = "{{ $testmode ? $stripe_testkey : $stripe_key }}";
        var CardconnectApiHost = "{{ $apiHost }}:{{ $apiPort }}";
        var CardconnectApiUrl=  "https://"+CardconnectApiHost+"/itoke/ajax-tokenizer.html?css=.error{color:red}input{background:none;border:none;font-size:16px;color:#333;}&invalidinputevent=true";
        var show_language_selector = {{ App\Setting::get('show_language_selector') }};
        var show_customer_notes = {{ App\Setting::get('show_customer_notes') }};
        var customer_notes_title = "{!! App\Setting::get('customer_notes_title') ? App\Setting::get('customer_notes_title') : 'Special Requirements' !!}";
        var delivery_option_enabled = {{ App\Setting::get('delivery_option_enabled') }};
        var default_country_for_reservation = "{{ App\Setting::get('default_country_for_reservation') }}";
        var client_logo = "{{ App\Setting::get('site_logo') }}";
        var show_availability_calendar_when_place_order = {{ App\RentalTypeSetting::get($rental_type->id, 'show_availability_calendar_when_place_order') ? App\RentalTypeSetting::get($rental_type->id, 'show_availability_calendar_when_place_order') : 0 }};
        
    // Rental type-level settings
        var rental_type_id =  {{ $rental_type->getId() }};
        var rental_type_name =  "{{ $rental_type->codename }}";
        var has_delivery = {{ $rental_type->has_delivery }};
        var delivery_type = "{{ $rental_type->delivery_type }}";
        var customer_delivery_address_type = "{{ App\RentalTypeSetting::get($rental_type->id, 'customer_delivery_address_type') ? App\RentalTypeSetting::get($rental_type->id, 'customer_delivery_address_type') : 'brief' }}";
        var credit_card_action = is_online_reservation ? "{{ App\RentalTypeSetting::get($rental_type->id, 'cc_action_for_online_order') }}" : "{{ App\RentalTypeSetting::get($rental_type->id, 'cc_action_for_walkin_order') }}";
        var needs_preauthorize = payment_is_enabled && credit_card_action && ((credit_card_action === 'validate') || (credit_card_action === 'charge') || (credit_card_action === 'charge-full'));
        var show_pre_auth_amount = {{ App\RentalTypeSetting::get($rental_type->id, 'show_pre_auth_amount') }};
        var must_check_availability = {{ App\RentalTypeSetting::get($rental_type->id, 'must_check_availability') }};
        var customer_lookup = {{ App\RentalTypeSetting::get($rental_type->id, 'customer_lookup') }};
        var single_renter = {{ App\RentalTypeSetting::get($rental_type->id, 'single_renter') }};
        var show_from_time = {{ App\RentalTypeSetting::get($rental_type->id, 'show_from_time') }};
        var show_to_time = {{ App\RentalTypeSetting::get($rental_type->id, 'show_to_time') }};
        var need_access_code_to_skip_pre_auth = {{ App\RentalTypeSetting::get($rental_type->id, 'need_access_code_to_skip_pre_auth') }};
        var reservation_type = "{{ App\RentalTypeSetting::get($rental_type->id, 'reservation_type') }}";
        var customer_address_type = "{{ App\RentalTypeSetting::get($rental_type->id, 'customer_address_type') }}";
        var show_total_price_to_customer = {{ App\RentalTypeSetting::get($rental_type->id, 'show_total_price_to_customer') }};
        var signature_is_enabled = {{ App\RentalTypeSetting::get($rental_type->id, 'signature_is_enabled') }};
        var use_duration = {{ App\RentalTypeSetting::get($rental_type->id, 'use_duration') }};
        var default_duration = {{ App\RentalTypeSetting::get($rental_type->id, 'default_duration') }};
        var show_size_to_customer = {{ App\RentalTypeSetting::get($rental_type->id, ($is_online_reservation ? 'show_size_to_online_customer' : 'show_size_to_walkin_customer')) }};
        var show_qty_to_customer = {{ App\RentalTypeSetting::get($rental_type->id, ($is_online_reservation ? 'show_qty_to_online_customer' : 'show_qty_to_walkin_customer')) }};
        var customer_can_skip_preauth = {{ (App\RentalTypeSetting::get($rental_type->id, 'customer_can_skip_preauth') == '0') ? 0 : 1 }};
        var rental_time_type = "{{ App\RentalTypeSetting::get($rental_type->id, 'rental_time_type') }}";
        var pickup_address = "{{ App\RentalTypeSetting::get($rental_type->id, 'pickup_address') }}";    //Not in use, Foets used it
        var pickup_latitude_longitude = "{{ App\RentalTypeSetting::get($rental_type->id, 'pickup_latitude_longitude') }}";    //Not in use, Foets used it
        var customer_lookup_by_email = {{ App\RentalTypeSetting::get($rental_type->id, 'customer_lookup_by_email') }};
        var customer_email_is_required = {{ App\RentalTypeSetting::get($rental_type->id, 'customer_email_is_required') }};
        var customer_phone_is_required = {{ App\RentalTypeSetting::get($rental_type->id, 'customer_phone_is_required') }};
        var show_borrow_items = {{ App\RentalTypeSetting::get($rental_type->id, ($is_online_reservation ? 'show_borrow_items_to_online_customer' : 'show_borrow_items_to_walkin_customer')) }};
        var show_purchase_items = {{ App\RentalTypeSetting::get($rental_type->id, ($is_online_reservation ? 'show_purchase_items_to_online_customer' : 'show_purchase_items_to_walkin_customer')) }};
        var show_category_image_to_customer = {{ App\RentalTypeSetting::get($rental_type->id, ($is_online_reservation ? 'show_category_image_to_online_customer' : 'show_category_image_to_online_customer')) ? App\RentalTypeSetting::get($rental_type->id, ($is_online_reservation ? 'show_category_image_to_online_customer' : 'show_category_image_to_walkin_customer')) : 0 }};
        var show_category_spec_to_customer = {{ App\RentalTypeSetting::get($rental_type->id, ($is_online_reservation ? 'show_category_spec_to_online_customer' : 'show_category_spec_to_walkin_customer')) ? App\RentalTypeSetting::get($rental_type->id, ($is_online_reservation ? 'show_category_spec_to_online_customer' : 'show_category_spec_to_walkin_customer')) : 0 }};
        var show_rental_period_before_product_selection = {{ App\RentalTypeSetting::get($rental_type->id, 'show_rental_period_before_product_selection') ? App\RentalTypeSetting::get($rental_type->id, 'show_rental_period_before_product_selection') : 0 }};
        var delivery_message = '{!! str_replace("'","\\'",App\RentalTypeSetting::get($rental_type->id, "delivery_message")) !!}'; // Alireza: otherwise it will break initializing
        var delivery_option_delivery_title = "{!! App\RentalTypeSetting::get($rental_type->id, 'delivery_option_delivery_title') !!}";
        var show_signature_in_backend = {{ App\RentalTypeSetting::get($rental_type->id, 'show_signature_in_backend') ? App\RentalTypeSetting::get($rental_type->id, 'show_signature_in_backend') : 0 }};
        var rental_period_message = "{!! App\RentalTypeSetting::get($rental_type->id, 'rental_period_message') !!}";
        var allow_promotion_code_frontend = {{ App\RentalTypeSetting::get($rental_type->id, 'allow_promotion_code_frontend') ? App\RentalTypeSetting::get($rental_type->id, 'allow_promotion_code_frontend') : 0 }};
    </script>
    
    <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCmh_CMTBdI9bRBbRfDFv0jNpXo0BKME6Y" type="text/javascript"></script>
    <script src="https://rawgit.com/allenhwkim/angularjs-google-maps/master/build/scripts/ng-map.js"></script>
    {{ Html::script('assets/global/plugins/lodash.min.js') }}
    {{ Html::script('assets/global/plugins/angularjs/plugins/angular-wizard-master/dist/angular-wizard.min.js') }}
    {{ Html::style('assets/global/plugins/angularjs/plugins/angular-wizard-master/dist/angular-wizard.min.css') }}
    @if (App\RentalTypeSetting::get($rental_type->id, 'one_page_reservation') == 1)
        {{ Html::script('assets/frontend/angular/reservation/one-page/app.js') }}
    @else
        {{ Html::script('assets/frontend/angular/reservation/app.js') }}
    @endif
@stop
