var fs = require('fs');
var fileNames = ['file1.txt','file2.txt'];
var promises = [];

function promiseResolver() {

  return new Promise(function(resolve, reject) {

    for (var i = 0; i < fileNames.length; i++) {
        promises.push( 
          new Promise((resolve, reject) => {
            fs.readFile(fileNames[i], 'utf-8', function(error, data){
                  
                  let promiseResult = {};
                  if(error) {
                    promiseResult.isRejected = true;
                    promiseResult.isResolved = false;
                    promiseResult.reason = error.message;
                    reject(promiseResult);
                  }
                  else{
                    promiseResult.isRejected = false;
                    promiseResult.isResolved = true;
                    promiseResult.value = data;
                    resolve(promiseResult);
                  }         
              });
          }).catch(function(error){
            return error;
          })
        );
    }

    Promise.all(promises)
      .then(result => {
        return new Promise((resolve, reject) => {
          resolve(result);
        });
      })
      .then(function(arr){
        resolve(arr);
      }) 
      .catch(err => console.log('Catch', err));
  });
}

promiseResolver().then(function(r){
  console.log(r);
})
