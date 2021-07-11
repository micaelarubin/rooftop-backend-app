"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
var AbstractRepository = /** @class */ (function () {
    function AbstractRepository() {
        this.data = [];
    }
    /*
        public constructor () {
            let content = readFileSync(__dirname = '../../' + this.table, {encoding: 'utf-8'})
    
            // Instanciar el mapper de esa entidad
            // Invocar el método mapObjectToEntity
            this.data = JSON.parse(content)
        }
        */
    AbstractRepository.prototype.findAll = function () {
        return this.data;
    };
    AbstractRepository.prototype.findById = function (id) {
        return this.data.find(function (obj) {
            return obj.getId() == id;
        });
    };
    AbstractRepository.prototype.create = function (entity) {
        entity.setId(Date.now());
        // this.data = this.data.concat(entity)
        this.data = __spreadArray(__spreadArray([], this.data), [entity]);
        return entity;
    };
    AbstractRepository.prototype.update = function (entity) {
        if (entity.getId()) {
            this.data.map(function (obj) {
                if (obj.getId() == entity.getId()) {
                    return entity;
                }
                return obj;
            });
        }
        else {
            this.create(entity);
        }
        return true;
    };
    AbstractRepository.prototype["delete"] = function (id) {
        var count = this.data.length;
        this.data = this.data.filter(function (obj) {
            return obj.getId() != id;
        });
        return this.data.length < count;
    };
    return AbstractRepository;
}());
exports["default"] = AbstractRepository;
