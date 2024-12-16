"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hono_1 = require("hono");
var OrganizationController_1 = require("../controllers/OrganizationController");
var organizationRoutes = new hono_1.Hono();
organizationRoutes.post('/add-member', OrganizationController_1.OrganizationController.addMember);
exports.default = organizationRoutes;
