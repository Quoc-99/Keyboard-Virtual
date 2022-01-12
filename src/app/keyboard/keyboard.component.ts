import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { KeyboardService } from '../keyboard.service';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss'],
})
export class KeyboardComponent implements OnInit {
  @HostBinding('class.shown')
  private show!: boolean;
  private keyboardSubscription!: Subscription;

  constructor(
    private el: ElementRef,
    public keyboardService: KeyboardService
  ) {}

  ngOnInit(): void {
    this.keyboardSubscription =
      this.keyboardService.KeyboardRequested.subscribe((show) => {
        if (show) {
          this.show = true;
        } else {
          this.show = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.keyboardSubscription.unsubscribe();
  }

  onBackspace() {
    this.keyboardService.fireBackspacePressed();
  }
  onEnter() {
    this.keyboardService.fireEnterPressed();
  }

  @HostListener('mousedown', ['$event'])
  @HostListener('click', ['$event'])
  onMouseEvent(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
  }
}
