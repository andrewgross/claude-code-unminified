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