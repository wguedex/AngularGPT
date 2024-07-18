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
 
  handleMessageWithSelect({ prompt, selectedOption }: TextMessageBoxEvent) {
    const message = `${selectedOption} - ${prompt}`;

    this.messages.update(prev => [...prev, {text:message, isGpt:false}])
    this.isLoading.set(true);

    this.openAiService.textToAudio(prompt,selectedOption)
    .subscribe(({message,audioUrl})=> {
      this.isLoading.set(false);
      this.messages.update(prev => [
        ...prev,
        {
          isGpt:true,
          text: message , 
          audioUrl: audioUrl
        }
      ])
    });

  }

}
