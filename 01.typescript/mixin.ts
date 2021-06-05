import applyMixin from './applyMixins.ts';

abstract class Callable {
  call() {
    console.log('Call');
  }
}

abstract class Activable {
  active = false;

  activate() {
    this.active = true;

    console.log('Activating');
  }

  deactivate() {
    this.active = false;

    console.log('Deactivate');
  }
}

class Class {}

interface Class extends Callable, Activable {}

applyMixin(Class, [Callable, Activable]);

const object = new Class();

object.call();
object.activate();
object.deactivate();
