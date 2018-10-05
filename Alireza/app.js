angular.module('reservationApp', ['mgo-angular-wizard', 'ui.bootstrap', 'ngSanitize', 'ngMap'])
    .filter('getProductCategoryById', function() {
        return function(input, id) {
            var i = 0,
                len = input.length;
            for (; i < len; i++) {
                if (+input[i].id == +id) {
                    return input[i];
                }
            }
            return null;
        }
    })
    .filter('getRentalParentCategoriesByRentalTypeId', function() {
        return function(items, id) {
            var filtered = [];
            angular.forEach(items, function(item) {
                if ((item.rental_type_id == id) && (item.type == 'rent') && !item.is_for_purchase) {
                    filtered.push(item);
                }
            });
            return filtered;
        }
    })
//    change ui
    .filter('objLength', function() { 
        return function(object) { 
            return Object.keys(object).length; 
        } 
    })
//    change ui end
    .filter('getProductOptionById', function() {
        return function(input, id) {
            var i = 0,
                len = input.length;
            for (; i < len; i++) {
                if (+input[i].id == +id) {
                    return input[i];
                }
            }
            return null;
        }
    })
    .filter('getAttributesByCategoryId', function() {
        return function(items, id) {
            var filtered = [];
            angular.forEach(items, function(item) {
                if (item.category_id == id) {
                    filtered.push(item);
                }
            });
            return filtered;
        }
    })
    .filter('itemQtyGtCompare', function() {
        return function(items, qty) {
            var filtered = [];
            angular.forEach(items, function(item) {
                if (item.category_id && item.qty >= qty) {
                    filtered.push(item);
                }
            });

            return filtered;
        };
    })
    .filter('rentalRootCategories', function() {
        return function(items) {
            var filtered = [];
            angular.forEach(items, function(item) {
                if (item.type == 'rent' && item.parent_id == null) {
                    filtered.push(item);
                }
            });
            return filtered;
        }
    })
    .filter('borrowRootCategories', function() {
        return function(items) {
            var filtered = [];
            angular.forEach(items, function(item) {
                if (item.type == 'borrow' && item.parent_id == null) {
                    filtered.push(item);
                }
            });
            return filtered;
        }
    })
    .filter('saleRootCategories', function(){
        return function(items) {
            var filtered = [];
            angular.forEach(items, function(item){
                if(item.type == 'sale' && item.parent_id == null) {
                    filtered.push(item);
                }
            });
            return filtered;
        }
    })
 
    .controller('NewReservationController', function($scope, $http, $filter, $rootScope, $sce, $window){
        $scope.root_user = {};
        $scope.is_online_reservation = is_online_reservation;
        $scope.customer_address_type = customer_address_type;
        $scope.customer = {
            address: {},
            accommodation: {}
        };
        $scope.payment_test_mode = payment_test_mode;
        $scope.show_pre_auth_amount = show_pre_auth_amount;
        $scope.payment_provider = payment_provider;
        $scope.tokenFrameUrl = $sce.trustAsResourceUrl(CardconnectApiUrl);
        $scope.show_language_selector = show_language_selector;
        $scope.default_country_for_reservation = default_country_for_reservation;
        $scope.show_from_time = show_from_time;
        $scope.show_to_time = show_to_time;
        $scope.reservation_type = reservation_type;
        $scope.rental_time_type = rental_time_type;
        $scope.delivery_option_enabled = delivery_option_enabled;
        $scope.delivery_type = delivery_type;
        $scope.pickup_address = pickup_address;
        $scope.pickup_latitude_longitude = pickup_latitude_longitude;
        $scope.show_total_price_to_customer = show_total_price_to_customer;
        $scope.show_size_to_customer = show_size_to_customer;
        $scope.show_qty_to_customer = show_qty_to_customer;
        $scope.customer_can_skip_preauth = customer_can_skip_preauth;
        $scope.credit_card_action = credit_card_action;

        $scope.submit_button = "Submit";
        if ($scope.credit_card_action == "validate") {
            $scope.submit_button = "Validate";
        }
        
        if ($scope.credit_card_action == "charge" || $scope.credit_card_action == "charge-full") {
            $scope.submit_button = "Pay";
        }

        $scope.show_category_image_to_customer = show_category_image_to_customer;
        $scope.show_category_spec_to_customer = show_category_spec_to_customer;
        $scope.show_borrow_items = show_borrow_items;
        $scope.show_purchase_items = show_purchase_items;
        $scope.show_signature_in_backend = show_signature_in_backend;
        $scope.show_rental_period_before_product_selection = show_rental_period_before_product_selection;
        $scope.default_duration = default_duration;
        $scope.use_duration = use_duration;
        $scope.must_check_availability = must_check_availability;
        $scope.locale = locale;
        $scope.site_title = site_title;
        $scope.client_address = client_address;
        $scope.single_renter = single_renter;
        $scope.logo = client_logo;
        $scope.show_availability_calendar_when_place_order = show_availability_calendar_when_place_order;
        $scope.has_delivery = has_delivery
        $scope.currency_symbol = currency_symbol;
        $scope.customer_lookup_by_email = customer_lookup_by_email;
        $scope.customer_email_is_required = customer_email_is_required;
        $scope.customer_phone_is_required = customer_phone_is_required;
        $scope.show_customer_notes = show_customer_notes;
        $scope.customer_notes_title = $sce.trustAsHtml(customer_notes_title);
        $scope.rental_period_message = $sce.trustAsHtml(rental_period_message);
        $scope.default_reservation_type = default_reservation_type;
        $scope.hide_walk_in_order = hide_walk_in_order;
        $scope.reservation_is_enabled = reservation_is_enabled;
        $scope.duration_type = duration_type;
        $scope.delivery_message = $sce.trustAsHtml(delivery_message);
        $scope.delivery_option_delivery_title = delivery_option_delivery_title;
        $scope.delivery_address_is_valid = 1;

        $scope.allow_promotion_code_frontend = allow_promotion_code_frontend;
        $scope.promotion_code_is_valid = null;
        $scope.promotion_code_type = null;
        $scope.promotion_code_discount = null;
        $scope.$apply_separately_to_rent_items = 0;

        $scope.detailed_delivery_address_is_valid = 1;
        $scope.customer_delivery_address_type = customer_delivery_address_type;
         if ($scope.customer_delivery_address_type == 'detailed' && $scope.delivery_option_enabled && $scope.has_delivery) {
               if ($scope.delivery_type == 'required'){
                   $scope.detailed_delivery_address_is_valid = 0;
               }
            }
            $scope.hotel_delivery_address_is_valid = 1;
           if ($scope.customer_delivery_address_type == 'hotel' && $scope.delivery_option_enabled && $scope.has_delivery) {
                if ($scope.delivery_type == 'required'){
                    $scope.hotel_delivery_address_is_valid = 0;
                }
            }
        if ($scope.delivery_option_enabled && $scope.has_delivery) {
           if ($scope.delivery_type == 'required'){
               $scope.delivery_address_is_valid = 0;
           }
        }
        $scope.resource = {
            'en-boat': {
                'form_title': 'Boat Reservation Inquiry Form',
                'filling_message': 'Please enter your contact information, which boat(s) you need, and the dates you desire to rent. Our staff will be in touch with you as soon as possible to confirm availability.',
                'customer_info': 'Customer Info',
                'privacy_policy': ' collects and will use the information provided to respond to you regarding your rental reservation. We will not share your information with any third party outside of our organization, other than as necessary to fulfill your request. We will not sell or rent this information to anyone.',
                'select_a_product': 'Please select at least one Boat Model for rent',
                'additional_items': 'We will help you with reservations for additional gear once the reservation for the boat is confirmed.',
                'review_title': 'Review Reservation Inquiry',
                'back_title': 'Edit Request',
                'terms_condition_title': 'Reservation Terms and Conditions',
                'skip_by_customer': 'I want to skip this step and talk to a staff',
                'return_time': 'Return by',
                'payment_note': 'Payment to be made before any products delivered at ',
                'customer_info_phone'            : 'Phone',
                'customer_info_phone_error'      : 'Phone is required.',
                'customer_info_firstname'        : 'First Name',
                'customer_info_firstname_error'  : 'First Name is required.',
                'customer_info_lastname'         : 'Last Name',
                'customer_info_lastname_error'   : 'Last Name is required.',
                'customer_info_email'            : 'Email',
                'customer_info_email_error'      : 'Email is invalid.',
                'customer_info_address'          : 'Address (optional)',
                'customer_info_address1'         : 'Address 1',
                'customer_info_address2'         : 'Address 2',
                'customer_info_city'             : 'City',
                'customer_info_state'            : 'State/Province',
                'customer_info_postal_code'      : 'Postal Code',
                'customer_info_country'          : 'Country',
                'customer_info_not_valid': 'Customer data is not valid!',
                'privacy_policy_title'   : 'Privacy Policy',
                'field_is_required'      : '* = required',
                'rent_order_want_rent'   : 'I want to rent',
                'rent_order_item'        : 'Rental Item',
                'rent_order_size'        : 'Option',
                'rent_order_qty'         : 'Qty',
                'rent_order_available'   : '# Available',
                'rent_order_select'      : 'Select Rental Item',
                'rent_order_category_not_selected'  : 'No rental item is selected!',
                'rent_order_special_requirements'   : 'Special Requirements',
                'delivery_pickup_option'            : 'Delivery/Pickup Option',
                'delivery_pickup_option_pickup'     : 'Store Pickup',
                'delivery_pickup_option_delivery'   : 'Delivery',
                'delivery_pickup_delivery_address'  : 'Delivery address',
                'delivery_pickup_pickup_address'    : 'Pickup address',
                'rental_period'                     : 'Rental period',
                'rental_period_delivery_date'       : 'Delivery Date',
                'rental_period_start_date'          : 'Start Date',
                'rental_period_start_date_required' : 'Start Date is required.',
                'rental_period_select'              : 'Select',
                'rental_period_desired_delivery_time'   : 'Desired Delivery Time',
                'rental_period_desired_pickup_time'     : 'Desired Pickup Time',
                'rental_period_duration'                : 'Duration',
                'rental_period_return_date'             : 'Return Date',
                'rental_period_return_time'             : 'Desired Return Time',
                'rental_period_invalid_reservation_date': 'Date is invalid!',
                'rental_period_reservation_date_error'  : 'Reservation dates must be in future!',
                'check_availability'  : 'Check Availability',
                'next_title'          : 'To enable Next button you need to fill all mandatory fields.',
                'delivery_pickup_cost'              : 'Delivery Costs',
                'next'                : 'Next',
                'review_name'         : 'Full Name:',
                'review_street1'      : 'Street 1',
                'review_street2'      : 'Street 2',
                'review_items_for_rent' : 'Items For Rent',
                'review_item'         : 'Item',
                'review_change_fee'   : 'Change Deposit Fee',
                'review_access_key'   : 'Access Key',
                'review_deposit_fee'  : 'Deposit Fee',
                'review_confirm'      : 'OK',
                'terms_condition_body_1'         : 'I am',
                'terms_condition_body_2'         : 'and I agree with terms and conditions.',
                'terms_condition_more'           : 'Read more',
                'terms_condition_skip'           : 'Skip',
                'terms_condition_sign_here'      : 'Sign Here',
                'terms_condition_clear_signature': 'Clear Signature',
                'terms_condition_save_signature' : 'Save Signature',
                'terms_condition_close'          : 'Save & Agree',
                'terms_condition_cancel'         : 'Cancel',
                'review_confirm_title'           : 'To enable Confirm button you need to accept terms and conditions.',
                'review_submit'                  : 'Submit',
                'total_price'                    : 'Total Price',
                'back_title_simple'              : 'Back',
                'preauth_security'               : 'Not for payment, it is a security deposit.',
                'preauth_skipped_by_customer'    : 'I want to skip this step and pay later',
                'preauth_skipped_by_customer_walk_in' : 'I want to skip this step and talk to a staff member.',
//                one page
                'preauth_skip_title'             : 'Skip Payment and Submit',
                'preauth_comment'                : 'Comment',
                'preauth_comment_required'       : 'Comment is required.',
                'preauth_access_code'            : 'Access Code',
                'preauth_access_code_required'   : 'Access code is required.',
                'preauth_cancel'                 : 'Cancel',
                'security_deposit'               : 'Security Deposit',
                'preauth_skipped'                : 'PRE AUTH SKIPPED',
                'preauth_credit_title_1'         : 'We need to validate your credit card',
                'preauth_credit_title_2'         : 'for security deposit. Your credit card will not be charged.',
                'preauth_credit_title_1_walk_in' : 'Please enter your credit card as a form of security deposit. YOUR CREDIT CARD WILL NOT BE CHARGED and the authorization will automatically be voided when you return rental items back.',
                'preauth_credit_title_2_walk_in' : 'IT IS NOT FOR PAYMENT - SECURITY DEPOSIT ONLY.',
                'credit_card_info'               : 'Credit Card Information',
                'credit_card_number'             : 'Credit Card Number',
                'credit_card_full_name'          : 'Full Name',
                'credit_card_amount'             : 'Amount',
                'credit_card_expire_month'       : 'Expire Month',
                'credit_card_expire_year'        : 'Expire Year',
                'credit_card_cvv2'               : 'Cvv2',
                'name_label'                     : 'Name',
                'pre_authorize'                  : 'Pre-Auth',
                'finish_button'                  : 'Finish',
                'preauth_access_code_invalid'    : 'Access Code is invalid',
                'terms_condition_minor'          : 'I am signing on behalf of a Minor'
            },
            'en': {
                'additional_items': '',
                'form_title'                     : 'New Reservation',
                'filling_message'                : 'Please enter your contact information, select rental items you need, and the dates you desire to rent.',
                'customer_info'                  : 'Customer Info',
                'customer_info_phone'            : 'Phone',
                'customer_info_phone_error'      : 'Phone is required.',
                'customer_info_firstname'        : 'First Name',
                'customer_info_firstname_error'  : 'First Name is required.',
                'customer_info_lastname'         : 'Last Name',
                'customer_info_lastname_error'   : 'Last Name is required.',
                'customer_info_email'            : 'Email',
                'customer_info_email_error'      : 'Email is invalid.',
                'customer_info_address'          : 'Address (optional)',
                'customer_info_address1'         : 'Address 1',
                'customer_info_address2'         : 'Address 2',
                'customer_info_city'             : 'City',
                'customer_info_state'            : 'State/Province',
                'customer_info_postal_code'      : 'Postal Code',
                'customer_info_country'          : 'Country',
                'customer_info_not_valid': 'Customer data is not valid!',
                'privacy_policy_title'   : 'Privacy Policy',
                'privacy_policy'         : ' collects and will use the information provided to respond to you regarding your rental reservation. We will not share your information with any third party outside of our organization, other than as necessary to fulfill your request. We will not sell or rent this information to anyone.',
                'field_is_required'      : '* = required',
                'select_a_product'       : 'Please select at least one rental item',
                'rent_order_want_rent'   : 'I want to rent',
                'rent_order_item'        : 'Rental Item',
                'rent_order_size'        : 'Option',
                'rent_order_qty'         : 'Qty',
                'rent_order_available'   : '# Available',
                'rent_order_select'      : 'Select Rental Item',
                'rent_order_category_not_selected'  : 'No rental item is selected!',
                'rent_order_special_requirements'   : 'Special Requirements',
                'delivery_pickup_option'            : 'Delivery/Pickup Option',
                'delivery_pickup_option_pickup'     : 'Store Pickup',
                'delivery_pickup_option_delivery'   : 'Delivery',
                'delivery_pickup_delivery_address'  : 'Delivery address',
                'delivery_pickup_pickup_address'    : 'Pickup address',
                'rental_period'                     : 'Rental period',
                'rental_period_delivery_date'       : 'Delivery Date',
                'rental_period_start_date'          : 'Start Date',
                'rental_period_start_date_required' : 'Start Date is required.',
                'rental_period_select'              : 'Select',
                'rental_period_desired_delivery_time'   : 'Desired Delivery Time',
                'rental_period_desired_pickup_time'     : 'Desired Pickup Time',
                'rental_period_duration'                : 'Duration',
                'rental_period_return_date'             : 'Return Date',
                'rental_period_return_time'             : 'Desired Return Time',
                'rental_period_invalid_reservation_date': 'Date is invalid!',
                'rental_period_reservation_date_error'  : 'Reservation dates must be in future!',
                'check_availability'  : 'Check Availability',
                'next_title'          : 'To enable Next button you need to fill all mandatory fields.',
                'delivery_pickup_cost'              : 'Delivery Costs',
                'next'                : 'Next',
                'review_title'        : 'Review Reservation',
                'review_name'         : 'Full Name:',
                'review_street1'      : 'Street 1',
                'review_street2'      : 'Street 2',
                'review_items_for_rent' : 'Items For Rent',
                'review_item'         : 'Item',
                'review_change_fee'   : 'Change Deposit Fee',
                'review_access_key'   : 'Access Key',
                'review_deposit_fee'  : 'Deposit Fee',
                'terms_condition_title'          : 'Reservation Terms and Conditions',
                'terms_condition_body_1'         : 'I am',
                'terms_condition_body_2'         : 'and I agree with terms and conditions.',
                'terms_condition_more'           : 'Read more',
                'terms_condition_skip'           : 'Skip',
                'terms_condition_sign_here'      : 'Sign Here',
                'terms_condition_clear_signature': 'Clear Signature',
                'terms_condition_save_signature' : 'Save Signature',
                'terms_condition_close'          : 'Save & Agree',
                'terms_condition_cancel'         : 'Cancel',
                'back_title'                     : 'Back and Edit Order',
                'review_confirm_title'           : 'To enable Confirm button you need to accept terms and conditions.',
                'review_confirm'                 : 'Confirm',
                'review_submit'                  : 'Submit',
                'total_price'                    : 'Total Price',
                'payment_note'                   : 'Payment to be made before any products delivered at',
                'back_title_simple'              : 'Back',
                'preauth_security'               : 'Not for payment, it is a security deposit.',
                'preauth_skipped_by_customer'    : 'I want to skip this step and pay later',
                'preauth_skipped_by_customer_walk_in' : 'I want to skip this step and talk to a staff member.',
//                one page
                'preauth_skip_title'             : 'Skip Payment and Submit',
                'preauth_comment'                : 'Comment',
                'preauth_comment_required'       : 'Comment is required.',
                'preauth_access_code'            : 'Access Code',
                'preauth_access_code_required'   : 'Access code is required.',
                'preauth_cancel'                 : 'Cancel',
                'security_deposit'               : 'Security Deposit',
                'preauth_skipped'                : 'PRE AUTH SKIPPED',
                'preauth_credit_title_1'         : 'We need to validate your credit card',
                'preauth_credit_title_2'         : 'for security deposit. Your credit card will not be charged.',
                'preauth_credit_title_1_walk_in' : 'Please enter your credit card as a form of security deposit. YOUR CREDIT CARD WILL NOT BE CHARGED and the authorization will automatically be voided when you return rental items back.',
                'preauth_credit_title_2_walk_in' : 'IT IS NOT FOR PAYMENT - SECURITY DEPOSIT ONLY.',
                'credit_card_info'               : 'Credit Card Information',
                'credit_card_number'             : 'Credit Card Number',
                'credit_card_full_name'          : 'Full Name',
                'credit_card_amount'             : 'Amount',
                'credit_card_expire_month'       : 'Expire Month',
                'credit_card_expire_year'        : 'Expire Year',
                'credit_card_cvv2'               : 'Cvv2',
                'name_label'                     : 'Name',
                'pre_authorize'                  : 'Pre-Auth',
                'finish_button'                  : 'Finish',
                'preauth_access_code_invalid'    : 'Access Code is invalid',
                'terms_condition_minor'          : 'I am signing on behalf of a Minor'
        },
            'de': {
                'additional_items': '',
                'form_title'                     : 'Neue Reservierung',
                'filling_message'                : 'Bitte, geben Sie Ihre Contactdaten, Ihre Auswahl von Mietsachen und die Mietdatum.',
                'customer_info'                  : 'Kundeninfo',
                'customer_info_phone'            : 'Telefon',
                'customer_info_phone_error'      : 'Telefon ist notwendig',
                'customer_info_firstname'        : 'Vornahme',
                'customer_info_firstname_error'  : 'Vornahme ist notwendig',
                'customer_info_lastname'         : 'Nachnahme',
                'customer_info_lastname_error'   : 'Nachnahme ist notwendig',
                'customer_info_email'            : 'E-mail',
                'customer_info_email_error'      : 'E-mail eingabe stimmt nicht',
                'customer_info_address'          : 'Adresse (optionell)',
                'customer_info_address1'         : 'Adresse 1',
                'customer_info_address2'         : 'Adresse 2',
                'customer_info_city'             : 'Wohnort',
                'customer_info_state'            : 'Staat/Provinz',
                'customer_info_postal_code'      : 'Plz.',
                'customer_info_country'          : 'Land',
                'customer_info_not_valid': 'Kundendata sind ungültig!',
                'privacy_policy_title'   : 'Privacy erklärung',
                'privacy_policy'         : ' Sammelt ein und wird die eingegeben Informationen nur nützen für die Reservationen Ihrer Miete. Ihre Daten wirden nicht geteilt mit Dritten, ausser wenn Notwendig um an Ihre Versuch zu vollständigen. Ihre Daten werden nicht verkauft oder verleiht. ',
                'field_is_required'      : '* = notwendig',
                'select_a_product'       : 'Bitte, selektieren Sie am mindesten 1',
                'rent_order_want_rent'   : 'Ich möchte mieten',
                'rent_order_item'        : 'Mietartikel',
                'rent_order_size'        : 'Grösse',
                'rent_order_qty'         : 'Menge',
                'rent_order_available'   : '# Vorrätig',
                'rent_order_select'      : 'Wahlt Ihr Mietartikel',
                'rent_order_category_not_selected'  : 'Kein Mietartikel würden selektiert!',
                'rent_order_special_requirements'   : 'Sonstige wünschen',
                'delivery_pickup_option'            : 'Ablieferung/abhohl möglichkeiten',
                'delivery_pickup_option_pickup'     : 'Laden abholung',
                'delivery_pickup_option_delivery'   : 'Ablieferung',
                'delivery_pickup_delivery_address'  : 'Lieferungs Adresse',
                'delivery_pickup_pickup_address'    : 'Abholadresse',
                'rental_period'                     : 'Miet Periode',
                'rental_period_delivery_date'       : 'Abliefer Datum',
                'rental_period_start_date'          : 'Anfangsdatum',
                'rental_period_start_date_required' : 'Anfangsdatum ist notwendig',
                'rental_period_select'              : 'Wähl',
                'rental_period_desired_delivery_time'   : 'Gewünschte lieferzeit',
                'rental_period_desired_pickup_time'     : 'Gewünschte abhohlzeit',
                'rental_period_duration'                : 'Dauer',
                'rental_period_return_date'             : 'Einliefer zeit',
                'rental_period_return_time'             : 'Gewünschte lieferzeit',
                'rental_period_invalid_reservation_date': 'Datum stimmt nicht',
                'rental_period_reservation_date_error'  : 'Reservier Datum muss im Zukunft sein',
                'check_availability'  : 'Controlier verfügbarkeit',
                'next_title'          : 'Zum einschalten vom Nächstes taste, alle notwendige Felder sollten ausgefüllt sein',
                'next'                : 'Nächstes',
                'review_title'        : 'Reservierung kontrollieren',
                'review_name'         : 'Komplette Nahme:',
                'review_street1'      : 'Strasse 1',
                'review_street2'      : 'Strasse 2',
                'review_items_for_rent' : 'Miet Gegenständen',
                'review_item'         : 'Gegenstand',
                'review_change_fee'   : 'Kaution ändern',
                'review_access_key'   : 'Zugangsschlüssel',
                'review_deposit_fee'  : 'Kaution',
                'terms_condition_title'          : 'Reservierungsbedingungen',
                'terms_condition_body_1'         : 'Ich bin',
                'terms_condition_body_2'         : 'und ich bin einverstanden mit reservierungsbedingungen.',
                'terms_condition_more'           : 'Mehr',
                'terms_condition_clear_signature': 'Unterschrift löschen',
                'terms_condition_save_signature' : 'Unterschrift speichern',
                'terms_condition_close'          : 'Schliessen',
                'terms_condition_cancel'         : 'Aufhören',
                'back_title'                     : 'Zurück und Auftrag bearbeiten',
                'review_confirm_title'           : 'Um die Bestätigen Taste zu aktivieren sollten Sie die Mietbedingungen akzeptieren.',
                'review_confirm'                 : 'Bestätigen',
                'review_submit'                  : 'Senden',
                'total_price'                    : 'Total Summe',
                'payment_note'                   : 'Bezahlung gefordert vordem einiges geliefert am',
                'back_title_simple'              : 'Zurück',
                'preauth_security'               : 'Nicht für Bezahlung, es ist eine Kaution.',
                'preauth_skipped_by_customer'    : 'Ich möchte diese Schritt ausstellen und später bezahlen',
                'preauth_skip_title'             : 'Ausstellen Pre-auth',
                'preauth_comment'                : 'Kommentar',
                'preauth_comment_required'       : 'Kommentar ist notwendig',
                'preauth_access_code'            : 'Zugangskode',
                'preauth_access_code_required'   : 'Zugangskode ist notwendig',
                'preauth_cancel'                 : 'Aufhören',
                'security_deposit'               : 'Kaution',
                'preauth_skipped'                : 'Pre-auth wurde ausgestellt',
                'preauth_credit_title_1'         : 'Ihr Creditcard muss pre-authentiziert werden',
                'preauth_credit_title_2'         : 'für Kaution. Iht Creditcard wird nicht belastet und diese  Autorisierung wird ungültig nach Rückgabe der Mietsachen.',
                'credit_card_info'               : 'Creditcard Informationen',
                'credit_card_number'             : 'Creditcard Nummer',
                'credit_card_full_name'          : 'Full Name',
                'credit_card_amount'             : 'Betrag',
                'credit_card_expire_month'       : 'Exp Monat',
                'credit_card_expire_year'        : 'Exp Jahr',
                'credit_card_cvv2'               : 'CVV2',
                'name_label'                     : 'Name',
                'pre_authorize'                  : 'Pre-auth',
                'finish_button'                  : 'Fertig',
                'preauth_access_code_invalid'    : 'Zugangskode stimmt nicht'
            },
            'nl': {
                'additional_items': '',
                'form_title'                     : 'Nieuwe reservering',
                'filling_message'                : 'Uw contactgegevens, te huren items en de gewenste huurdatum.',
                'customer_info'                  : 'Klantinformatie',
                'customer_info_phone'            : 'Telefoon',
                'customer_info_phone_error'      : 'Telefoon is verplicht veld',
                'customer_info_firstname'        : 'Voornaam',
                'customer_info_firstname_error'  : 'Voornaam is een verplicht veld',
                'customer_info_lastname'         : 'Achternaam',
                'customer_info_lastname_error'   : 'Achternaam is een verplicht veld',
                'customer_info_email'            : 'E-mail',
                'customer_info_email_error'      : 'E-mail adres is nog niet volledig',
                'customer_info_address'          : 'Adres',
                'customer_info_address1'         : 'Straatnaam en huisnummer',
                'customer_info_address2'         : 'Adresregel 2',
                'customer_info_city'             : 'Woonplaats',
                'customer_info_state'            : 'Provincie',
                'customer_info_postal_code'      : 'Postcode',
                'customer_info_country'          : 'Land',
                'customer_info_not_valid': 'De ingevoerde gegevens zijn incorrect!',
                'privacy_policy_title'   : 'Privacy verklaring',
                'privacy_policy'         : ' Verzamelt en gebruikt de door u ingevoerde gegevens met het doel om u te kunnen bereiken met betrekking tot uw huurreservering. Uw gegevens worden niet met derden gedeeld tenzij dit voor de uitvoering van uw opdracht vereist is. Uw gegevens worden niet aan derden overhandigd.',
                'field_is_required'      : '* = verplicht veld',
                'select_a_product'       : 'Selecteer ten minste 1 artikel',
                'rent_order_want_rent'   : 'Ik wil huren',
                'rent_order_item'        : 'Item',
                'rent_order_size'        : 'Grootte',
                'rent_order_qty'         : 'Hoeveelheid',
                'rent_order_available'   : '# beschikbaar',
                'rent_order_select'      : 'Selecteer te huren item',
                'rent_order_category_not_selected'  : 'Er is geen te huren item geselecteerd!',
                'rent_order_special_requirements'   : 'Overige wensen',
                'delivery_pickup_option'            : 'Afleverings/afhaal mogelijkheden',
                'delivery_pickup_option_pickup'     : 'Vestiging afhalen',
                'delivery_pickup_option_delivery'   : 'Aflevering',
                'delivery_pickup_delivery_address'  : 'Afleveradres',
                'delivery_pickup_pickup_address'    : 'Afleveradres',
                'rental_period'                     : 'Huurperiode',
                'rental_period_delivery_date'       : 'Afleverdatum',
                'rental_period_start_date'          : 'Startdatum',
                'rental_period_start_date_required' : 'Startdatum is een verplicht veld',
                'rental_period_select'              : 'Kies',
                'rental_period_desired_delivery_time'   : 'Gewenst aflevertijdstip',
                'rental_period_desired_pickup_time'     : 'Gewenste afhaaltijdstip',
                'rental_period_duration'                : 'Duur',
                'rental_period_return_date'             : 'Inleverdatum',
                'rental_period_return_time'             : 'Inlevertijdstip',
                'rental_period_invalid_reservation_date': 'Datum is niet correct!',
                'rental_period_reservation_date_error'  : 'De reserveringsdatum moet in de toekomst zijn!',
                'check_availability'  : 'Check beschikbaarheid',
                'next_title'          : 'Om door te kunnen gaan moeten alle verplichte velden ingevuld zijn.',
                'next'                : 'Volgende',
                'review_title'        : 'Check reserveringsgegevens',
                'review_name'         : 'Volledige naam:',
                'review_street1'      : 'Straatnaam en huisnummer',
                'review_street2'      : 'Adres 2',
                'review_items_for_rent' : 'Gehuurde items',
                'review_item'         : 'item',
                'review_change_fee'   : 'Borg aanpassen',
                'review_access_key'   : 'Toegangscode',
                'review_deposit_fee'  : 'Borg',
                'terms_condition_title'          : 'Reserveringsvoorwaarden',
                'terms_condition_body_1'         : 'Ik ben',
                'terms_condition_body_2'         : 'en ik stem in met de huurvoorwaarden.',
                'terms_condition_more'           : 'Lees meer',
                'terms_condition_clear_signature': 'Handtekening verwijderen',
                'terms_condition_save_signature' : 'Handtekening opslaan',
                'terms_condition_close'          : 'Sluit',
                'terms_condition_cancel'         : 'Beëindig',
                'back_title'                     : 'Terug/bewerk opdracht',
                'review_confirm_title'           : 'Om te bevestigen dient u akkoord te zijn met de huurvoorwaarden',
                'review_confirm'                 : 'Bevestigen',
                'review_submit'                  : 'Verstuur',
                'total_price'                    : 'Prijs',
                'payment_note'                   : 'Betaling is vereist voordat items worden geleverd aan',
                'back_title_simple'              : 'Terug',
                'preauth_security'               : 'Dit is nog geen betaling, slechts een borgstelling.',
                'preauth_skipped_by_customer'    : 'Ik wil op een later tijdstip betalen en deze stap nu overslaan.',
                'preauth_skip_title'             : 'Overslaan van de pre-authenticatie',
                'preauth_comment'                : 'Opmerking',
                'preauth_comment_required'       : 'U dient een opmerking te geven als uitleg.',
                'preauth_access_code'            : 'Toegangscode',
                'preauth_access_code_required'   : 'Toegangscode is vereist',
                'preauth_cancel'                 : 'Beëindig',
                'security_deposit'               : 'Borg',
                'preauth_skipped'                : 'PRE AUTHORISATIE OVERGESLAGEN',
                'preauth_credit_title_1'         : 'Uw creditcard moet worden ge-pre-authoriseerd voor de borg.',
                'preauth_credit_title_2'         : 'Als borg. Uw creditcard word nog niet belast en de authorisatie wordt automatisch beëindigd na het terugbrengen van het gehuurde.',
                'credit_card_info'               : 'Creditcard informatie',
                'credit_card_number'             : 'Creditcard nummer',
                'credit_card_full_name'          : 'Full Name',
                'credit_card_amount'             : 'Bedrag',
                'credit_card_expire_month'       : 'Exp maand',
                'credit_card_expire_year'        : 'Exp jaar',
                'credit_card_cvv2'               : 'CVV2',
                'name_label'                     : 'Naam',
                'pre_authorize'                  : 'Pre-authenticatie',
                'finish_button'                  : 'Af hebben',
                'preauth_access_code_invalid'    : 'Toegangscode klopt niet'
            },
            'fr': {
                'form_title': 'French title',
                'filling_message': 'French message'
            }
        };
                
        $scope.customer_lookup = customer_lookup;
        $scope.need_access_code_to_skip_pre_auth = need_access_code_to_skip_pre_auth;
        $scope.countries = [];
        $scope.productCategories = [];
        $scope.productOptions = [,];
        $scope.productCategoryAttributes = {};
        $scope.order = {
            is_admin: is_admin,
            rental_type_id: rental_type_id,
            rental_type_name: rental_type_name,
            needs_preauthorize: needs_preauthorize,
//            add promotion
            promotion_code: null,
            flyer_id: null,
            discount_amount: 0,
            promotion_code_discount_fix: 0,
//            add promotion end
              renters: { 
                0: {
                    name: 'Customer full name',
                    agree: false, 
                    signed: false,
                    signature: false,
                    is_minor : false,
                    type: 'multiple',
//                    calendar frontend next line only
//change ui
//                    products_for_rent: {0: {category_id: null, product_id: null, selected_option: null, qty: 1, category_image: null, category_specification: null, linksrc: null, attributes: {}}}, 
                    products_for_rent: {},
//                    change ui end
                    products_for_rent_count: 0, 
                    general_type: null
                }
            }, 
            renters_count: 1,
            products_for_borrow : {},
            products_for_borrow_count: 0,
            products_for_purchase: {},           
            products_for_purchase_count: 0,
            total_guarantee_fee: 0,
            total_purchase_price: 0,
            total_price: 0,
            skip_pre_auth: (needs_preauthorize ? false : true),
            skip_pre_auth_comment: null,
            credit_cards: {
                1: {
                    id: null,
                    amount: 0,
                    type: 'visa',
                    cc_number: null,
                    cc_expire_month: null,
                    cc_expire_year: null,
                    cc_cvv2: null,
                    cc_first_name: null,
                    cc_last_name: null,
                    cc_token: null
                }
            },
            customer_has_rent_item: false,
            customer_data_is_valid: false,
            credit_cards_count: 1,
            comment: null,
            has_delivery_cost : 0,
            delivery_costs: 0,
            delivery_postal_name: 'not_identified',
            zipcode : 'not_identified',
            order_is_for_future: true,
            order_from_date: null,
            order_from_time: null,
            order_to_date: null,
            order_to_time: null,
            order_duration: null,
            is_processing: false,
            customer_note: null,
            selected_delivery_option: (delivery_type === 'required') ? 'delivery' : 'store_pickup',
            delivery_address: null,
            signature_is_skipped: false
        };

        $scope.languageChanged = function(locale){
            $scope.locale = locale;
        }

        $scope.from_time_array = null;
        var fromTimeSpans = $http.get('/getReservationTimeSpans/from');
        fromTimeSpans.success(function(data) {
            $scope.from_time_array = data;
            // Alireza : set current time in from_time select
            var now = new Date();
            var cur = now.getHours()*100 + now.getMinutes();
            var sId = 0;
            var found = 0;
            for( i=data.length-1; i>=0 && found==0; i--) {
                var time_parts = data[i].value.split(':', 3);
                var tm = parseInt(time_parts[0]) * 100 + parseInt(time_parts[1]);
                if ( cur>tm ) {
                    sId = i+1;
                    found = 1;
                }
            } 
            if($scope.from_time_array[sId] ){
                $scope.order.order_from_time = $scope.from_time_array[sId].value;
            }
            /////////////
        });
                       
        $scope.to_time_array = null;
        var toTimeSpans = $http.get('/getReservationTimeSpans/to');
        toTimeSpans.success(function(data) {
            $scope.to_time_array = data;
        });

        $scope.date_picker_options = {
            minDate: new Date(),
            initDate: new Date(),
            showWeeks: false
        };

        $scope.default_from_date = new Date();
        $scope.default_from_date.setHours(0);
        $scope.default_from_date.setMinutes(0);
        $scope.default_from_date.setSeconds(0);
        
        $scope.default_to_date = new Date();
        $scope.default_to_date.setHours(0);
        $scope.default_to_date.setMinutes(0);
        $scope.default_to_date.setSeconds(0);

        $scope.default_to_date.setDate($scope.default_from_date.getDate());
        $scope.order.order_from_date = $scope.default_from_date;
        //        calendar frontend
        
        $window.addToReservation = function(text) {
            var start = window.angular.element('#order_from_date').scope();
            var _datefull = new Date(text);
            var datefull = $scope.toUTCDate(_datefull);
            start.order.order_from_date = datefull;
            start.$apply();
//            document.getElementById('order_from_date').value = ""+text;
        };
      
//        calendar frontend end
        $scope.updateReservationEndTime = function() {    
            if ($scope.use_duration) {
                $scope.order.order_to_date = new Date($scope.order.order_from_date.getFullYear(), $scope.order.order_from_date.getMonth(), $scope.order.order_from_date.getDate());
                $scope.order.order_to_date.setHours(0);
                $scope.order.order_to_date.setMinutes(0);
                $scope.order.order_to_date.setSeconds(0);
            }
            if ( true || $scope.rental_time_type == 'hour') {
                // Alireza: All durations are hourly
                if ($scope.order.order_from_time) {
                    var from_time_parts = $scope.order.order_from_time.split(':', 3);
                    var hour = parseInt(from_time_parts[0]);
                    var minute = parseInt(from_time_parts[1]);

                    $scope.order.order_from_date.setHours(hour);
                    $scope.order.order_from_date.setMinutes(minute);

                    if ($scope.use_duration) {
                        if ($scope.order.order_duration < 24) {
                            $scope.order.order_to_date.setHours(hour + ($scope.order.order_duration ? $scope.order.order_duration : $scope.default_duration));
                            $scope.order.order_to_date.setMinutes(minute);
                            $scope.order.order_to_time = hour + ($scope.order.order_duration ? $scope.order.order_duration : $scope.default_duration) + ':' + from_time_parts[1] + ':00';
                        } else {
                            var duration_days = Math.floor($scope.order.order_duration / 24);
                            var duration_hours = $scope.order.order_duration % 24;
                            //TODO: need some tests to make sure changing $scope.order.order_to_date.getDate() to $scope.order.order_from_date.getDate() is correct.
                            //Also not sure if it covers end of month/year situations or not?
                            $scope.order.order_to_date.setDate($scope.order.order_from_date.getDate() + duration_days);
                            $scope.order.order_to_date.setHours(hour + duration_hours);
                            $scope.order.order_to_date.setMinutes(minute);
                            $scope.order.order_to_time = ((hour < 10) ? '0' : '') + parseInt(hour + duration_hours) + ':' + from_time_parts[1] + ':00';
                        }
                    } else {
                        if ($scope.order.order_to_time) {
                            var to_time_parts = $scope.order.order_to_time.split(':', 3);
                            var to_hour = parseInt(to_time_parts[0]);
                            var to_minute = parseInt(to_time_parts[1]);
                            
                            $scope.order.order_to_date.setHours(to_hour);
                            $scope.order.order_to_date.setMinutes(to_minute);
                        } else {
                            $scope.order.order_to_time = $scope.order.order_from_time;
                        }
                    }
                }
            }
        };
        
        if (!$scope.use_duration) {
            $scope.order.order_to_date = $scope.default_to_date;
        }
        $scope.updateReservationEndTime();
        
        $scope.filtered_category_attributes = {};
        $scope.signature_is_enabled = signature_is_enabled;
        
        $scope.order.renters[0].general_type =  $scope.order.rental_type_name;

        $scope.terms_and_conditions = null;
        var termsPromise = $http.get('/orders/rents/new/getTermsAndConditions/' + $scope.order.rental_type_id);
        termsPromise.success(function(data) {
            $scope.terms_and_conditions_title = data.title;
            $scope.terms_and_conditions = $sce.trustAsHtml(data.body);
        });

        var respPromise = $http.get('/orders/rents/new/getAttributesListOfValues');
        respPromise.success(function(data) {
            $scope.attributes_list_of_values = data;
        });

        var responsePromise = $http.get("/orders/rents/new/getProductCategories/" + $scope.order.rental_type_id + "/" + ($scope.order.is_admin ? 1 : 0));
        responsePromise.success(function(data, status, headers, config) {
            $scope.productCategories = data;
            
            var _category = $filter('getRentalParentCategoriesByRentalTypeId')($scope.productCategories, $scope.order.rental_type_id);
//            change ui comment below out
//            angular.forEach(_category,  function(value, index) {
//                    $scope.addNewRentItem(0, value);
//            });
        }).error(function(data, status, headers, config) {
            console.log('error!');
        });

        $scope.rentalPeriods = null;
        var responsePromise = $http.get("/orders/rents/reservation/getRentalPeriods");
        responsePromise.success(function(data, status, headers, config) {
            $scope.rentalPeriods = data;
        });

        var responsePromise = $http.get('/orders/rents/new/getProductCategoryAttributes');
        responsePromise.success(function(data) {
            $scope.productCategoryAttributes = data;
        });

        var respPromise = $http.get('/getListOfCountries');
        respPromise.success(function(data) {
            $scope.countries = data;
        });

        $scope.item_price = [,];
        $scope.item_tax_percentage = [,];
        
        $scope.current_renter_id = 0;
        $scope.resetCurrentRenterCheckBox = function() {
            $scope.order.renters[$scope.current_renter_id].agree = false;
        };
        
        $scope.setCurrentRenterCheckBox = function() {
            $scope.order.renters[$scope.current_renter_id].agree = true;
        };
        
        $scope.setCurrentRenter = function(renter_id) {
            $scope.current_renter_id = renter_id;
        };
        
        $scope.updateOption = function(renter_index) {
            
        };
        
        $scope.getItemRentPrice= function(renter_index, category_id) {
            if (!$scope.order.order_from_date || !$scope.order.order_to_date) {
                return 0;
            }

            $scope.item_price[renter_index, category_id] = 0;
            $scope.wait = true;
            var calcPricePromise = $http.post('/orders/rents/reservation/calculateOrderPrice', {category_id: category_id, start_date: $scope.order.order_from_date, end_date: $scope.order.order_to_date});
            calcPricePromise.success(function(data) {}).then(function (response) {
                    $scope.wait = false;
                    $scope.item_price[renter_index, category_id] = parseFloat(response.data.item_price);
                    $scope.item_tax_percentage[renter_index, category_id] = parseFloat(response.data.item_tax_percentage);
                    $scope.updateOrderTotalPrice(); // Alireza
                })
        };
        
        $scope.renterIsMinorClicked = function(){
            if(document.getElementById('renter_is_minor' + $scope.current_renter_id).checked){
                $scope.order.renters[$scope.current_renter_id].is_minor = true;
            }else{
                $scope.order.renters[$scope.current_renter_id].is_minor = false;
            }
        };

        $scope.updateRentItems = function(renter_index){            
            $scope.order.customer_has_rent_item = true;
            
//            if ($scope.is_online_reservation && $scope.use_duration && $scope.order.order_from_time) {
//            if ($scope.is_online_reservation && $scope.use_duration) {
            if (duration_type=='fixed' || $scope.is_online_reservation) {
                $scope.updateReservationEndTime();
            }

            if(Object.keys($scope.order.renters[renter_index].products_for_rent).length > 0) {
                angular.forEach($scope.order.renters[renter_index].products_for_rent, function(product_for_rent, index){
                    if(product_for_rent.category_id) {
                        var _category = $filter('getProductCategoryById')($scope.productCategories, product_for_rent.category_id);
                        if (product_for_rent.qty) {
                            $scope.order.total_guarantee_fee += _category.guarantee_fee * product_for_rent.qty;
                            $scope.getItemRentPrice(renter_index, product_for_rent.category_id);
                            if ($scope.show_category_image_to_customer) {
                                $scope.loadImage(renter_index, index, product_for_rent.category_id);
                            }
                            if ($scope.show_category_spec_to_customer) {
                                $scope.loadSpecification(renter_index, index, product_for_rent.category_id);
                            }
                            //calendar frontend
                            if ($scope.show_availability_calendar_when_place_order) {
                                $scope.addLink(renter_index, index, product_for_rent.category_id);
                            }
//                            calendar frontend end
                        } else {
                            $scope.order.customer_has_rent_item = false
                        }
                        if($scope.show_size_to_customer) {
                            var mybody = angular.element(document).find('body');
                            mybody.addClass('wait'); // set cursor to hourglass             
                            setTimeout(function() {
                                $http.get("/orders/rents/reservation/getProductOptions/" + _category.id)
                                    .success(function(data, status, headers, config) {
                                        mybody.removeClass('wait');  // set cursor to normal
                                        $scope.productOptions[product_for_rent.category_id] = data;
                                    }).error(function(data){
                                        // $scope.$apply();
                                        mybody.removeClass('wait');  // set cursor to normal
                                        toastr.error(data);   
                                    });
                            }, 0);
                        }
                    } else {
                        $scope.order.customer_has_rent_item = false
                    }
                });
            } else {
                $scope.order.customer_has_rent_item = false;
            }
            $scope.checkProductAvailability();
            
            setTimeout(function () {
                $scope.getDeliveryPrice();
            }, 0);
            //            $scope.updateOrderTotalPrice();
        };

        $scope.updateRentItemsForAllRenters = function() {
            if(Object.keys($scope.order.renters).length > 0) {
                $scope.order.total_guarantee_fee = 0;
                $scope.order.total_price = 0;

                angular.forEach($scope.order.renters, function(renter, renter_index){
                    $scope.updateRentItems(renter_index);
                });
            }
            //add promotion
            if ($scope.allow_promotion_code_frontend == 1) {
                $scope.getPromotionCode();
            }
            //add promotion end
        };
        
        $scope.updateOrderTotalPrice = function() {
//            add promotion
            var total_discount = 0;
            var total_rent_amount = 0;
            var rental_items_tax_amount = 0;
            if(Object.keys($scope.order.renters).length > 0) {
                var orderToalPrice = $scope.order.total_purchase_price;
                angular.forEach($scope.order.renters, function(renter, renter_index){
                    angular.forEach(renter.products_for_rent, function(product_for_rent){
                        if (product_for_rent.category_id) {
                            orderToalPrice += $scope.item_price[renter_index, product_for_rent.category_id] * product_for_rent.qty;
                            rental_items_tax_amount += $scope.item_price[renter_index, product_for_rent.category_id] * ($scope.item_tax_percentage[renter_index, product_for_rent.category_id] / 100) * product_for_rent.qty;
                            if ($scope.promotion_code_is_valid == 1) {
                                total_rent_amount += $scope.item_price[renter_index, product_for_rent.category_id] * product_for_rent.qty;
                            }
                        }
                    })
                });
                if ($scope.promotion_code_is_valid == 1) {
                    if ($scope.promotion_code_type == 'fixed_value') {
                        rental_items_tax_amount = 0;
                        if ($scope.apply_separately_to_rent_items == 0) {
                            total_discount = $scope.promotion_code_discount;
                            //Calculate tax by prorating the discount on rental items.
                            angular.forEach($scope.order.renters, function(renter, renter_index){
                                angular.forEach(renter.products_for_rent, function(product_for_rent){
                                    if (product_for_rent.category_id) {
                                        var item_prorated_discount = (total_discount / total_rent_amount) * $scope.item_price[renter_index, product_for_rent.category_id];
                                        rental_items_tax_amount += ($scope.item_price[renter_index, product_for_rent.category_id] - item_prorated_discount) * ($scope.item_tax_percentage[renter_index, product_for_rent.category_id] / 100) * product_for_rent.qty;
                                    }
                                })
                            });
                        } else {
                            var rental_item_count = 0;
                            angular.forEach($scope.order.renters, function(renter, renter_index){
                                angular.forEach(renter.products_for_rent, function(product_for_rent){
                                    if (product_for_rent.category_id) {
                                        rental_item_count += product_for_rent.qty;
                                        var item_amount_after_discount = $scope.item_price[renter_index, product_for_rent.category_id] - $scope.promotion_code_discount;
                                        if (item_amount_after_discount < 0) {
                                            item_amount_after_discount = 0;
                                        }
                                        rental_items_tax_amount += item_amount_after_discount * ($scope.item_tax_percentage[renter_index, product_for_rent.category_id] / 100) * product_for_rent.qty;
                                    }
                                });
                            });
                            total_discount = rental_item_count * $scope.promotion_code_discount;
                        }
                        if (total_discount >= total_rent_amount) {
                            total_discount = total_rent_amount;
                        }
                    } else {
                        total_discount = total_rent_amount * $scope.promotion_code_discount / 100;
                        rental_items_tax_amount -= rental_items_tax_amount * $scope.promotion_code_discount / 100;
                    }
                } else {
                    total_discount = 0;
                }

                if (total_discount <= orderToalPrice) {
                    $scope.order.total_price = (orderToalPrice - total_discount);
                    $scope.order.discount_amount = total_discount;
                } else {
                    $scope.order.total_price = 0;
                    $scope.order.discount_amount = orderToalPrice;
                }
//                add promotion end

                $scope.order.total_price += $scope.order.delivery_costs + rental_items_tax_amount;
                $scope.order.total_price = Math.round($scope.order.total_price * 100) / 100;
            } 
        };
        
        $scope.updatePurchaseItems = function() {
            $scope.order.total_purchase_price = 0;
            angular.forEach($scope.order.products_for_purchase, function(value, index){
                var _category = $filter('getProductCategoryById')($scope.productCategories, value.category_id);
                if ($scope.credit_card_action == 'charge-full') {
                    $scope.order.total_purchase_price +=  _category.sale_price_with_tax * value.qty;
                } else {
                    $scope.order.total_purchase_price +=  _category.sale_price * value.qty;
                }
            });
            $scope.order.total_purchase_price = Math.round($scope.order.total_purchase_price * 100) / 100; // Alireza : .2 digits precision
            $scope.updateOrderTotalPrice(); // Alireza 
        };

        $scope.updateSearch = function() {
            if (!$scope.customer_lookup) {
                return ;
            }
            var responsePromise;
            
            var mybody = angular.element(document).find('body');
            mybody.addClass('wait'); // set cursor to hourglass
            if ($scope.customer_lookup_by_email) {
                if (!$scope.customer.email || $scope.customer.email=="-")
                    return;

                responsePromise = $http.get("/orders/rents/new/searchCustomer", {
                    params: {
                        email: $scope.customer.email
                    }
                });
            } else {
                if (!$scope.customer.phone || $scope.customer.phone=="-" || $scope.customer.phone.length < 4)
                    return;

                responsePromise = $http.get("/orders/rents/new/searchCustomer", {
                    params: {
                        phone: $scope.customer.phone
                    }
                });
            }
            
            responsePromise.success(function(customer, status, headers, config) {
                if(customer.id) {
                    $scope.customer = customer;
                } else {
                    /*$scope.customer = {
                        phone: $scope.customer.phone,
                        address: {},
                        accommodation: {},
                        creditCards: []
                    }*/
                }
                mybody.removeClass('wait');  // set cursor to normal
                $scope.customerValidate();
            });
        };

        $scope.customerValidate = function(){
            var customer = $scope.customer;

            $scope.order.customer_data_is_valid = true;
            if(!customer.first_name || !customer.last_name) {
                $scope.order.customer_data_is_valid = false;
            }
            if ($scope.customer_email_is_required && !customer.email) {
                $scope.order.customer_data_is_valid = false;
            }
            
            if($scope.customer_phone_is_required && !customer.phone) {
                $scope.order.customer_data_is_valid = false;
            }
            
            if ($scope.customer_address_type == 'detailed') {
                if (!customer.address.street_1 || !customer.address.city || !customer.address.state_code || !customer.address.postal_code || !customer.address.country_code) {
                    $scope.order.customer_data_is_valid = false;    
                }
            }
            
            if ($scope.order.customer_data_is_valid) {
                $scope.order.renters[0].name = $scope.customer.first_name + ' ' + $scope.customer.last_name;
            }
        };

        $scope.getProductCategoryName = function(item) {
            var _category = $filter('getProductCategoryById')($scope.productCategories, item.category_id);
            return _category.name;
        };

        $scope.getProductOptionName = function(category_id, product_id) {
            if($scope.productOptions[category_id]) {
                var _product = $filter('getProductOptionById')($scope.productOptions[category_id], product_id);
                if (_product) {
                    return _product.option;
                }
            }
        };
        $scope.getProductCategoryGuaranteeFee = function(item) {
            var _category = $filter('getProductCategoryById')($scope.productCategories, item.category_id);
            return _category.guarantee_fee;
        };

        $scope.getProductCategoryRentPriceType = function(item) {
            var _category = $filter('getProductCategoryById')($scope.productCategories, item.category_id);
            return _category.rent_price_type;
        };

        $scope.getProductCategorySalePrice = function(item) {
            var _category = $filter('getProductCategoryById')($scope.productCategories, item.category_id);
            return _category.sale_price;
        };

//Not used?!
        $scope.addNewCreditCard = function(){
            $scope.order.credit_cards_count++;
            $scope.order.credit_cards[$scope.order.credit_cards_count] =  {
                id: null,
                amount: 0,
                type: 'visa',
                cc_number: null,
                cc_expire_month: null,
                cc_expire_year: null,
                cc_cvv2: null,
                cc_first_name: null,
                cc_last_name: null,
                cc_token:null
            };
        };
        
//Not used?!
        $scope.removeCreditCard = function(cc_id) {
            delete $scope.order.credit_cards[cc_id];
        };

        $scope.toUTCDate = function(date){
            var _utc = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
            return _utc;
        };

        $scope.changeReservationType = function(default_reservation_type){
            var url = window.location.href.replace('/immediate','');
            url = url.replace('/future','');
            location.href = url+'/'+default_reservation_type;
        };

        $scope.customerHasOneSelectedItem = function() {
            if ($scope.order.customer_has_rent_item) return true;
            
            angular.forEach($scope.order.renters, function(renter, renter_index){
                if(Object.keys(renter.products_for_rent).length > 0) {
                    var product_count = 0;
                    angular.forEach(renter.products_for_rent, function(product_for_rent, index){
                        if (product_for_rent.category_id && product_for_rent.qty) product_count++;
                    });
                    if (!product_count) return false;
                } else {
                    return false;
                }
            });
            
            return true;
        };
        
        $scope.errorMessage = [];
        $scope.isValidDate = function() {
            $scope.errorMessage['order_date'] = "";
            if (!$scope.order.order_from_date) {
                $scope.errorMessage['order_date'] = $scope.resource[$scope.locale]['rental_period_invalid_reservation_date'];
                return false;
            }
            if ($scope.toUTCDate($scope.order.order_from_date) < $scope.toUTCDate($scope.default_from_date)) {
                $scope.errorMessage['order_date'] = $scope.resource[$scope.locale]['rental_period_reservation_date_error'];
                return false;
            }
            
            //TODO: check if dates and times are the same
            
            if ($scope.order.order_to_date && ($scope.order.order_from_date > $scope.order.order_to_date)) {
                $scope.order.order_to_time = $scope.order.order_from_time; 
                $scope.order.order_to_date.setFullYear($scope.order.order_from_date.getFullYear());
                $scope.order.order_to_date.setMonth($scope.order.order_from_date.getMonth());
                $scope.order.order_to_date.setDate($scope.order.order_from_date.getDate());
                $scope.order.order_to_date.setHours($scope.order.order_from_date.getHours());
                $scope.order.order_to_date.setMinutes($scope.order.order_from_date.getMinutes());
                $scope.order.order_to_date.setSeconds($scope.order.order_from_date.getSeconds());
//                $scope.errorMessage = "'Start Date' should not be greater than 'End Date'";
                return true;
            }
            
            return true;
        };
        
        $scope.hasError = [];
        $scope.step1ExitValidation = function() {
            if ($scope.order.customer_data_is_valid && $scope.customerHasOneSelectedItem()) {
                $scope.order.renters[0].name = $scope.customer.first_name + ' ' + $scope.customer.last_name;
            }
            
            if (!$scope.order.customer_data_is_valid) {
                $scope.errorMessage['customer'] = $scope.resource[$scope.locale]['customer_info_not_valid'];
                $scope.hasError['customer'] = true;

                return false;
            } else {
                $scope.hasError['customer'] = false;
            }
            
            if (!$scope.customerHasOneSelectedItem()) {
                $scope.errorMessage['category'] = $scope.resource[$scope.locale]['rent_order_category_not_selected'];
                $scope.hasError['category'] = true;
                
                return false;
            } else {
                $scope.hasError['category'] = false;                
            }
            
//            if (!$scope.checkProductAvailability()) {
//                return false;
//            }
            return true;
        };

        $scope.skipTermsAndConditions = function() {
            $scope.order.signature_is_skipped = true;
        }
        
        $scope.step2ExitValidation = function() {
//            if (!$scope.step1ExitValidation()) {
//                return true;
//            }
            
//            var rent_items_has_data = true;
//            angular.forEach($scope.order.renters, function(renter) {
//                angular.forEach(renter.products_for_rent, function(rent_item){
//                    if(!rent_item.category_id) {
//                        rent_items_has_data = false;
//                    }
//                });
//            });

//            if ($scope.use_duration) {
                $scope.updateOrderTotalPrice();
//            }

            if(!$scope.customerHasOneSelectedItem()) {
                return true;
            }
            
            if ($scope.order.is_admin && !show_signature_in_backend) {
                return false;
            }
            
            if ($scope.order.signature_is_skipped) {
                return false;
            }
            var all_renters_valid = true;
            angular.forEach($scope.order.renters, function(renter){
                if(!renter.name || !renter.agree) {
                    all_renters_valid = false;
                }
                if ($scope.signature_is_enabled && !renter.signed) {
                    all_renters_valid = false;
                }
            });
            return !all_renters_valid;
        };
//        one page
        $scope.step1agreement = function() {
            if ($scope.order.is_admin && !$scope.show_signature_in_backend) {
                return false;
            }
            
            if ($scope.order.signature_is_skipped) {
                return false;
            }
            var all_renters_valid = true;
            angular.forEach($scope.order.renters, function(renter){
                if(!renter.name || !renter.agree) {
                    all_renters_valid = false;
                }
                if ($scope.signature_is_enabled && !renter.signed) {
                    all_renters_valid = false;
                }
            });
            return !all_renters_valid;
        };
//one page end
        $scope.step3isValid = function() {
            if($scope.order.skip_pre_auth) {
                if($scope.order.is_admin ) {
                    if($scope.order.skip_pre_auth_comment) {
                        return true;
                    }
                } else {
                    return true;
                }
            }

            var total_amount = 0;
            var credit_cards_are_valid = true;
            var validate_only = true;
            
            angular.forEach($scope.order.credit_cards, function(cc){
                if(parseFloat(cc.amount) == 0 || cc.amount === undefined) {
                    if (validate_only) {
                        cc.amount = 0;
                    } else {
                        credit_cards_are_valid = false;
                    }
                }

                total_amount += parseFloat(cc.amount);

                if(!cc.id) {
                    if ((!validate_only && !cc.amount) || !cc.cc_number || !cc.cc_token || !cc.cc_expire_month || !cc.cc_expire_year || !cc.cc_cvv2 || !cc.cc_first_name) {
                        credit_cards_are_valid = false;
                    }
                }
            });

            return (total_amount == $scope.order.total_guarantee_fee && credit_cards_are_valid);
        };

        $scope.isValidOrder = function(order) {
            if (!order.order_from_date || !order.order_to_date) {
                return false;
            }
            
            if (!order.customer_has_rent_item) {
                return false;
            }
            return true;
        };
        
        $scope.$watch('order.order_from_date', function() {
            $scope.updateRentItemsForAllRenters();
        });
         
        $scope.$watch('order.order_to_date', function() {
            if (!$scope.use_duration) {
                $scope.updateRentItemsForAllRenters();
            }
        });
         
        $scope.wait = true;
        $scope.checkProductAvailability = function() {
            $scope.wait = true;
            if (!$scope.isValidOrder($scope.order)) {
                return false;
            }
            
            if (!$scope.must_check_availability) {
                $scope.wait = false;
                return true;
            }
            
            $http.post('/orders/rents/new/checkAvailability', {order: $scope.order})
                .success(function(data){

                }).error(function(data){
                    toastr.error(data);
                    
                }).then(function (response) {
                    $scope.wait = false;
                    if (response.data === 1) {
                        return true;
                    } else {
                        return false;
                    }
                });
                
//                return true;
        };

        $scope.getNumberOfAvailable = function() {
            if (!$scope.isValidOrder($scope.order)) {
                return false;
            }
            $scope.qty_available = [];
            var mybody = angular.element(document).find('body');
            mybody.addClass('wait'); // set cursor to hourglass
             setTimeout(function() {
            $http.post('/orders/rents/new/getNumberOfAvailable', {order: $scope.order})
                .success(function(data){
                        // $scope.$apply();
                        mybody.removeClass('wait');  // set cursor to normal
                    $scope.qty_available = data;
                }).error(function(data){
                        // $scope.$apply();
                        mybody.removeClass('wait');  // set cursor to normal
                    toastr.error(data);   
                });            
             }, 0);
        };

        //When return from delivery to pickup
        $scope.updateDeliveryAddressValid = function() {
            $scope.delivery_address_is_valid = 1;
            $scope.detailed_delivery_address_is_valid = 1;
            $scope.hotel_delivery_address_is_valid = 1;
        };
        
        $scope.validateDeliveryAddress = function() {
            if ($scope.order.delivery_address) {
                $scope.delivery_address_is_valid = 1;
            } else {
                $scope.delivery_address_is_valid = 0;
            }
            $scope.updateDetailedDelivery();
        };
        $scope.updateDetailedDelivery = function() {
            if ($scope.customer_delivery_address_type == 'detailed') {
                $scope.detailed_delivery_address_is_valid = 0;
                if ($scope.order.delivery_street_address && $scope.order.delivery_city_address && $scope.order.delivery_state_address && $scope.delivery_cost_type=='distance_based') {
                    if ($scope.order.zipcode != null && $scope.order.zipcode != '' && $scope.order.zipcode != 'not_identified') {
                        $scope.detailed_delivery_address_is_valid = 1;
                    } 
                } else if ($scope.order.delivery_street_address && $scope.order.delivery_city_address && $scope.order.delivery_state_address && $scope.delivery_cost_type!='distance_based') {
                    if ($scope.order.delivery_post_code) {
                        $scope.detailed_delivery_address_is_valid = 1;
                    }
                }
            }
            
            if ($scope.customer_delivery_address_type == 'hotel') {
                $scope.hotel_delivery_address_is_valid = 0;
                if ($scope.order.hotel_name && $scope.order.hotel_room && $scope.order.hotel_address && $scope.order.hotel_renter_name && $scope.order.hotel_phone) {
                    $scope.hotel_delivery_address_is_valid = 1; 
                } 
            }
        };
        
        
       //Delivery cost calculation methods
       
       $scope.getDeliveryPrice = function() {
            $scope.wait = true;
            $scope.order.delivery_costs = 0; // Alireza : in case the PC is invalid
            if ($scope.order.selected_delivery_option == 'delivery' && !$scope.order.is_processing){ // Alireza : Don't calculate while processing
                var calcDelivery = $http.post('/orders/rents/reservation/calculateDeliveryCost', { order: $scope.order });
                    calcDelivery.success(function(data) {
                    }).then(function (response) {
                        $scope.wait = false;
                        $scope.delivery_cost = parseFloat(response.data);
                        if ($scope.delivery_cost != 0){    
                            $scope.order.has_delivery_cost = 1;
                            $scope.order.delivery_costs = $scope.delivery_cost;
                        }
                });   
            }
        };
        
        //Zone based
        $scope.getZones = function() {
            //Fix delivery_option was not delivery if the type was required. Which does not make sense. This logic can be added somewhere else.
             if ($scope.delivery_type == 'required'){
                 $scope.order.selected_delivery_option = 'delivery'; 
             }
             //end fix
            $scope.delivery_postal_codes = 'not_zone_based';
            var zoneBasedPostalCode = $http.post("/orders/rents/reservation/getZoneBasedOptions", { order: $scope.order });
            zoneBasedPostalCode.success(function(data){
            }).then(function (response) {     
                $scope.delivery_postal_codes = response.data;
            });
        };
         
        $scope.updateDeliveryPostalName= function() {
            var updatePostalName = $http.post("/orders/rents/reservation/updateDeliveryPostalName", { order: $scope.order });
            updatePostalName.success(function(data){
            }).then(function (response) {     
                $scope.order.delivery_postal_name = response.data;
            });
        };
         
        $scope.clearPostalName = function(){
            $scope.order.delivery_postal_name = 'not_identified';
            $scope.order.delivery_postal_names = "";
        };
         
        $scope.updatePostalName = function(){
            $scope.order.delivery_postal_name = $scope.order.delivery_postal_names;
            $scope.getDeliveryPrice(); // Alireza : calculate delivery cost
        };
         
        //Distance based 
        $scope.getDeliveryType = function() {
            $scope.delivery_cost_type = null;
            var deliveryCostType = $http.post("/orders/rents/reservation/deliveryCostType", { order: $scope.order });
            deliveryCostType.success(function(data){
            }).then(function (response) {     
                $scope.delivery_cost_type = response.data;
            });
        };
         
        $scope.updateZipcode = function(){
            var updateZipCode = $http.post("/orders/rents/reservation/updateZipCode", { order: $scope.order });
            updateZipCode.success(function(data){          
            }).then(function (response) {     
                $scope.order.zipcode = response.data;
            });
         };
         
        $scope.clearZipcode = function(){
            $scope.order.zipcode = 'not_identified';
            $scope.order.delivery_costs = 0;
            $scope.order.delivery_costs = 0;
            $scope.order.has_delivery_cost = 0;
            $scope.delivery_cost = 0;
        };
        
        //add promotion sam sam
        $scope.getPromotionCode = function() {
            var mybody = angular.element(document).find('body');
            mybody.addClass('wait'); // set cursor to hourglass
            $http.post('/orders/rents/new/getPromotionCode', {order: $scope.order}).success(function(data){
                        mybody.removeClass('wait');  // set cursor to normal
                if ($scope.order.promotion_code) {    
                    $scope.promotion_code_is_valid = data.status;
                    $scope.promotion_code_type = data.type;
                    $scope.promotion_code_discount = data.discount;
                    $scope.order.flyer_id = data.flyer_id;
                    if (data.type == 'fixed_value') {
                        $scope.order.promotion_code_discount_fix = data.discount;
                        $scope.apply_separately_to_rent_items = data.apply_separately_to_rent_items;
                    }
                } else {
                    $scope.promotion_code_is_valid = null;
                    $scope.promotion_code_type = null;
                    $scope.promotion_code_discount = null;
                    $scope.order.flyer_id = null;
                    $scope.order.promotion_code_discount_fix = 0;
                    $scope.apply_separately_to_rent_items = 0;
                    $scope.order.discount_amount = 0;
                }
            });
        };
        //add promotion end

        $scope.finishedWizard = function(token_id) {
            $scope.order.is_processing = true;
            $http.post('/orders/rents/new/ajaxSaveReservation', {cc_token: $rootScope.cc_token, order: $scope.order, customer: $scope.customer, locale: $scope.locale, is_online_reservation: $scope.is_online_reservation})
                .success(function(data, status, headers, config){
                    window.location = data;
                }).error(function(data){
                    $scope.wait = false;
                    $scope.order.is_processing = false;
                    toastr.error(data);
                });
        };

//Not used?!
        $scope.addNewRentItemSingle = function(renter_index, item) {
             angular.forEach($scope.productCategories, function(category){
                if(category.parent_id == item.id && category.is_for_purchase && category.type == 'rent') {
                    $scope.order.renters[renter_index].products_for_rent[$scope.order.renters[renter_index].products_for_rent_count].categories.push(category);
                    $categoryss = $scope.order.renters[renter_index].products_for_rent[$scope.order.renters[renter_index].products_for_rent_count].categories;
                }
            });
           
            $scope.order.renters[renter_index].products_for_rent[$scope.order.renters[renter_index].products_for_rent_count] = {
                category_id: item.id,
                group_name: item.name,
                icon_name: item.icon_name,
                qty: 1,
                categories:  $categoryss
            };
            $scope.order.renters[renter_index].products_for_rent_count++;
        };

        $scope.addNewRenter = function() {
            $scope.order.renters[$scope.order.renters_count] = {
//                name: 'Renter ' + parseInt($scope.order.renters_count + 1),
                agree: false, 
                signed: false,
                signature: false,
                is_minor : false,
				id: $scope.order.renters_count,
                type: 'multiple',
                //calendar frontend next line only
                //change ui
//                products_for_rent: {0: {category_id: null, product_id: null, selected_option: null, qty: 1, category_image: null, category_specification: null, linksrc: null, attributes: {}}},
                products_for_rent: {},
//                change ui end
                products_for_rent_count: 0,
                general_type: $scope.order.rental_type_name                 
            };
            
            var _category = $filter('getRentalParentCategoriesByRentalTypeId')($scope.productCategories, $scope.order.rental_type_id);
            angular.forEach(_category,  function(value, index) {
//                change ui comment the following out
//                $scope.addNewRentItem($scope.order.renters_count, value);
            });
			$scope.order.renters_count++;
        };

        $scope.removeTheRenter = function(renter_index) {
            if ($scope.order.renters_count > 1 && renter_index != 0) {
                delete $scope.order.renters[renter_index]; 
                $scope.order.renters_count--;
            }
        };

        $scope.hasCategoryAttribute = function(category_id) {
            var _category = $filter('getAttributesByCategoryId')($scope.productCategoryAttributes, category_id);
            if (_category.length) {
                $scope.filtered_category_attributes = _category;
                return true;
            }
            return false;
        };
        
        $scope.hasCategoryImage = function(category_id) {
            var _category = $filter('getProductCategoryById')($scope.productCategories, category_id);
            if (_category && _category.length) {
                return false;
            }
            return true;
        };
                
        $scope.loadImage = function(renter_index, category_index, category_id) {             
            if (!category_id) {
                return ;
            }
            $http.get('/products/load-image/' + category_id)
                .success(function(data){
                    $scope.order.renters[renter_index].products_for_rent[category_index].category_image = data;
                }).error(function(data){
                    toastr.error(data);   
                }); 
        };
        
        $scope.loadSpecification = function(renter_index, category_index, category_id) {             
            if (!category_id) {
                return ;
            }
            $http.get('/products/load-spec/' + category_id)
                .success(function(data){
                    $scope.order.renters[renter_index].products_for_rent[category_index].category_specification = $sce.trustAsHtml(data);
                }).error(function(data){
                    toastr.error(data);   
                }); 
        };
        
//        calendar frontend
        $scope.addLink = function(renter_index, category_index, category_id) {             
            if (!category_id) {
                return ;
            }
            $scope.order.renters[renter_index].products_for_rent[category_index].linksrc = "/admin/monthly-availability/frontend/today/"+category_id;
            $scope.order.renters[renter_index].products_for_rent[category_index].linksrc_hourly = "/admin/availability/frontend/today/"+category_id;    
        };

//calendar frontend end
        
        $scope.addNewRentItem = function(renter_index, item) {
            $scope.order.renters[renter_index].products_for_rent[$scope.order.renters[renter_index].products_for_rent_count] = {
                category_id: null,
                category_image: null,
                category_specification: null,
                //calendar frontend next line only
                linksrc: null,
                group_name: item.name,
                icon_name: item.icon_name,
                product_id: null,
                selected_option: null,
                qty: 1,
                categories: [],
                parent_category: item
            };

            angular.forEach($scope.productCategories, function(category){
                if(category.parent_id == item.id && category.is_for_purchase && category.type == 'rent') {
                    $scope.order.renters[renter_index].products_for_rent[$scope.order.renters[renter_index].products_for_rent_count].categories.push(category);
                    $collRS = $scope.order.renters[renter_index].products_for_rent[$scope.order.renters[renter_index].products_for_rent_count].categories;

                }
            });
            $scope.order.renters[renter_index].general_type = item.general_type;
            $scope.order.customer_has_rent_item = false;
            $scope.order.renters[renter_index].products_for_rent_count++;
        };

        $scope.removeRentItem = function(renter_index, index) {
            delete $scope.order.renters[renter_index].products_for_rent[index];
            
            if(Object.keys($scope.order.renters[renter_index].products_for_rent).length == 0) {
                $scope.order.renters[renter_index].general_type = 'all';
            }
            $scope.updateRentItems(renter_index);
        };

        $scope.addNewBorrowItem = function(item) {
            $scope.order.products_for_borrow_count++;
            $scope.order.products_for_borrow[$scope.order.products_for_borrow_count] = {
                group_name: item.name,
                icon_name: item.icon_name,
                qty: 1,
                categories: [],
                parent_category: item
            };
            angular.forEach($scope.productCategories, function(category){
                if(category.parent_id == item.id && category.is_for_purchase && category.type == 'borrow') {
                    $scope.order.products_for_borrow[$scope.order.products_for_borrow_count].categories.push(category);
                }
            });
            $scope.order.products_for_borrow[$scope.order.products_for_borrow_count].category_id = $scope.order.products_for_borrow[$scope.order.products_for_borrow_count].categories[0].id
            $scope.updatePurchaseItems();
        };

        $scope.removeBorrowItem = function(index) {
            delete $scope.order.products_for_borrow[index];
            $scope.order.products_for_borrow_count--;
        };

        $scope.addNewPurchaseItem = function(item) {
            $scope.order.products_for_purchase_count++;
            $scope.order.products_for_purchase[$scope.order.products_for_purchase_count] = {
                group_name: item.name,
                icon_name: item.icon_name,
                qty: 1,
                categories: [],
                parent_category: item
            };
            angular.forEach($scope.productCategories, function(category){
                if(category.parent_id == item.id && category.is_for_purchase && category.type == 'sale') {
                    $scope.order.products_for_purchase[$scope.order.products_for_purchase_count].categories.push(category);
                }
            });
            $scope.order.products_for_purchase[$scope.order.products_for_purchase_count].category_id = $scope.order.products_for_purchase[$scope.order.products_for_purchase_count].categories[0].id
            $scope.updatePurchaseItems();
        };

        $scope.hasPurchaseItem = function() {
            return ($scope.order.products_for_purchase_count > 0) ? true : false;
        }
        
        $scope.removePurchaseItem = function(index) {
            delete $scope.order.products_for_purchase[index];
            $scope.order.products_for_purchase_count--;
            $scope.updatePurchaseItems();
        };

        $scope.openChangeGuaranteeFeeModal = function() {
            $('#change_guarantee_fee_modal').modal('show');
        };

        $scope.checkRootAccessKey = function() {
            $http.post('/checkAdminAccessKey', {access_key: $scope.root_user.access_key})
                .success(function(data, status, headers, config){
                    $scope.root_user = data;
                });
        };

        $scope.skipPreAuthWithAccessCode = function(){
            $('form[name=skipPreAuthForm] input[type=submit]').attr('disabled', 'disabled');
            $http.post('/checkAdminAccessKey', {access_key: $scope.root_user.access_key})
                .success(function(data, status, headers, config){
                    if(data.id === undefined) {
                        toastr.error($scope.resource[locale]['preauth_access_code_invalid']);
                        $('form[name=skipPreAuthForm] input[type=submit]').removeAttr('disabled');
                    } else {
                        $scope.order.skip_pre_auth = true;
                        $scope.finishedWizard();
                    }
                });
        };

        $scope.closeChangeGuaranteeFeeModal = function() {
            $scope.root_user = {};
            $('#change_guarantee_fee_modal').modal('hide');
        };

        $scope.openSkipPreAuthModal = function() {
            if ($scope.need_access_code_to_skip_pre_auth) {
                $('#skip_pre_auth_modal').modal('show');
            } else {
                $scope.order.skip_pre_auth = true;
                $scope.finishedWizard();
            }
        };
        
        $scope.closeSkipPreAuthModal = function() {
            $scope.root_user = {};
            $('#skip_pre_auth_modal').modal('hide');
        };

        $scope.$watch('order.total_guarantee_fee', function() {
            $scope.order.credit_cards[1].amount = $scope.order.total_guarantee_fee;
        }, true);

        $scope.credit_card_action_label = 'Validate';
        $scope.getLastStepBtnText = function() {
            if($scope.order.is_processing) return 'Please Wait ...';
            if ($scope.credit_card_action == 'charge' || $scope.credit_card_action == 'charge-full') {
                $scope.credit_card_action_label = 'Pay';
            }
            return $scope.order.skip_pre_auth ? $scope.resource[$scope.locale]['finish_button'] : $scope.credit_card_action_label;
        };
        
        $rootScope.$on('sig_saving', function(event, args) {
            var sig = args.image;
            if (args.renter_index>0){
                $scope.order.renters[args.renter_index].signature = sig;
            } else {
                $scope.customer.signature = sig;
            }
            event.preventDefault();
        });

//        $rootScope.$on('send_token', function(event, args) {
//            $scope.finishedWizard(args.token.id);
//            event.preventDefault();
//        });

        $scope.submit = function() {
            $scope.submitted = true;
        };
        
        $scope.getReservationPriceBtnText = function() {
            return $scope.order.needs_preauthorize ? $scope.resource[$scope.locale]['next'] : $scope.resource[$scope.locale]['review_submit'];
        };
    })

    //Stripe payment
    .directive("stripeForm", function($rootScope) {
        return {
            restrict: 'A',
            replace: true,
            link: function($scope, element, attrs) {
//                $scope.submitCard = submitCard;
                var stripe = Stripe(stripe_api_key);
                var elements = stripe.elements();
                var style = {
                              iconStyle: 'solid',
                              style: {
                                base: {
                                    iconColor: '#8898AA',
                                    color: '#000',
                                    lineHeight: '36px',
                                    fontWeight: 300,
                                    fontFamily: '"Open Sans", sans-serif',
                                    fontSize: '15px',

                                    '::placeholder': {
                                        color: '#8898AA',
                                    },
                                },
                                invalid: {
                                    iconColor: '#e85746',
                                    color: '#e85746',
                                }
                            },
                            classes: {
                                focus: 'is-focused',
                                empty: 'is-empty',
                            },
                    };

                var card = elements.create('card', style);
                card.mount('#card-element');

                // Handle real-time validation errors from the card Element.
                card.on('change', function(event) {
                    var errorElement = document.querySelector('.error');
                    /* 
                      Alireza : Don't need tp hide it unless token is provided
                      otherwise it will flicker
                    */
                    // errorElement.classList.add('hidden'); 
                    stripe.createToken(card).then(setOutcome);
                });

                function setOutcome(result) {
                    var errorElement = document.querySelector('.error');
                    if (result.token) {
                        $rootScope.cc_token = result.token.id;
                        $scope.order.credit_cards[1].cc_last_name = $scope.cc_name_on_card;
                        $scope.order.credit_cards[1].cc_token = result.token.id;
                        $('#btn_pre_auth').removeAttr('disabled');
                        errorElement.classList.add('hidden'); // Alireza : token is correct = no error
                    } else if (result.error) {
                        errorElement.textContent = result.error.message;
                        errorElement.classList.remove('hidden'); // Alireza : There is an error, show it
                        $('#btn_pre_auth').attr('disabled', 'disabled');
                    }
                }
            }
        }
    })            

    //Carconnect payment
    .directive("cardconnectForm", [function($rootScope, $sce) {
        return {
            restrict: 'A',
            replace: true,
            link: function($scope) {

                $scope.cardErrors = {};
                $scope.cardHasErrors = false;
                $scope.cardCvvError = false;
                $scope.cardYearError = false;
                $scope.cardMonthError = false;
                $scope.cardTokenError = false;
                $scope.cardNameError = false;
                $scope.cc_token = "";
                $scope.cc_cvv2 = "";
                $scope.cc_name_on_card = "";
                $('#btn_pre_auth').attr('disabled', 'disabled');

                // Handle real-time validation errors from the card Element.

                // setup event listener to get the token from iframe
                window.addEventListener('message', function (event) {
//                    console.log("received message: " + event.data);
                    // !Alireza : The next line causes Error and need to be checked
                    var token = JSON.parse(event.data);
                    $scope.cc_token = null;
                    //console.log("reset: cc_token is now " + $scope.cc_token);

                    $scope.cc_token = token.message;
                    //console.log("received: cc_token is now " + $scope.cc_token);
                    $scope.cardTokenError = false;
                    $scope.cardErrors['cc_token'] = null;
                     evalInput();
                }, false);
            
                document.addEventListener('focusout', function ($event) {
                    setTimeout(function () {
                        // using the 'setTimout' to let the event pass the run loop
                        if (document.activeElement instanceof HTMLIFrameElement) {
                            $scope.cc_token = null;
                            $scope.cardTokenError = true;
                            $scope.cardErrors['cc_token'] = "Please enter a valid credit card number";
                            //console.log("reset, cc_token, scope.cc_token: " + $scope.cc_token);
                            evalInput();
                        }
                    }, 0);
                });

                $scope.validateName = function () {
                 if ($scope.cc_name_on_card && $scope.cc_name_on_card !=='' ){
                   $scope.cardErrors['cc_name']=null;
                   $scope.cardNameError = false;
                 } else {
                  $scope.cardErrors['cc_name']="Please enter the name as printed on the card.";
                  $scope.cardNameError = true;
                 }
                 evalInput();
               }

                $scope.validateCvv2 = function () {
                    if (angular.isNumber($scope.cc_cvv2) && $scope.cc_cvv2 !== ''){
                        $scope.cardErrors['cvv2'] = null;
                        $scope.cardCvvError = false;
                    } else {
                        $scope.cardErrors['cvv2'] = "Please provide a valid Cvv2 number.";
                        $scope.cardCvvError = true;
                    }
                    evalInput();
                }

                $scope.validateYear = function () {
                    var currentDate = new Date();
                    var currentYear = currentDate.getFullYear() - 2000;

                    if (angular.isNumber($scope.cc_expire_year) && $scope.cc_expire_year >= currentYear){
                        $scope.cardErrors['year'] = null;
                        $scope.cardYearError = false;
                    } else {
                        $scope.cardErrors['year'] = "Please provide a valid year.";
                        $scope.cardYearError = true;
                    }
                    evalInput();
                }
                      
                $scope.validateMonth = function () {
                    if (angular.isNumber($scope.cc_expire_month) && $scope.cc_expire_month >= 1 && $scope.cc_expire_month <= 12 ){
                        $scope.cardErrors['month'] = null;
                        $scope.cardMonthError = false;
                    } else {
                        $scope.cardErrors['month'] = "Please provide a valid month.";
                        $scope.cardMonthError = true;
                    }
                    evalInput();
                }

                function evalInput() {
                    $scope.cardHasErrors = true;
                    $('#btn_pre_auth').attr('disabled', 'disabled');
                    $scope.cardHasErrors = ($scope.cardCvvError || $scope.cardYearError || $scope.cardMonthError || $scope.cardTokenError || $scope.cardNameError);
                    //console.log ('cardHasErrors: ' + $scope.cardHasErrors);

                    if (!$scope.cardHasErrors && $scope.cc_token) {
                        $('#btn_pre_auth').removeAttr('disabled');
                        $scope.order.credit_cards[1].cc_token = $scope.cc_token;
                        $scope.order.credit_cards[1].cc_last_name = $scope.cc_name_on_card;
                        $scope.order.credit_cards[1].cc_cvv2 = $scope.cc_cvv2;
                        $scope.order.credit_cards[1].cc_expire_month = $scope.cc_expire_month;
                        $scope.order.credit_cards[1].cc_expire_year = $scope.cc_expire_year;
                        //console.log ('CC: ' + $scope.order.credit_cards[1]);
                    }
                }
            }
        }
    }])

    .directive("drawing", function($rootScope){
        return {
            restrict: "A",
            link: function($scope, element){
                setTimeout(function(){
                    $scope.renter_canvas = $scope.order.renters_count-1;
                    var canvas = document.getElementById("canvas"+$scope.renter_canvas);
                    var ctx = canvas.getContext("2d");
                    ctx.strokeStyle = "#222222";
                    ctx.lineWith = 2;
                    // Set up mouse events for drawing
                    var drawing = false;
                    var mousePos = { x:0, y:0 };
                    var lastPos = mousePos;
                    canvas.addEventListener("mousedown", function (e) {
                        drawing = true;
                        lastPos = getMousePos(canvas, e);
                        $scope.current_renter_id = $scope.current_renter_id;
                    }, false);
                    canvas.addEventListener("mouseup", function (e) {
                        drawing = false;
                    }, false);
                    canvas.addEventListener("mousemove", function (e) {
                        mousePos = getMousePos(canvas, e);
                    }, false);

                    // Get the position of the mouse relative to the canvas
                    function getMousePos(canvasDom, mouseEvent) {
                        var rect = canvasDom.getBoundingClientRect();
                        return {
                            x: mouseEvent.clientX - rect.left,
                            y: mouseEvent.clientY - rect.top
                      };
                    }
                    // Get a regular interval for drawing to the screen
                    window.requestAnimFrame = (function (callback) {
                        return window.requestAnimationFrame || 
                            window.webkitRequestAnimationFrame ||
                            window.mozRequestAnimationFrame ||
                            window.oRequestAnimationFrame ||
                            window.msRequestAnimaitonFrame ||
                            function (callback) {
                                window.setTimeout(callback, 1000/60);
                            };
                    })();
                    // Draw to the canvas
                    function renderCanvas() {
                        if (drawing) {
                            ctx.moveTo(lastPos.x, lastPos.y);
                            ctx.lineTo(mousePos.x, mousePos.y);
                            ctx.stroke();
                            lastPos = mousePos;
                        }
                    }

                    // Allow for animation
                    (function drawLoop () {
                        requestAnimFrame(drawLoop);
                        renderCanvas();
                    })();
                    // Set up touch events 
                    canvas.addEventListener("touchstart", function (e) {
                        mousePos = getTouchPos(canvas, e);
                        var touch = e.touches[0];
                        var mouseEvent = new MouseEvent("mousedown", {
                            clientX: touch.clientX,
                            clientY: touch.clientY
                        });
                        canvas.dispatchEvent(mouseEvent);
                    }, false);
                    canvas.addEventListener("touchend", function (e) {
                        var mouseEvent = new MouseEvent("mouseup", {});
                        canvas.dispatchEvent(mouseEvent);
                    }, false);
                    canvas.addEventListener("touchmove", function (e) {
                        var touch = e.touches[0];
                        var mouseEvent = new MouseEvent("mousemove", {
                            clientX: touch.clientX,
                            clientY: touch.clientY
                        });
                        canvas.dispatchEvent(mouseEvent);
                    }, false);

                    // Get the position of a touch relative to the canvas
                    function getTouchPos(canvasDom, touchEvent) {
                        var rect = canvasDom.getBoundingClientRect();
                        return {
                            x: touchEvent.touches[0].clientX - rect.left,
                            y: touchEvent.touches[0].clientY - rect.top
                        };
                    }
                    // Prevent scrolling when touching the canvas
                    document.body.addEventListener("touchstart", function (e) {
                        if (e.target == canvas) {
                            e.preventDefault();
                        }
                    }, false);
                    document.body.addEventListener("touchend", function (e) {
                        if (e.target == canvas) {
                            e.preventDefault();
                        }
                    }, false);
                    document.body.addEventListener("touchmove", function (e) {
                        if (e.target == canvas) {
                            e.preventDefault();
                        }
                    }, false);

                    $scope.reset = function(renter_index){
                        $scope.order.renters[$scope.renter_canvas].signed = false;
                        $('#btn_agree').attr('disabled','disabled');
                        $scope.resetCurrentRenterCheckBox();
                        element[0].width = element[0].width; 
                    };

                    $scope.saveAsImage = function(renter_index){
        //                var renters_count = $scope.order.renters_count;
        //                if (renters_count<=1){
                            var img = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); 
                            var image = img.replace('data:image/octet-stream;base64,', ' ', image);
                            imageSize = Object.keys(image).length;
                            if (imageSize >= 1385) {
                                $scope.order.renters[$scope.renter_canvas].signed = true;
                                var renter_canvas_ag = '#btn_agree'+$scope.renter_canvas;
                                $(renter_canvas_ag).removeAttr('disabled');
                //                $scope.setCurrentRenterCheckBox();
                                $rootScope.$broadcast('sig_saving', {image:image, renter_index:renter_index});
                                $scope.setCurrentRenterCheckBox();
                                $("#termsandconditions"+renter_index).modal('hide');
                            }
                            else {
                                // Haven't signed yet

                            }
                //        }
                //        else {
                //            angular.forEach($scope.order.renters, function(renter) {
                        //     var img = canvas[renter_index].toDataURL("image/png").replace("image/png", "image/octet-stream"); 
                //            var image = img.replace('data:image/octet-stream;base64,', ' ', image);
                //            $rootScope.$broadcast('sig_saving', {image:image, renter_index:renter_index});
                //            })
                //        }

                    }; 
                }, 0);
            }
      }; 
    });
