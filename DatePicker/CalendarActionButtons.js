'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _FlatButton = require('../FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CalendarActionButton = function (_Component) {
  (0, _inherits3.default)(CalendarActionButton, _Component);

  function CalendarActionButton() {
    (0, _classCallCheck3.default)(this, CalendarActionButton);
    return (0, _possibleConstructorReturn3.default)(this, (CalendarActionButton.__proto__ || (0, _getPrototypeOf2.default)(CalendarActionButton)).apply(this, arguments));
  }

  (0, _createClass3.default)(CalendarActionButton, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          cancelClassName = _props.cancelClassName,
          cancelLabel = _props.cancelLabel,
          cancelStyle = _props.cancelStyle,
          okClassName = _props.okClassName,
          okLabel = _props.okLabel,
          okStyle = _props.okStyle,
          wordings = _props.wordings;


      var styles = {
        root: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          margin: 0,
          maxHeight: 48,
          padding: 0
        },
        flatButtons: {
          fontsize: 14,
          margin: '4px 8px 8px 0px',
          maxHeight: 36,
          minWidth: 64,
          padding: 0
        }
      };

      return _react2.default.createElement(
        'div',
        { style: styles.root },
        _react2.default.createElement(_FlatButton2.default, {
          className: cancelClassName,
          label: wordings ? wordings.cancel : cancelLabel,
          onTouchTap: this.props.onTouchTapCancel,
          onClick: this.props.onClickCancel,
          primary: true,
          style: (0, _extends3.default)({}, styles.flatButtons, cancelStyle)
        }),
        !this.props.autoOk && _react2.default.createElement(_FlatButton2.default, {
          className: okClassName,
          disabled: this.refs.calendar !== undefined && this.refs.calendar.isSelectedDateDisabled(),
          label: okLabel,
          onClick: this.props.onClickOk,
          primary: true,
          style: (0, _extends3.default)({}, styles.flatButtons, okStyle)
        })
      );
    }
  }]);
  return CalendarActionButton;
}(_react.Component);

CalendarActionButton.defaultProps = {
  okStyle: {},
  cancelStyle: {}
};
process.env.NODE_ENV !== "production" ? CalendarActionButton.propTypes = {
  autoOk: _propTypes2.default.bool,
  cancelLabel: _propTypes2.default.node,
  okLabel: _propTypes2.default.node,
  onClickCancel: _propTypes2.default.func,
  onClickOk: _propTypes2.default.func
} : void 0;
exports.default = CalendarActionButton;