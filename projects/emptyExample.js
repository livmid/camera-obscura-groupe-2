import flash from "../components/flash";
import { sleep, typeWriter } from "../utils";
import { getImageFromVideo } from "../utils";
const objects = [];


export function emptyExample() {
  const button1 = document.querySelector("#button1");
  const button2 = document.querySelector("#button2");
  const button3 = document.querySelector("#button3");

  const title = document.querySelector("#TITRE");
  const close = document.querySelector("#close");
  const share = document.querySelector("#btn-share");

  const video = document.querySelector("video");
  const target = document.querySelector("#target");

  const background1 = document.querySelector("#background1");

  const takePhoto = async () => {
    console.log("QQQQ");

    flash();
    video.pause();
    button2.classList.remove("bg-white");
    button2.disabled = true;

    const image = getImageFromVideo(video);

    const response = await fetch(
      "https://cameraobscuraapi-production.up.railway.app/gpt",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: image,
          // visualQuestion:
          //   "Make a price of the objects on the picture you see with the argument of materials production creativity.",
          systemPrompt:
          `You are an art critic that creates a short description summarized in only one sentence about what you see considering factors like material of the object, originality, placement and other factors an art critic would consider in evaluating any object or work of art. You don’t need to consider the artist. You mustn’t mention what’s actually visible on the picture. Just evaluate what you see the best you can and describe its higher meaning in interpreting its value as a work of art.`
        }),
      }
    );

    const apiResponse = await response.json();
    console.log(apiResponse);

    if (apiResponse) {
      video.style.filter = "brightness(70%)";
      target.innerHTML = "<p>" + apiResponse.output + "</p>";
      //objects.push(apiResponse.prediction.output);
    }

    button2.classList.add("hidden", "bg-white");
    close.classList.remove("hidden");
    button3.classList.remove("hidden");

  };
  button1.addEventListener("click", () => {
    title.classList.add("hidden");
    background1.classList.add("hidden");
    button1.classList.add("hidden");
    button2.classList.remove("hidden");
  });

  button2.addEventListener("click", () => takePhoto());

  close.addEventListener("click", () => {
    close.classList.add("hidden");
    button2.classList.remove("hidden");
    button2.disabled = false;
    button3.classList.add("hidden");

    video.style.filter = "brightness(100%)";
    video.play();
   // target.innerHTML = "";
  });
}
