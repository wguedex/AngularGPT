import { environment } from 'environments/environment';


interface Image {
  url: string;
  alt: string;
}

type GeneratedImage = Image | null;

export const imageGenerationUseCase = async (
  prompt: string,
  originalImage?: string,
  maskImage?: string
):Promise<GeneratedImage> => {
  try {
    const resp = await fetch(`${environment.backendApi}/image-generation`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        originalImage,
        maskImage,
      }),
    });

    
    const { url, revised_prompt:alt } = await resp.json();

    console.log({url, alt});
    return { url, alt }


  } catch (error) {
    console.log(error);
    return null;
  }
};