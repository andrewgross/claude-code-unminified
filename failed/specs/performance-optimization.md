# Performance & Optimization Specification

## Overview
Claude Code implements comprehensive performance optimization strategies across all system layers, from startup time optimization to memory management, caching strategies, and resource utilization. The system is designed to provide fast, responsive user experiences while efficiently managing system resources.

## Architecture

### Core Optimization Areas
- **Startup Performance**: Fast application initialization and module loading
- **Memory Management**: Efficient memory usage and garbage collection optimization
- **I/O Optimization**: Efficient file system and network operations
- **Caching Strategies**: Multi-level caching for data and computations
- **Bundle Optimization**: Webpack optimization and code splitting
- **Resource Management**: CPU, memory, and network resource optimization

### Performance Monitoring
- **Metrics Collection**: Real-time performance metrics gathering
- **Profiling Integration**: CPU and memory profiling capabilities
- **Benchmarking**: Automated performance regression testing
- **Alerting**: Performance degradation detection and alerts

## Startup Optimization

### Module Loading Strategy
```javascript
/**
 * Lazy module loading system for faster startup
 */
class LazyModuleLoader {
    constructor() {
        this.loadedModules = new Map();
        this.loadingPromises = new Map();
        this.preloadQueue = [];
        this.criticalModules = new Set(['cli', 'auth', 'config']);
    }
    
    async loadModule(moduleName) {
        // Return cached module if already loaded
        if (this.loadedModules.has(moduleName)) {
            return this.loadedModules.get(moduleName);
        }
        
        // Return existing promise if already loading
        if (this.loadingPromises.has(moduleName)) {
            return this.loadingPromises.get(moduleName);
        }
        
        // Start loading the module
        const loadPromise = this.performModuleLoad(moduleName);
        this.loadingPromises.set(moduleName, loadPromise);
        
        try {
            const module = await loadPromise;
            this.loadedModules.set(moduleName, module);
            return module;
        } finally {
            this.loadingPromises.delete(moduleName);
        }
    }
    
    async performModuleLoad(moduleName) {
        const startTime = performance.now();
        
        try {
            const module = await this.dynamicImport(moduleName);
            const loadTime = performance.now() - startTime;
            
            this.recordLoadMetrics(moduleName, loadTime, true);
            return module;
        } catch (error) {
            const loadTime = performance.now() - startTime;
            this.recordLoadMetrics(moduleName, loadTime, false);
            throw error;
        }
    }
    
    preloadModules() {
        // Preload critical modules in the background
        for (const moduleName of this.criticalModules) {
            if (!this.loadedModules.has(moduleName)) {
                this.loadModule(moduleName).catch(error => {
                    console.warn(`Failed to preload module ${moduleName}:`, error);
                });
            }
        }
    }
    
    recordLoadMetrics(moduleName, loadTime, success) {
        const metrics = {
            module: moduleName,
            loadTime,
            success,
            timestamp: Date.now()
        };
        
        // Send to performance monitoring system
        this.performanceMonitor?.recordModuleLoad(metrics);
    }
}

/**
 * Application initialization with performance tracking
 */
class ApplicationInitializer {
    constructor() {
        this.initSteps = [];
        this.startTime = performance.now();
        this.moduleLoader = new LazyModuleLoader();
    }
    
    async initialize() {
        const initSteps = [
            { name: 'environment', fn: () => this.initializeEnvironment() },
            { name: 'config', fn: () => this.loadConfiguration() },
            { name: 'auth', fn: () => this.initializeAuth() },
            { name: 'modules', fn: () => this.preloadModules() },
            { name: 'cli', fn: () => this.setupCLI() }
        ];
        
        for (const step of initSteps) {
            const stepStart = performance.now();
            
            try {
                await step.fn();
                const stepTime = performance.now() - stepStart;
                this.recordInitStep(step.name, stepTime, true);
            } catch (error) {
                const stepTime = performance.now() - stepStart;
                this.recordInitStep(step.name, stepTime, false);
                throw error;
            }
        }
        
        const totalTime = performance.now() - this.startTime;
        this.recordTotalInitTime(totalTime);
    }
    
    async initializeEnvironment() {
        // Minimal environment setup
        process.env.CLAUDE_START_TIME = Date.now().toString();
        
        // Set up uncaught exception handlers
        this.setupErrorHandlers();
        
        // Initialize performance monitoring early
        this.initializePerformanceMonitoring();
    }
    
    async preloadModules() {
        // Start preloading non-critical modules
        this.moduleLoader.preloadModules();
    }
}
```

