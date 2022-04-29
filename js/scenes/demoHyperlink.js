import { lcb, rcb, reinit } from "../handle_scenes.js";
import { buttonState } from "../render/core/controllerInput.js";

export const init = async model => {
  model.add('cube').texture('media/textures/brick.png')
  model.move(0,1.5,0).scale(.3)
  model.animate(async () => {
    const target = model.child(0);
    const triggerL = buttonState.left[0].pressed;
    const triggerR = buttonState.right[0].pressed;

    if ((lcb.hitRect(target) || rcb.hitRect(target)) && (triggerR || triggerL))
        window.load_new_scene = "../vrs/our/js/scenes/scenes.js";
  });
}
