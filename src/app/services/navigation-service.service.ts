import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { faCog, faDollarSign, faExclamation, faHome, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { NavigationItem } from '../models/navigation-item';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  public navigationRoutes: NavigationItem[] = [
    new NavigationItem('/dashboard', 'dashboard', 'Dashboard', faHome, false),
    new NavigationItem('/page-1', 'page-1', 'page-1', faDollarSign, false),
    new NavigationItem('/settings', 'settings', 'Settings', faCog, false),
    new NavigationItem('', 'logout', 'Logout', faSignOutAlt, false, () =>
      // this.authService.logout() // here goes the auth servie
      console.log('user logged out')
    ),
  ];

  // save the last route item if user needs to re-authenticate
  public get currentRoute(): NavigationItem {
    var _url = this.router.url;
    var currRoute = null;
    var attempts = this.navigationRoutes.length;
    var attempt = 0;

    while (currRoute == null && attempt <= attempts) {
      var _ = this.navigationRoutes.filter((nr: NavigationItem) => {
        nr.active = false;
        return nr.route.indexOf(_url) > -1;
      });

      currRoute = _[0];

      var routeEnd = _url.lastIndexOf('/');
      if (routeEnd > -1) _url = _url.substr(0, routeEnd);
      attempt++;
    }
    if (currRoute == null)
      return new NavigationItem(
        '',
        '',
        '',
        faExclamation,
        false
      );

    currRoute.active = true;
    return currRoute;
  }

  constructor(private router: Router) { }
}
