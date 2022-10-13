import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export class NavigationItem {
    constructor(
      public route: string,
      public safeRoute: string,
      public viewName: string,
      public icon: IconDefinition,
      public active: boolean,
      public action?: () => void
    ) {}
  }