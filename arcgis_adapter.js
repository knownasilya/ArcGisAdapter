DS.ArcGisAdapter = DS.RESTAdapter.extend({
  serializer: DS.ArcGisSerializer,

  /**
   * Retrieve the url suffix for a given type.
   * @param {DS.Model} type - type for the record.
   * @param [id] - id of the record the url is needed for
   * @returns {String}
   */
  serviceUrlForType: function (type, id) {
    // TODO: We cannot assume the application's name is `App`. [JJG 11/8/13]
    var App = window.App,
        name = this.capitalize(type),
        url = window.App ? App[name] : name,
        mapping;

    if (url && url.hasOwnProperty("serviceURL")) {
      mapping = url.serviceURL;
    } else {
      mapping = this.serviceMapping[url];
    }

    url = typeof mapping === "function" ? mapping(url, id) : mapping;
    Ember.assert("No serviceURL defined for type %@".fmt(name), !url && url !== "");
    return url;
  },

  serviceMapping: {},

  ajax: function (url, type, hash) {
    var adapter = this;

    return new Ember.RSVP.Promise(function (resolve, reject) {
      hash = hash || {};
      hash.url = url;
      hash.type = type;
      hash.dataType = "jsonp";
      hash.context = adapter;

      if (hash.data && type !== "GET") {
        hash.contentType = "application/json; charset=utf-8";
        hash.data = JSON.stringify(hash.data);
      }

      hash.success = function (json) {
        var transformedJSON = adapter.transformJSON(json, hash.root);
        Ember.run(null, resolve, transformedJSON);
      };

      hash.error = function (jqXHR, textStatus, errorThrown) {
        Ember.run(null, reject, errorThrown);
      };

      jQuery.ajax(hash);
    });
  },

  buildURL: function (type, id) {
    var baseUrl = this.get("url"),
        namespace = this.get("namespace"),

    // Propose using some sort of url mapping property? [JJG 11/8/13]
        serviceURL = this.serviceUrlForType(type, id),
        url = [baseUrl, namespace, serviceURL];

    return url.join("/");
  },

  findQuery: function (store, type, query, recordArray) {
    var root = this.rootForType(type),
        adapter = this,
        rejectionHandler = function (reason) {
          Ember.Logger.error(reason, reason.message);
          throw reason;
        };

    return this.ajax(this.buildURL(root), "GET", {
      data: query,
      root: root
    })
        .then(function (json) {
          adapter.didFindQuery(store, type, json, recordArray);
        })
        .then(null, rejectionHandler);
  },

  capitalize: function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },

  transformJSON: function (json, root) {
    var feature,
        index = 0,
        pluralizedRoot = this.pluralize(root),
        transformedJSON = {};

    transformedJSON[pluralizedRoot] = [];

    for (; index < json.features.length; index++) {
      feature = json.features[index];

      if (feature.geometry) {
        feature.attributes.geometry = feature.geometry;
      }

      transformedJSON[pluralizedRoot].push(feature.attributes);
    }

    return transformedJSON;
  }
});
