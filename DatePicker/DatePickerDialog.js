'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _simpleAssign = require('simple-assign');

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactEventListener = require('react-event-listener');

var _reactEventListener2 = _interopRequireDefault(_reactEventListener);

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _Calendar = require('./Calendar');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _Dialog = require('../Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _Popover = require('../Popover/Popover');

var _Popover2 = _interopRequireDefault(_Popover);

var _PopoverAnimationVertical = require('../Popover/PopoverAnimationVertical');

var _PopoverAnimationVertical2 = _interopRequireDefault(_PopoverAnimationVertical);

var _dateUtils = require('./dateUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DatePickerDialog = function (_Component) {
  (0, _inherits3.default)(DatePickerDialog, _Component);

  function DatePickerDialog() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, DatePickerDialog);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DatePickerDialog.__proto__ || (0, _getPrototypeOf2.default)(DatePickerDialog)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      open: false
    }, _this.show = function () {
      if (_this.props.onShow && !_this.state.open) {
        _this.props.onShow();
      }

      _this.setState({
        open: true
      });
    }, _this.dismiss = function () {
      if (_this.props.onDismiss && _this.state.open) {
        _this.props.onDismiss();
      }

      _this.setState({
        open: false
      });
    }, _this.handleTouchTapDay = function () {
      if (_this.props.autoOk) {
        setTimeout(_this.handleTouchTapOk, 300);
      }
    }, _this.handleTouchTapCancel = function () {
      _this.dismiss();
    }, _this.handleRequestClose = function () {
      _this.dismiss();
    }, _this.handleTouchTapOk = function () {
      if (_this.props.onAccept && !_this.refs.calendar.isSelectedDateDisabled()) {
        _this.props.onAccept(_this.refs.calendar.getSelectedDate());
      }

      _this.setState({
        open: false
      });
    }, _this.handleWindowKeyUp = function (event) {
      switch ((0, _keycode2.default)(event)) {
        case 'enter':
          _this.handleTouchTapOk();
          break;
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(DatePickerDialog, [{
    key: 'render',
    value: function render() {
      var _React$createElement;

      var _props = this.props,
          DateTimeFormat = _props.DateTimeFormat,
          autoOk = _props.autoOk,
          cancelClassName = _props.cancelClassName,
          cancelLabel = _props.cancelLabel,
          cancelStyle = _props.cancelStyle,
          container = _props.container,
          containerStyle = _props.containerStyle,
          disableYearSelection = _props.disableYearSelection,
          initialDate = _props.initialDate,
          firstDayOfWeek = _props.firstDayOfWeek,
          locale = _props.locale,
          maxDate = _props.maxDate,
          minDate = _props.minDate,
          mode = _props.mode,
          okClassName = _props.okClassName,
          okLabel = _props.okLabel,
          okStyle = _props.okStyle,
          onAccept = _props.onAccept,
          onDismiss = _props.onDismiss,
          onShow = _props.onShow,
          shouldDisableDate = _props.shouldDisableDate,
          style = _props.style,
          animation = _props.animation,
          other = (0, _objectWithoutProperties3.default)(_props, ['DateTimeFormat', 'autoOk', 'cancelClassName', 'cancelLabel', 'cancelStyle', 'container', 'containerStyle', 'disableYearSelection', 'initialDate', 'firstDayOfWeek', 'locale', 'maxDate', 'minDate', 'mode', 'okClassName', 'okLabel', 'okStyle', 'onAccept', 'onDismiss', 'onShow', 'shouldDisableDate', 'style', 'animation']);
      var open = this.state.open;


      var styles = {
        dialogContent: {
          width: mode === 'landscape' ? 479 : 310
        },
        dialogBodyContent: {
          padding: 0,
          minHeight: mode === 'landscape' ? 330 : 434,
          minWidth: mode === 'landscape' ? 479 : 310
        }
      };

      var Container = container === 'inline' ? _Popover2.default : _Dialog2.default;

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({}, other, { ref: 'root' }),
        _react2.default.createElement(
          Container,
          {
            anchorEl: this.refs.root // For Popover
            , animation: animation || _PopoverAnimationVertical2.default // For Popover
            , bodyStyle: styles.dialogBodyContent,
            contentStyle: styles.dialogContent,
            ref: 'dialog',
            repositionOnUpdate: true,
            open: open,
            onRequestClose: this.handleRequestClose,
            style: (0, _simpleAssign2.default)(styles.dialogBodyContent, containerStyle)
          },
          _react2.default.createElement(_reactEventListener2.default, {
            target: 'window',
            onKeyUp: this.handleWindowKeyUp
          }),
          _react2.default.createElement(_Calendar2.default, (_React$createElement = {
            autoOk: autoOk,
            DateTimeFormat: DateTimeFormat,
            cancelClassName: cancelClassName,
            cancelLabel: cancelLabel,
            cancelStyle: cancelStyle
          }, (0, _defineProperty3.default)(_React$createElement, 'DateTimeFormat', DateTimeFormat), (0, _defineProperty3.default)(_React$createElement, 'disableYearSelection', disableYearSelection), (0, _defineProperty3.default)(_React$createElement, 'firstDayOfWeek', firstDayOfWeek), (0, _defineProperty3.default)(_React$createElement, 'initialDate', initialDate), (0, _defineProperty3.default)(_React$createElement, 'locale', locale), (0, _defineProperty3.default)(_React$createElement, 'onTouchTapDay', this.handleTouchTapDay), (0, _defineProperty3.default)(_React$createElement, 'maxDate', maxDate), (0, _defineProperty3.default)(_React$createElement, 'minDate', minDate), (0, _defineProperty3.default)(_React$createElement, 'mode', mode), (0, _defineProperty3.default)(_React$createElement, 'open', open), (0, _defineProperty3.default)(_React$createElement, 'ref', 'calendar'), (0, _defineProperty3.default)(_React$createElement, 'onTouchTapCancel', this.handleTouchTapCancel), (0, _defineProperty3.default)(_React$createElement, 'onTouchTapOk', this.handleTouchTapOk), (0, _defineProperty3.default)(_React$createElement, 'okClassName', okClassName), (0, _defineProperty3.default)(_React$createElement, 'okLabel', okLabel), (0, _defineProperty3.default)(_React$createElement, 'okStyle', okStyle), (0, _defineProperty3.default)(_React$createElement, 'shouldDisableDate', shouldDisableDate), _React$createElement))
        )
      );
    }
  }]);
  return DatePickerDialog;
}(_react.Component);

