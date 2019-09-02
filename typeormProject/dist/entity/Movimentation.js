"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Movimentation = /** @class */ (function () {
    function Movimentation() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({ type: "int" }),
        __metadata("design:type", Number)
    ], Movimentation.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ type: "int" }),
        __metadata("design:type", Number)
    ], Movimentation.prototype, "idProduct", void 0);
    __decorate([
        typeorm_1.Column({ type: "int" }),
        __metadata("design:type", Number)
    ], Movimentation.prototype, "idUser", void 0);
    __decorate([
        typeorm_1.Column({ type: "date" }),
        __metadata("design:type", Date)
    ], Movimentation.prototype, "date", void 0);
    __decorate([
        typeorm_1.Column({ type: "float" }),
        __metadata("design:type", Number)
    ], Movimentation.prototype, "price", void 0);
    __decorate([
        typeorm_1.Column({ type: "int", default: 1 }),
        __metadata("design:type", Number)
    ], Movimentation.prototype, "quantity", void 0);
    __decorate([
        typeorm_1.Column({ type: "varchar", length: 50 }),
        __metadata("design:type", String)
    ], Movimentation.prototype, "type", void 0);
    Movimentation = __decorate([
        typeorm_1.Entity()
    ], Movimentation);
    return Movimentation;
}());
exports.Movimentation = Movimentation;
//# sourceMappingURL=Movimentation.js.map