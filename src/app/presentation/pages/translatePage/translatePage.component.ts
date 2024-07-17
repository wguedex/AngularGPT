import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent, MyMessageComponent, TextMessageBoxComponent, TextMessageBoxFileComponent, TextMessageBoxSelectComponent, TypingLoaderComponent } from '@components/index';
import { TextMessageEvent } from '@components/text-boxes/textMessageBoxFile/textMessageBoxFile.component';
import { TextMessageBoxEvent } from '@components/text-boxes/textMessageBoxSelect/textMessageBoxSelect.component';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from '@services/openai.service';

@Component({
    selector: 'app-translate-page',
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
    templateUrl: './translatePage.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TranslatePageComponent {


  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);
  public languages = signal([
    { id: 'alemán', text: 'Alemán' },
    { id: 'árabe', text: 'Árabe' },
    { id: 'bengalí', text: 'Bengalí' },
    { id: 'francés', text: 'Francés' },
    { id: 'hindi', text: 'Hindi' },
    { id: 'inglés', text: 'Inglés' },
    { id: 'japonés', text: 'Japonés' },
    { id: 'mandarín', text: 'Mandarín' },
    { id: 'portugués', text: 'Portugués' },
    { id: 'ruso', text: 'Ruso' },
  ]);


  handleMessageWithSelect( { prompt, selectedOption }: TextMessageBoxEvent ) {

    const message = `Traduce a ${ selectedOption }: ${ prompt }`;

    this.isLoading.set(true);
    this.messages.update( prev => [ ...prev, { text: message, isGpt: false }]);

    this.openAiService.translateText( prompt, selectedOption )
      .subscribe( ({ message }) => {

        this.isLoading.set(false);
        this.messages.update( prev => [...prev, { text: message, isGpt: true }] );

      })


  }

 
 }
