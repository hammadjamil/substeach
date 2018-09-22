import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular/index';
import { AlertController } from 'ionic-angular';

@Injectable()
export class MyTools {
    americanStates = {
        "AL": "Alabama",
        "AK": "Alaska",
        "AS": "American Samoa",
        "AZ": "Arizona",
        "AR": "Arkansas",
        "CA": "California",
        "CO": "Colorado",
        "CT": "Connecticut",
        "DE": "Delaware",
        "DC": "District Of Columbia",
        "FM": "Federated States Of Micronesia",
        "FL": "Florida",
        "GA": "Georgia",
        "GU": "Guam",
        "HI": "Hawaii",
        "HA": "Hawaii",
        "ID": "Idaho",
        "IL": "Illinois",
        "IN": "Indiana",
        "IA": "Iowa",
        "KS": "Kansas",
        "KY": "Kentucky",
        "LA": "Louisiana",
        "ME": "Maine",
        "MH": "Marshall Islands",
        "MD": "Maryland",
        "MA": "Massachusetts",
        "MI": "Michigan",
        "MN": "Minnesota",
        "MS": "Mississippi",
        "MO": "Missouri",
        "MT": "Montana",
        "NE": "Nebraska",
        "NV": "Nevada",
        "NH": "New Hampshire",
        "NJ": "New Jersey",
        "NM": "New Mexico",
        "NY": "New York",
        "NC": "North Carolina",
        "ND": "North Dakota",
        "MP": "Northern Mariana Islands",
        "OH": "Ohio",
        "OK": "Oklahoma",
        "OR": "Oregon",
        "PW": "Palau",
        "PA": "Pennsylvania",
        "PR": "Puerto Rico",
        "RI": "Rhode Island",
        "SC": "South Carolina",
        "SD": "South Dakota",
        "TN": "Tennessee",
        "TX": "Texas",
        "UT": "Utah",
        "VT": "Vermont",
        "VI": "Virgin Islands",
        "VA": "Virginia",
        "WA": "Washington",
        "WV": "West Virginia",
        "WI": "Wisconsin",
        "WY": "Wyoming"
    }
    constructor(
        private lodingctrl: LoadingController,
        private alertCtrl: AlertController,
    ) {

    }

    getLoader() {
        console.log('showing loader now');
        let loader = this.lodingctrl.create({
            spinner: 'hide',
            showBackdrop: false,
            content: `
      <div class="custom-spinner-container" style="width:70px">
        <img src = "../../assets/imgs/loader2.gif">
      </div>`
        });

        return loader;
    }

    getAlerBox(title, message) {
        let alertBox = this.alertCtrl.create({
            title: title,
            message: message,
            buttons: ['OK']
        });

        return alertBox;
    }

    getAmericanStates(){
        return this.americanStates;
    }

    
}