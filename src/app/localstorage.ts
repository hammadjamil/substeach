import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class MyStorage {

    constructor(private storage: Storage){

    }
   
   set(key,value){
       this.storage.set(key,value);
   }

   get(key){
       return this.storage.get(key);
   }
}