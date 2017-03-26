var ProxyAsync = require("pid-async-class").ProxyAsync;

class TrueValueHolder{
  constructor(val){
    this.value = val;
  }

  getVal(){
    return this.value;
  }
}

class ValueHolder extends ProxyAsync{
  constructor(value){
    super(new TrueValueHolder(value));
    this.listeners = [];
  }

  changeValue(newValue){
    return this.a(["_changeValue", newValue]);
  }

  _changeValue(newValue){
    this.swapInstance(new TrueValueHolder(newValue));
    for(var i in this.listeners){
      this.listeners[i].valueHolderChanged(this);
    }
    return true;
  }

  addListener(watcher){
    this.listeners.push(watcher);
  }

  getValue(){
    return this.a(["getVal"]);
  }

}

module.exports = ValueHolder;
