if(typeof ODOORPC != 'object') {
    ODOORPC = {
        requestCounts : 0,
        session_id : ""
    };
}

(function() {

    ODOORPC.sendRequest = function(url, params) {
        var deferred = $.Deferred();

        ODOORPC.requestCounts += 1;
        var json_data = {
            jsonrpc: '2.0',
            method: 'call',
            params: params,
        };
        var request = {
            'type' : 'POST',
            'url' : url,
            'data' : JSON.stringify(json_data),
            'contentType' : 'application/json',
            'id' : 'r' + ODOORPC.requestCounts
        };
        $.ajax(request)
            .done(function(response) {
                  console.log('success rpc call', response.result);
                  deferred.resolve(response.result);
        })
        return deferred.promise();
   };

    ODOORPC.login = function(db, login, password) {
        var params = {
            db : db,
            login : login,
            password : password
        };
        return ODOORPC.sendRequest('/web/session/authenticate', params);
    };

    ODOORPC.searchRead = function(model, domain, fields) {
        params = {
            model: model,
            domain: domain,
            fields: fields,
        }
        return ODOORPC.sendRequest('/web/dataset/search_read', params);
    }

    ODOORPC.call = function(model, method, args, kwargs) {
        params = {
            model: model,
            method: method,
            args: args,
            kwargs: kwargs,
        };
        return ODOORPC.sendRequest('/web/dataset/call_kw', params);


    }
}());
