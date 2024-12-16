"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hono_1 = require("hono");
var cors_1 = require("hono/cors");
var auth_1 = require("./lib/auth");
var AuthMiddleware_1 = require("./middleware/AuthMiddleware");
var protectedRoute_1 = require("./protectedRoute");
var OrganizationRoutes_1 = require("./routes/OrganizationRoutes");
var PostgrestAuth_1 = require("./routes/PostgrestAuth");
var app = new hono_1.Hono({ strict: false });
app.use('*', AuthMiddleware_1.default);
app.use('*', (0, cors_1.cors)({
    origin: function (origin) {
        return origin || '*';
    },
    allowHeaders: ['Content-Type', 'Authorization', 'OrganizationId'],
    allowMethods: ['POST', 'GET', 'OPTIONS', 'PUT', 'DELETE'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true,
}));
app.all('/auth/*', function (c) { return auth_1.auth.handler(c.req.raw); });
app.route('/files', (0, protectedRoute_1.protectedRoute)());
app.route('/postgrest', PostgrestAuth_1.default);
app.route('/organization', OrganizationRoutes_1.default);
app.get('/', function (c) { return c.text('Back3nd API running!'); });
exports.default = {
    port: 3737,
    fetch: app.fetch,
};
