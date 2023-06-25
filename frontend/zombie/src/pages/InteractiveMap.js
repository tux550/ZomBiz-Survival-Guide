import { useMemo } from 'react';
import Map from '../components/Map.js';

import interest_points from '../data/interest_points.json';
import interest_areas from '../data/interest_areas.json';

import 'leaflet/dist/leaflet.css';


export default function InteractiveMap() {
	const center = useMemo(
		() => ({lat: -12.04637, lng: -77.04279})
	, []);

	const safeAreas = interest_areas.areas.safe;
	const cautiousAreas = interest_areas.areas.cautious;
	
	return (
		<div>
			<p>Puntos y areas de interes</p>
			
			<div id='map'>
				<Map
					center={center}
					markers={interest_points.markers}
					safeAreas={safeAreas}
					cautiousAreas={cautiousAreas}
					dangerAreas={[]}
				/>
			</div>
		</div>
	);
}