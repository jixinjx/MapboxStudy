<template>
  <div class="layerControls">
    <ul>
      <li
        v-if="layer.visable"
        v-for="layer in layers"
        :key="layer.name"
        @click="addLayer(layer.name,layer)"
      >
        <div
          class="item"
          :class="{active:activeNames.indexOf(layer.name)>-1}"
        >{{layer.label}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    layers: Array,
    active: String,
    multi: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeNames: [this.active]
    };
  },
  mounted() {
    let activeNames = [];
    this.layers.forEach(layer => {
      if (layer.checked) {
        activeNames.push(layer.name);
        let r = null;
        if (this.multi)
          r = {
            name: layer.name,
            checked: true
          };
        else r = layer.name;

        this.$emit("addLayer", r);
      }
    });
    this.activeNames = activeNames;
  },
  methods: {
    addLayer(name, item) {
      if (this.multi) {
        let id = this.activeNames.indexOf(name);
        if (id === -1) {
          this.activeNames.push(name);
          this.$emit("addLayer", {
            name: name,
            checked: true
          });
        } else {
          this.activeNames.splice(id, 1);
          this.$emit("addLayer", {
            name: name,
            checked: false
          });
        }
      } else {
        this.$emit("addLayer", name, this.activeNames);
        this.activeNames = [name];
      }
    }
  }
};
</script>

<style lang="less" scoped>
// .layerControls {
//   z-index: 11;
//   position: absolute;
//   right: 20px;
//   top: 20px;
//   color: white;
//   font-size: 16px;
//   font-family: "黑体";
//   li {
//     margin-bottom: 20px;
//   }
//   .item {
//     // height: 37px;
//     width: 150px;
//     // background: url(../assets/img/tab_01.png) no-repeat;
//     text-align: center;
//     line-height: 40px;
//     letter-spacing: 0.2em;
//     cursor: pointer;
//     border: 2px solid rgba(55, 151, 246, 0.6);
//     border-radius: 4px;
//   }
//   .item.active,
//   .item:hover {
//     background-color: rgba(55, 151, 246, 0.3);
//     // background: url(../assets/img/tab_02.png) no-repeat;
//   }
// }
</style>
