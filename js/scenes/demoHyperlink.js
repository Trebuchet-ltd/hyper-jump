import * as cg from "../render/core/cg.js";
import { lcb, rcb } from '../handle_scenes.js';
import { buttonState } from "../render/core/controllerInput.js";

function httpGetAsync(theUrl, callback) {
  var xmlHttp = new XMLHttpRequest();

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) callback(xmlHttp.responseText);
  };

  xmlHttp.open("GET", theUrl, true); // true for asynchronous

  xmlHttp.send(null);
}

export const init = async model => {
  let cube = model.add('cube').texture('media/textures/brick.png');
  model.move(0, 1.5, 0).scale(.3);
  model.animate(() => {
    let target = model.child(0);
    let triggerL = buttonState.left[0].pressed;
    let triggerR = buttonState.right[0].pressed;

    if (lcb.hitRect(target) || rcb.hitRect(target)) {
      if (triggerR || triggerL) {
        httpGetAsync('http://localhost:8000/index1.html', data => {
          document.open();
          document.write(data);
          document.close();
        });
      }
    }
  });
};