/*jshint undef:false */
// global variables
var store, adapter, clock;

module('DS.ArcGisAdapter', {

  setup: function () {
    adapter = DS.ArcGisAdapter.create();
    store = DS.Store.create({adapter: adapter});
    clock = sinon.useFakeTimers();
  },

  teardown: function () {
    clock.restore();

    // will do some other stuff here at some point [JJG 11/8/13]

    adapter.destroy();
    store.destroy();
  }

});

test('existence', function () {
  ok(DS.ArcGisAdapter, 'ArcGISAdapter added to DS namespace');
});

//TODO: Write tests [JJG 11/8/13]

