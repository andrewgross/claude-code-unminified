/**
 * Utility Commands for Claude Code CLI
 * 
 * Provides utility commands for setup, maintenance, and system management
 * including token setup, health checks, updates, and installation management.
 * 
 * Extracted from: chunk_0649.js:619-664 (original bundled implementation)
 */

import { Command } from 'commander';
import { tokenManager } from '../../core/auth/token.js';
import { SystemDoctor } from '../../utils/doctor.js';
import { UpdateManager } from '../../utils/updater.js';
import { InstallManager } from '../../utils/installer.js';
import { MigrationManager } from '../../utils/migration.js';
import { sessionPersistence } from '../../core/sessions/persistence.js';

/**
 * Add utility subcommands to the main program
 * 
 * @param {Command} program - The main commander program
 */
export function utilityCommands(program) {
    // Token setup command
    program
        .command('setup-token')
        .description('Set up a long-lived authentication token (requires Claude subscription)')
        .helpOption('-h, --help', 'Display help for command')
        .action(async () => {
            await setupToken();
        });

    // System health check command
    program
        .command('doctor')
        .description('Check the health of your Claude Code auto-updater')
        .helpOption('-h, --help', 'Display help for command')
        .action(async () => {
            await runDoctor();
        });

    // Update command
    program
        .command('update')
        .description('Check for updates and install if available')
        .helpOption('-h, --help', 'Display help for command')
        .action(async () => {
            await checkAndUpdate();
        });

    // Install command
    program
        .command('install [target]')
        .description('Install Claude Code native build. Use [target] to specify version (stable, latest, or specific version)')
        .option('--force', 'Force installation even if already installed')
        .helpOption('-h, --help', 'Display help for command')
        .action(async (target, options) => {
            await installVersion(target, options);
        });

    // Migration command
    program
        .command('migrate-installer')
        .description('Migrate from global npm installation to local installation')
        .helpOption('-h, --help', 'Display help for command')
        .action(async () => {
            await migrateInstaller();
        });

    // Session management commands
    const sessionsCommand = program
        .command('sessions')
        .description('Manage conversation sessions');

    sessionsCommand
        .command('list')
        .description('List saved conversation sessions')
        .option('-a, --archived', 'Include archived sessions')
        .option('-l, --limit <number>', 'Limit number of sessions shown', '20')
        .helpOption('-h, --help', 'Display help for command')
        .action(async (options) => {
            await listSessions(options);
        });

    sessionsCommand
        .command('show <sessionId>')
        .description('Show details of a specific session')
        .helpOption('-h, --help', 'Display help for command')
        .action(async (sessionId) => {
            await showSession(sessionId);
        });

    sessionsCommand
        .command('delete <sessionId>')
        .description('Delete a conversation session')
        .helpOption('-h, --help', 'Display help for command')
        .action(async (sessionId) => {
            await deleteSession(sessionId);
        });

    sessionsCommand
        .command('archive <sessionId>')
        .description('Archive a conversation session')
        .helpOption('-h, --help', 'Display help for command')
        .action(async (sessionId) => {
            await archiveSession(sessionId);
        });

    sessionsCommand
        .command('cleanup')
        .description('Clean up old sessions (applies retention policy)')
        .helpOption('-h, --help', 'Display help for command')
        .action(async () => {
            await cleanupSessions();
        });

    sessionsCommand
        .command('stats')
        .description('Show session storage statistics')
        .helpOption('-h, --help', 'Display help for command')
        .action(async () => {
            await showSessionStats();
        });
}

/**
 * Set up authentication token
 */
async function setupToken() {
    try {
        await tokenManager.setupInteractive();
    } catch (error) {
        console.error(`Error setting up token: ${error.message}`);
        process.exit(1);
    }
}

/**
 * Run system health diagnostics
 */
async function runDoctor() {
    try {
        const doctor = new SystemDoctor();
        const results = await doctor.runDiagnostics();
        
        console.log('System Health Check Results:');
        console.log('============================');
        
        for (const check of results.checks) {
            const status = check.passed ? '✓' : '✗';
            const color = check.passed ? '\x1b[32m' : '\x1b[31m'; // Green or red
            const reset = '\x1b[0m';
            
            console.log(`${color}${status}${reset} ${check.name}: ${check.message}`);
            
            if (check.details) {
                console.log(`   ${check.details}`);
            }
        }
        
        console.log(`\nOverall Status: ${results.overall.passed ? 'HEALTHY' : 'ISSUES FOUND'}`);
        
        if (!results.overall.passed) {
            console.log('\nRecommended actions:');
            for (const action of results.recommendations) {
                console.log(`- ${action}`);
            }
            process.exit(1);
        }
    } catch (error) {
        console.error(`Error running system diagnostics: ${error.message}`);
        process.exit(1);
    }
}

