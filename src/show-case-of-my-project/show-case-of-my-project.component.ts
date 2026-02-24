import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HeaderComponent } from "../elements/header/header.component";
import { ContentComponent } from "../elements/content/content.component";
import { FooterComponent } from "../elements/footer/footer.component";
import { NeedHelpComponent } from "../elements/need-help/need-help.component";
import { PlantsProductComponent } from "../elements/all-product/plants-product.component";

import { CommonModule } from '@angular/common';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

@Component({
  selector: 'app-show-case-of-my-project',
  standalone: true,
  imports: [
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    NeedHelpComponent,
    PlantsProductComponent,
    CommonModule,
   
  ],
  templateUrl: './show-case-of-my-project.component.html',
  styleUrl: './show-case-of-my-project.component.css'
})
export class ShowCaseOfMyProjectComponent implements OnInit, OnDestroy {
  activePanel: 'weather' | 'games' | 'chatbot' | null = null;
  locationGranted = false;
  userLocation: { lat: number; lon: number } | null = null;
  canInstall = false;
  isInstalled = false;
  showInstallCard = true;
  showInstallCardOnSide = false;
  installMessage = 'BOXE app install card: Install or Cancel.';
  installHelpText = '';

  selectedGame: SafeResourceUrl;
  private deferredPrompt: BeforeInstallPromptEvent | null = null;
  private reappearTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private readonly onAppInstalled = () => {
    this.isInstalled = true;
    this.canInstall = false;
    this.showInstallCard = false;
    this.deferredPrompt = null;
  };
  private readonly onBeforeInstallPrompt = (event: Event) => {
    const promptEvent = event as BeforeInstallPromptEvent;
    promptEvent.preventDefault();
    this.deferredPrompt = promptEvent;
    this.canInstall = true;
    this.showInstallCard = true;
    this.showInstallCardOnSide = true;
  };

  constructor(private sanitizer: DomSanitizer) {
    // Load Tic Tac Toe by default
    this.selectedGame = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://mhima-sharma.github.io/-tick-tack-/'
    );
  }

  ngOnInit(): void {
    this.isInstalled = window.matchMedia('(display-mode: standalone)').matches;
    this.showInstallCard = true;
    this.showInstallCardOnSide = true;
    window.addEventListener('beforeinstallprompt', this.onBeforeInstallPrompt);
    window.addEventListener('appinstalled', this.onAppInstalled);
  }

  ngOnDestroy(): void {
    window.removeEventListener('beforeinstallprompt', this.onBeforeInstallPrompt);
    window.removeEventListener('appinstalled', this.onAppInstalled);
    if (this.reappearTimeoutId) {
      clearTimeout(this.reappearTimeoutId);
      this.reappearTimeoutId = null;
    }
  }

  async installApp(): Promise<void> {
    if (!this.deferredPrompt) {
      this.installHelpText = 'Browser install prompt not available yet. In Chrome, open menu and tap Install app.';
      return;
    }
    await this.deferredPrompt.prompt();
    const result = await this.deferredPrompt.userChoice;
    if (result.outcome === 'accepted') {
      this.canInstall = false;
      this.showInstallCard = false;
      this.deferredPrompt = null;
      this.isInstalled = true;
      return;
    }
    this.dismissInstallCard();
  }

  dismissInstallCard(): void {
    this.showInstallCard = false;
    this.showInstallCardOnSide = false;
    this.installHelpText = '';
    if (this.reappearTimeoutId) {
      clearTimeout(this.reappearTimeoutId);
    }
    this.reappearTimeoutId = setTimeout(() => {
      if (!this.isInstalled) {
        this.showInstallCard = true;
        this.showInstallCardOnSide = true;
      }
    }, 30000);
  }

  closePanel() {
    this.activePanel = null;
  }

  openPanel(panel: 'weather' | 'games' | 'chatbot') {
    if (panel === 'weather') {
      this.requestLocationAccess();
    }
    this.activePanel = this.activePanel === panel ? null : panel;
  }

  selectGame(url: string) {
    this.selectedGame = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  private requestLocationAccess() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.locationGranted = true;
          this.userLocation = {
            lat: pos.coords.latitude,
            lon: pos.coords.longitude
          };
        },
        () => {
          this.locationGranted = false;
        }
      );
    }
  }

  requestWeatherAccess() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          this.locationGranted = true;
          this.openPanel('weather');
        },
        () => {
          this.locationGranted = false;
          this.openPanel('weather');
        }
      );
    } else {
      this.locationGranted = false;
      this.openPanel('weather');
    }
  }
}
