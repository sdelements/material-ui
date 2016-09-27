import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FlatButton from '../FlatButton';

class CalendarActionButton extends Component {
  static propTypes = {
    autoOk: PropTypes.bool,
    cancelLabel: PropTypes.node,
    okLabel: PropTypes.node,
    onClickCancel: PropTypes.func,
    onClickOk: PropTypes.func,
  };

  static defaultProps = {
    okStyle: {},
    cancelStyle: {},
  };

  render() {
    const {
      cancelClassName,
      cancelLabel,
      cancelStyle,
      okClassName,
      okLabel,
      okStyle,
      wordings
    } = this.props;

    const styles = {
      root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        margin: 0,
        maxHeight: 48,
        padding: 0,
      },
      flatButtons: {
        fontsize: 14,
        margin: '4px 8px 8px 0px',
        maxHeight: 36,
        minWidth: 64,
        padding: 0,
      },
    };

    return (
      <div style={styles.root} >
        <FlatButton
          onClick={this.props.onClickCancel}
          className={cancelClassName}
          label={wordings ? wordings.cancel : cancelLabel}
          onTouchTap={this.props.onTouchTapCancel}
          primary={true}
          style={{...styles.flatButtons, ...cancelStyle}}
        />
        {!this.props.autoOk &&
          <FlatButton
            className={okClassName}
            disabled={this.refs.calendar !== undefined && this.refs.calendar.isSelectedDateDisabled()}
            label={okLabel}
            onClick={this.props.onClickOk}
            primary={true}
            style={{...styles.flatButtons, ...okStyle}}
          />
        }
      </div>
    );
  }
}

export default CalendarActionButton;
