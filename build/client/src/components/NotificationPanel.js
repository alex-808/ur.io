"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationPanel = void 0;
var react_1 = __importStar(require("react"));
var react_2 = require("react");
var NotificationPanel = function (_a) {
    var notification = _a.notification, _b = _a.gridPlacement, gridPlacement = _b === void 0 ? 'top-center' : _b;
    var _c = (0, react_2.useState)('notification-panel'), className = _c[0], setClassName = _c[1];
    var notificationRef = (0, react_1.useRef)('');
    (0, react_1.useEffect)(function () {
        if (notification !== notificationRef.current) {
            setClassName('notification-panel-active');
            notificationRef.current = notification;
            setTimeout(function () {
                setClassName('notification-panel');
            }, 1000);
        }
        else {
            setClassName('notification-panel');
        }
    }, [notification]);
    return (<div className={className + " centering"} style={{ gridArea: "" + gridPlacement }}>
      {notification}
    </div>);
};
exports.NotificationPanel = NotificationPanel;
