import { Injectable } from '@angular/core'; 

import {    audioToTextUseCase, 
            createThreadUseCase, 
            imageGenerationUseCase, 
            imageVariationUseCase, 
            orthographyUseCase, 
            postQuestionUseCase, 
            prosConsStreamUseCase, 
            prosConsUseCase, 
            textToAudioUseCase, 
            translateTextUseCase } from '@use-cases/index';
 
import { from, Observable, of, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class OpenAiService {
    
    constructor() { }

    checkOrthography(prompt: string){
        return from(orthographyUseCase(prompt));
    }

    prosConstDiscusser(prompt: string){
        return from(prosConsUseCase(prompt));
    }

     prosConstStreamDiscusser(prompt: string, abortSignal: AbortSignal){
        return  from(prosConsStreamUseCase(prompt, abortSignal));
    }
    
    translateText(prompt: string, lang: string){
        return  from(translateTextUseCase(prompt,lang));
    }

    textToAudio(prompt: string, voice: string) {
        return from(textToAudioUseCase(prompt, voice));
      }

      audioToText( file: File, prompt?: string) {
        return from(audioToTextUseCase(file, prompt));
      }      

      imageGeneration( prompt: string, originalImage?: string, maskImage?: string ) {
        return from( imageGenerationUseCase(prompt, originalImage, maskImage ) )
      }

      imageVariation( originalImage: string ) {
        return from( imageVariationUseCase( originalImage ) );
      }

      createThread(): Observable<string> {
        if (localStorage.getItem('thread')) {
          return of(localStorage.getItem('thread')!);
        }
    
        return from(createThreadUseCase()).pipe(
          tap((thread) => {
            localStorage.setItem('thread', thread);
          })
        );
      }
    
      postQuestion(threadId: string, question: string) {
        return from(postQuestionUseCase(threadId, question));
      }
}