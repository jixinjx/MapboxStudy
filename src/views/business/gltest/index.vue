<template>
  <div class='gltest' style="height:100%;width:100%;text-align:left;">
     <div id="container"></div>
  </div>
</template>

<script>

import * as Three from 'three'


export default {
  name: 'gltest',
  data(){
    return {}
  },
  components: {},
  created(){},
  mounted(){
     this.init();
      this.animate()
  },

  methods: { 
     init: function() {
        let container = document.getElementById('container');
 
        this.camera = new Three.PerspectiveCamera(80, container.clientWidth/container.clientHeight, 0.0001, 1000);
        this.camera.position.z = 1;
 
        this.scene = new Three.Scene();
 
        let geometry = new Three.ConeGeometry( 0.2, 0.4,4,1,false,0);
        let material = new Three.MeshNormalMaterial();
  var geometry2 = new Three.ConeGeometry( 5, 20, 32 );
      this.mesh = new Three.Mesh(geometry, material);
// var zhuiti = new Three.Mesh(geometry2, material);
        this.mesh2 = new Three.Mesh(geometry2, material);
        this.scene.add(this.mesh);
        this.scene.add(this.mesh2);
 
        this.renderer = new Three.WebGLRenderer({antialias: true});
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(this.renderer.domElement);
 
    },
    animate: function() {
        requestAnimationFrame(this.animate);
        // this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.07;
        this.mesh.rotation.x =(Math.PI);

        this.renderer.render(this.scene, this.camera);
      
         
    }
}


}

</script>
<style lang='less' scoped>
 #container {
  height: 1000px;
  }

</style>
