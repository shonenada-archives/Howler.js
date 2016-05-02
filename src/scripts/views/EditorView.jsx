import Vue from 'vue';
import marked from 'marked';

import template from 'templates/editor.html';

const EditorView = Vue.extend({
  template: template,
  filters: {
    marked: marked,
  },
  data: function() {
    return {
      content: '',
    };
  },
  created: function () {
  },
  ready: function() {
  },
  methods: function() {
  },
});

export default EditorView;
