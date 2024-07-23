import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent, MyMessageComponent, TextMessageBoxComponent, TextMessageBoxFileComponent, TextMessageBoxSelectComponent, TypingLoaderComponent } from '@components/index';
import { TextMessageBoxEvent } from '@components/text-boxes/textMessageBoxSelect/textMessageBoxSelect.component';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from '@services/openai.service';

@Component({
    selector: 'app-image-generation-page',
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
    templateUrl: './imageGenerationPage.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ImageGenerationPageComponent {

    public messages = signal<Message[]>([]);
    public isLoading = signal(false);
    public openAiService = inject(OpenAiService);
   
    handleMessage(prompt: string) {

      this.isLoading.set(true);
      this.messages.update( prev => [...prev, { isGpt:false, text: prompt }]  );
  
      this.openAiService.imageGeneration(prompt)
        .subscribe( resp => {
          this.isLoading.set(false);
          if ( !resp ) return;
  
          this.messages.update(prev => [
            ...prev,
            {
              isGpt: true, 
              text: resp.alt,
              imageInfo: resp,
            }
          ]);
  
        })
  
    }

 }
