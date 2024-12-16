"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgrestService = void 0;
var jwt_1 = require("hono/jwt");
var PostgrestService = /** @class */ (function () {
    function PostgrestService() {
    }
    /**
     * Generates a JWT token with a specified payload and expiration time.
     *
     * @param {Record<string, unknown>} payload - The payload to be included in the token.
     * @param {number} [expiresInSeconds] - The expiration time in seconds (default: 12 hours).
     * @returns {Promise<string>} The generated JWT token.
     */
    PostgrestService.generateToken = function (payload_1) {
        return __awaiter(this, arguments, void 0, function (payload, expiresInSeconds) {
            var exp;
            if (expiresInSeconds === void 0) { expiresInSeconds = 43200; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        exp = Math.floor(Date.now() / 1000) + expiresInSeconds;
                        return [4 /*yield*/, (0, jwt_1.sign)(__assign(__assign({}, payload), { exp: exp }), this.secret, 'HS256')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Retrieves the current user's session by requesting the `/api/auth/get-session` endpoint.
     *
     * @param {any} ctx - The request context, containing the HTTP headers.
     * @returns {Promise<any>} The user's session data.
     */
    PostgrestService.getMe = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var response, session, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch('http://localhost:3000/api/auth/get-session', {
                                method: 'GET',
                                headers: __assign({}, ctx.req.headers),
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error('Failed to fetch user session');
                        }
                        return [4 /*yield*/, response.json()];
                    case 2:
                        session = _a.sent();
                        if (!session || !session.user) {
                            throw new Error('No active session found or user not authenticated');
                        }
                        return [2 /*return*/, session.user]; // Return the authenticated user's data
                    case 3:
                        error_1 = _a.sent();
                        console.error('Error fetching session:', error_1);
                        throw new Error('Failed to fetch user session');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Verifies the validity of a JWT token.
     *
     * @param {string} token - The JWT token to be verified.
     * @returns {Promise<Record<string, unknown>>} The decoded payload if the token is valid.
     */
    PostgrestService.verifyToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, jwt_1.verify)(token, this.secret, 'HS256')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PostgrestService.secret = Bun.env.BETTER_AUTH_SECRET;
    return PostgrestService;
}());
exports.PostgrestService = PostgrestService;
