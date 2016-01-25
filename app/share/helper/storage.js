angular.module('app.share')
    .service(function () {
        /**
         * Returns the stored sessionToken
         * This method first checks in sessionStorage if sessionToken is not found in sessionStorage
         * this method checks in localStorage, if sessionToken still not found in localStorage,
         * then it will return null or undefined
         * The controllers has to implement the logic that if sessionToken is null/undefined then user is not authorized
         */
        this.getSessionToken = function () {
            var token = sessionStorage.getItem('central.seller.portal.auth.token');
            if (!token) {
                token = localStorage.getItem('central.seller.portal.auth.token');
            }
            return token;
        };
        /**
         * Store the session token in sessionStorage
         * A boolean flag is passed which when true indicate that user chose remember me option and data should
         * also be stored in localStorage
         */
        this.storeSessionToken = function (sessionToken, flag) {
            sessionStorage.setItem('central.seller.portal.auth.token', sessionToken);
            if (flag) {
                localStorage.setItem('central.seller.portal.auth.token', sessionToken);
            }
        };

        /**
         * Get current user profile stored in sessionStorage or localStorage
         */
        this.getCurrentUserProfile = function () {
            var profile = sessionStorage.getItem('central.seller.portal.auth.profile');
            if (!profile) {
                profile = localStorage.getItem('central.seller.portal.auth.profile');
            }
            return angular.fromJson(profile);
        };

        /**
         * Store the current user profile in sessionStorage
         * A boolean flag is passed which when true indicate that user chose remember me option and data
         * should also be stored in localStorage
         */
        this.storeCurrentUserProfile = function (profile, flag) {
            profile = angular.toJson(profile);
            sessionStorage.setItem('central.seller.portal.auth.profile', profile);
            if (flag) {
                localStorage.setItem('central.seller.portal.auth.profile', profile);
            }
        };

        /**
         * Utility method to clear the sessionStorage
         */
        this.clear = function () {
            sessionStorage.removeItem('central.seller.portal.auth.token');
            sessionStorage.removeItem('central.seller.portal.auth.profile');

            localStorage.removeItem('central.seller.portal.auth.actions');
            localStorage.removeItem('central.seller.portal.auth.profile');
        };
    })