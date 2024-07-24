import { Injectable } from '@angular/core'; 

import {    audioToTextUseCase, 
            imageGenerationUseCase, 
            imageVariationUseCase, 
            orthographyUseCase, 
            prosConsStreamUseCase, 
            prosConsUseCase, 
            textToAudioUseCase, 
            translateTextUseCase } from '@use-cases/index';
 
import { from } from 'rxjs';

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

}