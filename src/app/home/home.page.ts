import { Component } from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation/ngx';

import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
   lat : any;
   lng : any;
   speed : any;
   private obs : any;

   error : string;

   constructor(private geolocation: Geolocation) {
   }

   getPosition(evt) {
      var options = {
         timeout: 60000
      };

      this.geolocation.getCurrentPosition(options).then((resp) => {
         this.lat = resp.coords.latitude;
         this.lng = resp.coords.longitude;
         this.speed = resp.coords.speed;
         this.error = "";
      }).catch((error) => {
         console.log('Error getting location', error);
         this.error = error;
      });
   }

   resetPosition(evt) {
      this.lat = 0;
      this.lng = 0;
      this.error = "";
      this.speed = "";
   }

   unsubscribe(evt) {
      if (this.obs != null) {
        this.obs.unsubscribe();
        this.obs = null;
        this.lat = 0;
        this.lng = 0;
        this.error = "";
        this.speed = "";
      }
   }

   subscribe(evt) {
      if (this.obs == null) {
          this.obs = this.geolocation.watchPosition().filter((p) => p.coords !== undefined)
             .subscribe(resp => {
                this.lat = resp.coords.latitude;
                this.lng = resp.coords.longitude;
                this.speed = resp.coords.speed;
                this.error = "";
          });
      }
   }

   ngOnInit() {
      this.obs = this.geolocation.watchPosition().filter((p) => p.coords !== undefined)
         .subscribe(resp => {
            this.lat = resp.coords.latitude;
            this.lng = resp.coords.longitude;
            this.speed = resp.coords.speed;
            this.error = "";
      });
   }
}
