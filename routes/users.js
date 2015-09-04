var express = require('express');
var router = express.Router();
var storage = require('node-persist');
storage.init(
    //{dir:'../persist'}
);
var Validator = require('jsonschema').Validator;
var validator = new Validator();
var shortid = require('shortid');

var personSchema = {
    "id": "/SimplePerson",
    "type": "object",
    "properties": {
        "name": {"type": "string"},
        "address": {"$ref": "/SimpleAddress"},
        "email": {"type": "email"},
        "phone": {"type": "phone", "required": true}
    },
    "required": ["name", "email", "phone"]
};

var addressSchema = {
    "id": "/SimpleAddress",
    "type": "object",
    "properties": {
        "lines": {
            "type": "array",
            "items": {"type": "string"}
        },
        "street": {"type": "string"},
        "zip": {"type": "string"},
        "city": {"type": "string"},
        "state": {"type": "string"}
    },
    "required": ["country", "city", "state", "zip", "street"]
};

validator.addSchema(addressSchema, '/SimpleAddress');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(storage.values());
});

router.get('/:id', function(req, res, next) {
    if ('undefined' === typeof req.params.id) {
        res.send(400, 'Valid id should be supplied');
    } else {
        storage.getItem(req.params.id, function (err, value) {
            if ('undefined' === typeof value) {
                res.send(404, 'No client found');
            } else {
                res.send(value);
            }
        });
    }
});

router.post('/', function(req, res) {
    try {
        var result = validator.validate(personSchema, req.body);
        if (result.errors.length > 0) {
            res.send(400, 'invalid data');
        } else {
            var person = req.body;
            person.id = shortid.generate();
            storage.setItem(person.id, req.body, function (err) {
                err ? res.send(500, err) : res.send(201, {"id:": person.id});
                storage.persist();
            });
        }
    } catch (exception) {
        res.send(400, 'invalid data');
    }
});

router.put('/:id', function(req, res) {
    if ('undefined' === typeof req.params.id) {
        res.send(400, 'Valid id should be supplied');
    } else {
        storage.getItem(req.params.id, function (err, value) {
            if ('undefined' === typeof value) {
                res.send(404, 'No client found');
            } else {
                try {
                    var result = validator.validate(personSchema, req.body);
                    if (result.errors.length > 0) {
                        res.send(400, 'invalid data');
                    } else {
                        var person = req.body;
                        Object.keys(person).forEach(function (property) {
                            value[property] = person[property];
                        });
                        storage.setItem(value.id, value, function (err) {
                            err ? res.send(500, err) : res.send(204, 'done');
                            storage.persist();
                        });
                    }
                } catch (exception) {
                    res.send(400, 'invalid data');
                }
            }
        });
    }
});

router.delete('/:id', function(req, res) {
    if ('undefined' === typeof req.params.id) {
        res.send(400, 'Valid id should be supplied');
    } else {
        storage.removeItem(req.params.id);
        res.send(202, 'deleting...');
    }
});

module.exports = router;
