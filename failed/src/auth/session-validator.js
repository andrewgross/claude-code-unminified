/**
 * Session Validator
 * 
 * Handles session validation, security controls, and user session management
 * for the Claude Code CLI authentication system.
 */

import crypto from 'crypto';
import { promises as fs } from 'fs';
import { homedir, networkInterfaces } from 'os';
import path from 'path';
import { EventEmitter } from 'events';

/**
 * Session validator configuration
 */
const SESSION_CONFIG = {
  STORAGE_DIR: path.join(homedir(), '.claude-cli'),
  SESSION_FILE: 'session.json',
  MAX_SESSION_AGE: 24 * 60 * 60 * 1000, // 24 hours
  MAX_IDLE_TIME: 2 * 60 * 60 * 1000, // 2 hours
  VALIDATION_INTERVAL: 5 * 60 * 1000, // 5 minutes
  MAX_FAILED_VALIDATIONS: 3,
  FINGERPRINT_FACTORS: ['platform', 'arch', 'hostname', 'networkMac'],
  SECURITY_LEVEL: 'standard' // 'basic', 'standard', 'strict'
};

/**
 * Session validator class
 */
export class SessionValidator extends EventEmitter {
  constructor(config = {}) {
    super();
    this.config = { ...SESSION_CONFIG, ...config };
    this.sessionPath = path.join(this.config.STORAGE_DIR, this.config.SESSION_FILE);
    this.validationTimer = null;
    this.failedValidations = 0;
    this.lastActivity = Date.now();
  }

  /**
   * Creates a new session with security fingerprint
   * @param {Object} authData - Authentication data (tokens, user info, etc.)
   * @returns {Promise<Object>} Created session data
   */
  async createSession(authData) {
    try {
      const fingerprint = await this.generateFingerprint();
      const sessionId = this.generateSessionId();
      
      const session = {
        id: sessionId,
        createdAt: Date.now(),
        lastActivity: Date.now(),
        fingerprint: fingerprint,
        authData: {
          userId: authData.userId,
          userEmail: authData.userEmail,
          permissions: authData.permissions,
          plan: authData.plan,
          authMethod: authData.authMethod // 'oauth', 'apikey'
        },
        security: {
          level: this.config.SECURITY_LEVEL,
          validationCount: 0,
          failedValidations: 0,
          lastValidation: Date.now(),
          ipAddress: await this.getCurrentIP(),
          userAgent: this.getUserAgent()
        },
        version: '1.0'
      };

      // Ensure storage directory exists
      await fs.mkdir(this.config.STORAGE_DIR, { recursive: true, mode: 0o700 });
      
      // Store session with encryption
      await fs.writeFile(
        this.sessionPath,
        JSON.stringify(this.encryptSession(session), null, 2),
        { mode: 0o600 }
      );

      // Start periodic validation
      this.startValidationTimer();
      
      this.emit('sessionCreated', { sessionId, userId: authData.userId });
      return session;
    } catch (error) {
      this.emit('error', error);
      throw new Error(`Failed to create session: ${error.message}`);
    }
  }

  /**
   * Validates current session against security policies
   * @returns {Promise<Object>} Validation result
   */
  async validateSession() {
    try {
      const session = await this.getSession();
      
      if (!session) {
        return {
          isValid: false,
          reason: 'no_session',
          message: 'No active session found'
        };
      }

      const validationResult = await this.performValidation(session);
      
      if (validationResult.isValid) {
        // Update session activity
        await this.updateSessionActivity();
        this.failedValidations = 0;
        this.emit('sessionValidated', { sessionId: session.id });
      } else {
        this.failedValidations++;
        this.emit('validationFailed', { 
          sessionId: session.id, 
          reason: validationResult.reason,
          failureCount: this.failedValidations 
        });

        // Terminate session if too many failures
        if (this.failedValidations >= this.config.MAX_FAILED_VALIDATIONS) {
          await this.terminateSession('too_many_failures');
          return {
            isValid: false,
            reason: 'session_terminated',
            message: 'Session terminated due to multiple validation failures'
          };
        }
      }

      return validationResult;
    } catch (error) {
      this.emit('error', error);
      return {
        isValid: false,
        reason: 'validation_error',
        message: `Session validation error: ${error.message}`
      };
    }
  }

