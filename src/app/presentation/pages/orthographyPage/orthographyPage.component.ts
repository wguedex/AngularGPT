import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import {
  ChatMessageComponent,
  MyMessageComponent,
  TextMessageBoxComponent,
  TextMessageBoxFileComponent,
  TextMessageBoxSelectComponent,
  TypingLoaderComponent,
} from "@components/index";
import { TextMessageEvent } from "@components/text-boxes/textMessageBoxFile/textMessageBoxFile.component";
import { TextMessageBoxEvent } from "@components/text-boxes/textMessageBoxSelect/textMessageBoxSelect.component";
import { Message } from "@interfaces/message.interface"; 
import { OpenAiService } from "@services/openai.service";

@Component({
  selector: "app-orthography-page",
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
  templateUrl: "./orthographyPage.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPageComponent {

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
