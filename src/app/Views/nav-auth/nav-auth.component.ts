import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-nav-auth',
  templateUrl: './nav-auth.component.html',
  styleUrls: ['./nav-auth.component.scss']
})
export class NavAuthComponent {

  @HostListener('window:scroll', ['$event'])
onWindowScroll():void {
  let element = document.querySelector('.navbar') as HTMLElement;
  // console.log(window.scrollY);
// using scrollY because pageYOffset is deprecated
  if (window.scrollY  > element.clientHeight) {
    // element.classList.add('bg-info');
    element.classList.remove('py-4');
    element.classList.add('fixed-top');
  } else {
    // element.classList.remove('bg-info');
    element.classList.add('py-4');
    element.classList.remove('fixed-top');
  }
}

}
