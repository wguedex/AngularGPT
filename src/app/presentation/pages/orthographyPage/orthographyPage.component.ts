import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import {
  ChatMessageComponent,
  GptMessageOrthographyComponent,
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
    TextMessageBoxSelectComponent,
    GptMessageOrthographyComponent
  ],
  templateUrl: "./orthographyPage.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPageComponent {

  // public messages = signal<Message[]>([{text:'Hola Mundo', isGpt: true}]);
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  handleMessage(prompt: string) {
    this.isLoading.set(true);
    this.messages.update((prev)=> [
      ...prev,
      {
        isGpt:false, 
        text:  prompt
      }
    ])

    this.openAiService.checkOrthography(prompt)
    .subscribe(resp => {
      this.isLoading.set(false)

      this.messages.update(prev=>[
        ...prev,
        {
          isGpt: true,
          text: resp.message,
          info: resp
        }
      ])

      // console.log(resp)
    })

    // console.log({ prompt });
  }

  // handleMessageWithFile({ prompt, file }: TextMessageEvent) {
  //   console.log({ prompt, file });
  // }

  // handleMessageWithSelect({ prompt, selectedOption }: TextMessageBoxEvent) {
  //   console.log({ prompt, selectedOption });
  // }

}
