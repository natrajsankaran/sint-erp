import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';

interface MenuItem {
  id: number;
  name: string;
  routerLink: string;
  icon?: string;
  displayOrderWeight: number;
  children?: MenuItem[]
}

const MY_MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    name: 'Dashboard',
    routerLink: '/console',
    icon: 'icon-home',
    displayOrderWeight: -1,
  },
  {
    id: 2,
    name: 'CRM',
    routerLink: null,
    icon: 'icon-earphones-alt',
    displayOrderWeight: -2,
    children: [
      {
        id: 3,
        name: 'Enquiries',
        routerLink: '/console/enquiry',
        displayOrderWeight: -1,
      },
    ]
  },
  {
    id: 4,
    name: 'Projects',
    routerLink: '/console',
    icon: 'icon-notebook',
    displayOrderWeight: -3,
  },
  {
    id: 5,
    name: 'Production',
    routerLink: null,
    icon: 'icon-chemistry',
    displayOrderWeight: -4,
    children: [
      {
        id: 6,
        name: 'In-House Schedule',
        routerLink: '/console',
        displayOrderWeight: -1,
      },
      {
        id: 7,
        name: 'Sub-Contracted Schedule',
        routerLink: '/console',
        displayOrderWeight: -2,
      },
    ]
  },
  {
    id: 8,
    name: 'HRM',
    routerLink: '/console',
    icon: 'icon-layers',
    displayOrderWeight: -5,
  },
  {
    id: 9,
    name: 'Master Data',
    routerLink: '/console/master-data/overview',
    icon: 'icon-globe-alt',
    displayOrderWeight: -6,
  },
  {
    id: 10,
    name: 'Organisation',
    routerLink: '/console',
    icon: 'icon-briefcase',
    displayOrderWeight: -7,
  },
  {
    id: 11,
    name: 'Settings',
    routerLink: '/console',
    icon: 'icon-wrench',
    displayOrderWeight: -8,
  },
];

// HACK for making some stylesheets to be applied to all childs. Negative consequence the style sheets apply to complete application.
@Component({
  selector: 'app-console-main-content',
  template: '',
  styleUrls: [
    '../themes/make_extract/assets/global/css/style.main-content.css',
    '../themes/make_extract/assets/global/css/style.widget-quicklinks.css',
    '../themes/make_extract/assets/global/css/ui.shared.css',
    '../themes/make_extract/assets/global/css/theme.sdtl.color-red.css',
    '../themes/make_extract/assets/admin/layout1/css/layout.css',
  ],
  encapsulation: ViewEncapsulation.None
})
export class ConsoleMainContentComponent { }

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: [
    // Looks not necessary after HACK (See above). But if required, move styles from this file to console.component.css
    // '../themes/make_extract/assets/global/css/style.shared.css',
    '../themes/make_extract/assets/global/css/style.topbar-sidebar.css',
    // Not necessary after HACK (See above)
    // '../themes/make_extract/assets/global/css/style.main-content.css',
    // '../themes/make_extract/assets/global/css/theme.sdtl.color-red.css',
    // '../themes/make_extract/assets/admin/layout1/css/layout.css',
    './console.component.css'
  ]
})
export class ConsoleComponent implements OnInit, OnDestroy {

  destroySubject$: Subject<void> = new Subject();
  isSideBarCollapsed = false;
  myMenuItems = MY_MENU_ITEMS;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroySubject$.next();
  }

  myMenuItemHoverClass(myMenuItem) {
    myMenuItem.hover = !myMenuItem.hover;
  }

  myMenuItemActivateClass(myMenuItem) {
    myMenuItem.active = !myMenuItem.active;
  }

}
