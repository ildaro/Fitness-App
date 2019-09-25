import { Component, OnInit, ViewChild} from '@angular/core';
import { StorageService, Item } from 'src/app/services/storage.service';
import { Platform, ToastController, IonList } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-meal',
  templateUrl: './edit-meal.page.html',
  styleUrls: ['./edit-meal.page.scss'],
})
export class EditMealPage implements OnInit {

  items: Item[] = [];
 
  editedItem: Item = <Item>{};

  myId = null;

  @ViewChild('mylist')mylist: IonList;

  constructor(private router: Router, private storageService: StorageService, private plt: Platform, private toastController: ToastController, private activatedRoute: ActivatedRoute) { 
    this.plt.ready().then(() => {
      this.loadItems();
    });
  }

  ngOnInit() {
    this.myId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.myId);
  }

  loadItems() {
    this.storageService.getItems().then(items => {
      this.items = items;
    });
  }

  updateItem(editedItem: Item) {
    editedItem.modified = Date.now();
 
    this.storageService.updateItem(editedItem).then(editedItem => {
      this.showToast('Meal updated! Refresh if it does not show.');
      this.loadItems(); // Or update it inside the array directly
    });

    this.router.navigate(['/meal']);
  
  }


  go(){

  }
   // Helper
   async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
