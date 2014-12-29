/*globals window:true, angular:true, document:true, jQuery:true */

/**
 * ngPopup module
 * A AngularJS module that provides a directive to create modals
 * coded by Giancarlo Buomprisco
 */

(function (angular, $) {
    "use strict";

    var defaults = {
        auto: false,
        trigger: "",
        animate: true,
        animationDuration: 450,
        template: "templates/ngPopup.html",
        templateHeader: "templates/ngPopupHeader.html",
        templateContent: "templates/ngPopupContent.html",
        templateControls: "templates/ngPopupControls.html",
        useCancelButton: true,
        buttonLabel: "Click",
        background: true
    },
        createDirective = function (templateProperty) {
            return {
                restrict: 'E',
                transclude: true,
                replace: true,
                controller: function ($scope, $element, $attrs) {
                    $.extend($scope , defaults, $attrs);
                },
                templateUrl: function (elem, attrs) {
                    /**
                     * if template has not been defined via attribute, get the default one
                     */
                    return attrs.template || defaults[templateProperty];
                }
            }
        },

        /**
         * ngPopup Directive
         */
        ngPopup = function () {
            return createDirective('template');
        },
        /**
         * ngPopupHeader directive
         */
        ngPopupHeader = function () {
            return createDirective('templateHeader');
        },
        /**
         * ngPopupContent directive
         */
        ngPopupContent = function () {
            return createDirective('templateContent');
        },
        /**
         * ngPopupControls directive
         */
        ngPopupControls = function () {
            return createDirective('templateControls');
        };

    /**
     * creating module
     */
    angular.module('ngPopup', [])
    /**
     * defining directives
     */
        .directive('ngPopup', ngPopup)
        .directive('ngPopupHeader', ngPopupHeader)
        .directive('ngPopupContent', ngPopupContent)
        .directive('ngPopupControls', ngPopupControls)
    /**
     * debug, to be deleted
     */
        .config(function ($logProvider) {
            $logProvider.debugEnabled(true);
        });

}(angular, jQuery));