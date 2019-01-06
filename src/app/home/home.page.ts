import { Component } from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
   lat : any;
   lng : any;

  constructor(public geolocation : Geolocation) {
  }

  ngOnInit() {
     this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      console.log('OK');
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
}