  /**
   * Performs comprehensive session validation
   * @param {Object} session - Session data to validate
   * @returns {Promise<Object>} Validation result
   */
  async performValidation(session) {
    const now = Date.now();
    const checks = [];

    // Age validation
    const age = now - session.createdAt;
    if (age > this.config.MAX_SESSION_AGE) {
      checks.push({
        check: 'age',
        passed: false,
        message: `Session expired (age: ${Math.round(age / 1000 / 60)} minutes)`
      });
    } else {
      checks.push({ check: 'age', passed: true });
    }

    // Idle time validation
    const idleTime = now - session.lastActivity;
    if (idleTime > this.config.MAX_IDLE_TIME) {
      checks.push({
        check: 'idle',
        passed: false,
        message: `Session idle too long (${Math.round(idleTime / 1000 / 60)} minutes)`
      });
    } else {
      checks.push({ check: 'idle', passed: true });
    }

    // Fingerprint validation
    const currentFingerprint = await this.generateFingerprint();
    const fingerprintMatch = await this.compareFingerprints(session.fingerprint, currentFingerprint);
    
    checks.push({
      check: 'fingerprint',
      passed: fingerprintMatch.isMatch,
      message: fingerprintMatch.isMatch ? 'Fingerprint valid' : `Fingerprint mismatch: ${fingerprintMatch.differences.join(', ')}`
    });

    // Security level specific checks
    if (this.config.SECURITY_LEVEL === 'strict') {
      // IP address validation for strict mode
      const currentIP = await this.getCurrentIP();
      const ipMatch = session.security.ipAddress === currentIP;
      
      checks.push({
        check: 'ip_address',
        passed: ipMatch,
        message: ipMatch ? 'IP address valid' : 'IP address changed'
      });
    }

    // Determine overall validity
    const failedChecks = checks.filter(check => !check.passed);
    const isValid = failedChecks.length === 0;

    return {
      isValid,
      reason: isValid ? 'valid' : failedChecks[0].check,
      message: isValid ? 'Session is valid' : failedChecks[0].message,
      checks,
      sessionId: session.id,
      validatedAt: now
    };
  }

  /**
   * Updates session activity timestamp
   * @returns {Promise<void>}
   */
  async updateSessionActivity() {
    try {
      const session = await this.getSession();
      
      if (session) {
        session.lastActivity = Date.now();
        session.security.validationCount++;
        session.security.lastValidation = Date.now();
        
        await fs.writeFile(
          this.sessionPath,
          JSON.stringify(this.encryptSession(session), null, 2),
          { mode: 0o600 }
        );
        
        this.lastActivity = Date.now();
      }
    } catch (error) {
      this.emit('error', error);
      throw new Error(`Failed to update session activity: ${error.message}`);
    }
  }

  /**
   * Retrieves and decrypts current session
   * @returns {Promise<Object|null>} Session data or null if not found
   */
  async getSession() {
    try {
      const encryptedData = await fs.readFile(this.sessionPath, 'utf8');
      const sessionData = JSON.parse(encryptedData);
      return this.decryptSession(sessionData);
    } catch (error) {
      if (error.code === 'ENOENT') {
        return null; // No session file
      }
      throw new Error(`Failed to retrieve session: ${error.message}`);
    }
  }

  /**
   * Terminates current session
   * @param {string} reason - Reason for termination
   * @returns {Promise<boolean>} True if session was terminated
   */
  async terminateSession(reason = 'user_logout') {
    try {
      const session = await this.getSession();
      
      if (session) {
        this.emit('sessionTerminated', { 
          sessionId: session.id, 
          reason,
          duration: Date.now() - session.createdAt 
        });
      }

      // Stop validation timer
      this.stopValidationTimer();
      
      // Remove session file
      await fs.unlink(this.sessionPath);
      
      return true;
    } catch (error) {
      if (error.code === 'ENOENT') {
        return false; // No session to terminate
      }
      throw new Error(`Failed to terminate session: ${error.message}`);
    }
  }

