import flash  from "../components/flash";
import {sleep, typeWriter} from "../utils";
//const baseUrl = import.meta.env.VITE_API_BASE_URL;
import { getImageFromVideo } from "../utils";
//import { sleep } from "../utils";


export function emptyExample(){
    const button = document.querySelector("#button");
    const video = document.querySelector("video");
    const close = document.querySelector("#close");
    const target = document.querySelector("#target");


    const takePhoto = async () => {
        console.log("photo !!!!!!!")

        flash();
        video.pause();
        button.classList.remove("bg-white");
        button.disabled = true;

        const image = getImageFromVideo(video);
        //await sleep(1000);
        const response = await fetch("https://cameraobscuraapi-production.up.railway.app/gpt", {
        method:"POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({image : image, 
        visualQuestion : "what is the color of the person eyes ?",
        systemPrompt: "You are an assistant that create a short poem from the color of the eyes. Please do not put the "/" in the text"
        }),
        });
        
        const apiResponse = await response.json();
        //const answer = JSON.parse(apiResponse.output)
        console.log(apiResponse);

        if (apiResponse){
            const output = JSON.parse(apiResponse.output);
            video.style.filter ="brightness(70%)";
             target.innerHTML = "<p>" + apiResponse.output + "</p>"
            //await typeWriter(output.join(""),50,target);
            console.log(output);
        }
        
        // target.innerHTML = "<p>" + apiResponse.prediction.output + "</p>"

        button.classList.add("hidden","bg-white");
        close.classList.remove("hidden");

    } 

    //console.log(takePhoto())

    button.addEventListener("click", () => takePhoto());

    close.addEventListener("click", () => {
    close.classList.add("hidden");
    button.classList.remove("bg-white");
    button.disabled = false;
    video.play();
    })
}
