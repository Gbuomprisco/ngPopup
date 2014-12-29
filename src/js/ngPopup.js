/*globals window:true, angular:true, document:true, jQuery:true */

/**
 * ngPopup module
 * A AngularJS module that provides a directive to create modals
 * coded by Giancarlo Buomprisco
 */

(function (angular, $) {
    "use strict";

    /**
     *
     * @param defaults
     * @param linkFunction
     * @returns {{restrict: string, transclude: boolean, replace: boolean,
      * link: (*|boolean), controller: Function, templateUrl: Function}}
     */
    var createDirective = function (defaults, linkFunction, controllerFunction) {

        /**
         * controller extends scope
         * @param $scope
         * @param $element
         * @param $attrs
         */
        var controller = function ($scope, $element, $attrs) {
            $.extend($scope, defaults, $attrs);
            if (controllerFunction && typeof controllerFunction === "function") {
                controllerFunction.call(this, $scope, $element, $attrs);
            }
        },
            /**
             *
             * @returns {*}
             */
            link = function (scope, elem, attrs) {
                return linkFunction.call(this, scope, elem, attrs);
            },
            /**
             * if template has not been defined via attribute, get the default one
             * @param elem
             * @param attrs
             * @returns {string|string|string|string}
             */
            template = function (elem, attrs) {
                return attrs.template || defaults.template;
            };

        return {
            restrict: 'E',
            transclude: true,
            controller: controller,
            link: link,
            templateUrl: template
        }
    },
        /**
         * ngPopup Directive
         */
        ngPopup = function () {
            return createDirective({
                auto: false,
                trigger: "",
                animate: true,
                animationDuration: 450,
                template: "templates/ngPopup.html",
                background: true
            }, $.noop);
        },
        /**
         * ngPopupHeader directive
         */
        ngPopupHeader = function () {
            return createDirective({
                template: "templates/ngPopupHeader.html"
            }, $.noop);
        },
        /**
         * ngPopupContent directive
         */
        ngPopupContent = function () {
            return createDirective({
                template: "templates/ngPopupContent.html"
            }, $.noop);
        },
        /**
         * ngPopupControls directive
         */
        ngPopupControls = function () {
            return createDirective({
                template: "templates/ngPopupControls.html",
                useCancelButton: true,
                buttonLabel: "Click"
            }, $.noop);
        },

        ngPopupCancelButton = function () {
            var controller = function ($scope, $elem, $attrs) {
                $scope.closePopup = function () {
                    $elem.closest('.ng-popup').remove();
                };
            };

            return createDirective({
                template: "../../src/templates/ngPopupCancelButton.html",
                buttonLabel: "Cancel"
            }, $.noop, controller);
        },

        ngPopupActionButton = function () {
            var link = function (scope, elem) {
                elem.on('click', function () {
                   scope.callback.call();
                    console.log('ciao')
                });
            };
            return createDirective({
                template: "../../src/templates/ngPopupActionButton.html",
                buttonLabel: "Click",
                callback: "callback"
            }, link);
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
        .directive('ngPopupCancelButton', ngPopupCancelButton)
        .directive('ngPopupActionButton', ngPopupActionButton)
    /**
     * debug, to be deleted
     */
        .config(function ($logProvider) {
            $logProvider.debugEnabled(true);
        });

}(angular, jQuery));