DatePickerDialog.defaultProps = {
  DateTimeFormat: _dateUtils.dateTimeFormat,
  cancelLabel: 'Cancel',
  container: 'dialog',
  locale: 'en-US',
  okLabel: 'OK'
};
DatePickerDialog.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};
process.env.NODE_ENV !== "production" ? DatePickerDialog.propTypes = {
  DateTimeFormat: _react.PropTypes.func,
  animation: _react.PropTypes.func,
  autoOk: _react.PropTypes.bool,
  cancelLabel: _react.PropTypes.node,
  container: _react.PropTypes.oneOf(['dialog', 'inline']),
  containerStyle: _react.PropTypes.object,
  disableYearSelection: _react.PropTypes.bool,
  firstDayOfWeek: _react.PropTypes.number,
  initialDate: _react.PropTypes.object,
  locale: _react.PropTypes.string,
  maxDate: _react.PropTypes.object,
  minDate: _react.PropTypes.object,
  mode: _react.PropTypes.oneOf(['portrait', 'landscape']),
  okLabel: _react.PropTypes.node,
  onAccept: _react.PropTypes.func,
  onDismiss: _react.PropTypes.func,
  onShow: _react.PropTypes.func,
  open: _react.PropTypes.bool,
  shouldDisableDate: _react.PropTypes.func,
  style: _react.PropTypes.object
} : void 0;
exports.default = DatePickerDialog;