'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _dom = require('../utils/dom');

var _dom2 = _interopRequireDefault(_dom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// heavily inspired by https://github.com/Khan/react-components/blob/master/js/layered-component-mixin.jsx
var RenderToLayer = function (_Component) {
  (0, _inherits3.default)(RenderToLayer, _Component);

  function RenderToLayer(props, context) {
    (0, _classCallCheck3.default)(this, RenderToLayer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RenderToLayer.__proto__ || (0, _getPrototypeOf2.default)(RenderToLayer)).call(this, props, context));

    _this.onClickAway = function (event) {
      if (event.defaultPrevented) {
        return;
      }

      if (!_this.props.componentClickAway) {
        return;
      }

      if (!_this.props.open) {
        return;
      }

      var el = _this.layer;
      if (event.target !== el && event.target === window || document.documentElement.contains(event.target) && !_dom2.default.isDescendant(el, event.target)) {
        _this.props.componentClickAway(event);
      }
    };

    _this.layer = document.createElement('div');
    if (props.useLayerForClickAway) {
      _this.layer.style.display = 'none';
      _this.layer.style.position = 'fixed';
      _this.layer.style.top = 0;
      _this.layer.style.bottom = 0;
      _this.layer.style.left = 0;
      _this.layer.style.right = 0;
      _this.layer.style.zIndex = context.muiTheme.zIndex.layer;
    }
    document.body.appendChild(_this.layer);
    return _this;
  }

  (0, _createClass3.default)(RenderToLayer, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (!this.layer) {
        return;
      }

      this.hideLayer();

      (0, _reactDom.unmountComponentAtNode)(this.layer);
      document.body.removeChild(this.layer);
      this.layer = null;
    }
  }, {
    key: 'getLayer',
    value: function getLayer() {
      return this.layer;
    }
  }, {
    key: 'showLayer',
    value: function showLayer() {
      var _this2 = this;

      if (this.props.useLayerForClickAway) {
        this.layer.addEventListener('click', this.onClickAway);
      } else {
        setTimeout(function () {
          window.addEventListener('click', _this2.onClickAway);
        }, 0);
      }
      this.layer.style.display = 'block';
    }
  }, {
    key: 'hideLayer',
    value: function hideLayer() {
      if (this.props.useLayerForClickAway) {
        this.layer.style.position = 'relative';
        this.layer.removeEventListener('click', this.onClickAway);
      } else {
        window.removeEventListener('click', this.onClickAway);
      }

      this.layer.style.display = 'none';
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          open = _props.open,
          render = _props.render;


      var contents = void 0;

      if (open) {
        contents = render();
        this.showLayer();
      } else {
        contents = null;
        this.hideLayer();
      }

      return (0, _reactDom.createPortal)(contents, this.layer);
    }
  }]);
  return RenderToLayer;
}(_react.Component);

RenderToLayer.defaultProps = {
  useLayerForClickAway: true
};
RenderToLayer.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
process.env.NODE_ENV !== "production" ? RenderToLayer.propTypes = {
  componentClickAway: _propTypes2.default.func,
  open: _propTypes2.default.bool.isRequired,
  render: _propTypes2.default.func.isRequired,
  useLayerForClickAway: _propTypes2.default.bool
} : void 0;
exports.default = RenderToLayer;