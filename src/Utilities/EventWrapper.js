import {EventEmitter} from 'fbemitter';
let emitter = new EventEmitter();

const EventWrapper = {

    emit: function (name, data) {
      emitter.emit(name, data);
    },

    addListener: function(name, func) {
      emitter.addListener(name, func);
    },

    removeAllListeners: function () {
      emitter.removeAllListeners();
	  }
}

export default EventWrapper;