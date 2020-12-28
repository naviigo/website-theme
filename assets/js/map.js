const source = new ol.source.Vector({
    url: '/data.json',
    format: new ol.format.GeoJSON(),
});

const style = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgba(7, 89, 255, 0.6)',
    }),
    stroke: new ol.style.Stroke({
        color: '#0759ff',
        width: 1,
    }),
    image: new ol.style.Circle({
        radius: 5,
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.6)',
        }),
        stroke: new ol.style.Stroke({
            color: '#319FD3',
            width: 1,
        }),
    }),
});
const vectorLayer = new ol.layer.Vector({
    source: source,
    style: style,
});
const view = new ol.View({
    center: ol.proj.fromLonLat([8.951754513129218, 46.003386272217334]),
    zoom: 10,
});

const map = new ol.Map({
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM(),
        }), vectorLayer],
    target: 'map',
    view: view,
});

const geolocation = new ol.Geolocation({
    // enableHighAccuracy must be set to true to have the heading value.
    trackingOptions: {
        enableHighAccuracy: true,
    },
    projection: view.getProjection(),
});

geolocation.setTracking(true);


const accuracyFeature = new ol.Feature();
geolocation.on('change:accuracyGeometry', function () {
    accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
});

const positionFeature = new ol.Feature();
positionFeature.setStyle(
    new ol.style.Style({
        image: new ol.style.Circle({
            radius: 6,
            fill: new ol.style.Fill({
                color: '#3399CC',
            }),
            stroke: new ol.style.Stroke({
                color: '#fff',
                width: 2,
            }),
        }),
    })
);

geolocation.on('change:position', function () {
    const coordinates = geolocation.getPosition();
    positionFeature.setGeometry(coordinates ? new ol.geom.Point(coordinates) : null);
});

new ol.layer.Vector({
    map: map,
    source: new ol.source.Vector({
        features: [accuracyFeature, positionFeature],
    }),
});
