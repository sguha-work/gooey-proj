class ImageProcessService {
    static instance = null;
    constructor() {
        if (ImageProcessService.instance instanceof ImageProcessService) {
            return ImageProcessService.instance
        }
        ImageProcessService.instance = this
    }
    // {
    //     "input_image": "https://storage.googleapis.com/dara-c1b52.appspot.com/daras_ai/media/f68feb16-5925-11ed-83cc-02420a0000c8/Image3.jpg",
    //     "text_prompt": "make the picture black and white"
            // "manualEnhancement": {
            //     [
            //         {
            //             "type": "color"/"retro"/"artistic",
            //        
            //         }
            //     ]
            // }
    // }
    processManualEnhancement(payload) {
        let promptText = "";
        payload.manualEnhancement.forEach((enhancement, index)=>{
            let text = ""
            // switch(enhancement.direction) {
            //     case "up":
            //         text = "Increase";
            //         break;
            //     case "down":
            //         text = "Decrease";
            //         break;
            // }
            switch(enhancement.type) {
                case 'color':
                    text += 'colorful background, studio ghibli, ponyo, anime, excited, anime, saturated colors';
                    break;
                case 'retro':
                    text+='in the style of a retro 1947 newspaper poster';
                    break;
                case 'artistic':
                    text += 'in the style of vincent van Gogh&#x27;s sunflower, van gogh, beautiful paint strokes, van gogh colours';
                    break;
            }
            text += ` ${enhancement.type}`;
            if(enhancement.value) {
                text += ` by ${enhancement.value}%`;
            }
            if(index<payload.manualEnhancement.length-1) {
                promptText += `${text},`;
            } else {
                promptText += `${text}.`;
            }
        });
        delete payload.manualEnhancement;
        payload.text_prompt = promptText;
        return payload;
    }
}
export default ImageProcessService;