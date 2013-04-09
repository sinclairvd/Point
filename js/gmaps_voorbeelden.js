// JavaScript Document
//google maps werkende voorbeelden

$(function() {
	// Also works with: var yourStartLatLng = '52.3702157, 4.8951679';
	var yourStartLatLng = new google.maps.LatLng(52.3702157, 4.8951679);
    $('#map_canvas').gmap({'center': yourStartLatLng});
});