### Bundle Optimization
```javascript
// Webpack configuration for optimal bundling
const webpackConfig = {
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                    priority: 20
                },
                critical: {
                    test: /[\\/](cli|auth|config)[\\/]/,
                    name: 'critical',
                    chunks: 'all',
                    priority: 30
                },
                ui: {
                    test: /[\\/](react|ink)[\\/]/,
                    name: 'ui',
                    chunks: 'async',
                    priority: 10
                }
            }
        },
        minimize: true,
        usedExports: true,
        sideEffects: false
    },
    
    // Dynamic imports for code splitting
    resolve: {
        alias: {
            '@mcp': path.resolve(__dirname, 'src/mcp'),
            '@ui': path.resolve(__dirname, 'src/ui'),
            '@utils': path.resolve(__dirname, 'src/utils')
        }
    }
};

/**
 * Dynamic import wrapper with error handling
 */
async function dynamicImport(modulePath) {
    const importStart = performance.now();
    
    try {
        const module = await import(modulePath);
        const importTime = performance.now() - importStart;
        
        // Record import performance
        recordImportMetrics(modulePath, importTime, true);
        
        return module;
    } catch (error) {
        const importTime = performance.now() - importStart;
        recordImportMetrics(modulePath, importTime, false);
        throw error;
    }
}
```

## Memory Management

### Memory Pool System
```javascript
/**
 * Memory pool for efficient object allocation
 */
class ObjectPool {
    constructor(createFn, resetFn, initialSize = 10, maxSize = 100) {
        this.createFn = createFn;
        this.resetFn = resetFn;
        this.maxSize = maxSize;
        this.pool = [];
        this.inUse = new Set();
        
        // Pre-populate pool
        for (let i = 0; i < initialSize; i++) {
            this.pool.push(this.createFn());
        }
    }
    
    acquire() {
        let obj;
        
        if (this.pool.length > 0) {
            obj = this.pool.pop();
        } else {
            obj = this.createFn();
        }
        
        this.inUse.add(obj);
        return obj;
    }
    
    release(obj) {
        if (!this.inUse.has(obj)) {
            return; // Object not from this pool
        }
        
        this.inUse.delete(obj);
        
        if (this.pool.length < this.maxSize) {
            this.resetFn(obj);
            this.pool.push(obj);
        }
        // Otherwise, let it be garbage collected
    }
    
    getStats() {
        return {
            poolSize: this.pool.length,
            inUse: this.inUse.size,
            totalAllocated: this.pool.length + this.inUse.size
        };
    }
}

/**
 * Memory usage monitoring and optimization
 */
class MemoryManager {
    constructor() {
        this.memoryPools = new Map();
        this.memoryMetrics = [];
        this.gcStats = [];
        this.monitoringInterval = null;
    }
    
    createPool(name, createFn, resetFn, options = {}) {
        const pool = new ObjectPool(
            createFn, 
            resetFn, 
            options.initialSize, 
            options.maxSize
        );
        this.memoryPools.set(name, pool);
        return pool;
    }
    
    startMonitoring(interval = 30000) { // 30 seconds
        this.monitoringInterval = setInterval(() => {
            this.collectMemoryMetrics();
        }, interval);
    }
    
    stopMonitoring() {
        if (this.monitoringInterval) {
            clearInterval(this.monitoringInterval);
            this.monitoringInterval = null;
        }
    }
    
    collectMemoryMetrics() {
        const memUsage = process.memoryUsage();
        const metrics = {
            timestamp: Date.now(),
            rss: memUsage.rss,
            heapTotal: memUsage.heapTotal,
            heapUsed: memUsage.heapUsed,
            external: memUsage.external,
            arrayBuffers: memUsage.arrayBuffers
        };
        
        this.memoryMetrics.push(metrics);
        
        // Keep only last 100 measurements
        if (this.memoryMetrics.length > 100) {
            this.memoryMetrics.shift();
        }
        
        // Check for memory leaks
        this.checkMemoryLeaks(metrics);
        
        // Trigger garbage collection if needed
        this.optimizeMemoryUsage(metrics);
    }
    
    checkMemoryLeaks(metrics) {
        if (this.memoryMetrics.length < 10) return;
        
        const recent = this.memoryMetrics.slice(-10);
        const growth = recent[recent.length - 1].heapUsed - recent[0].heapUsed;
        const avgGrowth = growth / recent.length;
        
        // Alert if consistent memory growth
        if (avgGrowth > 10 * 1024 * 1024) { // 10MB average growth
            console.warn('Potential memory leak detected:', {
                averageGrowthMB: avgGrowth / (1024 * 1024),
                currentHeapMB: metrics.heapUsed / (1024 * 1024)
            });
        }
    }
    
    optimizeMemoryUsage(metrics) {
        const heapUsedMB = metrics.heapUsed / (1024 * 1024);
        
        // Suggest garbage collection if heap usage is high
        if (heapUsedMB > 100) { // 100MB threshold
            if (global.gc) {
                global.gc();
                console.info('Manual garbage collection triggered');
            }
        }
        
        // Clear caches if memory pressure is high
        if (heapUsedMB > 200) { // 200MB threshold
            this.clearNonEssentialCaches();
        }
    }
    
    clearNonEssentialCaches() {
        // Clear various caches to free up memory
        console.info('Clearing non-essential caches due to memory pressure');
        
        // Clear file content cache
        global.fileCache?.clear();
        
        // Clear network response cache
        global.httpCache?.clear();
        
        // Release unused objects from pools
        for (const [name, pool] of this.memoryPools) {
            const stats = pool.getStats();
            if (stats.poolSize > 10) {
                // Reduce pool size
                pool.pool.splice(10);
            }
        }
    }
}
```

