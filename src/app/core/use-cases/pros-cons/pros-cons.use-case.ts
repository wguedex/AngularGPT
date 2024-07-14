import { OrthographyResponse } from "@interfaces/orthography.response";
import { ProsConsResponse } from "@interfaces/pros-cons.response"; 
import { environment } from "environments/environment";


export const prosConsUseCase = async (prompt:string) => {

    try {

        const resp = await fetch(`${environment.backendApi}/pros-cons-discusser`,{
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({prompt})
        });

        if (!resp.ok) throw new Error('No se pudo realizar la conexión');

        console.log(resp)
        const data = await resp.json() as ProsConsResponse;
        console.log(data)
        return {
            ok: true, 
            ...data,
        }
        
    } catch (error) {
        console.log(error)
        return {
            ok:false,  
            role: "",
            content:"No se pudo realizar la comparación"
        }
    }

}