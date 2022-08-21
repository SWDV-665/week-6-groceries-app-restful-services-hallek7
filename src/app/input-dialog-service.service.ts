import { Component, Injectable } from '@angular/core';
import { AlertController, IonItem } from '@ionic/angular';
import { GroceriesServiceService } from './groceries-service.service'

@Component({
})

@Injectable({
  providedIn: 'root'
})
export class InputDialogServiceService {

  constructor(public alertCtrl: AlertController,
    public dataService: GroceriesServiceService) {
    console.log('Hello Input Dialog Service Provider')
  }
  // parameters optional with Terneary operator 
  async showPrompt(item?, index?) {
    const alert = await this.alertCtrl.create({
      // if item is passed then we know its an edit item 
      header: item ? 'Edit Item' : 'Add Item',
      message: item ? "Please edit line..." : "Please enter item...",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          // if item is passed we can then continue if not null 
          value: item ? item.name : null
        },

        {
          type: 'number',
          name: 'quantity',
          placeholder: 'Quantity',
          min: 1,
          max: 10,
          // if item is passed get the quantity or  if not null 
          value: item ? item.quantity : null
        },

      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'Cancel',
          handler: data => {
            console.log('Cancel Clicked')

          }
        },

        {
          text: 'Save',
          handler: item => {
            console.log('Saved Clicked', item);
            // if item is found then use edit if not use add
            if (index !== undefined) {
              this.dataService.editItem(item, index);
            } else {
              this.dataService.addItem(item)
            }

          }
        }
      ],

    });

    await alert.present();
  }

  async showAddItemPrompt() {
    const alert = await this.alertCtrl.create({
      header: 'Add Item',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        },
        {
          name: 'quantity',
          placeholder: 'Quantity',
          min: 1,
          max: 100
        },

      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'Cancel',
          handler: data => {
            console.log('Cancel Clicked')

          }
        },

        {
          text: 'Save',
          handler: data => {
            console.log('Saved Handler', data);
            if (index !== undefined) {
              item.name = data.name;
              item.quantity = data.quantity;
              this.dataService.editItem(item, index);
            } else {
              this.dataService.addItem(data);
            }
          }
        }
      ],

    });

    await alert.present();
  }

}
