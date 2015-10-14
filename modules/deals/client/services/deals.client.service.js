'use strict';

//Deals service used for communicating with the deals REST endpoints
angular.module('deals').factory('Deals', ['$resource',
  function ($resource) {
    return $resource('api/deals/:dealId', {
      dealId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
