import * as global from "../global.js";
import { Gltf2Node } from "../render/nodes/gltf2.js";

export default () => {

   global.scene().then((scene) => window.gftl2_node = scene.addNode(new Gltf2Node({
      url: "./media/gltf/60_fifth_ave/60_fifth_ave.gltf"
   })));

   return {
      enableSceneReloading: true,
      scenes: [
          // ##
      ]
   };
}