### Streaming and Buffering
```javascript
/**
 * Optimized streaming processor for large data
 */
class StreamProcessor {
    constructor(options = {}) {
        this.bufferSize = options.bufferSize || 64 * 1024; // 64KB
        this.maxMemoryUsage = options.maxMemoryUsage || 100 * 1024 * 1024; // 100MB
        this.processingQueue = [];
        this.activeProcessors = 0;
        this.maxConcurrentProcessors = options.maxConcurrentProcessors || 3;
    }
    
    async processStream(inputStream, processor, options = {}) {
        const chunks = [];
        let currentMemoryUsage = 0;
        
        return new Promise((resolve, reject) => {
            const results = [];
            
            inputStream.on('data', async (chunk) => {
                chunks.push(chunk);
                currentMemoryUsage += chunk.length;
                
                // Process chunks when buffer is full or memory limit reached
                if (currentMemoryUsage >= this.bufferSize || 
                    currentMemoryUsage >= this.maxMemoryUsage) {
                    
                    const processingChunks = chunks.splice(0);
                    currentMemoryUsage = 0;
                    
                    // Process chunks concurrently but limit concurrency
                    this.queueProcessing(processingChunks, processor, results);
                }
            });
            
            inputStream.on('end', async () => {
                // Process remaining chunks
                if (chunks.length > 0) {
                    this.queueProcessing(chunks, processor, results);
                }
                
                // Wait for all processing to complete
                await this.waitForProcessingComplete();
                resolve(results.flat());
            });
            
            inputStream.on('error', reject);
        });
    }
    
    async queueProcessing(chunks, processor, results) {
        if (this.activeProcessors >= this.maxConcurrentProcessors) {
            // Queue for later processing
            this.processingQueue.push({ chunks, processor, results });
            return;
        }
        
        this.activeProcessors++;
        
        try {
            const chunkResults = await Promise.all(
                chunks.map(chunk => processor(chunk))
            );
            results.push(...chunkResults);
        } finally {
            this.activeProcessors--;
            this.processQueue();
        }
    }
    
    processQueue() {
        if (this.processingQueue.length > 0 && 
            this.activeProcessors < this.maxConcurrentProcessors) {
            
            const { chunks, processor, results } = this.processingQueue.shift();
            this.queueProcessing(chunks, processor, results);
        }
    }
    
    async waitForProcessingComplete() {
        while (this.activeProcessors > 0 || this.processingQueue.length > 0) {
            await new Promise(resolve => setTimeout(resolve, 10));
        }
    }
}
```

