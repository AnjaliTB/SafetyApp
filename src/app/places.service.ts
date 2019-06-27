import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Place {
  id?: string;
  name:string;
  latitude: number;
  longitude:number;
  score:number;
  userid:string;
}


@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private placesCollection: AngularFirestoreCollection<Place>;
 
  private places: Observable<Place[]>;
 
  constructor(db: AngularFirestore) {
    this.placesCollection = db.collection<Place>('places');
 
    this.places = this.placesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getPlaces() {
    return this.places;
  }
 
  getPlace(id) {
    return this.placesCollection.doc<Place>(id).valueChanges();
  }
 
  updatePlace(place: Place, id: string) {
    return this.placesCollection.doc(id).update(place);
  }
 
  addPlace(place: Place) {
    return this.placesCollection.add(place);
  }
 
  removePlace(id) {
    return this.placesCollection.doc(id).delete();
  }
  updateScore(place: Place, id: string){
    return this.placesCollection.doc(id).update(place);
  }
}
