import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { GeoJson } from './../map';
import * as mapboxgl from 'mapbox-gl';

@Injectable()
export class MapService {
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

  constructor(private db: AngularFireDatabase) { 
    mapboxgl.accessToken = environment.mapbox.accessToken;

    this.itemsRef = db.list('markers');
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  getMarkers() {
    return this.items;
  }

  createMarker(data: GeoJson) {
    return this.itemsRef.push(data);
  }

  removeMarker($key: string) {
    return this.itemsRef.remove($key);
  }

}
