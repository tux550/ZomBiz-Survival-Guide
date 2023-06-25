import { MapContainer, Marker, Popup, TileLayer, Polygon } from 'react-leaflet';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
// https://react-leaflet.js.org/docs/api-map/


// todas las coordenadas deben estar en longitud y latitud
// las areas son conjuntos de coordenadas (en longitud y latitud) que forman una figura
export default function Map({center, markers, safeAreas, cautiousAreas, dangerAreas}) {
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
									{
										position.description.split('\n')
											.map((item) => {
												return (
													<p>{item}</p>
												);
											})
									}
								</span>
							</Popup>
						</Marker>
					);
				})
			}
			{
				safeAreas.map((area) => {
					return (
						<Polygon
							pathOptions={{color: 'lime'}}
							positions={area}
						/>
					);
				})
			}
			{
				cautiousAreas.map((area) => {
					return (
						<Polygon
							pathOptions={{color: 'yellow'}}
							positions={area}
						/>
					);
				})
			}
			{
				dangerAreas.map((area) => {
					return (
						<Polygon
							pathOptions={{color: 'red'}}
							positions={area}
						/>
					);
				})
			}
		</MapContainer>
	);
}