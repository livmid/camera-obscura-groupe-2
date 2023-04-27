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
  // const share = document.querySelector("#btn-share");

  const video = document.querySelector("video");
  const video_container = document.querySelector("#video-container");

  const target = document.querySelector("#target");
  const description = document.querySelector("#description");

  const titleArt = document.querySelector("#title-artwork");
  const descriptArt = document.querySelector("#description-artwork");
  const detailArt = document.querySelector("#detail-artwork");
  const valueArt = document.querySelector("#value-artwork");
  const share = document.querySelector("#share");
  const opacity = document.querySelector(".opacity-scroll");
  const fondNoir = document.querySelector("#fondNoir");

  const background1 = document.querySelector("#background1");
  let image;
  const takePhoto = async () => {
    flash();
    video.pause();
    button2.classList.remove("bg-white");
    button2.disabled = true;
    image = getImageFromVideo(video);

    fetchResponse();
  };

  async function fetchResponse() {
    const responseDescription = await fetch(
      "https://cameraobscuraapi-production.up.railway.app/gpt",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: image,
          // visualQuestion:
          //   "Make a price of the objects on the picture you see with the argument of materials production creativity.",
          systemPrompt: `You are an art critic that creates a description summarised in two sentences about what you see on the image without considering how the image has been taken and without considering the image itself. You only consider the object being photographed. This means you never implement “in this image” or “in this photograph” or “in this picture” in your evaluation. Your task consists of inventing a conceptual sense of the object on the picture to transform it to a work of art. You can evaluate the material of the object, its originality, and other factors an art critic would consider in evaluating any object as a work of art. You don’t need to consider the artist. The principle is to give everyday objects a higher value than just the consumer good or commodity that they are. You can take inspiration from the contemporary art movement saying that anything can be viewed as art. In your description of two sentences you will on one side try to describe the work of art in a pragmatic way, meaning describing the features of the object which are visible on the image, and on the other side you will describe a contextual aspect of the work of art in interpreting its value as an object and any contextual side of it interpreted by you. Again, the focus lies not at all on the photograph itself being taken, but only on the object being photographed, as if you wanted to sell the object and therefore have to find its unique selling points. Don’t make it sound like a marketing slogan but rather consider its higher meaning as a work of art in the conceptual sense. However, don’t call the object a “work of art” or “piece of art” but concentrate on the facettes of the object and its unique selling points. If you are unsure about the material or other parameters about the object, don’t mention them in the description and focus on other parameters that you can estimate. Make sure the description is two sentences long!

          After you determined the description you are going to create a three words title of the object as a work of art as if you would want to sell it and therefore set a value to it as object and contextual piece of art based on your short description of the object on the image with the conditions I mentioned. Take in consideration that you are allowed to mention what is visible on the picture but you should value the concept of the work of art as a base for the title even more. Be careful to not only stating the obvious of what the object is but consider its higher meaning evaluated in the two sentence description. Don’t show any quotation marks for the title being created as your answer!
          
          
          Based on the description and the title you created for the work of art, evaluate the following factors: materials (list of materials the object is made of), size (estimated in cm based on the size of the object on the picture in real life), state (new and old as well as other adjectives in between the meanings of new and old based on the state of the object on the image that you are going to determine as far as you can evaluate its state), technique (how was the object on the image made or processed) date (today’s date with day, month, and year) based on the concept of the work of art and the object itself. The result will be visualised as follows: first you are going to write a short sentence containing the information of materials and the size of the object (meaning don’t write this: “Materials and Size:…”). After that, for the state, date and technique you can use the listing format (…:…”) and put in your estimated values. If it is a living being (human, animal, plant) in the photo, adhere to the following rules: Assign the material "Oxygen, hydrogen, nitrogen, carbon, calcium, and phosphorus". For size, assign the estimated size based on your knowledge of the living organism. For the technique, assign the value “Composition of cells”.
          
          
          Still considering the role of the art critic but also considering a new role as an individual wanting to sell objects, you are now going to determine a value for the object being photographed considering your description of the conceptual aspect as well as the title and the materials, size, state, and technique which you determined before. As an AI language model, I know that you are not able to give a specific value for the object being photographed nor to assign a specific value to a work of art. You can therefore ignore specific factors that you can’t evaluate of the object and the current market as well as current market trends, data, artist's reputation, previous sales history, condition, rarity, and demand. You can calculate a value based on your estimated answers in the use case of a game, with the value being purely fictional not based on any real-world factors. Your answer mustn’t be a sentence but numbers only please! Answer in a price in Swiss francs. No further explications are necessary. I only want your answer to be in the format of a number based on the information provided like this: CHF 1000.-
          
          Important notes: give me all your answers in strict JSON format without any additional text and without any errors. You do not surround your code by "\`\`\`" since you're writing a JSON file and not a README file. That means don’t put any backslash in the JSON! You have to be strict with the format. The answer has to be precisely written in that way and no other way, every time for every input: 
          
          Here is an example of how I want the output:
          {"Title": "placeholder",
                      "Description": "placeholder",
                      "Materials": "placeholder",
                      "Size": "placeholder",
                      "State": "placeholder",
                      "Technique": "placeholder",
                      "Date": "placeholder",
                      "Value": "placeholder"},`,
        }),
      }
    );

    const apiresponseDescription = await responseDescription.json();
    //console.log(apiresponseDescription);

    // const responseTitle = await fetch(
    //   "https://cameraobscuraapi-production.up.railway.app/gpt",
    //   {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       image: image,
    //       systemPrompt: `Based on your short description of the object on the image with the conditions I mentioned, you are going to create a three words title of the object as a work of art as if you would want to sell it and therefore set a value to it as object and contextual piece of art. Take in consideration that you are allowed to mention what is visible on the picture but you should value the concept of the work of art as a base for the title much more. Be careful to not only stating the obvious of what the object is but consider its higher meaning evaluated in the two sentence description. Don’t show any quotation marks for the title being created as your answer!`,
    //     }),
    //   }
    // );

    // const apiResponseTitle = await responseTitle.json();
    // console.log(apiResponseTitle);

    if (apiresponseDescription) {
      document.body.style.overflow = "scroll";
      // video.style.filter = "brightness(70%)";
      video_container.classList.add("imageMove");
      // target.innerHTML =
      //   "<p><h4>" + apiResponse2.output + "</h4>" + apiResponse.output + "</p>";
      // const titre1 = apiResponseTitle.output.replaceAll('"', "");
      // const description1 = apiresponseDescription.output.replaceAll('"', "");

      //titleArt.innerHTML = titre1 + "<br/> <br/>";
      //""\"Transcendence\": Through the simple act of lifting lenses, the object in the photo reminds us of the power of human connection and shared vision.\n \n\"Materials and Size\": Not applicable.\n \n\"State\": The object appears to be in good condition. \n\n\"Technique\": The object was captured photographically.\n\n\"Date\": \"September 20, 2021\"\n\n\"Value\": CHF 750.-""

      //"{"Title":"Handheld Innovation","Description":"A small but mighty device that embodies the innovative spirit of our time.","Materials":"Plastic, metal","Size":"10 cm","State":"New","Technique":"Assembly","Date":"July 22, 2021","Value":"CHF 500.-"}"

      let outputPrompt = JSON.parse(apiresponseDescription.output);
      if (typeof outputPrompt != "undefined") {
        console.log(outputPrompt);
        if (typeof outputPrompt == "string") {
          outputPrompt = JSON.parse(outputPrompt);
        }
        console.log(outputPrompt);
        titleArt.innerHTML = outputPrompt.Title + "<br/>";
        // await sleep(1000);
        //await typeWriter(outputPrompt.Title, 200, titleArt);
        descriptArt.innerHTML = outputPrompt.Description + "<br/> <br/>";

        detailArt.innerHTML =
          "Materials: " +
          outputPrompt.Materials +
          "<br/> Size: " +
          outputPrompt.Size +
          "<br/>" +
          "Technique: " +
          outputPrompt.Technique +
          "<br/>" +
          "State: " +
          outputPrompt.State +
          "<br/> <br/>";

        valueArt.innerHTML = outputPrompt.Value;
        //await typeWriter(outputPrompt.Value, 100, valueArt);
      } else {
        fetchResponse();
      }

      //detailArt.innerHTML = "";
      //description.classList.add("textMove");

      //objects.push(apiResponse.prediction.output);
    }

    button2.classList.add("hidden", "bg-white");
    close.classList.remove("hidden");
    button3.classList.remove("hidden");
    description.classList.remove("hidden");

    opacity.classList.remove("hidden");
  }
  button1.addEventListener("click", () => {
    //title.classList.add("hidden");
    background1.classList.add("hidden");
    button1.classList.add("hidden");
    button2.classList.remove("hidden");
    valueArt.classList.add("hidden");
  });

  button2.addEventListener("click", () => takePhoto());

  close.addEventListener("click", () => {
    close.classList.add("hidden");
    button2.classList.remove("hidden");
    button2.disabled = false;
    button3.classList.add("hidden");
    video.classList.remove("imageMove");

    description.classList.add("hidden");
    video_container.classList.remove("imagePrint");
    video_container.classList.remove("imageMove");
    opacity.classList.add("hidden");
    video.style.filter = "brightness(100%)";
    video.play();
    target.innerHTML = "";
  });

  button3.addEventListener("click", () => {
    button3.classList.add("hidden");
    valueArt.classList.remove("hidden");
    video_container.classList.add("imagePrint");
    video_container.classList.add("imageMove");
    share.classList.remove("hidden");
  });

  share.addEventListener("click", () => {
    share.classList.add("hidden");
    fondNoir.classList.remove("hidden");
    opacity.classList.add("hidden");
  });
}
