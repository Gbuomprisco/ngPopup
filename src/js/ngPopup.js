/*globals window:true, angular:true, document:true, jQuery:true */

/**
 * ngPopup module
 * A AngularJS module that provides a directive to create modals
 * coded by Giancarlo Buomprisco
 */

(function (angular, $) {
    "use strict";

    /**
     * createDirective function, reuse same code to create a directive with different options
     * @param defaults
     * @param linkFunction
     * @returns {{restrict: string, transclude: boolean, replace: boolean,
      * link: (*|boolean), controller: Function, templateUrl: Function}}
     */
    var createDirective = function (defaults, linkFunction, controllerFunction, require) {
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
             * link function
             * @param scope
             * @param elem
             * @param attrs
             * @returns {*}
             */
            link = function (scope, elem, attrs, requiredController) {
                return linkFunction.call(this, scope, elem, attrs, requiredController);
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
            require: require,
            templateUrl: template
        }
    },
        /**
         * ngPopup Directive
         */
        ngPopup = function () {

            /**
             * @controller
             * @param scope
             * @param elem
             */
            var controller = function ($scope, $elem) {
                var element = $elem.find('.ng-popup'),
                    body = element.find('.ng-popup__body'),
                    className = 'hidden',
                    animate = $scope.animate,
                    ms = animate === "true" ? +$scope.animationDuration : 0;

                /**
                 * method to show modal
                 */
                $scope.show = function () {
                    element.removeClass(className);
                    body.animate({
                        top: "25%",
                        opacity: 1
                    }, ms);
                };

                /**
                 * method to hide modal
                 */
                $scope.hide = function () {
                    body.animate({
                        top: "-25%",
                        opacity: 0
                    }, ms, function(){
                        element.remove();
                    });
                };

                /**
                 * if auto is true, show the modal immediately
                 */
                if (!!$scope.auto) {
                    $scope.show();
                }
            };

            return createDirective({
                auto: false,
                trigger: "",
                animate: true,
                animationDuration: 450,
                template: "templates/ngPopup.html",
                background: true
            }, $.noop, controller);
        },
        /**
         * ngPopupHeader directive
         */
        ngPopupHeader = function () {
            return createDirective({
                template: "templates/ngPopupHeader.html"
            });
        },
        /**
         * ngPopupContent directive
         */
        ngPopupContent = function () {
            return createDirective({
                template: "templates/ngPopupContent.html"
            });
        },
        /**
         * ngPopupControls directive
         */
        ngPopupControls = function () {
            var link = function (scope, elem) {
                var callback = scope.ngPopupCallback;
                if (callback && typeof callback === "function") {
                    elem.find('.ng-popup__button').on('click', function () {
                        scope.ngPopupCallback.call();
                    });
                }

                scope.closePopup = function () {
                    scope.$parent.hide.call();
                };
            };

            return createDirective({
                template: "templates/ngPopupControls.html",
                useCancelButton: true,
                buttonLabel: "Click",
                buttonCancelLabel: "Cancel"
            }, link);
        };

    /**
     * creating module
     */
    angular.module('ngPopupModule', [])
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