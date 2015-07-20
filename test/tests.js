/*jshint undef:false */
// global variables
var store, adapter, clock;

module('DS.ArcGisAdapter', {

  setup: function () {
    // Mock
    DS.ArcGisAdapter.reopen({
      ajax: function (url, type, options) {
        return { url: url, type: type, options: options };
      }
    });

    adapter = DS.ArcGisAdapter.create({
      folder: 'folder',
      service: 'service',
      layer: 'layer'
    });
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

test('namespace', function () {
  ok(adapter.get('namespace') === '/ArcGIS/rest/services/folder/service/MapServer/layer/query',
    'Has proper namespace generated for url');
});

test('Findall proper options', function () {
  var result = adapter.findAll();

  ok(result && result.options.data.where === '1=1', 'Will return all items');
});

//TODO: Write tests [JJG 11/8/13]

