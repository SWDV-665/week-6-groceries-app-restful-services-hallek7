import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { GroceriesServiceService } from '../groceries-service.service';
import { InputDialogServiceService } from '../input-dialog-service.service';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
  //providers: [GroceriesServiceService]
})
export class Tab1Page {
  title = "Grocery";

  items = [];
  errorMessage: string;


  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public dataService: GroceriesServiceService,
    public inputDialogService: InputDialogServiceService,
    public socialSharing: SocialSharing,) {
    dataService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadItems();
    });

  }

  ionViewDidLoad() {
    this.loadItems();
  }

  loadItems() {
    //return this.dataService.getItems;
    // return this.dataService.items;
    this.dataService.getItems()
      .subscribe(
        items => this.items,
        error => this.errorMessage = <any>error);
  }

  async removeItem(id) {
    this.dataService.removeItem(id);
  }

  async shareItem(item) {
    console.log("Sharing Item -", item);
    const toast = await this.toastCtrl.create({
      message: 'Sharing Item -' + item.name + "...",
      duration: 3000

    });
    await toast.present();

    let message = "Grocery Item - Name: " + item.name + " - Quantity: " + item.quantity;
    let subject = "Shared via Groceries App";

    this.socialSharing.share(message, subject).then(() => {
      // Sharing via email is possible
      console.log("Shared Successfully!");
    }).catch((error) => {
      // Sharing via email is not possible
      console.log("Error While Sharing", error);
    });


  }

  async editItem(item: any, index: any) {
    console.log("Edit Item -", item, index);
    const toast = await this.toastCtrl.create({
      message: 'Editing Item -' + index + "...",
      duration: 3000

    });
    await toast.present();
    this.inputDialogService.showPrompt(item, index)
  }


  async addItem() {
    console.log("Adding Item");
    this.inputDialogService.showPrompt();
  }
}




