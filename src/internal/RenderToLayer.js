import {Component} from 'react';
import PropTypes from 'prop-types';
import {createPortal, unmountComponentAtNode} from 'react-dom';

import Dom from '../utils/dom';

// heavily inspired by https://github.com/Khan/react-components/blob/master/js/layered-component-mixin.jsx
class RenderToLayer extends Component {
  static propTypes = {
    componentClickAway: PropTypes.func,
    open: PropTypes.bool.isRequired,
    render: PropTypes.func.isRequired,
    useLayerForClickAway: PropTypes.bool,
  };

  static defaultProps = {
    useLayerForClickAway: true,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.layer = document.createElement('div');
    if (props.useLayerForClickAway) {
      this.layer.style.display = 'none';
      this.layer.style.position = 'fixed';
      this.layer.style.top = 0;
      this.layer.style.bottom = 0;
      this.layer.style.left = 0;
      this.layer.style.right = 0;
      this.layer.style.zIndex = context.muiTheme.zIndex.layer;
    }
    document.body.appendChild(this.layer);
  }

  componentWillUnmount() {
    if (!this.layer) {
      return;
    }

    this.hideLayer();

    unmountComponentAtNode(this.layer);
    document.body.removeChild(this.layer);
    this.layer = null;
  }

  onClickAway = (event) => {
    if (event.defaultPrevented) {
      return;
    }

    if (!this.props.componentClickAway) {
      return;
    }

    if (!this.props.open) {
      return;
    }

    const el = this.layer;
    if (event.target !== el && event.target === window ||
      (document.documentElement.contains(event.target) && !Dom.isDescendant(el, event.target))) {
      this.props.componentClickAway(event);
    }
  };

  getLayer() {
    return this.layer;
  }

  showLayer() {
    if (this.props.useLayerForClickAway) {
      this.layer.addEventListener('click', this.onClickAway);
    } else {
      setTimeout(() => {
        window.addEventListener('click', this.onClickAway);
      }, 0);
    }

    this.layer.style.display = 'block';
  }

  hideLayer() {
    if (this.props.useLayerForClickAway) {
      this.layer.style.position = 'relative';
      this.layer.removeEventListener('click', this.onClickAway);
    } else {
      window.removeEventListener('click', this.onClickAway);
    }

    this.layer.style.display = 'none';
  }

  render() {
    const {
      open,
      render,
    } = this.props;

    let contents;

    if (open) {
      contents = render();
      this.showLayer();
    } else {
      contents = null;
      this.hideLayer();
    }

    return createPortal(contents, this.layer);
  }
}

export default RenderToLayer;
