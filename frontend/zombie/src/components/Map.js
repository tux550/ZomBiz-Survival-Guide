import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
// https://react-leaflet.js.org/docs/api-map/

export default function Map({center, markers}) {
	const pos = [center.lat, center.lng];

	const defIcon = L.icon({
		iconUrl: icon,
		shadowUrl: iconShadow
	})
	
	return (
		<MapContainer
			zoom={13}
			center={pos}
			style={{height: '100vh', width:'100wh'}}
			scrollWheelZoom={true}
		>
			<TileLayer 
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>
			{
				markers.map((position) => {
					const p = [position.lat, position.lng];
					return (
						<Marker icon={defIcon} position={p}>
							<Popup>
								<span>
									{position.description}
								</span>
							</Popup>
						</Marker>
					);
				})
			}
			
		</MapContainer>
	);
}