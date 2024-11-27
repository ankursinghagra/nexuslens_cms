import { provideAnimations } from '@angular/platform-browser/animations';
import { NG_EVENT_PLUGINS } from '@taiga-ui/event-plugins';
import { TuiRoot } from '@taiga-ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [TuiRoot, BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [provideAnimations(), NG_EVENT_PLUGINS],
  bootstrap: [AppComponent],
})
export class AppModule {}
