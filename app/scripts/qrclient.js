var QRClient = function() {

  var currentCallback;
  var imageWorker = new Worker('scripts/jsqrcode/qrworker.js');
      imageWorker.onmessage = function(e){
        if(e.data) {
          currentCallback(e.data);
        }
      };
      imageWorker.onerror = function(error){
        function WorkerException(message){
          this.name = 'WorkerException';
          this.message = message;
        }
        throw new WorkerException('Worker error.');
      };


  this.decode = function(imageData, callback) {
    try {
      currentCallback = callback;
      imageWorker.postMessage({
        data: imageData.data,
        height: imageData.height,
        width: imageData.width
      });

    }
    catch(e) {
      // consume the error.
      console.log(e)
    }
  };
 };
