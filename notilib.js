

(function(root, factory) {
    
    if (typeof define === 'function' && define.amd) {
      // AMD. Register as an anonymous module.
      define([], factory);
    } else if (typeof module === 'object' && module.exports) {
      // Node. Does not work with strict CommonJS, but
      // only CommonJS-like environments that support module.exports,
      // like Node.
      module.exports = factory();
    } else {
      // Browser globals (root is window)
      root.notilib = factory();
    }
  }(this, () => {
  
    // Defaults
    
    function setParams (params={}){
        this.params = params;
        return notilib;
    }
    function notitajax(){
        me = this;
        this.intercalValue=  setInterval(function(){ 
        
            $.ajax({
                method: me.params.method,
                url: me.params.url,
                data: me.params.data != undefined ? me.params.data:[]
              })
                .done(function( msg ) {     
                                                       
                    me.params.callback(msg);
                });
        }, [me],1000);
        
    }
    let notilib = { };

    function notistopajax()  {
        clearInterval(intercalValue);
    }
    
    function notifyMe() {
      var notification = new Notification('Email received', {
          body: 'You have a total of 3 unread emails'
        });
        // Let's check if the browser supports notifications
        if (!("Notification" in window)) {
          alert("This browser does not support desktop notification");
        }
      
        // Let's check whether notification permissions have already been granted
        else if (Notification.permission === "granted") {
          // If it's okay let's create a notification
          var notification = new Notification("Hi there!");
        }
      
        // Otherwise, we need to ask the user for permission
        else if (Notification.permission !== 'denied' || Notification.permission !== 'default') {
          Notification.requestPermission(function (permission) {
            debugger;
            // If the user accepts, let's create a notification
            if (permission === "granted") {
              var notification = new Notification("Hi there!");
            }
          });
        }
      
        // At last, if the user has denied notifications, and you 
        // want to be respectful there is no need to bother them any more.
      }
    notilib.notifyMe =   notifyMe;
    notilib.setParams = setParams;
    notilib.notitajax = notitajax;
    notilib.notistopajax = notistopajax;
    notilib.version = '0.1.1';
    notilib.random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  
    return notilib;
  
  }));