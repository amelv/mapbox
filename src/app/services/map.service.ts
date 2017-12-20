import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { GeoJson } from './../map';
import * as mapboxgl from 'mapbox-gl';

@Injectable()
export class MapService {

  constructor(private db: AngularFireDatabase) { 
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  getMarkers() {
    return this.db.list('markers').snapshotChanges().map(actions => {      
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    });
  }

  createMarker(data: GeoJson) {
    return this.db.list('/markers').push(data);
  }

  removeMarker($key: string) {
    console.log('Remove: ', $key);
    return this.db.object('/markers' + $key).remove();
  }

}