  /**
   * Checks if an active session exists
   * @returns {Promise<boolean>} True if session exists
   */
  async hasActiveSession() {
    try {
      const validation = await this.validateSession();
      return validation.isValid;
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets session information without sensitive data
   * @returns {Promise<Object|null>} Session information
   */
  async getSessionInfo() {
    const session = await this.getSession();
    
    if (!session) {
      return null;
    }

    return {
      id: session.id,
      createdAt: new Date(session.createdAt),
      lastActivity: new Date(session.lastActivity),
      age: Date.now() - session.createdAt,
      idleTime: Date.now() - session.lastActivity,
      authMethod: session.authData.authMethod,
      userEmail: session.authData.userEmail,
      securityLevel: session.security.level,
      validationCount: session.security.validationCount,
      failedValidations: session.security.failedValidations
    };
  }

  /**
   * Generates system fingerprint for session validation
   * @returns {Promise<Object>} System fingerprint
   */
  async generateFingerprint() {
    const fingerprint = {};
    
    // Basic system information
    fingerprint.platform = process.platform;
    fingerprint.arch = process.arch;
    fingerprint.nodeVersion = process.version;
    
    // Hostname
    try {
      fingerprint.hostname = require('os').hostname();
    } catch (error) {
      fingerprint.hostname = 'unknown';
    }

    // Network interface MAC addresses (for device identification)
    try {
      const interfaces = networkInterfaces();
      const macs = [];
      
      for (const [name, addrs] of Object.entries(interfaces)) {
        for (const addr of addrs) {
          if (!addr.internal && addr.mac !== '00:00:00:00:00:00') {
            macs.push(addr.mac);
          }
        }
      }
      
      fingerprint.networkMacs = macs.sort();
    } catch (error) {
      fingerprint.networkMacs = [];
    }

    // Process information
    fingerprint.pid = process.pid;
    fingerprint.cwd = process.cwd();
    
    // Environment fingerprint (non-sensitive)
    fingerprint.shell = process.env.SHELL || process.env.COMSPEC || 'unknown';
    fingerprint.term = process.env.TERM || 'unknown';

    return fingerprint;
  }

  /**
   * Compares two fingerprints for session validation
   * @param {Object} stored - Stored fingerprint
   * @param {Object} current - Current fingerprint
   * @returns {Promise<Object>} Comparison result
   */
  async compareFingerprints(stored, current) {
    const differences = [];
    const criticalFactors = this.config.FINGERPRINT_FACTORS;
    
    for (const factor of criticalFactors) {
      if (stored[factor] !== current[factor]) {
        differences.push(factor);
      }
    }

    // Allow some variation based on security level
    let maxAllowedDifferences = 0;
    
    switch (this.config.SECURITY_LEVEL) {
      case 'basic':
        maxAllowedDifferences = 2;
        break;
      case 'standard':
        maxAllowedDifferences = 1;
        break;
      case 'strict':
        maxAllowedDifferences = 0;
        break;
    }

    return {
      isMatch: differences.length <= maxAllowedDifferences,
      differences,
      score: 1 - (differences.length / criticalFactors.length)
    };
  }

  /**
   * Gets current IP address
   * @returns {Promise<string>} Current IP address
   */
  async getCurrentIP() {
    try {
      const interfaces = networkInterfaces();
      
      for (const [name, addrs] of Object.entries(interfaces)) {
        for (const addr of addrs) {
          if (!addr.internal && addr.family === 'IPv4') {
            return addr.address;
          }
        }
      }
      
      return 'unknown';
    } catch (error) {
      return 'unknown';
    }
  }

  /**
   * Gets user agent string for the CLI
   * @returns {string} User agent
   */
  getUserAgent() {
    return `claude-cli/1.0 (${process.platform} ${process.arch}; Node.js ${process.version})`;
  }

  /**
   * Generates unique session ID
   * @returns {string} Session ID
   */
  generateSessionId() {
    const timestamp = Date.now().toString(36);
    const random = crypto.randomBytes(16).toString('hex');
    return `sess_${timestamp}_${random}`;
  }

  /**
   * Encrypts session data for storage
   * @param {Object} session - Session data to encrypt
   * @returns {Object} Encrypted session data
   */
  encryptSession(session) {
    const key = this.getEncryptionKey();
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
    
    let encrypted = cipher.update(JSON.stringify(session), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    return {
      encrypted: encrypted,
      iv: iv.toString('hex'),
      version: '1.0'
    };
  }

  /**
   * Decrypts session data from storage
   * @param {Object} encryptedData - Encrypted session data
   * @returns {Object} Decrypted session data
   */
  decryptSession(encryptedData) {
    const key = this.getEncryptionKey();
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key, 'hex'), Buffer.from(encryptedData.iv, 'hex'));
    
    let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return JSON.parse(decrypted);
  }

  /**
   * Gets encryption key for session storage
   * @returns {string} Encryption key
   */
  getEncryptionKey() {
    // Use system-specific information to generate key
    const systemInfo = `${process.platform}-${process.arch}-${homedir()}`;
    return crypto.createHash('sha256').update(systemInfo).digest('hex');
  }

  /**
   * Starts periodic session validation
   */
  startValidationTimer() {
    this.stopValidationTimer(); // Clear any existing timer
    
    this.validationTimer = setInterval(async () => {
      try {
        await this.validateSession();
      } catch (error) {
        this.emit('error', error);
      }
    }, this.config.VALIDATION_INTERVAL);
  }

  /**
   * Stops periodic session validation
   */
  stopValidationTimer() {
    if (this.validationTimer) {
      clearInterval(this.validationTimer);
      this.validationTimer = null;
    }
  }

  /**
   * Records user activity to prevent idle timeout
   */
  recordActivity() {
    this.lastActivity = Date.now();
    this.updateSessionActivity().catch(error => {
      this.emit('error', error);
    });
  }

  /**
   * Cleanup resources
   */
  cleanup() {
    this.stopValidationTimer();
    this.removeAllListeners();
  }
}

/**
 * Factory function to create session validator
 * @param {Object} config - Configuration overrides
 * @returns {SessionValidator} New session validator instance
 */
export function createSessionValidator(config = {}) {
  return new SessionValidator(config);
}

/**
 * Utility function to check if session is valid
 * @param {Object} config - Configuration overrides
 * @returns {Promise<boolean>} True if session is valid
 */
export async function isSessionValid(config = {}) {
  const validator = new SessionValidator(config);
  try {
    const result = await validator.validateSession();
    validator.cleanup();
    return result.isValid;
  } catch (error) {
    validator.cleanup();
    return false;
  }
}

export default SessionValidator;