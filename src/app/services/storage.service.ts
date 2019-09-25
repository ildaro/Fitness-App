import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
 
export interface Item {
  id: number,
  title: string,
  value: string,
  modified: number
}

export interface Exercise {
  id: number,
  name: string,
  description: string,
  sets: number,
  reps: number,
  modified: number,
}
 
const ITEMS_KEY = 'my-items';
const EXER_KEY = 'my-exercises';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
 
  constructor(private storage: Storage) { }
 
  // CREATE item 
  addItem(item: Item): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
      if (items) {
        items.push(item);
        return this.storage.set(ITEMS_KEY, items);
      } else {
        return this.storage.set(ITEMS_KEY, [item]);
      }
    });
  }
 
  //create exercise
  addExercise(exercise: Exercise): Promise<any>{
    return this.storage.get(EXER_KEY).then((exercises: Exercise[]) =>{
      if(exercises){
        exercises.push(exercise);
        return this.storage.set(EXER_KEY, exercises);
      }else{
        return this.storage.set(EXER_KEY, [exercise]);
      }
    });
  }

  // READ items
  getItems(): Promise<Item[]> {
    return this.storage.get(ITEMS_KEY);
  }

  //read exercises
  getExercises(): Promise<Exercise[]>{
    return this.storage.get(EXER_KEY);
  }

  // UPDATE item
  updateItem(item: Item): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
      if (!items || items.length === 0) {
        return null;
      }
 
      let newItems: Item[] = [];
 
      for (let i of items) {
        if (i.id === item.id) {
          newItems.push(item);
        } else {
          newItems.push(i);
        }
      }
 
      return this.storage.set(ITEMS_KEY, newItems);
    });
  }
 
  //update Exercise
  updateExercise(exercise: Exercise): Promise<any>{
    return this.storage.get(EXER_KEY).then((exercises: Exercise[]) => {
      if (!exercises || exercises.length === 0){
        return null;
      }

      let newExercises: Exercise[] = [];

      for(let e of exercises){
        if(e.id === exercise.id){
          newExercises.push(exercise);
        }else{
          newExercises.push(e);
        }
      }

      return this.storage.set(EXER_KEY, newExercises);
    });
  }

  // DELETE
  deleteItem(id: number): Promise<Item> {
    return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
      if (!items || items.length === 0) {
        return null;
      }
 
      let toKeep: Item[] = [];
 
      for (let i of items) {
        if (i.id !== id) {
          toKeep.push(i);
        }
      }
      return this.storage.set(ITEMS_KEY, toKeep);
    });
  }

  //DELETE EXERCISE
  deleteExercise(id: number): Promise<Exercise>{
    return this.storage.get(EXER_KEY).then((exercises: Exercise[]) => {
      if(!exercises || exercises.length === 0){
        return null;
      }

      let toKeep: Exercise[] = [];

      for(let e of exercises){
        if(e.id !== id){
          toKeep.push(e);
        }
      }
      return this.storage.set(EXER_KEY, toKeep);
    });
  }
}