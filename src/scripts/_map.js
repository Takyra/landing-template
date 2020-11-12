function init() {
    let yandexMap = new ymaps.Map('map', {
        center: [45.05325107459002,41.99553899999998],
        controls: [],
        zoom: 16
    }),
    office = new ymaps.GeoObject({
        geometry: {
            type: 'Point',
            coordinates: [45.05325107459002,41.99553899999998]
        },
        properties: {
            hintContent: 'Адрес'
        }
    }, {
        preset: 'islands#redIcon'
    });

    yandexMap.geoObjects.add(office);
    yandexMap.behaviors.disable('scrollZoom');
}