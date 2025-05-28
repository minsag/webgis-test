const map = L.map('map').setView([48.51293, -2.76055], 14);
var osm =L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
 maxZoom: 18,
 attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
 crossOrigin: true
 });
 map.addLayer(osm)
function getColor(CO){ //khai báo màu sắc hiển thị ở bản đồ
    const COColors = {
        '2':    '#95ec49',  //màu xanh lá nhạt
        '3':    '#1b7c14',  // màu xanh lá đậm
        '4':    '#e4e154',  // màu vàng nhạt
        '5':    '#f3971f',  // màu cam đậm
        '6':    '#e31a1c',  // màu đỏ
        'default':'#dde0e4a8'  //màu xám
    };
    return COColors[CO] || COColors['default']
}
function getStyle(feature) { // khai báo kiểu bản đồ
  return {
    weight: 0.5, // Kích thước đường viền
    opacity: 1, // Độ mờ của đường viền
    color: 'black', // Màu của đường viền
    fillOpacity: 1, // Độ mờ của màu nền
    fillColor: getColor(feature.properties.CO),
  };
}
function popup(feature, layer){ // khai báo popup hiển thị thuộc tính khi click vào
  layer.bindPopup(`<h3>Property</h3><table style="border-collapse: collapse; width: 100%;"><tbody><tr><td style="padding: 6px;">Building Properties</td><td style="padding: 6px;">${feature.properties.Sous_secte}</td></tr><tr><td style="padding: 6px;">Energy consumption</td><td style="padding: 6px;">${feature.properties.Tranche_co}</td></tr><tr><td style="padding: 6px;">CO2 emissions</td><td style="padding: 6px;">${feature.properties.Tranche_GE}</td></tr><tr><td style="padding: 6px;">Heating system</td><td style="padding: 6px;">${feature.properties.Systeme_de}</td></tr><tr><td style="padding: 6px;">Construction date</td><td style="padding: 6px;">${feature.properties.Date_de_co}</td></tr><tr><td style="padding: 6px;">Adrress</td><td style="padding: 6px;">${feature.properties.Liste_adrr}</td></tr></tbody></table>`)
}
  const geojson = new L.GeoJSON.AJAX(`https://raw.githubusercontent.com/minsag/data_msbu/main/Union.geojson`,{  //Dùng hàm để gọi data hiển thị
    onEachFeature:popup,
    style:getStyle  // ở trên đã khai báo getColor, getStyle thì ở đây phải gọi hàm ra
  });
  
 map.addLayer(geojson)

  