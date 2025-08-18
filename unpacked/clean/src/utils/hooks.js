/**
 * Process Hooks Utilities
 * 
 * Provides hooks for child process management and lifecycle handling
 */

import { spawn, spawnSync } from 'child_process';

/**
 * Hook a child process to handle exit events and error conditions
 * 
 * @param {ChildProcess} childProcess - The child process to hook
 * @param {Object} options - Options object with command info
 */
export function hookChildProcess(childProcess, options = {}) {
  if (!childProcess || !childProcess.emit) {
    return;
  }

  // Save the original emit function
  const originalEmit = childProcess.emit;
  
  // Override emit to intercept exit events
  childProcess.emit = function(event, ...args) {
    if (event === 'exit') {
      const exitCode = args[0];
      
      // Handle specific exit codes that indicate errors
      if (shouldTransformExitToError(exitCode, options)) {
        const error = createProcessError(options.command || 'unknown', 'spawn');
        return originalEmit.call(this, 'error', error);
      }
    }
    
    // Call original emit for all other events
    return originalEmit.apply(this, [event, ...args]);
  };
}

/**
 * Determine if an exit code should be transformed to an error event
 * 
 * @param {number} exitCode - The process exit code
 * @param {Object} options - Options with command info
 * @returns {boolean}
 */
function shouldTransformExitToError(exitCode, options) {
  // Transform exit code 1 to error if no file was found (ENOENT-like condition)
  return exitCode === 1 && !options.file;
}

/**
 * Create a standardized process error
 * 
 * @param {string} command - The command that failed
 * @param {string} syscall - The system call that failed
 * @returns {Error}
 */
function createProcessError(command, syscall) {
  const error = new Error(`spawn ${command} ENOENT`);
  error.code = 'ENOENT';
  error.errno = -2;
  error.syscall = `spawn ${command}`;
  error.path = command;
  error.spawnargs = [];
  return error;
}

/**
 * Verify ENOENT errors for synchronous spawn
 * 
 * @param {number} status - Process exit status
 * @param {Object} options - Command options
 * @returns {Error|null}
 */
export function verifyENOENTSync(status, options) {
  if (status === 1 && !options.file) {
    return createProcessError(options.command || 'unknown', 'spawnSync');
  }
  return null;
}

/**
 * Enhanced spawn function with hooks
 * 
 * @param {string} command - Command to spawn
 * @param {string[]} args - Arguments
 * @param {Object} options - Spawn options
 * @returns {ChildProcess}
 */
export function spawnWithHooks(command, args = [], options = {}) {
  const childProcess = spawn(command, args, options);
  
  hookChildProcess(childProcess, {
    command,
    args,
    file: options.file,
    original: command
  });
  
  return childProcess;
}

/**
 * Enhanced spawnSync function with error verification
 * 
 * @param {string} command - Command to spawn
 * @param {string[]} args - Arguments  
 * @param {Object} options - Spawn options
 * @returns {Object}
 */
export function spawnSyncWithHooks(command, args = [], options = {}) {
  const result = spawnSync(command, args, options);
  
  // Check for ENOENT-like conditions
  const error = verifyENOENTSync(result.status, {
    command,
    args,
    file: options.file,
    original: command
  });
  
  if (error && !result.error) {
    result.error = error;
  }
  
  return result;
}

/**
 * Hook for user prompt submission events
 * 
 * @param {Function} callback - Callback to handle prompt submission
 */
export function hookUserPromptSubmit(callback) {
  // Add event listener for process termination signals
  process.on('SIGINT', () => {
    if (callback) callback('interrupt');
    process.exit(0);
  });
  
  process.on('SIGTERM', () => {
    if (callback) callback('terminate'); 
    process.exit(0);
  });
  
  // Handle uncaught exceptions gracefully
  process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    if (callback) callback('error', error);
    process.exit(1);
  });
}

/**
 * Setup default process hooks for the CLI
 */
export function setupDefaultHooks() {
  // Handle common termination scenarios
  hookUserPromptSubmit((type, data) => {
    switch (type) {
      case 'interrupt':
        console.log('\nSession interrupted by user');
        break;
      case 'terminate':
        console.log('\nSession terminated');
        break;
      case 'error':
        console.error('\nSession ended due to error:', data?.message || 'Unknown error');
        break;
    }
  });
  
  // Ensure clean exit on unhandled rejections
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Promise Rejection:', reason);
    process.exit(1);
  });
}