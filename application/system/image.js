// ==========================================================================
// Project:   Blossom - Modern, Cross-Platform Application Framework
// Copyright: ©2012 Fohr Motion Picture Studios. All rights reserved.
// License:   Licensed under the GPLv3 license (see BLOSSOM-LICENSE).
// ==========================================================================
/*globals BLOSSOM */

SC.Image = SC.Object.extend({

  source: null,

  sourceDidChange: function() {
    var source = this.get('source');
    if (source !== this._sc_source) {
      this._sc_source = source;
      this.__sc_element__ = null; // clear any existing image

      if (source) {
        var img = new Image(), that = this;
        img.onload = function() {
          // console.log('img.onload');
          that.__sc_element__ = img;
          if (that.imageDidLoad) that.imageDidLoad();
        };
        img.src = source;
      }
    }
  }.observes('source'),

  init: function() {
    sc_super();

    this.sourceDidChange();
  }

});