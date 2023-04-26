import flash from "../components/flash";
import { sleep, typeWriter } from "../utils";
import { getImageFromVideo } from "../utils";
const objects = [];

export function emptyExample() {
  const button1 = document.querySelector("#background1");
  const button2 = document.querySelector("#button2");
  const button3 = document.querySelector("#evaluate");

  const title = document.querySelector("#TITRE");
  const close = document.querySelector("#close");
  const share = document.querySelector("#btn-share");

  const video = document.querySelector("video");
  const target = document.querySelector("#target");
  const description = document.querySelector("#description");

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
          systemPrompt: `You are an art critic that creates a short description summarized in only two sentences about what you see considering factors like material of the object on the image, its originality, and other factors an art critic would consider in evaluating any object as a work of art. You don’t need to consider the artist. The principle is to give everyday objects a higher value. In your description of two sentences you will on one side try to describe the work of art in a pragmatic way, meaning describing the features of the object which are visible on the image without considering how the picture has been taken, and on the other side you will describe a contextual aspect of the work of art in interpreting its value. Don’t only concentrate on the contextual side but give information about the size, the contents and the obvious subject. The focus lies not on the photograph itself being taken, but on the object being photographed, as if you wanted to sell the object in the photo and therefore find its unique selling points. Don’t say “this photograph” nor “this image” unless it’s a picture of a photograph as a subject. `,
        }),
      }
    );

    const apiResponse = await response.json();
    console.log(apiResponse);

    // if (apiResponse) {
    //   video.style.filter = "brightness(70%)";
    //   target.innerHTML = "<p>" + apiResponse.output + "</p>";
    //   //objects.push(apiResponse.prediction.output);
    // }

    const response2 = await fetch(
      "https://cameraobscuraapi-production.up.railway.app/gpt",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: image,
          // visualQuestion:
          //   "Make a price of the objects on the picture you see with the argument of materials production creativity.",
          systemPrompt: `Based on your short description of the higher value of the object and its interpretation as a work of art being photographed you are going to define a title for the object. Take in consideration that you are not allowed to mention what is actually visible on the picture but evaluate the concept of the work of art as a base for the title. The title should be max. 3 words long.`,
        }),
      }
    );

    const apiResponse2 = await response2.json();
    console.log(apiResponse2);

    if (apiResponse2) {
      video.style.filter = "brightness(70%)";
      video.classList.add("imageMove");
      target.innerHTML =
        "<p><h4>" + apiResponse2.output + "</h4>" + apiResponse.output + "</p>";
      //description.classList.add("textMove");

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
    target.innerHTML = "";
  });
}
