ArcGisAdapter
=============

Ember Data adapter/serializer for ArcGis Server feature data.

## Usage
First is to initialize the adapter..

```
App.arcGisAdapter = DS.ArcGisAdapter.create({
  namespace: "Example", // Folder in the services directory
  url: "http://mydomain.com/ArcGIS/rest/services",
  bulkCommit: false
});
```

Then you can either set it as the primary adapter, like so:

```
App.Store = DS.Store.extend({
  adapter: "App.arcGisAdapter"
});
```
or you could set it on a per-model basis (after you have set a primary adapter, using the previous method):

```
App.Store.registerAdapter("App.Provider", App.arcGisAdapter);
```

After defining the model, you have to specify a `serviceURL`:

```
App.Provider.reopenClass({
  serviceURL: "ServiceName/MapServer/0/query"
});
```

Where `ServiceName` is the name of the service, and `0` is the layer id.
In the end you are querying the following url: `http://mydomain.com/ArcGIS/rest/services/Example/ServiceName/MapServer/0/query` and you would use something like this to retreive the data (in your model hook):

```
return App.Provider.find({ 
  geometry: lnglat, // a string in the form of '[lng],[lat]'
  returnGeometry: false,
  outFields: "*",
  inSR: 4326,
  f: "json"
});
```
