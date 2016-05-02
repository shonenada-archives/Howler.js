import Vue from 'vue';
import VueResource from 'vue-resource';

import EditorView from 'scripts/views/EditorView';
import * as consts from 'scripts/consts';
import API from 'scripts/services/APIService';

Vue.use(VueResource);

let vm = new Vue({
  el: '#howler',
  components: {
    'EditorView': EditorView,
  },
});
