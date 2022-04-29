import * as global from "../global.js";
import { Gltf2Node } from "../render/nodes/gltf2.js";

export default () => {

   window.gftl2_node = global.scene().addNode(new Gltf2Node({
      url: "./media/gltf/60_fifth_ave/60_fifth_ave.gltf"
   }));

   return {
      enableSceneReloading: true,
      scenes: [
         { name: "%REPO_NAME%", path: "%REPO_NAME%.js" },
         { name: "DemoHyperlink" , path: "./demoHyperlink.js" },
      ]
   };
}