## Caching Strategies

### Multi-Level Cache System
```javascript
/**
 * Multi-level cache with TTL and LRU eviction
 */
class MultiLevelCache {
    constructor(options = {}) {
        this.levels = [];
        this.stats = {
            hits: 0,
            misses: 0,
            evictions: 0
        };
        
        // L1: In-memory cache (fastest)
        this.addLevel(new InMemoryCache({
            maxSize: options.l1MaxSize || 1000,
            ttl: options.l1TTL || 5 * 60 * 1000 // 5 minutes
        }));
        
        // L2: File-based cache (persistent)
        if (options.enableFileCache) {
            this.addLevel(new FileCache({
                cacheDir: options.cacheDir,
                maxSize: options.l2MaxSize || 10000,
                ttl: options.l2TTL || 60 * 60 * 1000 // 1 hour
            }));
        }
        
        // L3: Remote cache (if available)
        if (options.remoteCache) {
            this.addLevel(options.remoteCache);
        }
    }
    
    addLevel(cache) {
        this.levels.push(cache);
    }
    
    async get(key, options = {}) {
        for (let i = 0; i < this.levels.length; i++) {
            const cache = this.levels[i];
            const value = await cache.get(key);
            
            if (value !== undefined) {
                this.stats.hits++;
                
                // Populate higher-level caches (cache promotion)
                for (let j = 0; j < i; j++) {
                    await this.levels[j].set(key, value, options);
                }
                
                return value;
            }
        }
        
        this.stats.misses++;
        return undefined;
    }
    
    async set(key, value, options = {}) {
        // Set in all cache levels
        const promises = this.levels.map(cache => 
            cache.set(key, value, options).catch(error => {
                console.warn('Cache set failed:', error);
            })
        );
        
        await Promise.allSettled(promises);
    }
    
    async delete(key) {
        const promises = this.levels.map(cache => cache.delete(key));
        await Promise.allSettled(promises);
    }
    
    async clear() {
        const promises = this.levels.map(cache => cache.clear());
        await Promise.allSettled(promises);
    }
    
    getStats() {
        const hitRate = this.stats.hits / (this.stats.hits + this.stats.misses);
        
        return {
            ...this.stats,
            hitRate: hitRate || 0,
            levels: this.levels.length
        };
    }
}

/**
 * In-memory LRU cache implementation
 */
class InMemoryCache {
    constructor(options = {}) {
        this.maxSize = options.maxSize || 1000;
        this.ttl = options.ttl || 60 * 1000; // 1 minute default
        this.cache = new Map();
        this.accessOrder = new Map();
        this.nextAccessId = 0;
    }
    
    async get(key) {
        const item = this.cache.get(key);
        
        if (!item) {
            return undefined;
        }
        
        // Check TTL
        if (Date.now() > item.expiresAt) {
            this.cache.delete(key);
            this.accessOrder.delete(key);
            return undefined;
        }
        
        // Update access order for LRU
        this.accessOrder.set(key, this.nextAccessId++);
        
        return item.value;
    }
    
    async set(key, value, options = {}) {
        const ttl = options.ttl || this.ttl;
        const expiresAt = Date.now() + ttl;
        
        // Evict if at capacity
        if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
            this.evictLRU();
        }
        
        this.cache.set(key, { value, expiresAt });
        this.accessOrder.set(key, this.nextAccessId++);
    }
    
    async delete(key) {
        this.cache.delete(key);
        this.accessOrder.delete(key);
    }
    
    async clear() {
        this.cache.clear();
        this.accessOrder.clear();
        this.nextAccessId = 0;
    }
    
    evictLRU() {
        let lruKey = null;
        let lruAccessId = Infinity;
        
        for (const [key, accessId] of this.accessOrder) {
            if (accessId < lruAccessId) {
                lruAccessId = accessId;
                lruKey = key;
            }
        }
        
        if (lruKey) {
            this.delete(lruKey);
        }
    }
}
```

## I/O Optimization

