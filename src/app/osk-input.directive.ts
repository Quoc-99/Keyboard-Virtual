import { Subscription } from 'rxjs';
import {
  Directive,
  HostListener,
  OnDestroy,
  OnInit,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { KeyboardService } from './keyboard.service';

@Directive({
  selector: '[appOskInput]',
})
export class OskInputDirective implements OnInit, OnDestroy {
  private keySubscription!: Subscription;
  private backspaceSubscription!: Subscription;
  private enterSubscription!: Subscription;
  private measure!: HTMLElement;

  @Output() keyup: EventEmitter<any> = new EventEmitter();

  constructor(
    private keyboardService: KeyboardService,
    private el: ElementRef
  ) {}

  ngOnInit() {
    let thisStyle = window.getComputedStyle(this.el.nativeElement);
    this.measure = document.createElement('span');
    this.measure.style.position = 'absolute';
    this.measure.style.right = '100%';
    this.measure.style.font = thisStyle.font;

    document.body.appendChild(this.measure);
  }

  ngOnDestroy() {
    this.unsubscribeFromKeyboardEvents();
  }

  @HostListener('focus')
  private onFocus() {
    this.keyboardService.fireKeyboardRequest(true);
    this.subcribeToKeyboardEvenet();
  }

  @HostListener('blur')
  private onBlur() {
    this.keyboardService.fireKeyboardRequest(false);
    this.unsubscribeFromKeyboardEvents();
  }

  private subcribeToKeyboardEvenet() {
    this.keySubscription = this.keyboardService.keyPressed.subscribe((key) => {
      this.onKey(key);
    });

    this.backspaceSubscription =
      this.keyboardService.backspacePressed.subscribe((_) => {
        this.onBackSpace();
      });

    this.enterSubscription = this.keyboardService.enterPressed.subscribe(
      (_) => {
        this.onEnter();
      }
    );
  }

  private unsubscribeFromKeyboardEvents() {
    this.keySubscription.unsubscribe();
    this.backspaceSubscription.unsubscribe();
    this.enterSubscription.unsubscribe();
  }

  private onKey(key: string) {
    let element = this.el.nativeElement;
    let start = element.selectionStart;
    let end = element.selectionEnd;

    this.measure.textContent = element.value.substr(0, start) + key;
    element.value =
      element.value.substr(0, start) + key + element.value.substr(end);
    element.focus();
    element.selectionStart = element.selectionEnd = start + 1;
    // console.log(element.selectionStart);
    this.keyup.emit(key);
  }

  private onBackSpace() {
    let element = this.el.nativeElement;
    let start = element.selectionStart;
    let end = element.selectionEnd;

    if (start == 0) {
      return;
    }

    if (start == end) {
      start--;
    }

    this.measure.textContent = element.value.substr(0, start);
    element.value = element.value.substr(0, start) + element.value.substr(end);
    element.focus();
    element.selectionStart = element.selectionEnd = start;
    this.keyup.emit(element.value);
  }

  private onEnter() {}
}
