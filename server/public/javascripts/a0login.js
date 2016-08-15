var ls_idToken = 'id_token';
var ls_userProfile = 'user_profile';
var lock_clientId = 'aL8KG9sLSs6dFvCPOoMjpPSew9kwEwEO';
var lock_domain = 'jonno.eu.auth0.com';  
var lock_baseOptions = {
    theme: {
        logo: 'assets/img/user-3.jpg',
        primaryColor: '#008a8a'
    }  
};


var lock_signinOptions = {
        auth: { 
            params: { scope: 'openid email' } //Details: https://auth0.com/docs/scopes
        },
    languageDictionary: {
            title: 'Awesome Campain Login'
        }
};

var userProfile;
var lock = new Auth0Lock(lock_clientId, lock_domain, lock_signinOptions);

$('#btn-login').click(function(e) {
    // merge options
    jQuery.extend(lock_signinOptions, lock_baseOptions)
    lock = new Auth0Lock(lock_clientId, lock_domain, lock_signinOptions);
    e.preventDefault();
    lock.show();
});


// Listening for the authenticated event
lock.on("authenticated", function(authResult) {
// Use the token in authResult to getProfile() and save it to localStorage
    lock.getProfile(authResult.idToken, function(error, profile) {
        if (error) {
        // Handle error
            alert(error);
            return;
        }

        localStorage.setItem(ls_idToken, authResult.idToken);
        localStorage.setItem(ls_userProfile, JSON.stringify(profile));

        // Display user information
        //$('#btn-login').text(profile.nickname);
        $('.btn-userprofile a span').text(profile.nickname)
        $('.btn-userprofile div.info').text(profile.nickname)
        $('.img-profile').attr('src', profile.picture);

        // show-hide
        $('.btn-userprofile').removeClass('hidden');

        $('#btn-login').addClass('hidden');
        $('#btn-signup').addClass('hidden');
        $('#btn-resetpassword').addClass('hidden');

        

    });
});

lock.on("authorization_error", function(error) {
    console.log("authorization_error");
    console.log(error.error);
    console.log(error.error_description);
});

lock.on("unrecoverable_error", function(error) {
    console.log("unrecoverable_error");
    console.log(error);
});        

//https://auth0.com/docs/libraries/lock/v10/api
lock.on("show", function() {
    console.log("lock show");
});        

lock.on("hide", function() {
    console.log("lock hide");
});        

// Auth0 Sign Up
// Need to set instructions, title, custom fields
// https://auth0.com/docs/libraries/lock/v10/customization#additionalsignupfields-array-
var lock_signupOptions = {
    allowLogin: false,
    allowForgotPassword: false,
    allowSignUp: true,
    initialScreen: 'signUp', //forgotPassword | login | signUp
    languageDictionary: {
        title: 'Sign Up'
    },
    additionalSignUpFields: [{
        name: "address",
        placeholder: "enter your address",
        // The following properties are optional
        icon: "https://example.com/assests/address_icon.png",
        prefill: "street 123",
        validator: function(address) {
        return {
            valid: address.length >= 10,
            hint: "Must have 10 or more chars" // optional
        };
        }
    },
    {
        type: "select",
        name: "location",
        placeholder: "choose your location",
        options: [
        {value: "us", label: "United States"},
        {value: "fr", label: "France"},
        {value: "ar", label: "Argentina"}
        ],
        // The following properties are optional
        icon: "https://example.com/assests/location_icon.png",
        prefill: "us"
    }
]                                    
};

$('#btn-signup').click(function(e) {
    jQuery.extend(lock_signupOptions, lock_baseOptions)
    lock = new Auth0Lock(lock_clientId, lock_domain, lock_signupOptions);
    e.preventDefault();
    lock.show();
});



// Auth0 Forgot Password
var lock_forgotPassworOptions = {
    allowLogin: false,
    allowForgotPassword: true,
    allowSignUp: false,
    initialScreen: 'forgotPassword', //forgotPassword | login | signUp
};

$('#btn-resetpassword').click(function(e) {
    jQuery.extend(lock_forgotPassworOptions, lock_baseOptions)
    lock = new Auth0Lock(lock_clientId, lock_domain, lock_forgotPassworOptions);
    e.preventDefault();
    lock.show();
});


// Logout

$('#btn-logout').click(function(e) {

    localStorage.removeItem(ls_idToken);
    localStorage.removeItem(ls_userProfile);

    profile = null;


    // change ui 

        // show-hide
        $('.btn-userprofile').addClass('hidden');

        $('#btn-resetpassword').removeClass('hidden');
        $('#btn-login').removeClass('hidden');
        $('#btn-signup').removeClass('hidden');


    return false;

});