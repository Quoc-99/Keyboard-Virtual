import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { KeyboardKeyDirective } from './keyboard-key.directive';
import { OskInputDirective } from './osk-input.directive';

@NgModule({
  declarations: [
    AppComponent,
    KeyboardComponent,
    KeyboardKeyDirective,
    OskInputDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