/**
 * Check for and install updates
 */
async function checkAndUpdate() {
    try {
        const updateManager = new UpdateManager();
        
        console.log('Checking for updates...');
        const updateAvailable = await updateManager.checkForUpdates();
        
        if (!updateAvailable) {
            console.log('Claude Code is already up to date');
            return;
        }
        
        console.log(`Update available: ${updateAvailable.version}`);
        console.log('Installing update...');
        
        await updateManager.installUpdate();
        console.log('Update installed successfully');
        
        // Restart may be required
        if (updateAvailable.requiresRestart) {
            console.log('Please restart Claude Code to complete the update');
        }
    } catch (error) {
        console.error(`Error updating Claude Code: ${error.message}`);
        process.exit(1);
    }
}

/**
 * Install a specific version of Claude Code
 */
async function installVersion(target, options) {
    try {
        const installManager = new InstallManager();
        
        // Default to 'stable' if no target specified
        const version = target || 'stable';
        
        console.log(`Installing Claude Code ${version}...`);
        
        const result = await installManager.install(version, {
            force: options.force
        });
        
        if (result.alreadyInstalled && !options.force) {
            console.log(`Claude Code ${version} is already installed`);
            console.log('Use --force to reinstall');
            return;
        }
        
        console.log(`Successfully installed Claude Code ${result.installedVersion}`);
        
        // Show any post-installation notes
        if (result.notes) {
            console.log('\nInstallation Notes:');
            for (const note of result.notes) {
                console.log(`- ${note}`);
            }
        }
    } catch (error) {
        console.error(`Error installing Claude Code: ${error.message}`);
        process.exit(1);
    }
}

/**
 * Migrate from global npm installation to local installation
 */
async function migrateInstaller() {
    try {
        const migrationManager = new MigrationManager();
        
        console.log('Checking for existing global installation...');
        const migrationNeeded = await migrationManager.checkMigrationNeeded();
        
        if (!migrationNeeded) {
            console.log('No migration needed - Claude Code is already using local installation');
            return;
        }
        
        console.log('Migrating from global npm installation to local installation...');
        const result = await migrationManager.migrate();
        
        console.log('Migration completed successfully:');
        for (const step of result.completedSteps) {
            console.log(`✓ ${step}`);
        }
        
        if (result.warnings.length > 0) {
            console.log('\nWarnings:');
            for (const warning of result.warnings) {
                console.log(`⚠ ${warning}`);
            }
        }
        
        console.log('\nNext steps:');
        for (const step of result.nextSteps) {
            console.log(`- ${step}`);
        }
    } catch (error) {
        console.error(`Error during migration: ${error.message}`);
        process.exit(1);
    }
}

/**
 * List saved conversation sessions
 */
async function listSessions(options) {
    try {
        const sessions = await sessionPersistence.listSessions({
            archived: options.archived,
            limit: parseInt(options.limit)
        });

        if (sessions.length === 0) {
            if (options.archived) {
                console.log('No sessions found (including archived sessions)');
            } else {
                console.log('No active sessions found. Use --archived to see archived sessions.');
            }
            return;
        }

        console.log(`Found ${sessions.length} session${sessions.length === 1 ? '' : 's'}:\n`);

        for (const session of sessions) {
            const date = new Date(session.updatedAt).toLocaleDateString();
            const time = new Date(session.updatedAt).toLocaleTimeString();
            const messages = `${session.messageCount} messages`;
            const size = `${Math.round(session.size / 1024)}KB`;
            const status = session.archived ? '📁' : '💬';
            
            console.log(`${status} ${session.id}`);
            console.log(`   Title: ${session.title}`);
            console.log(`   Updated: ${date} ${time}`);
            console.log(`   Model: ${session.model}`);
            console.log(`   Content: ${messages}, ${size}`);
            console.log();
        }

        // Show statistics
        const stats = await sessionPersistence.getStorageStats();
        console.log(`Total sessions: ${stats.totalSessions} (${stats.activeSessions} active, ${stats.archivedSessions} archived)`);
        console.log(`Total storage: ${Math.round(stats.totalSize / 1024)}KB`);

    } catch (error) {
        console.error(`Error listing sessions: ${error.message}`);
        process.exit(1);
    }
}

/**
 * Show details of a specific session
 */
