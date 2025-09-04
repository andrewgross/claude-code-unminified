var getType =
  typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
    ? function (dbValue) {
        return typeof dbValue;
      }
    : function (inputValue) {
        if (
          inputValue &&
          typeof Symbol === "function" &&
          inputValue.constructor === Symbol &&
          inputValue !== Symbol.prototype
        ) {
          return "symbol";
        } else {
          return typeof inputValue;
        }
      };
function validateConstructorInstanceCheck(validateConstructor, BaseClass) {
  if (!(validateConstructor instanceof BaseClass)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function getIndexedDBImplementation() {
  try {
    if (typeof indexedDB !== "undefined") {
      return indexedDB;
    }
    if (typeof webkitIndexedDB !== "undefined") {
      return webkitIndexedDB;
    }
    if (typeof mozIndexedDB !== "undefined") {
      return mozIndexedDB;
    }
    if (typeof OIndexedDB !== "undefined") {
      return OIndexedDB;
    }
    if (typeof msIndexedDB !== "undefined") {
      return msIndexedDB;
    }
  } catch (_______error) {
    return;
  }
}
var indexedDBInstance = getIndexedDBImplementation();
function isIndexedDBSupported() {
  try {
    if (!indexedDBInstance || !indexedDBInstance.open) {
      return false;
    }
    var isSafariBrowser =
      typeof openDatabase !== "undefined" &&
      /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) &&
      !/Chrome/.test(navigator.userAgent) &&
      !/BlackBerry/.test(navigator.platform);
    var _isFetchNative =
      typeof fetch === "function" &&
      fetch.toString().indexOf("[native code") !== -1;
    return (
      (!isSafariBrowser || _isFetchNative) &&
      typeof indexedDB !== "undefined" &&
      typeof IDBKeyRange !== "undefined"
    );
  } catch (___errorHandler) {
    return false;
  }
}
function createBlobFromError(error, isFetchNative) {
  error = error || [];
  isFetchNative = isFetchNative || {};
  try {
    return new Blob(error, isFetchNative);
  } catch (_errorHandling) {
    if (_errorHandling.name !== "TypeError") {
      throw _errorHandling;
    }
    var ____BlobBuilderConstructor =
      typeof BlobBuilder !== "undefined"
        ? BlobBuilder
        : typeof MSBlobBuilder !== "undefined"
          ? MSBlobBuilder
          : typeof MozBlobBuilder !== "undefined"
            ? MozBlobBuilder
            : WebKitBlobBuilder;
    var blobBuilder = new ____BlobBuilderConstructor();
    for (var errorCounter = 0; errorCounter < error.length; errorCounter += 1) {
      blobBuilder.append(error[errorCounter]);
    }
    return blobBuilder.getBlob(isFetchNative.type);
  }
}
if (typeof Promise === "undefined") {
  require(3);
}
var PromiseImplementation = Promise;
function handlePromiseWithCallback(promise, callbackFunction) {
  if (callbackFunction) {
    promise.then(
      function (BlobBuilderConstructor) {
        callbackFunction(null, BlobBuilderConstructor);
      },
      function (_BlobBuilderConstructor) {
        callbackFunction(_BlobBuilderConstructor);
      },
    );
  }
}
function handlePromiseWithCallbacks(
  handlePromise,
  _callbackFunction,
  __BlobBuilderConstructor,
) {
  if (typeof _callbackFunction === "function") {
    handlePromise.then(_callbackFunction);
  }
  if (typeof __BlobBuilderConstructor === "function") {
    handlePromise.catch(__BlobBuilderConstructor);
  }
}
function convertToString(___BlobBuilderConstructor) {
  if (typeof ___BlobBuilderConstructor !== "string") {
    console.warn(
      ___BlobBuilderConstructor + " used as a key, but it is not a string.",
    );
    ___BlobBuilderConstructor = String(___BlobBuilderConstructor);
  }
  return ___BlobBuilderConstructor;
}
function getCallbackFunction() {
  if (
    arguments.length &&
    typeof arguments[arguments.length - 1] === "function"
  ) {
    return arguments[arguments.length - 1];
  }
}
var appendErrorToBlobBuilder = "local-forage-detect-blob-support";
var handlePromiseCallback = undefined;
var handleBlobPromise = {};
var _handleBlobPromise = Object.prototype.toString;
var callbackHandler = "readonly";
var handleCallback = "readwrite";
function convertStringToArrayBuffer(executeCallback) {
  var _callbackLength = executeCallback.length;
  var arrayBufferForCallbackLength = new ArrayBuffer(_callbackLength);
  var callbackCharCodesArray = new Uint8Array(arrayBufferForCallbackLength);
  for (
    var callbackCharCodeIndex = 0;
    callbackCharCodeIndex < _callbackLength;
    callbackCharCodeIndex++
  ) {
    callbackCharCodesArray[callbackCharCodeIndex] = executeCallback.charCodeAt(
      callbackCharCodeIndex,
    );
  }
  return arrayBufferForCallbackLength;
}
function ____handleBlobPromise(handleBlobResponse) {
  return new PromiseImplementation(function (handleBlobSupportCallback) {
    var blobTransaction = handleBlobResponse.transaction(
      appendErrorToBlobBuilder,
      handleCallback,
    );
    var errorBlob = createBlobFromError([""]);
    blobTransaction.objectStore(appendErrorToBlobBuilder).put(errorBlob, "key");
    blobTransaction.onabort = function (handleBlobBuilder) {
      handleBlobBuilder.preventDefault();
      handleBlobBuilder.stopPropagation();
      handleBlobSupportCallback(false);
    };
    blobTransaction.oncomplete = function () {
      var isChromeVersionSupported = navigator.userAgent.match(/Chrome\/(\d+)/);
      var isEdgeBrowser = navigator.userAgent.match(/Edge\//);
      handleBlobSupportCallback(
        isEdgeBrowser ||
          !isChromeVersionSupported ||
          parseInt(isChromeVersionSupported[1], 10) >= 43,
      );
    };
  }).catch(function () {
    return false;
  });
}
function handleBlobOrCallback(getLastArgumentAsFunction) {
  if (typeof handlePromiseCallback === "boolean") {
    return PromiseImplementation.resolve(handlePromiseCallback);
  }
  return ____handleBlobPromise(getLastArgumentAsFunction).then(
    function (callbackLength) {
      handlePromiseCallback = callbackLength;
      return handlePromiseCallback;
    },
  );
}
function handleBlobErrorUpdate(handleBlobError) {
  var _blobHandler = handleBlobPromise[handleBlobError.name];
  var deferredBlobOperation = {};
  deferredBlobOperation.promise = new PromiseImplementation(function (
    byteArray,
    currentIndex,
  ) {
    deferredBlobOperation.resolve = byteArray;
    deferredBlobOperation.reject = currentIndex;
  });
  _blobHandler.deferredOperations.push(deferredBlobOperation);
  if (!_blobHandler.dbReady) {
    _blobHandler.dbReady = deferredBlobOperation.promise;
  } else {
    _blobHandler.dbReady = _blobHandler.dbReady.then(function () {
      return deferredBlobOperation.promise;
    });
  }
}
function resolveDeferredOperation(executeCallbackToArrayBuffer) {
  var _deferredOperationHandler =
    handleBlobPromise[executeCallbackToArrayBuffer.name];
  var ___deferredOperation = _deferredOperationHandler.deferredOperations.pop();
  if (___deferredOperation) {
    ___deferredOperation.resolve();
    return ___deferredOperation.promise;
  }
}
function _handleDeferredOperations(createUint8ArrayFromString, bufferSize) {
  var deferredOperationHandler =
    handleBlobPromise[createUint8ArrayFromString.name];
  var __deferredOperation = deferredOperationHandler.deferredOperations.pop();
  if (__deferredOperation) {
    __deferredOperation.reject(bufferSize);
    return __deferredOperation.promise;
  }
}
function handleBlobDatabaseOperation(_handleBlobResponse, chromeVersionMatch) {
  return new PromiseImplementation(function (
    transactionHandler,
    emptyBlobData,
  ) {
    handleBlobPromise[_handleBlobResponse.name] =
      handleBlobPromise[_handleBlobResponse.name] || initializeForageDatabase();
    if (_handleBlobResponse.db) {
      if (chromeVersionMatch) {
        handleBlobErrorUpdate(_handleBlobResponse);
        _handleBlobResponse.db.close();
      } else {
        return transactionHandler(_handleBlobResponse.db);
      }
    }
    var databaseOpenParams = [_handleBlobResponse.name];
    if (chromeVersionMatch) {
      databaseOpenParams.push(_handleBlobResponse.version);
    }
    var _databaseOpenRequest = indexedDBInstance.open.apply(
      indexedDBInstance,
      databaseOpenParams,
    );
    if (chromeVersionMatch) {
      _databaseOpenRequest.onupgradeneeded = function (handleBlobOperation) {
        var _databaseConnection = _databaseOpenRequest.result;
        try {
          _databaseConnection.createObjectStore(_handleBlobResponse.storeName);
          if (handleBlobOperation.oldVersion <= 1) {
            _databaseConnection.createObjectStore(appendErrorToBlobBuilder);
          }
        } catch (__error) {
          if (__error.name === "ConstraintError") {
            console.warn(
              'The database "' +
                _handleBlobResponse.name +
                '" has been upgraded from version ' +
                handleBlobOperation.oldVersion +
                " to version " +
                handleBlobOperation.newVersion +
                ', but the storage "' +
                _handleBlobResponse.storeName +
                '" already exists.',
            );
          } else {
            throw __error;
          }
        }
      };
    }
    _databaseOpenRequest.onerror = function (handleDeferredOperations) {
      handleDeferredOperations.preventDefault();
      emptyBlobData(_databaseOpenRequest.error);
    };
    _databaseOpenRequest.onsuccess = function () {
      var __databaseConnection = _databaseOpenRequest.result;
      __databaseConnection.onversionchange = function (__handleBlobResponse) {
        __handleBlobResponse.target.close();
      };
      transactionHandler(__databaseConnection);
      resolveDeferredOperation(_handleBlobResponse);
    };
  });
}
function executeDatabaseOperation(operationDeferred) {
  return handleBlobDatabaseOperation(operationDeferred, false);
}
function executeDeferredOperation(deferredOperation) {
  return handleBlobDatabaseOperation(deferredOperation, true);
}
function checkAndUpdateDatabaseVersion(operationIndex, handleBlobPromiseMap) {
  if (!operationIndex.db) {
    return true;
  }
  var isStoreNameAbsent = !operationIndex.db.objectStoreNames.contains(
    operationIndex.storeName,
  );
  var isDowngradeAttempt = operationIndex.version < operationIndex.db.version;
  var isDatabaseVersionUpdated =
    operationIndex.version > operationIndex.db.version;
  if (isDowngradeAttempt) {
    if (operationIndex.version !== handleBlobPromiseMap) {
      console.warn(
        `${'The database "' + operationIndex.name}" can't be downgraded from version ${operationIndex.db.version} to version ${operationIndex.version}.`,
      );
    }
    operationIndex.version = operationIndex.db.version;
  }
  if (isDatabaseVersionUpdated || isStoreNameAbsent) {
    if (isStoreNameAbsent) {
      var _nextDatabaseVersion = operationIndex.db.version + 1;
      if (_nextDatabaseVersion > operationIndex.version) {
        operationIndex.version = _nextDatabaseVersion;
      }
    }
    return true;
  }
  return false;
}
function processBlobOperation(_deferredOperation) {
  return new PromiseImplementation(function (
    openDatabaseTransaction,
    ___handleBlobResponse,
  ) {
    var fileReader = new FileReader();
    fileReader.onerror = ___handleBlobResponse;
    fileReader.onloadend = function (databaseOpenRequestArguments) {
      var encodedDatabaseBlob = btoa(
        databaseOpenRequestArguments.target.result || "",
      );
      openDatabaseTransaction({
        __local_forage_encoded_blob: true,
        data: encodedDatabaseBlob,
        type: _deferredOperation.type,
      });
    };
    fileReader.readAsBinaryString(_deferredOperation);
  });
}
function ___handleDatabaseRequest(openDatabaseRequest) {
  var dataArrayBuffer = convertStringToArrayBuffer(
    atob(openDatabaseRequest.data),
  );
  return createBlobFromError([dataArrayBuffer], {
    type: openDatabaseRequest.type,
  });
}
function getEncodedBlobFromRequest(databaseOpenRequest) {
  return databaseOpenRequest && databaseOpenRequest.__local_forage_encoded_blob;
}
function checkDatabaseVersion(databaseVersionCheck) {
  var _________________context = this;
  var initializeDatabaseReadyCheck = _________________context
    ._initReady()
    .then(function () {
      var _____________databaseInfo =
        handleBlobPromise[_________________context._dbInfo.name];
      if (_____________databaseInfo && _____________databaseInfo.dbReady) {
        return _____________databaseInfo.dbReady;
      }
    });
  handlePromiseWithCallbacks(
    initializeDatabaseReadyCheck,
    databaseVersionCheck,
    databaseVersionCheck,
  );
  return initializeDatabaseReadyCheck;
}
function ____handleIndexedDBTransaction(indexedDBTransaction) {
  handleBlobErrorUpdate(indexedDBTransaction);
  var blobHandler = handleBlobPromise[indexedDBTransaction.name];
  var forageDataList = blobHandler.forages;
  for (
    var forageDataIndex = 0;
    forageDataIndex < forageDataList.length;
    forageDataIndex++
  ) {
    var currentForageData = forageDataList[forageDataIndex];
    if (currentForageData._dbInfo.db) {
      currentForageData._dbInfo.db.close();
      currentForageData._dbInfo.db = null;
    }
  }
  indexedDBTransaction.db = null;
  return executeDatabaseOperation(indexedDBTransaction)
    .then(function (blobOperationRequest) {
      indexedDBTransaction.db = blobOperationRequest;
      if (checkAndUpdateDatabaseVersion(indexedDBTransaction)) {
        return executeDeferredOperation(indexedDBTransaction);
      }
      return blobOperationRequest;
    })
    .then(function (databaseRequest) {
      indexedDBTransaction.db = blobHandler.db = databaseRequest;
      for (
        var _forageDataIndex = 0;
        _forageDataIndex < forageDataList.length;
        _forageDataIndex++
      ) {
        forageDataList[_forageDataIndex]._dbInfo.db = databaseRequest;
      }
    })
    .catch(function (blobRequest) {
      _handleDeferredOperations(indexedDBTransaction, blobRequest);
      throw blobRequest;
    });
}
function performBlobVersionCheck(
  handleBlobVersionCheck,
  checkBlobOperationVersion,
  isNewObjectStore,
  initialValue = 1,
) {
  try {
    var blobVersionTransaction = handleBlobVersionCheck.db.transaction(
      handleBlobVersionCheck.storeName,
      checkBlobOperationVersion,
    );
    isNewObjectStore(null, blobVersionTransaction);
  } catch (errorHandling) {
    if (
      initialValue > 0 &&
      (!handleBlobVersionCheck.db ||
        errorHandling.name === "InvalidStateError" ||
        errorHandling.name === "NotFoundError")
    ) {
      return PromiseImplementation.resolve()
        .then(function () {
          if (
            !handleBlobVersionCheck.db ||
            (errorHandling.name === "NotFoundError" &&
              !handleBlobVersionCheck.db.objectStoreNames.contains(
                handleBlobVersionCheck.storeName,
              ) &&
              handleBlobVersionCheck.version <=
                handleBlobVersionCheck.db.version)
          ) {
            if (handleBlobVersionCheck.db) {
              handleBlobVersionCheck.version =
                handleBlobVersionCheck.db.version + 1;
            }
            return executeDeferredOperation(handleBlobVersionCheck);
          }
        })
        .then(function () {
          return ____handleIndexedDBTransaction(handleBlobVersionCheck).then(
            function () {
              performBlobVersionCheck(
                handleBlobVersionCheck,
                checkBlobOperationVersion,
                isNewObjectStore,
                initialValue - 1,
              );
            },
          );
        })
        .catch(isNewObjectStore);
    }
    isNewObjectStore(errorHandling);
  }
}
function initializeForageDatabase() {
  return {
    forages: [],
    db: null,
    dbReady: null,
    deferredOperations: [],
  };
}
function initializeDatabaseConnection(validateDatabaseVersionAndStore) {
  var _databaseContext = this;
  var _databaseConfig = {
    db: null,
  };
  if (validateDatabaseVersionAndStore) {
    for (var dataKey in validateDatabaseVersionAndStore) {
      _databaseConfig[dataKey] = validateDatabaseVersionAndStore[dataKey];
    }
  }
  var databaseBlobPromise = handleBlobPromise[_databaseConfig.name];
  if (!databaseBlobPromise) {
    databaseBlobPromise = initializeForageDatabase();
    handleBlobPromise[_databaseConfig.name] = databaseBlobPromise;
  }
  databaseBlobPromise.forages.push(_databaseContext);
  if (!_databaseContext._initReady) {
    _databaseContext._initReady = _databaseContext.ready;
    _databaseContext.ready = checkDatabaseVersion;
  }
  var initializationPromises = [];
  function resolvePromise() {
    return PromiseImplementation.resolve();
  }
  for (
    var _forageIndex = 0;
    _forageIndex < databaseBlobPromise.forages.length;
    _forageIndex++
  ) {
    var selectedForage = databaseBlobPromise.forages[_forageIndex];
    if (selectedForage !== _databaseContext) {
      initializationPromises.push(
        selectedForage._initReady().catch(resolvePromise),
      );
    }
  }
  var _initializeDatabase = databaseBlobPromise.forages.slice(0);
  return PromiseImplementation.all(initializationPromises)
    .then(function () {
      _databaseConfig.db = databaseBlobPromise.db;
      return executeDatabaseOperation(_databaseConfig);
    })
    .then(function (checkAndUpdateOperationIndexVersion) {
      _databaseConfig.db = checkAndUpdateOperationIndexVersion;
      if (
        checkAndUpdateDatabaseVersion(
          _databaseConfig,
          _databaseContext._defaultConfig.version,
        )
      ) {
        return executeDeferredOperation(_databaseConfig);
      }
      return checkAndUpdateOperationIndexVersion;
    })
    .then(function (handleDatabaseBlobResponse) {
      _databaseConfig.db = databaseBlobPromise.db = handleDatabaseBlobResponse;
      _databaseContext._dbInfo = _databaseConfig;
      for (
        var _databaseIndex = 0;
        _databaseIndex < _initializeDatabase.length;
        _databaseIndex++
      ) {
        var currentDatabaseInstance = _initializeDatabase[_databaseIndex];
        if (currentDatabaseInstance !== _databaseContext) {
          currentDatabaseInstance._dbInfo.db = _databaseConfig.db;
          currentDatabaseInstance._dbInfo.version = _databaseConfig.version;
        }
      }
    });
}
function _handleDatabaseOpenRequest(
  onLoadEndHandleDatabaseOpenRequest,
  decodeBase64ToBinary,
) {
  var ______context = this;
  onLoadEndHandleDatabaseOpenRequest = convertToString(
    onLoadEndHandleDatabaseOpenRequest,
  );
  var _openDatabasePromise = new PromiseImplementation(function (
    blobData,
    _blobData,
  ) {
    ______context
      .ready()
      .then(function () {
        performBlobVersionCheck(
          ______context._dbInfo,
          callbackHandler,
          function (handleEncodingBlobTransaction, __handleBlobPromise) {
            if (handleEncodingBlobTransaction) {
              return _blobData(handleEncodingBlobTransaction);
            }
            try {
              var databaseStore = __handleBlobPromise.objectStore(
                ______context._dbInfo.storeName,
              );
              var databaseGetRequest = databaseStore.get(
                onLoadEndHandleDatabaseOpenRequest,
              );
              databaseGetRequest.onsuccess = function () {
                var databaseResult = databaseGetRequest.result;
                if (databaseResult === undefined) {
                  databaseResult = null;
                }
                if (getEncodedBlobFromRequest(databaseResult)) {
                  databaseResult = ___handleDatabaseRequest(databaseResult);
                }
                blobData(databaseResult);
              };
              databaseGetRequest.onerror = function () {
                _blobData(databaseGetRequest.error);
              };
            } catch (____error) {
              _blobData(____error);
            }
          },
        );
      })
      .catch(_blobData);
  });
  handlePromiseWithCallback(_openDatabasePromise, decodeBase64ToBinary);
  return _openDatabasePromise;
}
function processIndexedDBTransaction(
  handleIndexedDBTransaction,
  indexedDBHandles,
) {
  var ____context = this;
  var __transactionPromise = new PromiseImplementation(function (
    blobObject,
    _handleIndexedDBTransaction,
  ) {
    ____context
      .ready()
      .then(function () {
        performBlobVersionCheck(
          ____context._dbInfo,
          callbackHandler,
          function (index, handleBlobTransaction) {
            if (index) {
              return _handleIndexedDBTransaction(index);
            }
            try {
              var blobTransactionCursor = handleBlobTransaction.objectStore(
                ____context._dbInfo.storeName,
              );
              var blobCursor = blobTransactionCursor.openCursor();
              var __currentIndex = 1;
              blobCursor.onsuccess = function () {
                var blobCursorResult = blobCursor.result;
                if (blobCursorResult) {
                  var ___blobData = blobCursorResult.value;
                  if (getEncodedBlobFromRequest(___blobData)) {
                    ___blobData = ___handleDatabaseRequest(___blobData);
                  }
                  var transactionResult = handleIndexedDBTransaction(
                    ___blobData,
                    blobCursorResult.key,
                    __currentIndex++,
                  );
                  if (transactionResult !== undefined) {
                    blobObject(transactionResult);
                  } else {
                    blobCursorResult.continue();
                  }
                } else {
                  blobObject();
                }
              };
              blobCursor.onerror = function () {
                _handleIndexedDBTransaction(blobCursor.error);
              };
            } catch (_transactionError) {
              _handleIndexedDBTransaction(_transactionError);
            }
          },
        );
      })
      .catch(_handleIndexedDBTransaction);
  });
  handlePromiseWithCallback(__transactionPromise, indexedDBHandles);
  return __transactionPromise;
}
function performBlobVersionCheckAndOperation(
  checkBlobVersionAndPerformOperation,
  _handleBlobOperation,
  handleBlobVersionCheckTransaction,
) {
  var ___context = this;
  checkBlobVersionAndPerformOperation = convertToString(
    checkBlobVersionAndPerformOperation,
  );
  var blobVersionCheckPromise = new PromiseImplementation(function (
    _error,
    _handleBlobTransaction,
  ) {
    var __databaseInfo;
    ___context
      .ready()
      .then(function () {
        __databaseInfo = ___context._dbInfo;
        if (_handleBlobPromise.call(_handleBlobOperation) === "[object Blob]") {
          return handleBlobOrCallback(__databaseInfo.db).then(
            function (handleDatabaseError) {
              if (handleDatabaseError) {
                return _handleBlobOperation;
              }
              return processBlobOperation(_handleBlobOperation);
            },
          );
        }
        return _handleBlobOperation;
      })
      .then(function (handleDatabaseVersionCheck) {
        performBlobVersionCheck(
          ___context._dbInfo,
          handleCallback,
          function (_handleBlobVersionCheck, _validateDatabaseVersionAndStore) {
            if (_handleBlobVersionCheck) {
              return _handleBlobTransaction(_handleBlobVersionCheck);
            }
            try {
              var databaseObjectStore =
                _validateDatabaseVersionAndStore.objectStore(
                  ___context._dbInfo.storeName,
                );
              if (handleDatabaseVersionCheck === null) {
                handleDatabaseVersionCheck = undefined;
              }
              var dbPutRequest = databaseObjectStore.put(
                handleDatabaseVersionCheck,
                checkBlobVersionAndPerformOperation,
              );
              _validateDatabaseVersionAndStore.oncomplete = function () {
                if (handleDatabaseVersionCheck === undefined) {
                  handleDatabaseVersionCheck = null;
                }
                _error(handleDatabaseVersionCheck);
              };
              _validateDatabaseVersionAndStore.onabort =
                _validateDatabaseVersionAndStore.onerror = function () {
                  var transactionError = dbPutRequest.error
                    ? dbPutRequest.error
                    : dbPutRequest.transaction.error;
                  _handleBlobTransaction(transactionError);
                };
            } catch (errorBlobTransaction) {
              _handleBlobTransaction(errorBlobTransaction);
            }
          },
        );
      })
      .catch(_handleBlobTransaction);
  });
  handlePromiseWithCallback(
    blobVersionCheckPromise,
    handleBlobVersionCheckTransaction,
  );
  return blobVersionCheckPromise;
}
function initializeDatabaseAndHandleDeletion(
  databaseInitializationHandler,
  currentContext,
) {
  var dbContext = this;
  databaseInitializationHandler = convertToString(
    databaseInitializationHandler,
  );
  var __databaseDeletionPromise = new PromiseImplementation(function (
    databaseState,
    pendingInitializationPromises,
  ) {
    dbContext
      .ready()
      .then(function () {
        performBlobVersionCheck(
          dbContext._dbInfo,
          handleCallback,
          function (resolvePromiseWithNoOp, forageIndex) {
            if (resolvePromiseWithNoOp) {
              return pendingInitializationPromises(resolvePromiseWithNoOp);
            }
            try {
              var objectStore = forageIndex.objectStore(
                dbContext._dbInfo.storeName,
              );
              var deleteRequest = objectStore.delete(
                databaseInitializationHandler,
              );
              forageIndex.oncomplete = function () {
                databaseState();
              };
              forageIndex.onerror = function () {
                pendingInitializationPromises(deleteRequest.error);
              };
              forageIndex.onabort = function () {
                var errorMessage = deleteRequest.error
                  ? deleteRequest.error
                  : deleteRequest.transaction.error;
                pendingInitializationPromises(errorMessage);
              };
            } catch (_____error) {
              pendingInitializationPromises(_____error);
            }
          },
        );
      })
      .catch(pendingInitializationPromises);
  });
  handlePromiseWithCallback(__databaseDeletionPromise, currentContext);
  return __databaseDeletionPromise;
}
function initializeDatabaseAndHandleUpdates(
  initializeForagesAndHandleDatabaseUpdates,
) {
  var __databaseContext = this;
  var databaseUpdatePromise = new PromiseImplementation(function (
    blobDataHandler,
    databaseForageManager,
  ) {
    __databaseContext
      .ready()
      .then(function () {
        performBlobVersionCheck(
          __databaseContext._dbInfo,
          handleCallback,
          function (databasePromises, handleDatabaseResponse) {
            if (databasePromises) {
              return databaseForageManager(databasePromises);
            }
            try {
              var objectStoreHandler = handleDatabaseResponse.objectStore(
                __databaseContext._dbInfo.storeName,
              );
              var clearOperationRequest = objectStoreHandler.clear();
              handleDatabaseResponse.oncomplete = function () {
                blobDataHandler();
              };
              handleDatabaseResponse.onabort = handleDatabaseResponse.onerror =
                function () {
                  var operationError = clearOperationRequest.error
                    ? clearOperationRequest.error
                    : clearOperationRequest.transaction.error;
                  databaseForageManager(operationError);
                };
            } catch (_errorHandler) {
              databaseForageManager(_errorHandler);
            }
          },
        );
      })
      .catch(databaseForageManager);
  });
  handlePromiseWithCallback(
    databaseUpdatePromise,
    initializeForagesAndHandleDatabaseUpdates,
  );
  return databaseUpdatePromise;
}
function fetchBlobCount(_index) {
  var ___________context = this;
  var blobCountPromise = new PromiseImplementation(function (
    blobDataPromise,
    handleDatabaseOpenRequest,
  ) {
    ___________context
      .ready()
      .then(function () {
        performBlobVersionCheck(
          ___________context._dbInfo,
          callbackHandler,
          function (onLoadBlobRequest, getBlobDataById) {
            if (onLoadBlobRequest) {
              return handleDatabaseOpenRequest(onLoadBlobRequest);
            }
            try {
              var blobDataStore = getBlobDataById.objectStore(
                ___________context._dbInfo.storeName,
              );
              var countRequest = blobDataStore.count();
              countRequest.onsuccess = function () {
                blobDataPromise(countRequest.result);
              };
              countRequest.onerror = function () {
                handleDatabaseOpenRequest(countRequest.error);
              };
            } catch (_databaseRequestError) {
              handleDatabaseOpenRequest(_databaseRequestError);
            }
          },
        );
      })
      .catch(handleDatabaseOpenRequest);
  });
  handlePromiseWithCallback(blobCountPromise, _index);
  return blobCountPromise;
}
function _________handleBlobTransaction(
  __handleBlobTransaction,
  __handleIndexedDBTransaction,
) {
  var _____context = this;
  var promiseForBlobTransaction = new PromiseImplementation(function (
    ___handleBlobTransaction,
    ____handleBlobTransaction,
  ) {
    if (__handleBlobTransaction < 0) {
      ___handleBlobTransaction(null);
      return;
    }
    _____context
      .ready()
      .then(function () {
        performBlobVersionCheck(
          _____context._dbInfo,
          callbackHandler,
          function (_onLoadEndHandleDatabaseOpenRequest, _databaseRequest) {
            if (_onLoadEndHandleDatabaseOpenRequest) {
              return ____handleBlobTransaction(
                _onLoadEndHandleDatabaseOpenRequest,
              );
            }
            try {
              var objectStoreTransaction = _databaseRequest.objectStore(
                _____context._dbInfo.storeName,
              );
              var hasAdvancedToNextCursor = false;
              var keyCursorRequest = objectStoreTransaction.openKeyCursor();
              keyCursorRequest.onsuccess = function () {
                var cursorResult = keyCursorRequest.result;
                if (!cursorResult) {
                  ___handleBlobTransaction(null);
                  return;
                }
                if (__handleBlobTransaction === 0) {
                  ___handleBlobTransaction(cursorResult.key);
                } else if (!hasAdvancedToNextCursor) {
                  hasAdvancedToNextCursor = true;
                  cursorResult.advance(__handleBlobTransaction);
                } else {
                  ___handleBlobTransaction(cursorResult.key);
                }
              };
              keyCursorRequest.onerror = function () {
                ____handleBlobTransaction(keyCursorRequest.error);
              };
            } catch (_errorBlobTransaction) {
              ____handleBlobTransaction(_errorBlobTransaction);
            }
          },
        );
      })
      .catch(____handleBlobTransaction);
  });
  handlePromiseWithCallback(
    promiseForBlobTransaction,
    __handleIndexedDBTransaction,
  );
  return promiseForBlobTransaction;
}
function handleBlobCursorTransaction(handleBlobTransactionWithCursor) {
  var _______context = this;
  var handleBlobCursorTransactionWithPromise = new PromiseImplementation(
    function (indexedDBTransactionHandle, ___handleIndexedDBTransaction) {
      _______context
        .ready()
        .then(function () {
          performBlobVersionCheck(
            _______context._dbInfo,
            callbackHandler,
            function (processBlobCursor, handleCursorSuccess) {
              if (processBlobCursor) {
                return ___handleIndexedDBTransaction(processBlobCursor);
              }
              try {
                var cursorStore = handleCursorSuccess.objectStore(
                  _______context._dbInfo.storeName,
                );
                var _keyCursorRequest = cursorStore.openKeyCursor();
                var keysArray = [];
                _keyCursorRequest.onsuccess = function () {
                  var currentKeyCursor = _keyCursorRequest.result;
                  if (!currentKeyCursor) {
                    indexedDBTransactionHandle(keysArray);
                    return;
                  }
                  keysArray.push(currentKeyCursor.key);
                  currentKeyCursor.continue();
                };
                _keyCursorRequest.onerror = function () {
                  ___handleIndexedDBTransaction(_keyCursorRequest.error);
                };
              } catch (__transactionError) {
                ___handleIndexedDBTransaction(__transactionError);
              }
            },
          );
        })
        .catch(___handleIndexedDBTransaction);
    },
  );
  handlePromiseWithCallback(
    handleBlobCursorTransactionWithPromise,
    handleBlobTransactionWithCursor,
  );
  return handleBlobCursorTransactionWithPromise;
}
function handleBlobVersionOperationWithVersionCheck(
  handleBlobVersionAndOperation,
  performBlobOperationWithVersionCheck,
) {
  performBlobOperationWithVersionCheck = getCallbackFunction.apply(
    this,
    arguments,
  );
  var blobVersionConfig = this.config();
  handleBlobVersionAndOperation =
    (typeof handleBlobVersionAndOperation !== "function" &&
      handleBlobVersionAndOperation) ||
    {};
  if (!handleBlobVersionAndOperation.name) {
    handleBlobVersionAndOperation.name =
      handleBlobVersionAndOperation.name || blobVersionConfig.name;
    handleBlobVersionAndOperation.storeName =
      handleBlobVersionAndOperation.storeName || blobVersionConfig.storeName;
  }
  var contextForBlobOperation = this;
  var errorResponsePromise;
  if (!handleBlobVersionAndOperation.name) {
    errorResponsePromise = PromiseImplementation.reject("Invalid arguments");
  } else {
    var isDatabaseAvailable =
      handleBlobVersionAndOperation.name === blobVersionConfig.name &&
      contextForBlobOperation._dbInfo.db;
    var getDatabaseOrHandleError = isDatabaseAvailable
      ? PromiseImplementation.resolve(contextForBlobOperation._dbInfo.db)
      : executeDatabaseOperation(handleBlobVersionAndOperation).then(
          function (databaseInfo) {
            var __blobHandler =
              handleBlobPromise[handleBlobVersionAndOperation.name];
            var __forageArray = __blobHandler.forages;
            __blobHandler.db = databaseInfo;
            for (
              var ____index = 0;
              ____index < __forageArray.length;
              ____index++
            ) {
              __forageArray[____index]._dbInfo.db = databaseInfo;
            }
            return databaseInfo;
          },
        );
    if (!handleBlobVersionAndOperation.storeName) {
      errorResponsePromise = getDatabaseOrHandleError.then(
        function (databaseErrorHandling) {
          handleBlobErrorUpdate(handleBlobVersionAndOperation);
          var handleBlobDatabaseDeletion =
            handleBlobPromise[handleBlobVersionAndOperation.name];
          var forageBlobs = handleBlobDatabaseDeletion.forages;
          databaseErrorHandling.close();
          for (
            var forageBlobIndex = 0;
            forageBlobIndex < forageBlobs.length;
            forageBlobIndex++
          ) {
            var forageBlobInstance = forageBlobs[forageBlobIndex];
            forageBlobInstance._dbInfo.db = null;
          }
          var _deleteDatabasePromise = new PromiseImplementation(function (
            transactionPromise,
            _____handleBlobTransaction,
          ) {
            var deleteDatabaseRequest = indexedDBInstance.deleteDatabase(
              handleBlobVersionAndOperation.name,
            );
            deleteDatabaseRequest.onerror = function () {
              var databaseTransactionResult = deleteDatabaseRequest.result;
              if (databaseTransactionResult) {
                databaseTransactionResult.close();
              }
              _____handleBlobTransaction(deleteDatabaseRequest.error);
            };
            deleteDatabaseRequest.onblocked = function () {
              console.warn(
                'dropInstance blocked for database "' +
                  handleBlobVersionAndOperation.name +
                  '" until all open connections are closed',
              );
            };
            deleteDatabaseRequest.onsuccess = function () {
              var databaseRequestResult = deleteDatabaseRequest.result;
              if (databaseRequestResult) {
                databaseRequestResult.close();
              }
              transactionPromise(databaseRequestResult);
            };
          });
          return _deleteDatabasePromise
            .then(function (errorOrTransaction) {
              handleBlobDatabaseDeletion.db = errorOrTransaction;
              for (
                var _forageBlobIndex = 0;
                _forageBlobIndex < forageBlobs.length;
                _forageBlobIndex++
              ) {
                var selectedForageBlob = forageBlobs[_forageBlobIndex];
                resolveDeferredOperation(selectedForageBlob._dbInfo);
              }
            })
            .catch(function (databaseError) {
              (
                _handleDeferredOperations(
                  handleBlobVersionAndOperation,
                  databaseError,
                ) || PromiseImplementation.resolve()
              ).catch(function () {});
              throw databaseError;
            });
        },
      );
    } else {
      errorResponsePromise = getDatabaseOrHandleError.then(
        function (_handleDatabaseError) {
          if (
            !_handleDatabaseError.objectStoreNames.contains(
              handleBlobVersionAndOperation.storeName,
            )
          ) {
            return;
          }
          var nextDatabaseVersion = _handleDatabaseError.version + 1;
          handleBlobErrorUpdate(handleBlobVersionAndOperation);
          var blobPromiseHandle =
            handleBlobPromise[handleBlobVersionAndOperation.name];
          var blobForageHandles = blobPromiseHandle.forages;
          _handleDatabaseError.close();
          for (
            var ___index = 0;
            ___index < blobForageHandles.length;
            ___index++
          ) {
            var currentBlobHandle = blobForageHandles[___index];
            currentBlobHandle._dbInfo.db = null;
            currentBlobHandle._dbInfo.version = nextDatabaseVersion;
          }
          var databaseInitializationPromiseHandle = new PromiseImplementation(
            function (
              databaseInitializationTransaction,
              databaseEntryToDelete,
            ) {
              var _openDatabaseRequest = indexedDBInstance.open(
                handleBlobVersionAndOperation.name,
                nextDatabaseVersion,
              );
              _openDatabaseRequest.onerror = function (
                databaseInitializationPromise,
              ) {
                var ___databaseConnection = _openDatabaseRequest.result;
                ___databaseConnection.close();
                databaseEntryToDelete(databaseInitializationPromise);
              };
              _openDatabaseRequest.onupgradeneeded = function () {
                var ___databaseRequest = _openDatabaseRequest.result;
                ___databaseRequest.deleteObjectStore(
                  handleBlobVersionAndOperation.storeName,
                );
              };
              _openDatabaseRequest.onsuccess = function () {
                var ____databaseRequest = _openDatabaseRequest.result;
                ____databaseRequest.close();
                databaseInitializationTransaction(____databaseRequest);
              };
            },
          );
          return databaseInitializationPromiseHandle
            .then(function (databaseTransaction) {
              blobPromiseHandle.db = databaseTransaction;
              for (
                var blobHandleIndex = 0;
                blobHandleIndex < blobForageHandles.length;
                blobHandleIndex++
              ) {
                var blobForageHandle = blobForageHandles[blobHandleIndex];
                blobForageHandle._dbInfo.db = databaseTransaction;
                resolveDeferredOperation(blobForageHandle._dbInfo);
              }
            })
            .catch(function (handleError) {
              (
                _handleDeferredOperations(
                  handleBlobVersionAndOperation,
                  handleError,
                ) || PromiseImplementation.resolve()
              ).catch(function () {});
              throw handleError;
            });
        },
      );
    }
  }
  handlePromiseWithCallback(
    errorResponsePromise,
    performBlobOperationWithVersionCheck,
  );
  return errorResponsePromise;
}
var handleInitializationError = {
  _driver: "asyncStorage",
  _initStorage: initializeDatabaseConnection,
  _support: isIndexedDBSupported(),
  iterate: processIndexedDBTransaction,
  getItem: _handleDatabaseOpenRequest,
  setItem: performBlobVersionCheckAndOperation,
  removeItem: initializeDatabaseAndHandleDeletion,
  clear: initializeDatabaseAndHandleUpdates,
  length: fetchBlobCount,
  key: _________handleBlobTransaction,
  keys: handleBlobCursorTransaction,
  dropInstance: handleBlobVersionOperationWithVersionCheck,
};
function isDatabaseSupported() {
  return typeof openDatabase === "function";
}
var initializeDatabaseUpdates =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var clearDatabasePromise = "~~local_forage_type~";
var initializeDatabaseOperations = /^~~local_forage_type~([^~]+)~/;
var handleDatabaseOpenAndClear = "__lfsc__:";
var databaseConnectionManager = handleDatabaseOpenAndClear.length;
var databaseClearRequest = "arbf";
var clearDatabaseAndHandleCallback = "blob";
var handleDatabaseRequest = "si08";
var _handleDatabaseResponse = "ui08";
var __handleDatabaseResponse = "uic8";
var ___handleDatabaseResponse = "si16";
var clearObjectStoreAndHandleResponses = "si32";
var handleBlobDataRequest = "ur16";
var handleDatabaseClearing = "ui32";
var ____handleDatabaseResponse = "fl32";
var handleDatabaseDeletion = "fl64";
var clearBlobDataAndHandleResponse =
  databaseConnectionManager + databaseClearRequest.length;
var errorHandler = Object.prototype.toString;
function decodeBase64ToArrayBuffer(handleBlobData) {
  var base64OutputLength = handleBlobData.length * 0.75;
  var inputStringLength = handleBlobData.length;
  var ___currentIndex;
  var currentByteIndex = 0;
  var ___base64CharIndex;
  var base64Char1Index;
  var base64Char2Index;
  var base64Char3Index;
  if (handleBlobData[handleBlobData.length - 1] === "=") {
    base64OutputLength--;
    if (handleBlobData[handleBlobData.length - 2] === "=") {
      base64OutputLength--;
    }
  }
  var decodedArrayBuffer = new ArrayBuffer(base64OutputLength);
  var decodedBytesArray = new Uint8Array(decodedArrayBuffer);
  for (
    ___currentIndex = 0;
    ___currentIndex < inputStringLength;
    ___currentIndex += 4
  ) {
    ___base64CharIndex = initializeDatabaseUpdates.indexOf(
      handleBlobData[___currentIndex],
    );
    base64Char1Index = initializeDatabaseUpdates.indexOf(
      handleBlobData[___currentIndex + 1],
    );
    base64Char2Index = initializeDatabaseUpdates.indexOf(
      handleBlobData[___currentIndex + 2],
    );
    base64Char3Index = initializeDatabaseUpdates.indexOf(
      handleBlobData[___currentIndex + 3],
    );
    decodedBytesArray[currentByteIndex++] =
      (___base64CharIndex << 2) | (base64Char1Index >> 4);
    decodedBytesArray[currentByteIndex++] =
      ((base64Char1Index & 15) << 4) | (base64Char2Index >> 2);
    decodedBytesArray[currentByteIndex++] =
      ((base64Char2Index & 3) << 6) | (base64Char3Index & 63);
  }
  return decodedArrayBuffer;
}
function convertBlobDataToBase64(handleBlobDataPromise) {
  var uint8ArrayFromBlob = new Uint8Array(handleBlobDataPromise);
  var base64String = "";
  var _byteIndex;
  for (
    _byteIndex = 0;
    _byteIndex < uint8ArrayFromBlob.length;
    _byteIndex += 3
  ) {
    base64String +=
      initializeDatabaseUpdates[uint8ArrayFromBlob[_byteIndex] >> 2];
    base64String +=
      initializeDatabaseUpdates[
        ((uint8ArrayFromBlob[_byteIndex] & 3) << 4) |
          (uint8ArrayFromBlob[_byteIndex + 1] >> 4)
      ];
    base64String +=
      initializeDatabaseUpdates[
        ((uint8ArrayFromBlob[_byteIndex + 1] & 15) << 2) |
          (uint8ArrayFromBlob[_byteIndex + 2] >> 6)
      ];
    base64String +=
      initializeDatabaseUpdates[uint8ArrayFromBlob[_byteIndex + 2] & 63];
  }
  if (uint8ArrayFromBlob.length % 3 === 2) {
    base64String = base64String.substring(0, base64String.length - 1) + "=";
  } else if (uint8ArrayFromBlob.length % 3 === 1) {
    base64String = base64String.substring(0, base64String.length - 2) + "==";
  }
  return base64String;
}
function __handleDatabaseRequest(
  onDatabaseRequestSuccess,
  _handleDatabaseRequest,
) {
  var bufferType = "";
  if (onDatabaseRequestSuccess) {
    bufferType = errorHandler.call(onDatabaseRequestSuccess);
  }
  if (
    onDatabaseRequestSuccess &&
    (bufferType === "[object ArrayBuffer]" ||
      (onDatabaseRequestSuccess.buffer &&
        errorHandler.call(onDatabaseRequestSuccess.buffer) ===
          "[object ArrayBuffer]"))
  ) {
    var databaseBuffer;
    var processDatabaseOperation = handleDatabaseOpenAndClear;
    if (onDatabaseRequestSuccess instanceof ArrayBuffer) {
      databaseBuffer = onDatabaseRequestSuccess;
      processDatabaseOperation += databaseClearRequest;
    } else {
      databaseBuffer = onDatabaseRequestSuccess.buffer;
      if (bufferType === "[object Int8Array]") {
        processDatabaseOperation += handleDatabaseRequest;
      } else if (bufferType === "[object Uint8Array]") {
        processDatabaseOperation += _handleDatabaseResponse;
      } else if (bufferType === "[object Uint8ClampedArray]") {
        processDatabaseOperation += __handleDatabaseResponse;
      } else if (bufferType === "[object Int16Array]") {
        processDatabaseOperation += ___handleDatabaseResponse;
      } else if (bufferType === "[object Uint16Array]") {
        processDatabaseOperation += handleBlobDataRequest;
      } else if (bufferType === "[object Int32Array]") {
        processDatabaseOperation += clearObjectStoreAndHandleResponses;
      } else if (bufferType === "[object Uint32Array]") {
        processDatabaseOperation += handleDatabaseClearing;
      } else if (bufferType === "[object Float32Array]") {
        processDatabaseOperation += ____handleDatabaseResponse;
      } else if (bufferType === "[object Float64Array]") {
        processDatabaseOperation += handleDatabaseDeletion;
      } else {
        _handleDatabaseRequest(new Error("Failed to get type for BinaryArray"));
      }
    }
    _handleDatabaseRequest(
      processDatabaseOperation + convertBlobDataToBase64(databaseBuffer),
    );
  } else if (bufferType === "[object Blob]") {
    var _fileReader = new FileReader();
    _fileReader.onload = function () {
      var databaseInitializationResult =
        clearDatabasePromise +
        onDatabaseRequestSuccess.type +
        "~" +
        convertBlobDataToBase64(this.result);
      _handleDatabaseRequest(
        handleDatabaseOpenAndClear +
          clearDatabaseAndHandleCallback +
          databaseInitializationResult,
      );
    };
    _fileReader.readAsArrayBuffer(onDatabaseRequestSuccess);
  } else {
    try {
      _handleDatabaseRequest(JSON.stringify(onDatabaseRequestSuccess));
    } catch (databaseRequestError) {
      console.error(
        "Couldn't convert value into a JSON string: ",
        onDatabaseRequestSuccess,
      );
      _handleDatabaseRequest(null, databaseRequestError);
    }
  }
}
function __________handleBlobTransaction(______handleBlobTransaction) {
  if (
    ______handleBlobTransaction.substring(0, databaseConnectionManager) !==
    handleDatabaseOpenAndClear
  ) {
    return JSON.parse(______handleBlobTransaction);
  }
  var processBlobTransaction = ______handleBlobTransaction.substring(
    clearBlobDataAndHandleResponse,
  );
  var extractBlobTransactionType = ______handleBlobTransaction.substring(
    databaseConnectionManager,
    clearBlobDataAndHandleResponse,
  );
  var blobTransactionType;
  if (
    extractBlobTransactionType === clearDatabaseAndHandleCallback &&
    initializeDatabaseOperations.test(processBlobTransaction)
  ) {
    var matchedBlobTransaction = processBlobTransaction.match(
      initializeDatabaseOperations,
    );
    blobTransactionType = matchedBlobTransaction[1];
    processBlobTransaction = processBlobTransaction.substring(
      matchedBlobTransaction[0].length,
    );
  }
  var parseBlobTransaction = decodeBase64ToArrayBuffer(processBlobTransaction);
  switch (extractBlobTransactionType) {
    case databaseClearRequest:
      return parseBlobTransaction;
    case clearDatabaseAndHandleCallback:
      return createBlobFromError([parseBlobTransaction], {
        type: blobTransactionType,
      });
    case handleDatabaseRequest:
      return new Int8Array(parseBlobTransaction);
    case _handleDatabaseResponse:
      return new Uint8Array(parseBlobTransaction);
    case __handleDatabaseResponse:
      return new Uint8ClampedArray(parseBlobTransaction);
    case ___handleDatabaseResponse:
      return new Int16Array(parseBlobTransaction);
    case handleBlobDataRequest:
      return new Uint16Array(parseBlobTransaction);
    case clearObjectStoreAndHandleResponses:
      return new Int32Array(parseBlobTransaction);
    case handleDatabaseClearing:
      return new Uint32Array(parseBlobTransaction);
    case ____handleDatabaseResponse:
      return new Float32Array(parseBlobTransaction);
    case handleDatabaseDeletion:
      return new Float64Array(parseBlobTransaction);
    default:
      throw new Error("Unkown type: " + extractBlobTransactionType);
  }
}
var indexedDBKeyCursorHandler = {
  serialize: __handleDatabaseRequest,
  deserialize: __________handleBlobTransaction,
  stringToBuffer: decodeBase64ToArrayBuffer,
  bufferToString: convertBlobDataToBase64,
};
function createBlobStore(
  _handleBlobVersionAndOperation,
  __handleBlobVersionAndOperation,
  databaseConfiguration,
  handleBlobVersionOperation,
) {
  _handleBlobVersionAndOperation.executeSql(
    "CREATE TABLE IF NOT EXISTS " +
      __handleBlobVersionAndOperation.storeName +
      " (id INTEGER PRIMARY KEY, key unique, value)",
    [],
    databaseConfiguration,
    handleBlobVersionOperation,
  );
}
function _______handleBlobOperation(___handleBlobVersionAndOperation) {
  var __________context = this;
  var databaseBlobInfo = {
    db: null,
  };
  if (___handleBlobVersionAndOperation) {
    for (var _blobKey in ___handleBlobVersionAndOperation) {
      databaseBlobInfo[_blobKey] =
        typeof ___handleBlobVersionAndOperation[_blobKey] !== "string"
          ? ___handleBlobVersionAndOperation[_blobKey].toString()
          : ___handleBlobVersionAndOperation[_blobKey];
    }
  }
  var _initializeDatabasePromise = new PromiseImplementation(function (
    isSameDatabaseName,
    shouldResolveDatabase,
  ) {
    try {
      databaseBlobInfo.db = openDatabase(
        databaseBlobInfo.name,
        String(databaseBlobInfo.version),
        databaseBlobInfo.description,
        databaseBlobInfo.size,
      );
    } catch (__errorHandler) {
      return shouldResolveDatabase(__errorHandler);
    }
    databaseBlobInfo.db.transaction(function (
      ____handleBlobVersionAndOperation,
    ) {
      createBlobStore(
        ____handleBlobVersionAndOperation,
        databaseBlobInfo,
        function () {
          __________context._dbInfo = databaseBlobInfo;
          isSameDatabaseName();
        },
        function (handleBlobDatabase, forageInstances) {
          shouldResolveDatabase(forageInstances);
        },
      );
    }, shouldResolveDatabase);
  });
  databaseBlobInfo.serializer = indexedDBKeyCursorHandler;
  return _initializeDatabasePromise;
}
function handleBlobOperationWithDatabase(
  _____handleBlobVersionAndOperation,
  handleDatabaseOperation,
  defaultBlobHandler,
  context,
  databasePromise,
  isMatchingDatabaseName,
) {
  _____handleBlobVersionAndOperation.executeSql(
    defaultBlobHandler,
    context,
    databasePromise,
    function (databaseInfoPromise, __handleBlobOperation) {
      if (__handleBlobOperation.code === __handleBlobOperation.SYNTAX_ERR) {
        databaseInfoPromise.executeSql(
          "SELECT name FROM sqlite_master WHERE type='table' AND name = ?",
          [handleDatabaseOperation.storeName],
          function (handleBlobInstance, _forageInstances) {
            if (!_forageInstances.rows.length) {
              createBlobStore(
                handleBlobInstance,
                handleDatabaseOperation,
                function () {
                  handleBlobInstance.executeSql(
                    defaultBlobHandler,
                    context,
                    databasePromise,
                    isMatchingDatabaseName,
                  );
                },
                isMatchingDatabaseName,
              );
            } else {
              isMatchingDatabaseName(handleBlobInstance, __handleBlobOperation);
            }
          },
          isMatchingDatabaseName,
        );
      } else {
        isMatchingDatabaseName(databaseInfoPromise, __handleBlobOperation);
      }
    },
    isMatchingDatabaseName,
  );
}
function __________handleDatabaseTransaction(
  databaseTransactionPromise,
  databaseErrorHandlingPromise,
) {
  var handleDatabaseTransactionContext = this;
  databaseTransactionPromise = convertToString(databaseTransactionPromise);
  var handleDatabaseTransactionPromise = new PromiseImplementation(function (
    _databaseErrorHandlingPromise,
    isDatabaseInitializationSuccessful,
  ) {
    handleDatabaseTransactionContext
      .ready()
      .then(function () {
        var _______databaseInfo = handleDatabaseTransactionContext._dbInfo;
        _______databaseInfo.db.transaction(function (___handleBlobOperation) {
          handleBlobOperationWithDatabase(
            ___handleBlobOperation,
            _______databaseInfo,
            "SELECT * FROM " +
              _______databaseInfo.storeName +
              " WHERE key = ? LIMIT 1",
            [databaseTransactionPromise],
            function (___handleBlobPromise, foragesArray) {
              var firstForageItemValue = foragesArray.rows.length
                ? foragesArray.rows.item(0).value
                : null;
              if (firstForageItemValue) {
                firstForageItemValue =
                  _______databaseInfo.serializer.deserialize(
                    firstForageItemValue,
                  );
              }
              _databaseErrorHandlingPromise(firstForageItemValue);
            },
            function (blobOperationPromise, forageArray) {
              isDatabaseInitializationSuccessful(forageArray);
            },
          );
        });
      })
      .catch(isDatabaseInitializationSuccessful);
  });
  handlePromiseWithCallback(
    handleDatabaseTransactionPromise,
    databaseErrorHandlingPromise,
  );
  return handleDatabaseTransactionPromise;
}
function deleteDatabaseEntries(
  promiseToDeleteDatabase,
  deleteDatabaseTransactionHandler,
) {
  var _databaseHandler = this;
  var databaseDeletionPromiseHolder = new PromiseImplementation(function (
    deleteDatabasePromise,
    databaseDeletionPromise,
  ) {
    _databaseHandler
      .ready()
      .then(function () {
        var ____databaseInfo = _databaseHandler._dbInfo;
        ____databaseInfo.db.transaction(function (_databaseDeletionPromise) {
          handleBlobOperationWithDatabase(
            _databaseDeletionPromise,
            ____databaseInfo,
            "SELECT * FROM " + ____databaseInfo.storeName,
            [],
            function (databaseHandler, databaseHandleList) {
              var databaseRows = databaseHandleList.rows;
              var numberOfDatabaseRows = databaseRows.length;
              for (
                var rowIndex = 0;
                rowIndex < numberOfDatabaseRows;
                rowIndex++
              ) {
                var databaseRow = databaseRows.item(rowIndex);
                var serializedDatabaseValue = databaseRow.value;
                if (serializedDatabaseValue) {
                  serializedDatabaseValue =
                    ____databaseInfo.serializer.deserialize(
                      serializedDatabaseValue,
                    );
                }
                serializedDatabaseValue = promiseToDeleteDatabase(
                  serializedDatabaseValue,
                  databaseRow.key,
                  rowIndex + 1,
                );
                if (serializedDatabaseValue !== undefined) {
                  deleteDatabasePromise(serializedDatabaseValue);
                  return;
                }
              }
              deleteDatabasePromise();
            },
            function (databaseConnection, activeConnections) {
              databaseDeletionPromise(activeConnections);
            },
          );
        });
      })
      .catch(databaseDeletionPromise);
  });
  handlePromiseWithCallback(
    databaseDeletionPromiseHolder,
    deleteDatabaseTransactionHandler,
  );
  return databaseDeletionPromiseHolder;
}
function executeTransaction(
  transactionCompletionHandler,
  handleDatabaseTransaction,
  _handleDatabaseTransaction,
  _databaseTransaction,
) {
  var transactionContext = this;
  transactionCompletionHandler = convertToString(transactionCompletionHandler);
  var ___transactionPromise = new PromiseImplementation(function (
    handleTransactionSuccess,
    handleDatabaseAccess,
  ) {
    transactionContext
      .ready()
      .then(function () {
        if (handleDatabaseTransaction === undefined) {
          handleDatabaseTransaction = null;
        }
        var ____databaseTransactionHandler = handleDatabaseTransaction;
        var ___databaseInfo = transactionContext._dbInfo;
        ___databaseInfo.serializer.serialize(
          handleDatabaseTransaction,
          function (_forageArray, forageCount) {
            if (forageCount) {
              handleDatabaseAccess(forageCount);
            } else {
              ___databaseInfo.db.transaction(
                function (forageEntry) {
                  handleBlobOperationWithDatabase(
                    forageEntry,
                    ___databaseInfo,
                    "INSERT OR REPLACE INTO " +
                      ___databaseInfo.storeName +
                      " (key, value) VALUES (?, ?)",
                    [transactionCompletionHandler, _forageArray],
                    function () {
                      handleTransactionSuccess(____databaseTransactionHandler);
                    },
                    function (
                      openDatabaseUpgradePromise,
                      __handleDatabaseError,
                    ) {
                      handleDatabaseAccess(__handleDatabaseError);
                    },
                  );
                },
                function (_forageEntry) {
                  if (_forageEntry.code === _forageEntry.QUOTA_ERR) {
                    if (_databaseTransaction > 0) {
                      handleTransactionSuccess(
                        executeTransaction.apply(transactionContext, [
                          transactionCompletionHandler,
                          ____databaseTransactionHandler,
                          _handleDatabaseTransaction,
                          _databaseTransaction - 1,
                        ]),
                      );
                      return;
                    }
                    handleDatabaseAccess(_forageEntry);
                  }
                },
              );
            }
          },
        );
      })
      .catch(handleDatabaseAccess);
  });
  handlePromiseWithCallback(___transactionPromise, _handleDatabaseTransaction);
  return ___transactionPromise;
}
function executeDatabaseInitialization(
  _databaseInitializationPromise,
  _databaseInitializationTransaction,
  initializeDatabaseWithBlobVersion,
) {
  return executeTransaction.apply(this, [
    _databaseInitializationPromise,
    _databaseInitializationTransaction,
    initializeDatabaseWithBlobVersion,
    1,
  ]);
}
function performBlobDeletion(
  ____handleBlobOperation,
  handleBlobDatabaseInitialization,
) {
  var ____________context = this;
  ____handleBlobOperation = convertToString(____handleBlobOperation);
  var __initializeDatabasePromise = new PromiseImplementation(function (
    initializeDatabaseTransaction,
    _initializeDatabaseTransaction,
  ) {
    ____________context
      .ready()
      .then(function () {
        var __________databaseInfo = ____________context._dbInfo;
        __________databaseInfo.db.transaction(function (openDatabasePromise) {
          handleBlobOperationWithDatabase(
            openDatabasePromise,
            __________databaseInfo,
            "DELETE FROM " +
              __________databaseInfo.storeName +
              " WHERE key = ?",
            [____handleBlobOperation],
            function () {
              initializeDatabaseTransaction();
            },
            function (databaseVersion, databaseTransactionAssignment) {
              _initializeDatabaseTransaction(databaseTransactionAssignment);
            },
          );
        });
      })
      .catch(_initializeDatabaseTransaction);
  });
  handlePromiseWithCallback(
    __initializeDatabasePromise,
    handleBlobDatabaseInitialization,
  );
  return __initializeDatabasePromise;
}
function ___initializeDatabase(databaseTransactionHandler) {
  var ____databaseContext = this;
  var ____databaseInitializationPromise = new PromiseImplementation(function (
    _databaseInitializationHandler,
    handleDatabaseUpgrade,
  ) {
    ____databaseContext
      .ready()
      .then(function () {
        var ___________databaseInfo = ____databaseContext._dbInfo;
        ___________databaseInfo.db.transaction(
          function (handleDatabaseInitialization) {
            handleBlobOperationWithDatabase(
              handleDatabaseInitialization,
              ___________databaseInfo,
              "DELETE FROM " + ___________databaseInfo.storeName,
              [],
              function () {
                _databaseInitializationHandler();
              },
              function (onUpgradeNeededHandler, __handleDatabaseTransaction) {
                handleDatabaseUpgrade(__handleDatabaseTransaction);
              },
            );
          },
        );
      })
      .catch(handleDatabaseUpgrade);
  });
  handlePromiseWithCallback(
    ____databaseInitializationPromise,
    databaseTransactionHandler,
  );
  return ____databaseInitializationPromise;
}
function ___________handleDatabaseTransaction(___handleDatabaseTransaction) {
  var ____________handleDatabaseTransaction = this;
  var executeDatabaseTransaction = new PromiseImplementation(function (
    __databaseRequest,
    initializeDatabase,
  ) {
    ____________handleDatabaseTransaction
      .ready()
      .then(function () {
        var _________databaseInfo =
          ____________handleDatabaseTransaction._dbInfo;
        _________databaseInfo.db.transaction(
          function (__initializeDatabaseTransaction) {
            handleBlobOperationWithDatabase(
              __initializeDatabaseTransaction,
              _________databaseInfo,
              "SELECT COUNT(key) as c FROM " + _________databaseInfo.storeName,
              [],
              function (
                ____handleDatabaseTransaction,
                _____handleDatabaseTransaction,
              ) {
                var databaseRowContent =
                  _____handleDatabaseTransaction.rows.item(0).c;
                __databaseRequest(databaseRowContent);
              },
              function (
                ______handleDatabaseTransaction,
                _databaseTransactionHandler,
              ) {
                initializeDatabase(_databaseTransactionHandler);
              },
            );
          },
        );
      })
      .catch(initializeDatabase);
  });
  handlePromiseWithCallback(
    executeDatabaseTransaction,
    ___handleDatabaseTransaction,
  );
  return executeDatabaseTransaction;
}
function initializeDatabaseWithErrorHandling(
  handleDatabaseInitializationError,
  _handleDatabaseInitializationError,
) {
  var _dbContext = this;
  var ___databaseInitializationPromise = new PromiseImplementation(function (
    performBlobOperation,
    ___handleDatabaseError,
  ) {
    _dbContext
      .ready()
      .then(function () {
        var dbInfo = _dbContext._dbInfo;
        dbInfo.db.transaction(function (handleErrorResponse) {
          handleBlobOperationWithDatabase(
            handleErrorResponse,
            dbInfo,
            "SELECT key FROM " + dbInfo.storeName + " WHERE id = ? LIMIT 1",
            [handleDatabaseInitializationError + 1],
            function (handleBlobOperationWithVersionCheck, databaseOperations) {
              var firstRowKey = databaseOperations.rows.length
                ? databaseOperations.rows.item(0).key
                : null;
              performBlobOperation(firstRowKey);
            },
            function (handleDatabaseOperations, _handleDatabaseOperations) {
              ___handleDatabaseError(_handleDatabaseOperations);
            },
          );
        });
      })
      .catch(___handleDatabaseError);
  });
  handlePromiseWithCallback(
    ___databaseInitializationPromise,
    _handleDatabaseInitializationError,
  );
  return ___databaseInitializationPromise;
}
function fetchDatabaseKeys(dbConnectionInfo) {
  var self = this;
  var fetchDatabaseKeysPromise = new PromiseImplementation(function (
    _handleBlobData,
    isOpenDatabaseSupported,
  ) {
    self
      .ready()
      .then(function () {
        var ________databaseInfo = self._dbInfo;
        ________databaseInfo.db.transaction(function (processBlobData) {
          handleBlobOperationWithDatabase(
            processBlobData,
            ________databaseInfo,
            "SELECT key FROM " + ________databaseInfo.storeName,
            [],
            function (_processBlobData, handleBlobDataProcessing) {
              var processedKeys = [];
              for (
                var currentRowIndex = 0;
                currentRowIndex < handleBlobDataProcessing.rows.length;
                currentRowIndex++
              ) {
                processedKeys.push(
                  handleBlobDataProcessing.rows.item(currentRowIndex).key,
                );
              }
              _handleBlobData(processedKeys);
            },
            function (calculateBlobDataSize, __processBlobData) {
              isOpenDatabaseSupported(__processBlobData);
            },
          );
        });
      })
      .catch(isOpenDatabaseSupported);
  });
  handlePromiseWithCallback(fetchDatabaseKeysPromise, dbConnectionInfo);
  return fetchDatabaseKeysPromise;
}
function ___processBlobData(_handleBlobDataProcessing) {
  return new PromiseImplementation(function (
    calculatedBlobDataLength,
    blobDataLength,
  ) {
    _handleBlobDataProcessing.transaction(
      function (blobDataIndex) {
        blobDataIndex.executeSql(
          "SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'",
          [],
          function (decodedBytesCount, base64CharIndex) {
            var storeNamesArray = [];
            for (
              var _currentRowIndex = 0;
              _currentRowIndex < base64CharIndex.rows.length;
              _currentRowIndex++
            ) {
              storeNamesArray.push(
                base64CharIndex.rows.item(_currentRowIndex).name,
              );
            }
            calculatedBlobDataLength({
              db: _handleBlobDataProcessing,
              storeNames: storeNamesArray,
            });
          },
          function (byteIndex, _base64CharIndex) {
            blobDataLength(_base64CharIndex);
          },
        );
      },
      function (__base64CharIndex) {
        blobDataLength(__base64CharIndex);
      },
    );
  });
}
function initializeBlobDataProcessing(_calculateBlobDataSize, bufferLength) {
  bufferLength = getCallbackFunction.apply(this, arguments);
  var getConfig = this.config();
  _calculateBlobDataSize =
    (typeof _calculateBlobDataSize !== "function" && _calculateBlobDataSize) ||
    {};
  if (!_calculateBlobDataSize.name) {
    _calculateBlobDataSize.name = _calculateBlobDataSize.name || getConfig.name;
    _calculateBlobDataSize.storeName =
      _calculateBlobDataSize.storeName || getConfig.storeName;
  }
  var __context = this;
  var promiseResult;
  if (!_calculateBlobDataSize.name) {
    promiseResult = PromiseImplementation.reject("Invalid arguments");
  } else {
    promiseResult = new PromiseImplementation(function (databaseIndex) {
      var databaseInstance;
      if (_calculateBlobDataSize.name === getConfig.name) {
        databaseInstance = __context._dbInfo.db;
      } else {
        databaseInstance = openDatabase(_calculateBlobDataSize.name, "", "", 0);
      }
      if (!_calculateBlobDataSize.storeName) {
        databaseIndex(___processBlobData(databaseInstance));
      } else {
        databaseIndex({
          db: databaseInstance,
          storeNames: [_calculateBlobDataSize.storeName],
        });
      }
    }).then(function (bitwiseOperationsValue) {
      return new PromiseImplementation(function (
        calculateMaskedAndShiftResult,
        blobDataBits,
      ) {
        bitwiseOperationsValue.db.transaction(
          function (base64LookupTable) {
            function convertBlobToBase64Async(convertBlobToBase64) {
              return new PromiseImplementation(function (
                base64Encode,
                blobDataToBase64,
              ) {
                base64LookupTable.executeSql(
                  "DROP TABLE IF EXISTS " + convertBlobToBase64,
                  [],
                  function () {
                    base64Encode();
                  },
                  function (
                    processDatabaseResponse,
                    initializeDatabaseUpdatesArray,
                  ) {
                    blobDataToBase64(initializeDatabaseUpdatesArray);
                  },
                );
              });
            }
            var promiseArrayForDatabaseDrop = [];
            var currentStoreIndex = 0;
            for (
              var numberOfStores = bitwiseOperationsValue.storeNames.length;
              currentStoreIndex < numberOfStores;
              currentStoreIndex++
            ) {
              promiseArrayForDatabaseDrop.push(
                convertBlobToBase64Async(
                  bitwiseOperationsValue.storeNames[currentStoreIndex],
                ),
              );
            }
            PromiseImplementation.all(promiseArrayForDatabaseDrop)
              .then(function () {
                calculateMaskedAndShiftResult();
              })
              .catch(function (handleArrayBufferData) {
                blobDataBits(handleArrayBufferData);
              });
          },
          function (_____handleDatabaseResponse) {
            blobDataBits(_____handleDatabaseResponse);
          },
        );
      });
    });
  }
  handlePromiseWithCallback(promiseResult, bufferLength);
  return promiseResult;
}
var databaseResponseHandler = {
  _driver: "webSQLStorage",
  _initStorage: _______handleBlobOperation,
  _support: isDatabaseSupported(),
  iterate: deleteDatabaseEntries,
  getItem: __________handleDatabaseTransaction,
  setItem: executeDatabaseInitialization,
  removeItem: performBlobDeletion,
  clear: ___initializeDatabase,
  length: ___________handleDatabaseTransaction,
  key: initializeDatabaseWithErrorHandling,
  keys: fetchDatabaseKeys,
  dropInstance: initializeBlobDataProcessing,
};
function isLocalStorageAvailable() {
  try {
    return (
      typeof localStorage !== "undefined" &&
      "setItem" in localStorage &&
      !!localStorage.setItem
    );
  } catch (______error) {
    return false;
  }
}
function constructStorePath(arrayBufferHandler, setDatabaseRequestHandler) {
  var storePath = arrayBufferHandler.name + "/";
  if (arrayBufferHandler.storeName !== setDatabaseRequestHandler.storeName) {
    storePath += arrayBufferHandler.storeName + "/";
  }
  return storePath;
}
function isLocalStorageSupported() {
  var localStorageSupportTestKey = "_localforage_support_test";
  try {
    localStorage.setItem(localStorageSupportTestKey, true);
    localStorage.removeItem(localStorageSupportTestKey);
    return false;
  } catch (___errorHandling) {
    return true;
  }
}
function isLocalStorageEmptyOrNotSupported() {
  return !isLocalStorageSupported() || localStorage.length > 0;
}
function _______handleDatabaseResponse(handleDatabaseResponseBasedOnArrayType) {
  var __currentContext = this;
  var databaseResponse = {};
  if (handleDatabaseResponseBasedOnArrayType) {
    for (var responseKey in handleDatabaseResponseBasedOnArrayType) {
      databaseResponse[responseKey] =
        handleDatabaseResponseBasedOnArrayType[responseKey];
    }
  }
  databaseResponse.keyPrefix = constructStorePath(
    handleDatabaseResponseBasedOnArrayType,
    __currentContext._defaultConfig,
  );
  if (!isLocalStorageEmptyOrNotSupported()) {
    return PromiseImplementation.reject();
  }
  __currentContext._dbInfo = databaseResponse;
  databaseResponse.serializer = indexedDBKeyCursorHandler;
  return PromiseImplementation.resolve();
}
function clearLocalStorageAndProcessResponses(
  clearObjectStoreAndProcessResponses,
) {
  var _____________context = this;
  var clearLocalStoragePromise = _____________context.ready().then(function () {
    var dbInfoKeyPrefix = _____________context._dbInfo.keyPrefix;
    for (var keyIndex = localStorage.length - 1; keyIndex >= 0; keyIndex--) {
      var itemKey = localStorage.key(keyIndex);
      if (itemKey.indexOf(dbInfoKeyPrefix) === 0) {
        localStorage.removeItem(itemKey);
      }
    }
  });
  handlePromiseWithCallback(
    clearLocalStoragePromise,
    clearObjectStoreAndProcessResponses,
  );
  return clearLocalStoragePromise;
}
function retrieveBlobData(_______handleBlobTransaction, clearBlobData) {
  var _______________context = this;
  _______handleBlobTransaction = convertToString(_______handleBlobTransaction);
  var retrieveSerializedBlobData = _______________context
    .ready()
    .then(function () {
      var ____________databaseInfo = _______________context._dbInfo;
      var _blobTransactionData = localStorage.getItem(
        ____________databaseInfo.keyPrefix + _______handleBlobTransaction,
      );
      if (_blobTransactionData) {
        _blobTransactionData =
          ____________databaseInfo.serializer.deserialize(_blobTransactionData);
      }
      return _blobTransactionData;
    });
  handlePromiseWithCallback(retrieveSerializedBlobData, clearBlobData);
  return retrieveSerializedBlobData;
}
function _processBlobTransaction(________handleBlobTransaction, __blobData) {
  var _________context = this;
  var processBlobTransactionPromise = _________context
    .ready()
    .then(function () {
      var _____databaseInfo = _________context._dbInfo;
      var keyPrefix = _____databaseInfo.keyPrefix;
      var keyPrefixLength = keyPrefix.length;
      var localStorageCount = localStorage.length;
      var transactionCounter = 1;
      for (
        var localStorageIndex = 0;
        localStorageIndex < localStorageCount;
        localStorageIndex++
      ) {
        var storageKey = localStorage.key(localStorageIndex);
        if (storageKey.indexOf(keyPrefix) !== 0) {
          continue;
        }
        var serializedDatabaseEntry = localStorage.getItem(storageKey);
        if (serializedDatabaseEntry) {
          serializedDatabaseEntry = _____databaseInfo.serializer.deserialize(
            serializedDatabaseEntry,
          );
        }
        serializedDatabaseEntry = ________handleBlobTransaction(
          serializedDatabaseEntry,
          storageKey.substring(keyPrefixLength),
          transactionCounter++,
        );
        if (serializedDatabaseEntry !== undefined) {
          return serializedDatabaseEntry;
        }
      }
    });
  handlePromiseWithCallback(processBlobTransactionPromise, __blobData);
  return processBlobTransactionPromise;
}
function handleBlobDataTransaction(
  handleBlobDataResponse,
  blobTransactionData,
) {
  var ______________context = this;
  var blobKey = ______________context.ready().then(function () {
    var __dbInfo = ______________context._dbInfo;
    var localStorageKey;
    try {
      localStorageKey = localStorage.key(handleBlobDataResponse);
    } catch (__errorHandling) {
      localStorageKey = null;
    }
    if (localStorageKey) {
      localStorageKey = localStorageKey.substring(__dbInfo.keyPrefix.length);
    }
    return localStorageKey;
  });
  handlePromiseWithCallback(blobKey, blobTransactionData);
  return blobKey;
}
function fetchLocalStorageItemsWithPrefix(matchResult) {
  var localStorageHelper = this;
  var fetchLocalStorageItems = localStorageHelper.ready().then(function () {
    var _dbInfo = localStorageHelper._dbInfo;
    var localStorageItemCount = localStorage.length;
    var filteredLocalStorageKeys = [];
    for (
      var __localStorageIndex = 0;
      __localStorageIndex < localStorageItemCount;
      __localStorageIndex++
    ) {
      var _localStorageKey = localStorage.key(__localStorageIndex);
      if (_localStorageKey.indexOf(_dbInfo.keyPrefix) === 0) {
        filteredLocalStorageKeys.push(
          _localStorageKey.substring(_dbInfo.keyPrefix.length),
        );
      }
    }
    return filteredLocalStorageKeys;
  });
  handlePromiseWithCallback(fetchLocalStorageItems, matchResult);
  return fetchLocalStorageItems;
}
function getBlobVersionAndOperationKeysCount(
  executeSqlForBlobVersionAndOperation,
) {
  var __________________context = this;
  var getBlobKeysCount = __________________context
    .keys()
    .then(function (inputBuffer) {
      return inputBuffer.length;
    });
  handlePromiseWithCallback(
    getBlobKeysCount,
    executeSqlForBlobVersionAndOperation,
  );
  return getBlobKeysCount;
}
function removeBlobFromStorage(inputData, handleBlobVersioningOperation) {
  var storageManager = this;
  inputData = convertToString(inputData);
  var removeBlobPromise = storageManager.ready().then(function () {
    var ___dbInfo = storageManager._dbInfo;
    localStorage.removeItem(___dbInfo.keyPrefix + inputData);
  });
  handlePromiseWithCallback(removeBlobPromise, handleBlobVersioningOperation);
  return removeBlobPromise;
}
function _handleBlobDatabaseOperation(
  ______handleBlobVersionAndOperation,
  databaseHandlerContext,
  blobOperationData,
) {
  var __databaseHandler = this;
  ______handleBlobVersionAndOperation = convertToString(
    ______handleBlobVersionAndOperation,
  );
  var handleBlobDatabaseOperationPromise = __databaseHandler
    .ready()
    .then(function () {
      if (databaseHandlerContext === undefined) {
        databaseHandlerContext = null;
      }
      var ___databaseContext = databaseHandlerContext;
      return new PromiseImplementation(function (
        databaseDeletionHandler,
        handleDatabaseBlobVersionOperation,
      ) {
        var ______databaseInfo = __databaseHandler._dbInfo;
        ______databaseInfo.serializer.serialize(
          databaseHandlerContext,
          function (_handleBlobVersionOperation, databaseConfig) {
            if (databaseConfig) {
              handleDatabaseBlobVersionOperation(databaseConfig);
            } else {
              try {
                localStorage.setItem(
                  ______databaseInfo.keyPrefix +
                    ______handleBlobVersionAndOperation,
                  _handleBlobVersionOperation,
                );
                databaseDeletionHandler(___databaseContext);
              } catch (___error) {
                if (
                  ___error.name === "QuotaExceededError" ||
                  ___error.name === "NS_ERROR_DOM_QUOTA_REACHED"
                ) {
                  handleDatabaseBlobVersionOperation(___error);
                }
                handleDatabaseBlobVersionOperation(___error);
              }
            }
          },
        );
      });
    });
  handlePromiseWithCallback(
    handleBlobDatabaseOperationPromise,
    blobOperationData,
  );
  return handleBlobDatabaseOperationPromise;
}
function ______________handleBlobVersionAndOperation(
  _______handleBlobVersionAndOperation,
  blobVersionHandler,
) {
  blobVersionHandler = getCallbackFunction.apply(this, arguments);
  _______handleBlobVersionAndOperation =
    (typeof _______handleBlobVersionAndOperation !== "function" &&
      _______handleBlobVersionAndOperation) ||
    {};
  if (!_______handleBlobVersionAndOperation.name) {
    var configuration = this.config();
    _______handleBlobVersionAndOperation.name =
      _______handleBlobVersionAndOperation.name || configuration.name;
    _______handleBlobVersionAndOperation.storeName =
      _______handleBlobVersionAndOperation.storeName || configuration.storeName;
  }
  var ________context = this;
  var promiseToHandleBlobOperation;
  if (!_______handleBlobVersionAndOperation.name) {
    promiseToHandleBlobOperation =
      PromiseImplementation.reject("Invalid arguments");
  } else {
    promiseToHandleBlobOperation = new PromiseImplementation(function (
      ________handleBlobVersionAndOperation,
    ) {
      if (!_______handleBlobVersionAndOperation.storeName) {
        ________handleBlobVersionAndOperation(
          _______handleBlobVersionAndOperation.name + "/",
        );
      } else {
        ________handleBlobVersionAndOperation(
          constructStorePath(
            _______handleBlobVersionAndOperation,
            ________context._defaultConfig,
          ),
        );
      }
    }).then(function (dbTransactionHandler) {
      for (
        var _localStorageIndex = localStorage.length - 1;
        _localStorageIndex >= 0;
        _localStorageIndex--
      ) {
        var __localStorageKey = localStorage.key(_localStorageIndex);
        if (__localStorageKey.indexOf(dbTransactionHandler) === 0) {
          localStorage.removeItem(__localStorageKey);
        }
      }
    });
  }
  handlePromiseWithCallback(promiseToHandleBlobOperation, blobVersionHandler);
  return promiseToHandleBlobOperation;
}
var _________handleBlobVersionAndOperation = {
  _driver: "localStorageWrapper",
  _initStorage: _______handleDatabaseResponse,
  _support: isLocalStorageAvailable(),
  iterate: _processBlobTransaction,
  getItem: retrieveBlobData,
  setItem: _handleBlobDatabaseOperation,
  removeItem: removeBlobFromStorage,
  clear: clearLocalStorageAndProcessResponses,
  length: getBlobVersionAndOperationKeysCount,
  key: handleBlobDataTransaction,
  keys: fetchLocalStorageItemsWithPrefix,
  dropInstance: ______________handleBlobVersionAndOperation,
};
var __________handleBlobVersionAndOperation =
  function ___________handleBlobVersionAndOperation(
    ____________handleBlobVersionAndOperation,
    setSerializerForDatabase,
  ) {
    return (
      ____________handleBlobVersionAndOperation === setSerializerForDatabase ||
      (typeof ____________handleBlobVersionAndOperation === "number" &&
        typeof setSerializerForDatabase === "number" &&
        isNaN(____________handleBlobVersionAndOperation) &&
        isNaN(setSerializerForDatabase))
    );
  };
var _____handleBlobOperation =
  function _____________handleBlobVersionAndOperation(
    ______handleBlobOperation,
    handleBlobOperationResult,
  ) {
    var operationCount = ______handleBlobOperation.length;
    var currentOperationIndex = 0;
    while (currentOperationIndex < operationCount) {
      if (
        __________handleBlobVersionAndOperation(
          ______handleBlobOperation[currentOperationIndex],
          handleBlobOperationResult,
        )
      ) {
        return true;
      }
      currentOperationIndex++;
    }
    return false;
  };
var _handleDatabaseOperation =
  Array.isArray ||
  function (__databaseTransactionHandler) {
    return (
      Object.prototype.toString.call(__databaseTransactionHandler) ===
      "[object Array]"
    );
  };
var _blobOperationPromise = {};
var _defaultBlobHandler = {};
var _handleBlobError = {
  INDEXEDDB: handleInitializationError,
  WEBSQL: databaseResponseHandler,
  LOCALSTORAGE: _________handleBlobVersionAndOperation,
};
var ______handleDatabaseResponse = [
  _handleBlobError.INDEXEDDB._driver,
  _handleBlobError.WEBSQL._driver,
  _handleBlobError.LOCALSTORAGE._driver,
];
var databaseQueryHandler = ["dropInstance"];
var _databaseInfo = [
  "clear",
  "getItem",
  "iterate",
  "key",
  "keys",
  "length",
  "removeItem",
  "setItem",
].concat(databaseQueryHandler);
var handleBlobDatabaseTransaction = {
  description: "",
  driver: ______handleDatabaseResponse.slice(),
  name: "localforage",
  size: 4980736,
  storeName: "keyvaluepairs",
  version: 1,
};
function addDatabasePromiseHandler(
  databaseOperationHandler,
  databasePromiseHandler,
) {
  databaseOperationHandler[databasePromiseHandler] = function () {
    var databaseOperationArguments = arguments;
    return databaseOperationHandler.ready().then(function () {
      return databaseOperationHandler[databasePromiseHandler].apply(
        databaseOperationHandler,
        databaseOperationArguments,
      );
    });
  };
}
function mergeObjects() {
  for (var __index = 1; __index < arguments.length; __index++) {
    var _databaseOperations = arguments[__index];
    if (_databaseOperations) {
      for (var databaseOperationKey in _databaseOperations) {
        if (_databaseOperations.hasOwnProperty(databaseOperationKey)) {
          if (
            _handleDatabaseOperation(_databaseOperations[databaseOperationKey])
          ) {
            arguments[0][databaseOperationKey] =
              _databaseOperations[databaseOperationKey].slice();
          } else {
            arguments[0][databaseOperationKey] =
              _databaseOperations[databaseOperationKey];
          }
        }
      }
    }
  }
  return arguments[0];
}
var initializeDatabasePromise = (function () {
  function __initializeDatabase(__databaseInitializationHandler) {
    validateConstructorInstanceCheck(this, __initializeDatabase);
    for (var blobErrorKey in _handleBlobError) {
      if (_handleBlobError.hasOwnProperty(blobErrorKey)) {
        var blobErrorHandler = _handleBlobError[blobErrorKey];
        var blobDriver = blobErrorHandler._driver;
        this[blobErrorKey] = blobDriver;
        if (!_blobOperationPromise[blobDriver]) {
          this.defineDriver(blobErrorHandler);
        }
      }
    }
    this._defaultConfig = mergeObjects({}, handleBlobDatabaseTransaction);
    this._config = mergeObjects(
      {},
      this._defaultConfig,
      __databaseInitializationHandler,
    );
    this._driverSet = null;
    this._initDriver = null;
    this._ready = false;
    this._dbInfo = null;
    this._wrapLibraryMethodsWithReady();
    this.setDriver(this._config.driver).catch(function () {});
  }
  __initializeDatabase.prototype.config = function _databaseTransactionPromise(
    databaseContext,
  ) {
    if (
      (typeof databaseContext === "undefined"
        ? "undefined"
        : getType(databaseContext)) === "object"
    ) {
      if (this._ready) {
        return new Error(
          "Can't call config() after localforage has been used.",
        );
      }
      for (var key in databaseContext) {
        if (key === "storeName") {
          databaseContext[key] = databaseContext[key].replace(/\W/g, "_");
        }
        if (key === "version" && typeof databaseContext[key] !== "number") {
          return new Error("Database version must be a number.");
        }
        this._config[key] = databaseContext[key];
      }
      if ("driver" in databaseContext && databaseContext.driver) {
        return this.setDriver(this._config.driver);
      }
      return true;
    } else if (typeof databaseContext === "string") {
      return this._config[databaseContext];
    } else {
      return this._config;
    }
  };
  __initializeDatabase.prototype.defineDriver =
    function _______handleDatabaseTransaction(
      handleDatabaseTransactionCompletion,
      __databaseTransaction,
      ___databaseTransactionHandler,
    ) {
      var _transactionPromise = new PromiseImplementation(function (
        getSerializedValue,
        _handleDatabaseTransactionCompletion,
      ) {
        try {
          var databaseDriver = handleDatabaseTransactionCompletion._driver;
          var driverComplianceError = new Error(
            "Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver",
          );
          if (!handleDatabaseTransactionCompletion._driver) {
            _handleDatabaseTransactionCompletion(driverComplianceError);
            return;
          }
          var initStorageKey = _databaseInfo.concat("_initStorage");
          var _currentIndex = 0;
          for (
            var initStorageKeyLength = initStorageKey.length;
            _currentIndex < initStorageKeyLength;
            _currentIndex++
          ) {
            var currentStorageKey = initStorageKey[_currentIndex];
            var isBlobOperationFailed = !_____handleBlobOperation(
              databaseQueryHandler,
              currentStorageKey,
            );
            if (
              (isBlobOperationFailed ||
                handleDatabaseTransactionCompletion[currentStorageKey]) &&
              typeof handleDatabaseTransactionCompletion[currentStorageKey] !==
                "function"
            ) {
              _handleDatabaseTransactionCompletion(driverComplianceError);
              return;
            }
          }
          var __handleTransactionCompletion =
            function __handleDatabaseTransactionCompletion() {
              var createTransactionHandler = function insertOrUpdateTransaction(
                handleTransactionCompletion,
              ) {
                return function () {
                  var transactionCompletionError = new Error(
                    "Method " +
                      handleTransactionCompletion +
                      " is not implemented by the current driver",
                  );
                  var transactionCompletionPromise =
                    PromiseImplementation.reject(transactionCompletionError);
                  handlePromiseWithCallback(
                    transactionCompletionPromise,
                    arguments[arguments.length - 1],
                  );
                  return transactionCompletionPromise;
                };
              };
              var transactionIndex = 0;
              for (
                var totalDatabaseTransactions = databaseQueryHandler.length;
                transactionIndex < totalDatabaseTransactions;
                transactionIndex++
              ) {
                var transactionQuery = databaseQueryHandler[transactionIndex];
                if (!handleDatabaseTransactionCompletion[transactionQuery]) {
                  handleDatabaseTransactionCompletion[transactionQuery] =
                    createTransactionHandler(transactionQuery);
                }
              }
            };
          __handleTransactionCompletion();
          var ___handleDatabaseTransactionCompletion =
            function ________handleDatabaseTransaction(
              _handleTransactionCompletion,
            ) {
              if (_blobOperationPromise[databaseDriver]) {
                console.info(
                  "Redefining LocalForage driver: " + databaseDriver,
                );
              }
              _blobOperationPromise[databaseDriver] =
                handleDatabaseTransactionCompletion;
              _defaultBlobHandler[databaseDriver] =
                _handleTransactionCompletion;
              getSerializedValue();
            };
          if ("_support" in handleDatabaseTransactionCompletion) {
            if (
              handleDatabaseTransactionCompletion._support &&
              typeof handleDatabaseTransactionCompletion._support === "function"
            ) {
              handleDatabaseTransactionCompletion
                ._support()
                .then(
                  ___handleDatabaseTransactionCompletion,
                  _handleDatabaseTransactionCompletion,
                );
            } else {
              ___handleDatabaseTransactionCompletion(
                !!handleDatabaseTransactionCompletion._support,
              );
            }
          } else {
            ___handleDatabaseTransactionCompletion(true);
          }
        } catch (databaseTransactionError) {
          _handleDatabaseTransactionCompletion(databaseTransactionError);
        }
      });
      handlePromiseWithCallbacks(
        _transactionPromise,
        __databaseTransaction,
        ___databaseTransactionHandler,
      );
      return _transactionPromise;
    };
  __initializeDatabase.prototype.driver =
    function __handleDatabaseInitializationError() {
      return this._driver || null;
    };
  __initializeDatabase.prototype.getDriver = function handleDatabaseQuotaError(
    _currentContext,
    __databaseTransactionPromise,
    _transactionCompletionHandler,
  ) {
    var blobOperationPromiseResult = _blobOperationPromise[_currentContext]
      ? PromiseImplementation.resolve(_blobOperationPromise[_currentContext])
      : PromiseImplementation.reject(new Error("Driver not found."));
    handlePromiseWithCallbacks(
      blobOperationPromiseResult,
      __databaseTransactionPromise,
      _transactionCompletionHandler,
    );
    return blobOperationPromiseResult;
  };
  __initializeDatabase.prototype.getSerializer =
    function deleteBlobFromDatabase(currentBlobOperationContext) {
      var resolvedPromiseForIndexedDB = PromiseImplementation.resolve(
        indexedDBKeyCursorHandler,
      );
      handlePromiseWithCallbacks(
        resolvedPromiseForIndexedDB,
        currentBlobOperationContext,
      );
      return resolvedPromiseForIndexedDB;
    };
  __initializeDatabase.prototype.ready = function handleBlobDeletion(
    _handleBlobDeletion,
  ) {
    var ________________context = this;
    var initializeDriverPromise = ________________context._driverSet.then(
      function () {
        if (________________context._ready === null) {
          ________________context._ready =
            ________________context._initDriver();
        }
        return ________________context._ready;
      },
    );
    handlePromiseWithCallbacks(
      initializeDriverPromise,
      _handleBlobDeletion,
      _handleBlobDeletion,
    );
    return initializeDriverPromise;
  };
  __initializeDatabase.prototype.setDriver =
    function _handleBlobDatabaseInitialization(
      blobOperationContext,
      ___databaseTransactionPromise,
      __handleBlobDatabaseInitialization,
    ) {
      var blobDatabaseHandler = this;
      if (!_handleDatabaseOperation(blobOperationContext)) {
        blobOperationContext = [blobOperationContext];
      }
      var supportedDrivers = this._getSupportedDrivers(blobOperationContext);
      function updateBlobDatabaseDriver() {
        blobDatabaseHandler._config.driver = blobDatabaseHandler.driver();
      }
      function ___handleBlobDeletion(__handleBlobDeletion) {
        blobDatabaseHandler._extend(__handleBlobDeletion);
        updateBlobDatabaseDriver();
        blobDatabaseHandler._ready = blobDatabaseHandler._initStorage(
          blobDatabaseHandler._config,
        );
        return blobDatabaseHandler._ready;
      }
      function processBlobDatabaseTransactions(_handleBlobDatabaseTransaction) {
        return function () {
          var currentTransactionIndex = 0;
          function processBlobDatabaseTransaction() {
            while (
              currentTransactionIndex < _handleBlobDatabaseTransaction.length
            ) {
              var currentBlobTransaction =
                _handleBlobDatabaseTransaction[currentTransactionIndex];
              currentTransactionIndex++;
              blobDatabaseHandler._dbInfo = null;
              blobDatabaseHandler._ready = null;
              return blobDatabaseHandler
                .getDriver(currentBlobTransaction)
                .then(___handleBlobDeletion)
                .catch(processBlobDatabaseTransaction);
            }
            updateBlobDatabaseDriver();
            var noStorageMethodError = new Error(
              "No available storage method found.",
            );
            blobDatabaseHandler._driverSet =
              PromiseImplementation.reject(noStorageMethodError);
            return blobDatabaseHandler._driverSet;
          }
          return processBlobDatabaseTransaction();
        };
      }
      var __handleBlobDatabaseTransaction =
        this._driverSet !== null
          ? this._driverSet.catch(function () {
              return PromiseImplementation.resolve();
            })
          : PromiseImplementation.resolve();
      this._driverSet = __handleBlobDatabaseTransaction
        .then(function () {
          var firstSupportedDriver = supportedDrivers[0];
          blobDatabaseHandler._dbInfo = null;
          blobDatabaseHandler._ready = null;
          return blobDatabaseHandler
            .getDriver(firstSupportedDriver)
            .then(function (_handleDatabaseInitialization) {
              blobDatabaseHandler._driver =
                _handleDatabaseInitialization._driver;
              updateBlobDatabaseDriver();
              blobDatabaseHandler._wrapLibraryMethodsWithReady();
              blobDatabaseHandler._initDriver =
                processBlobDatabaseTransactions(supportedDrivers);
            });
        })
        .catch(function () {
          updateBlobDatabaseDriver();
          var _noStorageMethodError = new Error(
            "No available storage method found.",
          );
          blobDatabaseHandler._driverSet = PromiseImplementation.reject(
            _noStorageMethodError,
          );
          return blobDatabaseHandler._driverSet;
        });
      handlePromiseWithCallbacks(
        this._driverSet,
        ___databaseTransactionPromise,
        __handleBlobDatabaseInitialization,
      );
      return this._driverSet;
    };
  __initializeDatabase.prototype.supports = function _databasePromiseHandler(
    createDatabasePromise,
  ) {
    return !!_defaultBlobHandler[createDatabasePromise];
  };
  __initializeDatabase.prototype._extend = function databaseTransactionContext(
    ____databaseTransactionPromise,
  ) {
    mergeObjects(this, ____databaseTransactionPromise);
  };
  __initializeDatabase.prototype._getSupportedDrivers = function _context(
    _____databaseTransactionPromise,
  ) {
    var supportedTransactions = [];
    var _transactionIndex = 0;
    for (
      var totalTransactionCount = _____databaseTransactionPromise.length;
      _transactionIndex < totalTransactionCount;
      _transactionIndex++
    ) {
      var currentTransaction =
        _____databaseTransactionPromise[_transactionIndex];
      if (this.supports(currentTransaction)) {
        supportedTransactions.push(currentTransaction);
      }
    }
    return supportedTransactions;
  };
  __initializeDatabase.prototype._wrapLibraryMethodsWithReady =
    function _________handleDatabaseTransaction() {
      var currentDatabaseIndex = 0;
      for (
        var totalDatabases = _databaseInfo.length;
        currentDatabaseIndex < totalDatabases;
        currentDatabaseIndex++
      ) {
        addDatabasePromiseHandler(this, _databaseInfo[currentDatabaseIndex]);
      }
    };
  __initializeDatabase.prototype.createInstance =
    function handleDatabaseTransactionSuccess(__databaseInitializationPromise) {
      return new __initializeDatabase(__databaseInitializationPromise);
    };
  return __initializeDatabase;
})();
var _handleInitializationError = new initializeDatabasePromise();
module.exports = _handleInitializationError;
