import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
/**
 * Serviço para apenas ver qual a plataforma que
 * está rodando
 */
@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  constructor(@Inject(PLATFORM_ID) private protectorId: string) { }

  isPlatformBrowser(): boolean {
    return isPlatformBrowser(this.protectorId);
  }
}
