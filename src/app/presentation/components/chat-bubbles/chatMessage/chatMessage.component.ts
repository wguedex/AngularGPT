import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
    selector: 'app-chat-message',
    standalone: true,
    imports: [
        CommonModule,
        MarkdownComponent
    ],
    templateUrl: './chatMessage.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessageComponent { 

    @Input({required:true}) text!: String;

}