### Batch Operations
```javascript
/**
 * Batch processor for efficient I/O operations
 */
class BatchProcessor {
    constructor(options = {}) {
        this.batchSize = options.batchSize || 50;
        this.batchTimeout = options.batchTimeout || 100; // ms
        this.queues = new Map();
        this.processors = new Map();
    }
    
    registerBatchProcessor(type, processor) {
        this.processors.set(type, processor);
        this.queues.set(type, {
            items: [],
            timeout: null,
            promises: []
        });
    }
    
    async add(type, item) {
        if (!this.queues.has(type)) {
            throw new Error(`No batch processor registered for type: ${type}`);
        }
        
        return new Promise((resolve, reject) => {
            const queue = this.queues.get(type);
            
            queue.items.push(item);
            queue.promises.push({ resolve, reject });
            
            // Process immediately if batch is full
            if (queue.items.length >= this.batchSize) {
                this.processBatch(type);
            } else if (!queue.timeout) {
                // Set timeout to process batch
                queue.timeout = setTimeout(() => {
                    this.processBatch(type);
                }, this.batchTimeout);
            }
        });
    }
    
    async processBatch(type) {
        const queue = this.queues.get(type);
        const processor = this.processors.get(type);
        
        if (queue.items.length === 0) return;
        
        const items = queue.items.splice(0);
        const promises = queue.promises.splice(0);
        
        if (queue.timeout) {
            clearTimeout(queue.timeout);
            queue.timeout = null;
        }
        
        try {
            const results = await processor(items);
            
            // Resolve individual promises
            promises.forEach((promise, index) => {
                promise.resolve(results[index]);
            });
        } catch (error) {
            // Reject all promises
            promises.forEach(promise => {
                promise.reject(error);
            });
        }
    }
}

// Usage example
const batchProcessor = new BatchProcessor({
    batchSize: 20,
    batchTimeout: 50
});

// Register file read batch processor
batchProcessor.registerBatchProcessor('fileRead', async (filePaths) => {
    return Promise.all(filePaths.map(path => fs.readFile(path, 'utf8')));
});

// Register HTTP request batch processor
batchProcessor.registerBatchProcessor('httpRequest', async (requests) => {
    return Promise.all(requests.map(req => httpClient.request(req)));
});
```

