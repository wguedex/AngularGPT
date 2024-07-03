import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent, MyMessageComponent, TextMessageBoxComponent, TypingLoaderComponent } from '@components/index';
import { TextMessageBoxFileComponent, TextMessageEvent } from '@components/text-boxes/textMessageBoxFile/textMessageBoxFile.component';
import { TextMessageBoxEvent, TextMessageBoxSelectComponent } from '@components/text-boxes/textMessageBoxSelect/textMessageBoxSelect.component';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from '@services/openai.service';

@Component({
    selector: 'app-chat-template',
    standalone: true,
    imports: [
        CommonModule,
        ChatMessageComponent,
        MyMessageComponent,
        TypingLoaderComponent,
        TextMessageBoxComponent,
        TextMessageBoxFileComponent,
        TextMessageBoxSelectComponent
    ],
    templateUrl: './chatTemplate.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatTemplateComponent { 

  public messages = signal<Message[]>([{text:'Hola Mundo', isGpt: true}]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  handleMessage(prompt: string) {
    console.log({ prompt });
  }

  handleMessageWithFile({ prompt, file }: TextMessageEvent) {
    console.log({ prompt, file });
  }

  handleMessageWithSelect({ prompt, selectedOption }: TextMessageBoxEvent) {
    console.log({ prompt, selectedOption });
  }

}
