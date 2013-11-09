DS.ArcGisSerializer = DS.JSONSerializer.extend({
  keyForAttributeName: function (type, name) {
    var attributes = (Ember.meta(DS.ArcGisAdapter, true)["DS.Mappable"] || {}).attributes,
        guid = Ember.guidFor(type.toString()),
        result = name;

    if (attributes && guid) {
      result = attributes.values[guid][name].key;
    }

    return result;
  }
});

