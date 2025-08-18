/**
 * AbortSignal Utilities
 * 
 * Utility functions for working with AbortSignals, combining signals,
 * and managing cancellation in hook execution.
 */

/**
 * Create a new AbortController
 * 
 * @returns {AbortController} New abort controller
 */
export function createAbortController() {
    return new AbortController();
}

/**
 * Combine multiple AbortSignals into a single signal
 * 
 * @param {...AbortSignal} signals - Signals to combine
 * @returns {Object} Combined signal and cleanup function
 */
export function combineAbortSignals(...signals) {
    const controller = new AbortController();
    
    const cleanup = () => {
        signals.forEach(signal => {
            if (signal && typeof signal.removeEventListener === 'function') {
                signal.removeEventListener('abort', abortHandler);
            }
        });
    };
    
    const abortHandler = () => {
        controller.abort();
    };
    
    signals.forEach(signal => {
        if (signal?.aborted) {
            controller.abort();
        } else if (signal) {
            signal.addEventListener('abort', abortHandler);
        }
    });
    
    return {
        signal: controller.signal,
        cleanup
    };
}