import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
// https://react-leaflet.js.org/docs/api-map/

export default function Map({center, markers}) {
	const pos = [center.lat, center.lng];
	
	return (
		<MapContainer
			zoom={13}
			center={pos}
			style={{height: '100vh', width:'100wh'}}
		>
			<TileLayer 
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>
			{
				markers.map((position) => {
					const pos = [position.lat, position.lng];
					return (
						<Marker position={pos}>
							<Popup>
								{position.description}
							</Popup>
						</Marker>
					);
				})
			}
		</MapContainer>
	);
}