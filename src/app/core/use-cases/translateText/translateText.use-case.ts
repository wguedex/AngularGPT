import { OrthographyResponse } from "@interfaces/orthography.response";
import { ProsConsResponse } from "@interfaces/pros-cons.response"; 
import { TranslateTextResponse } from "@interfaces/translate-text.response";
import { environment } from "environments/environment";


export const translateTextUseCase = async (prompt:string, lang: string) => {

    try {

        const resp = await fetch(`${environment.backendApi}/translate-text`,{
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({prompt,lang})
        });

        if (!resp.ok) throw new Error('No se pudo realizar la conexión');

        console.log(resp)
        // const data = await resp.json() as TranslateTextResponse;
        const {message} = await resp.json() as TranslateTextResponse;
        // console.log(data)
        return {
            ok: true, 
            message:message,
        }
        
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'No se pudo realizar la traducción.',
        }
    }

}