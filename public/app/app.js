angular.module('songVis', ['app.routes', 'mainCtrl', 'searchCtrl', 'songCtrl', 'thirdPartyService', 'trackService', 'trackVis'])

.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}])