### Connection Pooling Optimization
```javascript
/**
 * Advanced connection pool with health checking and load balancing
 */
class OptimizedConnectionPool {
    constructor(options = {}) {
        this.minSize = options.minSize || 2;
        this.maxSize = options.maxSize || 20;
        this.idleTimeout = options.idleTimeout || 30000;
        this.healthCheckInterval = options.healthCheckInterval || 60000;
        this.createConnection = options.createConnection;
        this.validateConnection = options.validateConnection;
        this.destroyConnection = options.destroyConnection;
        
        this.connections = [];
        this.inUse = new Set();
        this.creating = 0;
        this.waitQueue = [];
        this.stats = {
            created: 0,
            destroyed: 0,
            acquisitions: 0,
            timeouts: 0
        };
        
        this.startHealthChecking();
        this.startIdleConnectionCleanup();
    }
    
    async acquire(timeout = 10000) {
        this.stats.acquisitions++;
        
        // Try to get available connection
        const available = this.connections.filter(conn => 
            !this.inUse.has(conn) && conn.isHealthy
        );
        
        if (available.length > 0) {
            const connection = available[0];
            this.inUse.add(connection);
            connection.lastUsed = Date.now();
            return connection;
        }
        
        // Create new connection if under limit
        if (this.getTotalSize() < this.maxSize) {
            const connection = await this.createNewConnection();
            this.inUse.add(connection);
            return connection;
        }
        
        // Wait for connection to become available
        return this.waitForConnection(timeout);
    }
    
    release(connection) {
        if (!this.inUse.has(connection)) return;
        
        this.inUse.delete(connection);
        connection.lastUsed = Date.now();
        
        // Serve waiting requests
        if (this.waitQueue.length > 0) {
            const waiter = this.waitQueue.shift();
            this.inUse.add(connection);
            waiter.resolve(connection);
        }
    }
    
    async createNewConnection() {
        this.creating++;
        
        try {
            const connection = await this.createConnection();
            connection.createdAt = Date.now();
            connection.lastUsed = Date.now();
            connection.isHealthy = true;
            connection.healthCheckCount = 0;
            
            this.connections.push(connection);
            this.stats.created++;
            
            return connection;
        } finally {
            this.creating--;
        }
    }
    
    async waitForConnection(timeout) {
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                const index = this.waitQueue.findIndex(w => w.resolve === resolve);
                if (index >= 0) {
                    this.waitQueue.splice(index, 1);
                }
                this.stats.timeouts++;
                reject(new Error('Connection pool timeout'));
            }, timeout);
            
            this.waitQueue.push({
                resolve: (connection) => {
                    clearTimeout(timer);
                    resolve(connection);
                },
                reject: (error) => {
                    clearTimeout(timer);
                    reject(error);
                }
            });
        });
    }
    
    startHealthChecking() {
        setInterval(async () => {
            const healthChecks = this.connections.map(async (connection) => {
                if (this.inUse.has(connection)) return; // Skip in-use connections
                
                try {
                    const isHealthy = await this.validateConnection(connection);
                    connection.isHealthy = isHealthy;
                    connection.healthCheckCount++;
                    
                    if (!isHealthy) {
                        await this.removeConnection(connection);
                    }
                } catch (error) {
                    connection.isHealthy = false;
                    await this.removeConnection(connection);
                }
            });
            
            await Promise.allSettled(healthChecks);
            
            // Maintain minimum pool size
            await this.ensureMinimumSize();
        }, this.healthCheckInterval);
    }
    
    startIdleConnectionCleanup() {
        setInterval(() => {
            const now = Date.now();
            const idleConnections = this.connections.filter(connection => 
                !this.inUse.has(connection) && 
                now - connection.lastUsed > this.idleTimeout &&
                this.connections.length > this.minSize
            );
            
            idleConnections.forEach(connection => {
                this.removeConnection(connection);
            });
        }, this.idleTimeout / 2);
    }
    
    async ensureMinimumSize() {
        const currentSize = this.connections.length;
        const needed = this.minSize - currentSize;
        
        if (needed > 0) {
            const createPromises = Array(needed).fill().map(() => 
                this.createNewConnection().catch(error => {
                    console.warn('Failed to create connection for minimum size:', error);
                })
            );
            
            await Promise.allSettled(createPromises);
        }
    }
    
    async removeConnection(connection) {
        const index = this.connections.indexOf(connection);
        if (index >= 0) {
            this.connections.splice(index, 1);
        }
        
        this.inUse.delete(connection);
        
        try {
            await this.destroyConnection(connection);
            this.stats.destroyed++;
        } catch (error) {
            console.warn('Error destroying connection:', error);
        }
    }
    
    getTotalSize() {
        return this.connections.length + this.creating;
    }
    
    getStats() {
        return {
            ...this.stats,
            totalConnections: this.connections.length,
            inUse: this.inUse.size,
            available: this.connections.length - this.inUse.size,
            waitingRequests: this.waitQueue.length,
            healthyConnections: this.connections.filter(c => c.isHealthy).length
        };
    }
}
```

## Performance Monitoring

