var QRClient = function() {

  var currentCallback;
  var isWorkerInProgress = false;
  var imageWorker = new Worker('scripts/jsqrcode/qrworker.js');

  imageWorker.onmessage = function(e){
    isWorkerInProgress = false;
    if(e.data) {
      currentCallback(e.data);
    }
  };
  imageWorker.onerror = function(error){
    isWorkerInProgress = false;
    function WorkerException(message){
      this.name = 'WorkerException';
      this.message = message;
    }
    throw new WorkerException('Worker error.');
  };

  this.decode = function(imageData, callback) {
    if(isWorkerInProgress){
      return;
    }
    try {
      currentCallback = callback;

      isWorkerInProgress = true;

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
