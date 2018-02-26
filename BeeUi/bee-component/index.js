import { Component } from 'react'

//@nhancv: Declare private data
let _beeComponentPressDelayTimeOut = 500
let _beeComponentThrottleOptions = {
  'trailing': false
}
let _beeComponentOnPressAction = (func) => {
  func()
}
function refreshPressDelayAction() {
  this.onPressDelay = _.throttle(_beeComponentOnPressAction, _beeComponentPressDelayTimeOut, _beeComponentThrottleOptions)
}

export default class BeeComponent extends Component {
  constructor(props, context) {
    super(props, context)
    refreshPressDelayAction.bind(this)()
  }
  
  set beeComponentPressDelayTimeOut(timeout) {
    _beeComponentPressDelayTimeOut = timeout
    refreshPressDelayAction.bind(this)()
  }

  get beeComponentPressDelayTimeOut() {
    return _beeComponentPressDelayTimeOut
  }

  set beeComponentThrottleOptions(options) {
    _beeComponentThrottleOptions = options
    refreshPressDelayAction.bind(this)()
  }

  get beeComponentThrottleOptions() {
    return this._beeComponentThrottleOptions
  }

  set beeComponentOnPressAction(onPressAction) {
    _beeComponentOnPressAction = onPressAction
    refreshPressDelayAction.bind(this)()
  }

  get beeComponentOnPressAction() {
    return this._beeComponentOnPressAction
  }

}
