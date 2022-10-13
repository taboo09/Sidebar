import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { faBars, faUserAstronaut, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { NavigationItem } from 'src/app/models/navigation-item';
import { NavigationService } from 'src/app/services/navigation-service.service';
import { environment as env } from '../../../environments/environment';

@Component({
  selector: 'app-page-container',
  templateUrl: './page-container.component.html',
  styleUrls: ['./page-container.component.scss']
})
export class PageContainerComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  public authenticatedView: Boolean = true;

  public get userIcon(): IconDefinition {
    return faUserAstronaut;
  }
  public get menuIcon(): IconDefinition {
    return faBars;
  }

  public mobileSidebarMode: MatDrawerMode = 'over';
  public desktopSidebarMode: MatDrawerMode = 'side';
  public burgerMenuOpen: boolean = false;
  public sidebarMode: MatDrawerMode = this.desktopSidebarMode;
  public versionNumber: string = env.releaseVersion == '|RELEASE-VERSION|' ? 'Development' : env.releaseVersion;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    setTimeout(() => {
      var target = event.target as Window;
      this.setSidebarProperties(target.innerWidth);
    }, 0);
  }

  private setSidebarProperties(width: number) {
    if (width > 600) {
      this.sidebarMode = this.desktopSidebarMode;
      this.sidenav?.open();
      this.burgerMenuOpen = true;
    } else {
      this.sidenav?.close();
      this.sidebarMode = this.mobileSidebarMode;
    }
  }

  constructor(public navigationService: NavigationService,
    private router: Router) { }

  ngOnInit(): void {
    this.navigationService.navigationRoutes;
  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      this.setSidebarProperties(window.innerWidth);       
    });
  }

  public navigate(navigationItem: NavigationItem): void {
    if (navigationItem.action != null) navigationItem.action();

    if (navigationItem.route != '')
      this.router.navigate([navigationItem.route]);
  }

}
