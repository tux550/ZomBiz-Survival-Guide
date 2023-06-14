import { useMemo } from 'react';
import interest_points from '../data/interest_points.json';
import Map from '../components/Map.js';
import 'leaflet/dist/leaflet.css';


export default function InteractiveMap() {
	const center = useMemo(
		() => ({lat: -12.04637, lng: -77.04279})
	, []);
	
	return (
		<div>
			<p>Puntos y areas de interes</p>
			
			<div id='map'>
				<Map
					center={center}
					markers={interest_points.markers}
					windows={interest_points.markers}
				/>
			</div>
		</div>
	);
}