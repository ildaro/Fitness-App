import { Component, OnInit, ViewChild} from '@angular/core';
import { StorageService, Exercise } from 'src/app/services/storage.service';
import { Platform, ToastController, IonList } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-exercise',
  templateUrl: './edit-exercise.page.html',
  styleUrls: ['./edit-exercise.page.scss'],
})
export class EditExercisePage implements OnInit {

  exercises: Exercise[] = [];
 
  editedExercise: Exercise = <Exercise>{};

  myId = null;

  @ViewChild('mylist')mylist: IonList;

  constructor(private router: Router, private storageService: StorageService, private plt: Platform, private toastController: ToastController, private activatedRoute: ActivatedRoute) { 
    this.plt.ready().then(() => {
      this.loadExercises();
    });
  }

  ngOnInit() {
    this.myId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  loadExercises() {
    this.storageService.getExercises().then(exercises => {
      this.exercises = exercises;
    });
  }

  updateExercise(editedExercise: Exercise) {
    editedExercise.modified = Date.now();
 
    this.storageService.updateExercise(editedExercise).then(editedExercise => {
      this.showToast('Exercise updated! Refresh if it does not show.');
      this.loadExercises(); // Or update it inside the array directly
    });

    this.router.navigate(['/exercise']);
  
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
