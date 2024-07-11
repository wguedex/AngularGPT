import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'app-gpt-message-orthography',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './gptMessageOrthography.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GptMessageOrthographyComponent {

    @Input() userScore!: number;
    @Input() text!: string;
    @Input() errors: string[] = [];

 }
