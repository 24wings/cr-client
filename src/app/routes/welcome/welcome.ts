import { Component } from '@angular/core';

@Component({
  selector: 'welcome',
  templateUrl: './welcome.html',
  styleUrls: ['./welcome.less'],
})

export class welcome {
  onValueChange(value: Date): void {
    console.log(`Current value: ${value}`);
  }

  onModeChange(mode: 'month' | 'year'): void {
    console.log(`Current mode: ${mode}`);
  }
}
