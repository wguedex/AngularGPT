
import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-typing-loader",
  standalone: true,
  imports: [],
  styleUrl: 'TypingLoader.component.css',
  template: `
    <div class="typing">
      <span class="circle scaling"></span>
      <span class="circle scaling"></span>
      <span class="circle scaling"></span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypingLoaderComponent {}
