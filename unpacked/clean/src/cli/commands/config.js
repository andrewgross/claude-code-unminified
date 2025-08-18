/**
 * Configuration Commands for Claude Code CLI
 * 
 * Provides commands for managing Claude Code configuration settings
 * including getting, setting, removing, listing, and adding configuration values.
 * 
 * Extracted from: chunk_0649.js:368-420 (original bundled implementation)
 */

import { Command } from 'commander';
import { ConfigManager } from '../../config/manager.js';

/**
 * Add configuration subcommands to the main program
 * 
 * @param {Command} program - The main commander program
 */
export function configCommands(program) {
    const configCommand = program
        .command('config')
        .description('Manage configuration (eg. claude config set -g theme dark)')
        .helpOption('-h, --help', 'Display help for command');

    // Get config value
    configCommand
        .command('get <key>')
        .description('Get a config value')
        .option('-g, --global', 'Use global config')
        .helpOption('-h, --help', 'Display help for command')
        .action(async (key, options) => {
            await getConfigValue(key, options);
        });

    // Set config value
    configCommand
        .command('set <key> <value>')
        .description('Set a config value')
        .option('-g, --global', 'Use global config')
        .helpOption('-h, --help', 'Display help for command')
        .action(async (key, value, options) => {
            await setConfigValue(key, value, options);
        });

    // Remove config value or array items
    configCommand
        .command('remove <key> [values...]')
        .alias('rm')
        .description('Remove a config value or items from a config array')
        .option('-g, --global', 'Use global config')
        .helpOption('-h, --help', 'Display help for command')
        .action(async (key, values, options) => {
            await removeConfigValue(key, values, options);
        });

    // List all config values
    configCommand
        .command('list')
        .alias('ls')
        .description('List all config values')
        .option('-g, --global', 'Use global config', false)
        .helpOption('-h, --help', 'Display help for command')
        .action(async (options) => {
            await listConfigValues(options);
        });

    // Add items to config array
    configCommand
        .command('add <key> <values...>')
        .description('Add items to a config array (space or comma separated)')
        .option('-g, --global', 'Use global config')
        .helpOption('-h, --help', 'Display help for command')
        .action(async (key, values, options) => {
            await addConfigValues(key, values, options);
        });
}

/**
 * Get a configuration value
 */
async function getConfigValue(key, options) {
    try {
        const configManager = new ConfigManager();
        const value = await configManager.get(key, options.global);
        
        if (value !== undefined) {
            if (typeof value === 'object') {
                console.log(JSON.stringify(value, null, 2));
            } else {
                console.log(value);
            }
        } else {
            console.log(`Configuration key "${key}" not found`);
            process.exit(1);
        }
    } catch (error) {
        console.error(`Error getting config value: ${error.message}`);
        process.exit(1);
    }
}

/**
 * Set a configuration value
 */
async function setConfigValue(key, value, options) {
    try {
        const configManager = new ConfigManager();
        
        // Attempt to parse JSON values
        let parsedValue = value;
        if (value.startsWith('{') || value.startsWith('[') || value === 'true' || value === 'false' || !isNaN(value)) {
            try {
                parsedValue = JSON.parse(value);
            } catch {
                // Keep as string if JSON parsing fails
            }
        }
        
        await configManager.set(key, parsedValue, options.global);
        console.log(`Set ${options.global ? 'global' : 'local'} config "${key}" to: ${value}`);
    } catch (error) {
        console.error(`Error setting config value: ${error.message}`);
        process.exit(1);
    }
}

/**
 * Remove a configuration value or array items
 */
async function removeConfigValue(key, values, options) {
    try {
        const configManager = new ConfigManager();
        
        if (values && values.length > 0) {
            // Remove specific items from array
            await configManager.removeFromArray(key, values, options.global);
            console.log(`Removed items from ${options.global ? 'global' : 'local'} config array "${key}": ${values.join(', ')}`);
        } else {
            // Remove entire key
            await configManager.remove(key, options.global);
            console.log(`Removed ${options.global ? 'global' : 'local'} config key: "${key}"`);
        }
    } catch (error) {
        console.error(`Error removing config value: ${error.message}`);
        process.exit(1);
    }
}

/**
 * List all configuration values
 */
async function listConfigValues(options) {
    try {
        const configManager = new ConfigManager();
        const config = await configManager.getAll(options.global);
        
        if (Object.keys(config).length === 0) {
            console.log(`No ${options.global ? 'global' : 'local'} configuration values found`);
            return;
        }
        
        console.log(`${options.global ? 'Global' : 'Local'} Configuration:`);
        console.log(JSON.stringify(config, null, 2));
    } catch (error) {
        console.error(`Error listing config values: ${error.message}`);
        process.exit(1);
    }
}

/**
 * Add values to a configuration array
 */
async function addConfigValues(key, values, options) {
    try {
        const configManager = new ConfigManager();
        
        // Parse comma-separated values
        const parsedValues = values.flatMap(value => 
            value.includes(',') ? value.split(',') : [value]
        ).map(value => value.trim()).filter(Boolean);
        
        await configManager.addToArray(key, parsedValues, options.global);
        console.log(`Added to ${options.global ? 'global' : 'local'} config array "${key}": ${parsedValues.join(', ')}`);
    } catch (error) {
        console.error(`Error adding config values: ${error.message}`);
        process.exit(1);
    }
}