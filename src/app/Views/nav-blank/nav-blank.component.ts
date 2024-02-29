import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.scss']
})
export class NavBlankComponent {
constructor(private _router: Router){}

  signOUt():void{

    localStorage.removeItem('eToken');
    localStorage.removeItem('userData');
    this._router.navigate(['/login']);
  }

}
