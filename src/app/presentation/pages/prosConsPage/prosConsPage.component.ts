import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent, MyMessageComponent, TextMessageBoxComponent, TextMessageBoxFileComponent, TextMessageBoxSelectComponent, TypingLoaderComponent } from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from '@services/openai.service';

@Component({
    selector: 'app-pros-cons-page',
    standalone: true,
    imports: [
        CommonModule,
        ChatMessageComponent,
        MyMessageComponent,
        TypingLoaderComponent,
        TextMessageBoxComponent,
    ],
    templateUrl: './prosConsPage.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConsPageComponent { 



    public messages = signal<Message[]>([]);
    public isLoading = signal(false);
    public openAiService = inject( OpenAiService );
  
  
  
    handleMessage( prompt: string ) {
  
      this.messages.update( (prev) => [
        ...prev,
        {
          isGpt: false,
          text: prompt
        }
      ]);
  
  
      this.isLoading.set(true);
      this.openAiService.prosConstDiscusser(prompt)
        .subscribe( resp => {
  
          this.isLoading.set(false);
          this.messages.update( prev => [
            ...prev,
            {
              isGpt: true,
              text: resp.content
            }
          ]);
  
  
  
        })
  
  
    }
}
