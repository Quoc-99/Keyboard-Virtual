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
  valueArray: any;
  // valueInput1: string = '';
  // valueInput2: string = '';
  // valueInput3: string = '';
  // valueInput4: string = '';
  // valueInput5: string = '';
  // valueInput6: string = '';
  // valueInput7: string = '';
  // valueInput8: string = '';
  // valueInput9: string = '';
  // valueInput10: string = '';
  // valueInput11: string = '';
  // valueInput12: string = '';
  lengtInput: number = 12;
  @ViewChild('input') input!: ElementRef;

  constructor(private keyboardService: KeyboardService) {

  }

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
