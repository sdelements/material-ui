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
      this.eventNode = this.layer;
      this.layer.style.display = 'none';
      this.layer.style.position = 'fixed';
      this.layer.style.top = 0;
      this.layer.style.bottom = 0;
      this.layer.style.left = 0;
      this.layer.style.right = 0;
      this.layer.style.zIndex = context.muiTheme.zIndex.layer;
    } else {
      this.eventNode = window;
    }
    document.body.appendChild(this.layer);
  }

  componentDidMount() {
    const {open} = this.props;

    if (open) {
      this.showLayer();
    }
  }

  componentDidUpdate(prevProps) {
    const {open} = this.props;

    if (open === prevProps.open) {
      return;
    }

    if (open) {
      this.showLayer();
    } else {
      this.hideLayer();
    }
  }

  componentWillUnmount() {
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
      this.layer.style.display = 'block';
    }

    setTimeout(() => {
      this.eventNode.addEventListener('click', this.onClickAway);
    }, 0);
  }

  hideLayer() {
    if (this.props.useLayerForClickAway) {
      this.layer.style.display = 'none';
    }

    this.eventNode.removeEventListener('click', this.onClickAway);
  }

  render() {
    const {
      open,
      render,
    } = this.props;

    return createPortal(open ? render() : null, this.layer);
  }
}

export default RenderToLayer;
