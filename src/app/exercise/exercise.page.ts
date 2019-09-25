import { Component, OnInit, ViewChild} from '@angular/core';
import { StorageService, Item, Exercise } from '../services/storage.service';
import { Platform, ToastController, IonList } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.page.html',
  styleUrls: ['./exercise.page.scss'],
})
export class ExercisePage implements OnInit {
  exercises: Exercise[] = [];
 
  id: number;
  newExercise: Exercise = <Exercise>{};
 
  @ViewChild('mylist')mylist: IonList;

  constructor(private storageService: StorageService, private plt: Platform, private toastController: ToastController, private router: Router) { 
    this.plt.ready().then(() => {
      this.loadExercises();
    });
  }

  ngOnInit() {
  }

  goDash(){
    this.router.navigate(['/dashboard']);
  }
  
  go(exercise: Exercise){
    this.loadExercises();
    this.id = exercise.id;
    this.router.navigate(['/edit-exercise', this.id]);
  }

  // CREATE
  addExercise() {
    this.newExercise.modified = Date.now();
    this.newExercise.id = Date.now();
 
    this.storageService.addExercise(this.newExercise).then(exercise => {
      this.newExercise = <Exercise>{};
      this.showToast('Exercise Added!')
      this.loadExercises(); // Or add it to the array directly
    });
  }

  // READ
  loadExercises() {
    this.storageService.getExercises().then(exercises => {
      this.exercises = exercises;
    });
  }


  // DELETE
  deleteExercise(exercise: Exercise) {
    this.storageService.deleteExercise(exercise.id).then(exercise=> {
      this.showToast('Exercise removed!');
      this.mylist.closeSlidingItems(); // Fix or sliding is stuck afterwards
      this.loadExercises(); // Or splice it from the array directly
    });
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