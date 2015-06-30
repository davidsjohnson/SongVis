angular.module('songVis', ['app.routes', 'mainCtrl', 'songCtrl', 'songService'])

.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);;