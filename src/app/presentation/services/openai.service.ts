import { Injectable } from '@angular/core';
import { orthographyUseCase, prosConsStreamUseCase, prosConsUseCase, translateTextUseCase } from '@use-cases/index';
 
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

}