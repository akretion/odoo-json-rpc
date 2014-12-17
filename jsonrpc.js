if(typeof ODOORPC != 'object') {
    ODOORPC = {};
}

(function() {

    ODOORPC.login = function(db, login, password) {
        var params = {
            db : db,
            login : login,
            password : password
        };
        return ODOORPC.sendRequest('/web/session/authenticate', params);
    };

    ODOORPC.sendRequest = function(url, params) {
      var json_data = {
        'jsonrpc': '2.0',
        'method': 'call',
        'params': params,
      };
      var request = {
        'type' : 'POST',
        'url' : url,
        'data' : JSON.stringify(json_data),
        'contentType' : 'application/json',
        'id' : 'r1'
      };

      return $.ajax(request);
    };
}());
