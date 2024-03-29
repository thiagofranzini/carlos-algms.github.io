System.register(['angular2/core', '../utils/storer'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, storer_1;
    var TodoService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (storer_1_1) {
                storer_1 = storer_1_1;
            }],
        execute: function() {
            TodoService = (function () {
                function TodoService() {
                    var _this = this;
                    this.storage = new storer_1.Storer('todo-items');
                    this.storage.read().subscribe(function (todos) {
                        _this.todos = todos || [];
                    });
                }
                TodoService.prototype.add = function (todo) {
                    this.todos.push(todo);
                    todo.id = this.todos.length;
                    this.storage.write(this.todos);
                    return todo;
                };
                TodoService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], TodoService);
                return TodoService;
            })();
            exports_1("TodoService", TodoService);
        }
    }
});
