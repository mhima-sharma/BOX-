import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet, ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { filter } from 'rxjs/operators';

import { SeoService } from './seo.service';
import { ThemeService } from './service/theme.service';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'BOXÉ';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private seo: SeoService,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.themeService.initTheme();

    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {

      // ✅ Google Analytics Tracking
      gtag('config', 'G-N71CH0CJQM', {
        page_path: event.urlAfterRedirects
      });


      // ✅ SEO Meta Tag Update
      let route = this.activatedRoute.firstChild;

      while (route?.firstChild) {
        route = route.firstChild;
      }

      if (route?.snapshot.data['title']) {

        this.seo.update(
          route.snapshot.data['title'],
          route.snapshot.data['description']
        );

      }

    });

  }

}
