import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from '../map.service';
import { GeoJson, FeatureCollection } from '../map';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.css']
})
export class MapBoxComponent implements OnInit {

  // Default settings
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/outdoors-v9';
  lat = 37.75;
  lng = -122.41;
  message = "Hello Mexico";

  // Data
  source: any;
  markers: any;

  constructor(private mapService: MapService) { }

  ngOnInit() {
    // Get markers from mapService
    this.mapService.getMarkers().valueChanges().subscribe(markers => {
      this.markers = markers;
    });    

    this.initializeMap();
  }

  private initializeMap() {
    // Center to the position
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
          
        this.map.flyTo({
          center: [this.lng, this.lat]
        });
      });
    }

    this.buildMap();

  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat]
    });

    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());

    // Add marker on click
    this.map.on('click', (event) => {
      const coordinates = [event.lngLat.lng, event.lngLat.lat]
      const newMarker = new GeoJson(coordinates, { message: this.message });
      this.mapService.createMarker(newMarker);
    })

    // Add realtime data on map load
    this.map.on('load', (event) => {

      // Register source
      this.map.addSource('firebase', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      });

      // Get source
      this.source = this.map.getSource('firebase');          
      
      // Set data
      let data = new FeatureCollection(this.markers);   
      this.source.setData(data);

      // Create map layers with realtime data
      this.map.addLayer({
        id: 'firebase',
        source: 'firebase',
        type: 'symbol',
        layout: {
          'text-field': '{message}',
          'text-size': 22,
          'icon-image': 'circle-15',
          'text-offset': [0, 1.5]
        },
        paint: {
          'text-color': '#E74C3C',
          'text-halo-color': '#fff',
          'text-halo-width': 2
        }
      });


    })

  }

  removeMarker(marker) {
    console.log('Remove', marker.$key);
    this.mapService.removeMarker(marker.$key);
  }

  flyTo(data: GeoJson) {
    this.map.flyTo({
      center: data.geometry.coordinates
    })
  }

}