async function showSession(sessionId) {
    try {
        const sessionData = await sessionPersistence.loadSession(sessionId);
        
        if (!sessionData) {
            console.log(`Session '${sessionId}' not found`);
            process.exit(1);
        }

        console.log(`Session: ${sessionId}`);
        console.log('=====================================');
        console.log(`Title: ${sessionData.metadata.title || 'Untitled'}`);
        console.log(`Created: ${new Date(sessionData.conversation.timestamp).toLocaleString()}`);
        console.log(`Model: ${sessionData.conversation.model}`);
        console.log(`Messages: ${sessionData.conversation.messages.length}`);
        console.log(`Size: ${Math.round(JSON.stringify(sessionData).length / 1024)}KB`);
        
        if (sessionData.metadata.tags && sessionData.metadata.tags.length > 0) {
            console.log(`Tags: ${sessionData.metadata.tags.join(', ')}`);
        }
        
        console.log(`Archived: ${sessionData.metadata.archived ? 'Yes' : 'No'}`);
        console.log();

        // Show message history
        if (sessionData.conversation.messages.length > 0) {
            console.log('Message History:');
            console.log('================');
            
            sessionData.conversation.messages.forEach((message, index) => {
                const role = message.role === 'user' ? 'You' : 'Claude';
                const timestamp = new Date(message.timestamp).toLocaleTimeString();
                const preview = message.content.substring(0, 100);
                const truncated = message.content.length > 100 ? '...' : '';
                
                console.log(`${index + 1}. [${timestamp}] ${role}: ${preview}${truncated}`);
            });
        }

    } catch (error) {
        console.error(`Error showing session: ${error.message}`);
        process.exit(1);
    }
}

/**
 * Delete a conversation session
 */
async function deleteSession(sessionId) {
    try {
        const deleted = await sessionPersistence.deleteSession(sessionId);
        
        if (deleted) {
            console.log(`✅ Session '${sessionId}' deleted successfully`);
        } else {
            console.log(`Session '${sessionId}' not found`);
            process.exit(1);
        }

    } catch (error) {
        console.error(`Error deleting session: ${error.message}`);
        process.exit(1);
    }
}

/**
 * Archive a conversation session
 */
async function archiveSession(sessionId) {
    try {
        const archived = await sessionPersistence.archiveSession(sessionId);
        
        if (archived) {
            console.log(`✅ Session '${sessionId}' archived successfully`);
        } else {
            console.log(`Session '${sessionId}' not found`);
            process.exit(1);
        }

    } catch (error) {
        console.error(`Error archiving session: ${error.message}`);
        process.exit(1);
    }
}

/**
 * Clean up old sessions
 */
async function cleanupSessions() {
    try {
        console.log('Cleaning up old sessions...');
        const cleanedUp = await sessionPersistence.cleanup();
        
        if (cleanedUp > 0) {
            console.log(`✅ Cleaned up ${cleanedUp} old session${cleanedUp === 1 ? '' : 's'}`);
        } else {
            console.log('No old sessions to clean up');
        }

        // Show updated statistics
        const stats = await sessionPersistence.getStorageStats();
        console.log(`Remaining sessions: ${stats.totalSessions}`);
        console.log(`Storage usage: ${Math.round(stats.totalSize / 1024)}KB`);

    } catch (error) {
        console.error(`Error cleaning up sessions: ${error.message}`);
        process.exit(1);
    }
}

/**
 * Show session storage statistics
 */
async function showSessionStats() {
    try {
        const stats = await sessionPersistence.getStorageStats();
        
        console.log('Session Storage Statistics:');
        console.log('===========================');
        console.log(`Total sessions: ${stats.totalSessions}`);
        console.log(`Active sessions: ${stats.activeSessions}`);
        console.log(`Archived sessions: ${stats.archivedSessions}`);
        console.log(`Total messages: ${stats.totalMessages}`);
        console.log(`Total storage: ${Math.round(stats.totalSize / 1024)}KB`);
        
        if (stats.oldestSession) {
            console.log(`Oldest session: ${new Date(stats.oldestSession).toLocaleDateString()}`);
        }
        
        if (stats.newestSession) {
            console.log(`Most recent: ${new Date(stats.newestSession).toLocaleDateString()}`);
        }

        // Storage breakdown
        if (stats.totalSessions > 0) {
            const avgSize = Math.round(stats.totalSize / stats.totalSessions / 1024);
            const avgMessages = Math.round(stats.totalMessages / stats.totalSessions);
            
            console.log();
            console.log('Averages:');
            console.log(`- ${avgSize}KB per session`);
            console.log(`- ${avgMessages} messages per session`);
        }

    } catch (error) {
        console.error(`Error getting session statistics: ${error.message}`);
        process.exit(1);
    }
}