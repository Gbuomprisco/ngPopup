# ngPopup

## A highly customizable AngularJS directive to create modal popups

### Template

    <ng-popup>
        <ng-popup-header>Header</ng-popup-header>
        <ng-popup-content>Popup content</ng-popup-content>
        <ng-popup-controls></ng-popup-controls>
    </ng-popup>


#### ngPopup
The root directive: provides general attributes to customize the popup.
Attributes:
- auto (true|false): specifies whether fire the popup at execution or not
- trigger (jQuery): specifies a trigger to fire the popup
- animate (true|false): specifies wheter animate popup or not
- animationDuration (Number): specifies animation length in milliseconds
- template (String): specifies the location of the template
- background (true|false): specifies whether the page should be covered by a background or not

#### ngPopupHeader
The header directive: provides the text for the header
Attributes:
- template (String): specifies the location of the template

#### ngPopupContent
The content directive: provides the text for the content
Attributes:
- template (String): specifies the location of the template

#### ngPopupControls
The controls directive: provides elements to fire actions
Attributes:
- template (String): specifies the location of the template
- useCancelButton (true|false): specifies whether use the button to close the popup or not
- buttonLabel (String): specifies the label of the main button
- buttonCancelLabel (String): specifies the label of the cancel button

#### Firing a function as action
To create a function to be fired when clicking on the action button, you can do as following:
- Get the ngPopupModule module
- create a controller
- extend the scope with the function ngPopupCallback


    var app = angular.module('ngPopupModule');
    app.controller('example', function ($scope) {
       $scope.ngPopupCallback = function () {
           alert("I've been fired!");
       };
    });
    

#### Example
        <body ng-app="ngPopupModule">
            <h1>ngPopup Example</h1>
            <div ng-controller="example">
                <ng-popup trigger="#trigger" auto="false" animate="true"
                          template="../../src/templates/ngPopup.html">
                    <ng-popup-header template="../../src/templates/ngPopupHeader.html">Lorem Ipsum</ng-popup-header>
                    <ng-popup-content template="../../src/templates/ngPopupContent.html">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </ng-popup-content>
                    <ng-popup-controls template="../../src/templates/ngPopupControls.html"></ng-popup-controls>
                </ng-popup>
            </div>
        </body>
