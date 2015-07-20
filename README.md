ArcGisAdapter
=============

Ember Data adapter/serializer for ArcGis Server feature data.

## Usage
To get started we need to initialize the adapter..

```js
App.ApplicationAdapter = DS.ArcGisAdapter.extend({
  host: 'http://mydomain.com',
  folder: 'service_folder',
  service: 'Service_Name',
  layer: '0'
});
```

The adapter has default options for the query:

```js
{
  outFields: '*',
  returnGeometry: false,
  inSR: 4326,
  f: 'json'
}
```

and an additional `where: '1=1'` for the `findAll` or `this.store.find('feature')` results.


## Unit Tests

Tests are written with QUnit and run on Karma.  You will need Node.js, Bower and Karma installed to run the tests.
To run the tests you can use npm:

```
npm test
```
which is equivalent to `karma start --single-run`



