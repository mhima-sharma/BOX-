import { Inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export type ThemeMode = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'boxe-theme';
  private readonly renderer: Renderer2;
  private readonly themeSubject = new BehaviorSubject<ThemeMode>('light');

  readonly currentTheme$ = this.themeSubject.asObservable();

  constructor(
    rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(PLATFORM_ID) private readonly platformId: object
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  initTheme(): void {
    const storedTheme = this.getStoredTheme();
    this.applyTheme(storedTheme ?? 'light');
  }

  toggleTheme(): ThemeMode {
    const nextTheme = this.themeSubject.value === 'dark' ? 'light' : 'dark';
    this.setTheme(nextTheme);
    return nextTheme;
  }

  setTheme(theme: ThemeMode): void {
    this.applyTheme(theme);
    this.persistTheme(theme);
  }

  getCurrentTheme(): ThemeMode {
    return this.themeSubject.value;
  }

  private getStoredTheme(): ThemeMode | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    try {
      const value = localStorage.getItem(this.storageKey);
      return value === 'dark' || value === 'light' ? value : null;
    } catch {
      return null;
    }
  }

  private persistTheme(theme: ThemeMode): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      localStorage.setItem(this.storageKey, theme);
    } catch {
      // Ignore write errors (e.g., private mode or storage disabled).
    }
  }

  private applyTheme(theme: ThemeMode): void {
    this.themeSubject.next(theme);

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const body = this.document.body;
    this.renderer.removeClass(body, 'theme-light');
    this.renderer.removeClass(body, 'theme-dark');
    this.renderer.addClass(body, `theme-${theme}`);
  }
}
