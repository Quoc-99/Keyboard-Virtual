import { Component, ElementRef, ViewChild } from '@angular/core';
import { KeyboardService } from './keyboard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'keyboard';
  valueInput: string = '';
  valueArray: string[] = ['', '', '', '', '', '', '', '', '', '', '', ''];
  @ViewChild('input') input!: ElementRef;

  constructor(private keyboardService: KeyboardService) {}

  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    this.changeValueInput(this.input.nativeElement.value);
  }

  move(event: any, p: any, c: any, n: any) {
    const length = c.value.length;
    const maxLength = c.getAttribute('maxlength');
    if (length == maxLength) {
      if (n != '') {
        n.focus();
      }
    }
    if (event.key == 'Backspace') {
      if (p != '') {
        p.focus();
      }
    }
  }

  focusInput() {
    this.input.nativeElement.focus();
  }

  changeValueInput(valueInput: string) {
    this.valueArray = valueInput.split('');
    console.log(this.valueArray);
  }
}
