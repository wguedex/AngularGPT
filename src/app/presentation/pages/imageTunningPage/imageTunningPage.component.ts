import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatMessageComponent, GptMessageEditableImageComponent, MyMessageComponent, TextMessageBoxComponent, TypingLoaderComponent } from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from '@services/openai.service';

@Component({
    selector: 'app-image-tunning-page',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ChatMessageComponent,
        MyMessageComponent,
        TypingLoaderComponent,
        TextMessageBoxComponent,
        GptMessageEditableImageComponent,
    ],
    templateUrl: './imageTunningPage.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ImageTunningPageComponent { 

    public messages = signal<Message[]>([]);
      public isLoading = signal(false);
      public openAiService = inject(OpenAiService);
    
      public originalImage = signal<string|undefined>(undefined);
      public maksImage = signal<string|undefined>(undefined);
     
      handleMessage(prompt: string) {
    
        this.isLoading.set(true);
        this.messages.update( prev => [...prev, { isGpt:false, text: prompt }]  );
    
        this.openAiService.imageGeneration(prompt, this.originalImage(), this.maksImage() )
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
    
      handleImageChange(newImage: string, originalImage: string ) {
        this.originalImage.set( originalImage );
        this.maksImage.set(newImage);
      }
     
      generateVariation() {
        if ( !this.originalImage() )return;
    
        this.isLoading.set(true);
    
        this.openAiService.imageVariation( this.originalImage()! )
          .subscribe( resp => {
            this.isLoading.set(false);
            if ( !resp ) return;
    
            this.messages.update( prev => [
              ...prev,
              {
                isGpt: true,
                text: resp.alt,
                imageInfo: resp
              }
            ]);
     
          })
     
      }
     
}
