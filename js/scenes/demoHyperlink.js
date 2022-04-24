import * as cg from "../render/core/cg.js";
import { lcb, rcb } from '../handle_scenes.js';
import { buttonState } from "../render/core/controllerInput.js";
import {corelink_message} from "../util/corelink_sender.js";
import {metaroomSyncSender} from "../corelink_handler.js";

function httpGetAsync(theUrl, callback) {
  var xmlHttp = new XMLHttpRequest();

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) callback(xmlHttp.responseText);
  };

  xmlHttp.open("GET", theUrl, true); // true for asynchronous

  xmlHttp.send(null);
}

function setAvatarSync(corelink) {
  window.avatar_interval = setInterval(function () {
    if (window.playerid != null) {
      var msg = corelink_message("avatar", window.playerid);
      corelink.send(metaroomSyncSender, msg); // console.log("corelink.send", msg);
      // window.wsclient.send("avatar", window.playerid);
    }
  }, 40);
}

export const init = async model => {
  let cube = model.add('cube').texture('media/textures/brick.png');
  let loaded = false;

  model.move(0, 1.5, 0).scale(.3);
  model.animate(() => {
    if(loaded)
      return;

    let target = model.child(0);
    let triggerL = buttonState.left[0].pressed;
    let triggerR = buttonState.right[0].pressed;

    if (lcb.hitRect(target) || rcb.hitRect(target)) {
      if (triggerR || triggerL) {
        loaded = true;
        httpGetAsync('http://localhost:8000/index1.html', data => {
          window.jump_content = data;
        });
      }
    }
  });
};