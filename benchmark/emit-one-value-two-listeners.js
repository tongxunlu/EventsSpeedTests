var suite = require('chuhai');
var test = require('blue-tape');
var setup = require('../subjects');

test('emit one value - two listeners', function (t) {
  return suite('', function (s) {
    s.set('maxTime', setup.maxTime);
    s.set('minSamples', setup.minSamples);

    var subjects = setup.createInstancesOn(handle, handle2);

    var called = null;
    var called2 = null;

    s.cycle(function (e) {
      t.false(e.target.error, e.target.name + ' runs without error');
      t.equal(called, 1, e.target.name + ' called handle once');
      t.equal(called2, 1, e.target.name + ' called handle2 once');
      called = called2 = null;
    });

    s.burn('Theoretical max', function () {
      called = called2 = 0;
      handle('bar');
      handle2('bar');
    });

    s.bench('EventEmitter', function () {
      called = called2 = 0;
      subjects.ee1.emit('foo', 'bar');
    });

    s.bench('EventEmitter2', function () {
      called = called2 = 0;
      subjects.ee2.emit('foo', 'bar');
    });

    s.bench('EventEmitter3', function () {
      called = called2 = 0;
      subjects.ee3.emit('foo', 'bar');
    });

    s.bench('dripEmitter', function () {
      called = called2 = 0;
      subjects.dripEmitter.emit('foo', 'bar');
    });

    s.bench('push-stream-patch', function () {
      called = called2 = 0;
      subjects.pushStreamPatch.push('bar');
    });

    s.bench('push-stream', function () {
      called = called2 = 0;
      subjects.pushStream.push('bar');
    });

    s.bench('dripEmitterEnhanced', function () {
      called = called2 = 0;
      subjects.dripEmitterEnhanced.emit('foo', 'bar');
    });

    s.bench('d3-dispatch', function () {
      called = called2 = 0;
      subjects.dispatch.call('foo', null, 'bar');
    });

    s.bench('namespace-emitter', function () {
      called = called2 = 0;
      subjects.nsEmitter.emit('foo', 'bar');
    });

    s.bench('ReactiveProperty', function () {
      called = called2 = 0;
      subjects.rProperty('bar');
    });

    s.bench('observable', function () {
      called = called2 = 0;
      subjects.observableValue('bar');
    });

    s.bench('observ', function () {
      called = called2 = 0;
      subjects.observValue.set('bar');
    });

    s.bench('RXJS', function () {
      called = called2 = 0;
      subjects.subject.next('bar');
    });

    s.bench('JS-Signals', function () {
      called = called2 = 0;
      subjects.signal.dispatch('bar');
    });

    s.bench('MiniSignals', function () {
      called = called2 = 0;
      subjects.miniSignal.dispatch('bar');
    });

    s.bench('MicroSignals', function () {
      called = called2 = 0;
      subjects.microSignal.dispatch('bar');
    });

    s.bench('signal-emitter', function () {
      called = called2 = 0;
      subjects.signalEmitter.emit('bar');
    });

    s.bench('event-signal', function () {
      called = called2 = 0;
      subjects.eventSignal.emit('bar');
    });

    s.bench('signal-lite', function () {
      called = called2 = 0;
      subjects.signalLite.broadcast('bar');
    });

    s.bench('minivents', function () {
      called = called2 = 0;
      subjects.miniVent.emit('foo', 'bar');
    });

    s.bench('pull-notify', function () {
      called = called2 = 0;
      subjects.pullNotify('bar');
    });

    s.bench('xstream', function () {
      called = called2 = 0;
      subjects.xstream.shamefullySendNext('bar');
    });

    s.bench('waddup', function () {
      called = called2 = 0;
      subjects.waddup.publish('foo', 'bar');
    });

    s.bench('evee', function () {
      called = called2 = 0;
      subjects.evee.emit('foo', 'bar');
    });

    s.bench('sister', function () {
      called = called2 = 0;
      subjects.sister.trigger('foo', 'bar');
    });

    function handle(a) {
      if (!subjects) { // ignore calls before bechmarks start
        return;
      }
      if (arguments.length === 0 || arguments.length > 2 || a !== 'bar') {
        throw new Error('invalid arguments ' + a);
      }
      called++;
    }

    function handle2(a) {
      if (!subjects) { // ignore calls before bechmarks start
        return;
      }
      if (arguments.length === 0 || arguments.length > 2 || a !== 'bar') {
        throw new Error('invalid arguments');
      }
      called2++;
    }
  });
});