### Metrics Collection System
```javascript
/**
 * Comprehensive performance metrics collection
 */
class PerformanceMonitor {
    constructor() {
        this.metrics = new Map();
        this.timers = new Map();
        this.counters = new Map();
        this.histograms = new Map();
        this.collectors = [];
        
        this.startSystemMetricsCollection();
    }
    
    startTimer(name, labels = {}) {
        const key = this.createMetricKey(name, labels);
        const timer = {
            startTime: performance.now(),
            labels,
            name
        };
        
        this.timers.set(key, timer);
        return key;
    }
    
    endTimer(timerKey) {
        const timer = this.timers.get(timerKey);
        if (!timer) return;
        
        const duration = performance.now() - timer.startTime;
        this.recordDuration(timer.name, duration, timer.labels);
        this.timers.delete(timerKey);
        
        return duration;
    }
    
    recordDuration(name, duration, labels = {}) {
        const key = this.createMetricKey(name, labels);
        
        if (!this.histograms.has(key)) {
            this.histograms.set(key, {
                name,
                labels,
                values: [],
                count: 0,
                sum: 0,
                min: Infinity,
                max: -Infinity
            });
        }
        
        const histogram = this.histograms.get(key);
        histogram.values.push(duration);
        histogram.count++;
        histogram.sum += duration;
        histogram.min = Math.min(histogram.min, duration);
        histogram.max = Math.max(histogram.max, duration);
        
        // Keep only recent values
        if (histogram.values.length > 1000) {
            histogram.values = histogram.values.slice(-1000);
        }
    }
    
    incrementCounter(name, value = 1, labels = {}) {
        const key = this.createMetricKey(name, labels);
        
        if (!this.counters.has(key)) {
            this.counters.set(key, {
                name,
                labels,
                value: 0
            });
        }
        
        this.counters.get(key).value += value;
    }
    
    recordGauge(name, value, labels = {}) {
        const key = this.createMetricKey(name, labels);
        
        this.metrics.set(key, {
            type: 'gauge',
            name,
            labels,
            value,
            timestamp: Date.now()
        });
    }
    
    createMetricKey(name, labels) {
        const sortedLabels = Object.keys(labels)
            .sort()
            .map(key => `${key}="${labels[key]}"`)
            .join(',');
        
        return sortedLabels ? `${name}{${sortedLabels}}` : name;
    }
    
    startSystemMetricsCollection() {
        const collectSystemMetrics = () => {
            // Memory metrics
            const memUsage = process.memoryUsage();
            this.recordGauge('memory_rss', memUsage.rss);
            this.recordGauge('memory_heap_total', memUsage.heapTotal);
            this.recordGauge('memory_heap_used', memUsage.heapUsed);
            this.recordGauge('memory_external', memUsage.external);
            
            // CPU metrics
            const cpuUsage = process.cpuUsage();
            this.recordGauge('cpu_user', cpuUsage.user);
            this.recordGauge('cpu_system', cpuUsage.system);
            
            // Event loop metrics
            const eventLoopDelay = this.measureEventLoopDelay();
            this.recordGauge('event_loop_delay', eventLoopDelay);
            
            // Process metrics
            this.recordGauge('uptime', process.uptime());
            this.recordGauge('active_handles', process._getActiveHandles().length);
            this.recordGauge('active_requests', process._getActiveRequests().length);
        };
        
        // Collect metrics every 30 seconds
        setInterval(collectSystemMetrics, 30000);
        
        // Collect initial metrics
        collectSystemMetrics();
    }
    
    measureEventLoopDelay() {
        const start = process.hrtime.bigint();
        return new Promise(resolve => {
            setImmediate(() => {
                const delay = Number(process.hrtime.bigint() - start) / 1000000; // Convert to ms
                resolve(delay);
            });
        });
    }
    
    getMetricsSummary() {
        const summary = {
            counters: {},
            gauges: {},
            histograms: {}
        };
        
        // Process counters
        for (const [key, counter] of this.counters) {
            summary.counters[key] = counter.value;
        }
        
        // Process gauges
        for (const [key, gauge] of this.metrics) {
            if (gauge.type === 'gauge') {
                summary.gauges[key] = gauge.value;
            }
        }
        
        // Process histograms
        for (const [key, histogram] of this.histograms) {
            const values = histogram.values.sort((a, b) => a - b);
            summary.histograms[key] = {
                count: histogram.count,
                sum: histogram.sum,
                avg: histogram.sum / histogram.count,
                min: histogram.min,
                max: histogram.max,
                p50: this.percentile(values, 50),
                p95: this.percentile(values, 95),
                p99: this.percentile(values, 99)
            };
        }
        
        return summary;
    }
    
    percentile(sortedValues, p) {
        if (sortedValues.length === 0) return 0;
        
        const index = (p / 100) * (sortedValues.length - 1);
        const lower = Math.floor(index);
        const upper = Math.ceil(index);
        
        if (lower === upper) {
            return sortedValues[lower];
        }
        
        const weight = index - lower;
        return sortedValues[lower] * (1 - weight) + sortedValues[upper] * weight;
    }
    
    exportMetrics(format = 'json') {
        const summary = this.getMetricsSummary();
        
        switch (format) {
            case 'prometheus':
                return this.exportPrometheusFormat(summary);
            case 'json':
            default:
                return JSON.stringify(summary, null, 2);
        }
    }
}
```

This performance optimization specification provides comprehensive coverage of Claude Code's performance enhancement strategies, from startup optimization to advanced caching and monitoring systems.