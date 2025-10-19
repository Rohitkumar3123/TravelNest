console.log('Map Token:', mapToken);
console.log('Listing Data:', listingData);

if (typeof mapboxgl === 'undefined') {
    console.error('Mapbox GL JS not loaded!');
} else {
    console.log('Mapbox GL JS loaded');
}

mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: listingData.coordinates,
    zoom: 11
});

console.log('Map created');

map.on('load', () => {
    console.log('Map loaded successfully');
    
    const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`<h4>${listingData.title}</h4><p>Exact location provided after booking</p>`);

    new mapboxgl.Marker({ color: 'red' })
        .setLngLat(listingData.coordinates)
        .setPopup(popup)
        .addTo(map);
    
    console.log('Marker added');
});

map.on('error', (e) => {
    console.error('Map error:', e);
});