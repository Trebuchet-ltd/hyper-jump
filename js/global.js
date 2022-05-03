import {Scene} from "./render/core/scene.js";
import {Node} from "./render/core/node.js"

console.log("global");

var scene_ = new Scene();

console.log(scene_);

export let gltfRoot = scene_.addNode(new Node());

export async function scene() {
    if (!scene_) {
        const {Scene} = await import("./render/core/scene.js");
        const {Node} = await import("./render/core/node.js");

		scene_ = new Scene();
        gltfRoot = scene_.addNode(new Node());
    }

    return scene_;
}

export function setScene(s) {
    scene_ = s;
}

var sceneNames_ = "";

export function demoNames() {
    return sceneNames_ || "";
}

export function setDemoNames(names) {
    sceneNames_ = names;
}

let xrEntryUI_ = null;

export function setXREntry(UIType) {
    xrEntryUI_ = UIType;
}

export function xrEntryUI() {
    return xrEntryUI_;
}

let isImmersive_ = false;

export function setIsImmersive(flag) {
    return isImmersive_ = flag;
}

export function isImmersive() {
    return isImmersive_;
}
