import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements AfterViewInit {

  ngAfterViewInit() {
    this.setRandomColors();
  }

  setRandomColors() {
    const buttons = document.querySelectorAll('.rect-button');
    buttons.forEach(button => {
      const bgColor = this.getRandomColor();
      (button as HTMLButtonElement).style.backgroundColor = bgColor;
      (button as HTMLButtonElement).style.color = this.getContrastColor(bgColor);
    });
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getContrastColor(hex: string): string {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);

    // Calculate luminance
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    
    // Return black or white based on luminance
    return luminance > 128 ? '#000000' : '#FFFFFF';
  }

}
