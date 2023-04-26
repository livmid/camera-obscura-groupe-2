import "./style.css";
import { camera } from "./components/camera";
import { appHeight, sleep } from "./utils";
import { emptyExample } from "./projects/emptyExample";

import { objectSequence } from "./examples/objectSequence";
import { stateMachineExample } from "./examples/stateMachineExample";

// Lancer la caméra
camera();

// Projet
//stateMachineExample();
emptyExample();
// Fix Ios
window.addEventListener("resize", appHeight);
appHeight();
