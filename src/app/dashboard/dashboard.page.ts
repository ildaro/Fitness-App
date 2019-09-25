import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  
  logout(){
    this.router.navigate(['/login']);
    this.authService.logout();
  }
  goTimer(){
    this.router.navigate(['/stopwatch']);
  }

  goMap(){
    this.router.navigate(['/map']);
  }

  goMeals(){
    this.router.navigate(['/meal']);
  }

  goExercises(){
    this.router.navigate(['/exercise']);
  }
}
