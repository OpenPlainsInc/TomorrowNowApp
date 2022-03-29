import OSM from 'ol/source/OSM'

const osmSource = () => {
    const osm = new OSM()
    return osm
}

export default osmSource