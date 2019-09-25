import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs/Subscription';
import { filter } from 'rxjs/operators';
import { Geolocation } from '@ionic-native/geolocation/ngx'; 
import { Router } from '@angular/router';

declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})

export class MapPage implements OnInit, AfterContentInit {

  map: any;
  constructor(private router: Router, private plt: Platform, private geo: Geolocation, private storage: Storage) { }
  @ViewChild("mapElement") mapElement;

  currentMapTrack = null;
  isTracking = false;

  trackedRoute = [];
  previousTracks = [];

  positionSubscription: Subscription;
  
  ngOnInit(){}
  
  loadHistoricRoutes(){
    this.storage.get('routes').then(data=>{
      if(data){
        this.previousTracks = data;
      }
    });
  }
  
  ngAfterContentInit():void{
    
    this.plt.ready().then(()=>{
    
      let options = {
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    
      this.loadHistoricRoutes();
      this.map = new google.maps.Map(
      this.mapElement.nativeElement,options);
    

      this.geo.getCurrentPosition().then(pos=>{
      let latlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      this.map.setCenter(latlng);
    })

   
    })};

//begin tracking users location
startTracking() {
  this.isTracking = true;
  this.trackedRoute = [];
 
  this.positionSubscription = this.geo.watchPosition()
    .pipe(
      filter((p) => p.coords !== undefined) 
    )
    .subscribe(data => {
      setTimeout(() => {
        this.trackedRoute.push({ lat: data.coords.latitude, lng: data.coords.longitude });
        this.redrawPath(this.trackedRoute);
        }, 0);
      });
 }
 
redrawPath(path) {
    if (this.currentMapTrack) {
      this.currentMapTrack.setMap(null);
    }
 
    if (path.length > 1) {
      this.currentMapTrack = new google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: '#ff00ff',
        strokeOpacity: 1.0,
        strokeWeight: 3
      });
      this.currentMapTrack.setMap(this.map);
    }
  }

  //stop tracking the users route
  stopTracking() {
      let newRoute = { finished: new Date().getTime(), path: this.trackedRoute };
      this.previousTracks.push(newRoute);
      this.storage.set('routes', this.previousTracks);
 
      this.isTracking = false;
      this.positionSubscription.unsubscribe();
      this.currentMapTrack.setMap(null);
  } 
 
  //show previous route
  showHistoryRoute(route){
    this.redrawPath(route);
  }

  //navigate to dashboard
  goDash(){
    this.router.navigate(['/dashboard']);
  }

}