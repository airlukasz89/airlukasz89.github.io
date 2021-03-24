import React, { Component } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'

import 'leaflet/dist/leaflet.css';
import '../styles/Map.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;


const MapEventsComponent = ({ onClick }) => {
    const map = useMapEvents({
        click: (e) => {
            let data = [e.latlng.lat, e.latlng.lng];
            onClick(data)
        }
    })
    return null
}

class MapWrapper extends Component {
    // state = {
    //     position: this.props.position
    // }

    // changePosition = () => {
    //     this.setState({
    //         position: [1, 1]
    //     })
    // }


    render() {
        return (
            <div className={'map'}>
                <MapContainer center={this.props.position} zoom={30} scrollWheelZoom={true}>
                    <MapEventsComponent onClick={this.props.onClick} />
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={this.props.position}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
                    </Marker>
                </MapContainer>
            </div>
        );
    }
}


export default MapWrapper;