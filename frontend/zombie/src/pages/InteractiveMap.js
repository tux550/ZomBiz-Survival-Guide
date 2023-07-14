import { useMemo } from 'react';
import Map from '../components/Map.js';

import interest_points from '../data/interest_points.json';
import interest_areas from '../data/interest_areas.json';

import 'leaflet/dist/leaflet.css';

import './InteractiveMap.css'; // Import the CSS file
export default function InteractiveMap() {
	const center = useMemo(
		() => ({lat: -12.04637, lng: -77.04279})
	, []);

	const safeAreas = interest_areas.areas.safe;
	const cautiousAreas = interest_areas.areas.cautious;
	
	return (
	<div>
	  <header>
	  <h1>Puntos y areas de interes</h1>
	  </header>

      <div className="map-page-container"> {/* Add container class */}  
		<div id="map" className="map-container"> {/* Add map-container class */}
		  <Map
			center={center}
			markers={interest_points.markers}
			safeAreas={safeAreas}
			cautiousAreas={cautiousAreas}
			dangerAreas={[]}
		  />
		</div>
	  </div>
	</div>
	);
}