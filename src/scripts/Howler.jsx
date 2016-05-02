import Vue from 'vue';

import EditorView from 'scripts/views/EditorView';

let vm = new Vue({
  el: '#howler',
  components: {
    'EditorView': EditorView,
  },
});
