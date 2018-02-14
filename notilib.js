

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
        notilib.params = params;
        return notilib;
    }
    function notiajax(){
       
        this.xmlHttp = new XMLHttpRequest();
        this.stop =false;
        me = this;
        let i = 0;
        me.i = i;
      
        callXml(this.xmlHttp,me);
      
        function callXml(xmlHttp,me){
          xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(JSON.parse(xmlHttp.responseText),me);
        }
        xmlHttp.open(me.params.method, me.params.url, true); // true for asynchronous 
        xmlHttp.send(null);       
        }
        function callback(msg,me){
          console.dir(1);
          if(me.stop){
            me.xmlHttp.abort();
            return;
          }else{
            setTimeout(function () {
              me.i++;
              if(me.i == 100)
              {
                setTimeout(function () {callXml(me.xmlHttp,me);},[me],10000)
              }else
                callXml(me.xmlHttp,me); // will be executed after the specified time
           },[me], 30000);
          
          }
        
        }
  
        
    }
    let notilib = { };
   
    function notistopajax()  {
        this.stop = true;
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
    notilib.notiajax = notiajax;
    notilib.notistopajax = notistopajax;
    notilib.stop = false;
    notilib.params = {};
    notilib.version = '0.1.1';
    notilib.random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  
    return notilib;
  
  }));