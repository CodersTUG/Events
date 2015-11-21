import React, { PropTypes } from 'react';
import Radium from 'radium';

import ManifestAction from './action';
import ManifestButton from './button';

import diffState from './utils/diff-state';
import mousetrap from 'mousetrap';

import style from './style';

class ManifestComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: true
    };
  }

  static propTypes = {
    // Stuff you can use
    computedStates: PropTypes.array.isRequired,
    currentStateIndex: PropTypes.number.isRequired,
    stagedActions: PropTypes.array.isRequired,
    skippedActions: PropTypes.object.isRequired,

    // Stuff you can do
    reset: PropTypes.func.isRequired,
    commit: PropTypes.func.isRequired,
    rollback: PropTypes.func.isRequired,
    sweep: PropTypes.func.isRequired,
    toggleAction: PropTypes.func.isRequired, // ({ index })
    jumpToState: PropTypes.func.isRequired // ({ index })
  };

  componentDidMount() {
    const self = this;
    window.Mousetrap.bind(this.props.shortcut || ['ctrl+h', 'ctrl+]'], function (e) {
      self.toggleVisibility();
      return false;
    });
  }

  toggleVisibility() {
    this.setState({visible: !this.state.visible});
  }

  componentWillUnmount() {
    window.Mousetrap.unbind(this.props.shortcut || ['ctrl+h', 'ctrl+]']);
  }

  render() {
    const actionReports = this.props.stagedActions.map(this.renderAction.bind(this));
    const { visible } = this.state;
    const { commit, rollback, reset } = this.props;

    return (
      <div style={[
          style.base,
          visible && style.hidden
        ]}
      >
        <div style={style.controls}>
          <ManifestButton label="Commit" action={commit} />
          <ManifestButton label="Rollback" action={rollback} />
          <ManifestButton label="Reset" action={reset} />
        </div>

        {actionReports.reverse()}
      </div>
    );
  }

  renderAction(action, index) {
    const diffedStates = diffState(this.props.computedStates, index);
    const skippingAction = this.props.skippedActions[index]===true;

    return (
      <ManifestAction action={action}
                      index={index}
                      key={index}
                      diff={diffedStates}
                      skipped={skippingAction}
                      toggleAction={this.props.toggleAction.bind(this, index)}
                      jumpTo={this.jumpingTo.bind(this, index)}/>
    );
  }

  jumpingTo(index) {
    this.props.jumpToState(index);
  }
}

export default Radium(ManifestComponent);
