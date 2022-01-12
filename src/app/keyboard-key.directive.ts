import {
  Directive,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { KeyboardService } from './keyboard.service';

@Directive({
  selector: '[appKeyboardKey]',
})
export class KeyboardKeyDirective implements OnInit, OnDestroy {
  private _value!: string;

  @Input('appKeyboardKey') value!: string;
  @HostBinding('innerText') currentValue!: string;

  constructor(private keyboardService: KeyboardService) {}

  ngOnInit() {
    this.currentValue = this.value;
  }

  ngOnDestroy() {}

  @HostListener('click')
  onClick() {
    // console.log(this.currentValue);

    this.keyboardService.fireKeypressed(this.currentValue);
  }
}
