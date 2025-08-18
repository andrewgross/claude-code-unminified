#!/usr/bin/env node
/**
 * Organized Humanify - Preserves originals and creates organized output structure
 * Creates a comprehensive workspace with before/after comparison capabilities
 */

const ContextualHumanifier = require('./contextual-humanify');
const fs = require('fs');
const path = require('path');

class OrganizedHumanifier extends ContextualHumanifier {
  constructor(projectDescription, outputDir = null) {
    super(projectDescription);
    this.outputDir = outputDir;
    this.workspace = null;
  }

  /**
   * Process file with organized output structure
   */
  async processWithOrganizedOutput(inputPath, projectDescription) {
    console.log('📂 ORGANIZED HUMANIFICATION WORKSPACE');
    console.log('=' .repeat(50));
    
    const inputName = path.basename(inputPath, '.js');
    this.workspace = this.outputDir || `${inputName}-humanified-workspace`;
    
    // Create organized workspace
    this.createWorkspace(inputPath);
    
    console.log(`📁 Workspace: ${this.workspace}/`);
    console.log(`📋 Project: "${projectDescription}"`);
    
    // Process with contextual naming
    const tempOutput = path.join(this.workspace, 'temp-output.js');
    await super.processFile(inputPath, tempOutput);
    
    // Organize outputs
    this.organizeOutputs(inputPath, tempOutput);
    
    // Create comparison views
    this.createComparisonViews(inputPath);
    
    // Create comprehensive report
    this.createComprehensiveReport(inputPath, projectDescription);
    
    // Clean up temp file
    fs.unlinkSync(tempOutput);
    
    this.printWorkspaceSummary();
    
    return this.workspace;
  }

  /**
   * Create organized workspace directory structure
   */
  createWorkspace(inputPath) {
    const inputName = path.basename(inputPath);
    
    // Create main workspace directory
    if (!fs.existsSync(this.workspace)) {
      fs.mkdirSync(this.workspace, { recursive: true });
    }
    
    // Create subdirectories
    const dirs = [
      'original',           // Original files (untouched)
      'humanified',         // Final humanified versions
      'analysis',           // Analysis reports and data
      'comparison',         // Side-by-side comparisons
      'metadata'           // Rename maps, statistics, etc.
    ];
    
    dirs.forEach(dir => {
      const dirPath = path.join(this.workspace, dir);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
      }
    });
    
    // Copy original file to preserve it
    const originalPath = path.join(this.workspace, 'original', inputName);
    fs.copyFileSync(inputPath, originalPath);
    
    console.log(`💾 Original preserved: original/${inputName}`);
  }

  /**
   * Organize processed outputs into structured format
   */
  organizeOutputs(inputPath, tempOutput) {
    const inputName = path.basename(inputPath);
    const baseName = path.basename(inputPath, '.js');
    
    // Read processed content
    const humanifiedContent = fs.readFileSync(tempOutput, 'utf-8');
    
    // Main humanified output
    const humanifiedPath = path.join(this.workspace, 'humanified', inputName);
    fs.writeFileSync(humanifiedPath, humanifiedContent);
    
    // Formatted versions
    this.createFormattedVersions(humanifiedContent, baseName);
    
    // Move metadata files
    this.moveMetadataFiles(baseName);
    
    console.log(`✨ Humanified saved: humanified/${inputName}`);
  }

  /**
   * Create different formatted versions of the output
   */
  createFormattedVersions(content, baseName) {
    const humanifiedDir = path.join(this.workspace, 'humanified');
    
    // Compact version (minimized whitespace but readable names)
    try {
      const compactContent = this.createCompactVersion(content);
      fs.writeFileSync(path.join(humanifiedDir, `${baseName}.compact.js`), compactContent);
    } catch (error) {
      console.warn('⚠️  Could not create compact version');
    }
    
    // Commented version (with rename explanations)
    const commentedContent = this.createCommentedVersion(content);
    fs.writeFileSync(path.join(humanifiedDir, `${baseName}.commented.js`), commentedContent);
    
    console.log(`📝 Additional formats: compact, commented versions created`);
  }

  /**
   * Create compact version with readable names but minimal formatting
   */
  createCompactVersion(content) {
    // Remove extra whitespace while keeping structure
    return content
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .join('\n');
  }

  /**
   * Create commented version with rename explanations
   */
  createCommentedVersion(content) {
    const lines = content.split('\n');
    const commentedLines = [];
    
    // Add header comment
    commentedLines.push('/**');
    commentedLines.push(' * HUMANIFIED CODE');
    commentedLines.push(` * Generated: ${new Date().toISOString()}`);
    commentedLines.push(` * Project: ${this.projectDescription}`);
    commentedLines.push(` * Total renames: ${this.globalRenameMap.size}`);
    commentedLines.push(' *');
    commentedLines.push(' * Key improvements:');
    commentedLines.push(' * - Meaningful variable names based on context');
    commentedLines.push(' * - Function names describe their purpose');
    commentedLines.push(' * - Consistent naming patterns throughout');
    commentedLines.push(' */');
    commentedLines.push('');
    
    // Add sample rename comments at strategic points
    let addedSample = false;
    lines.forEach((line, index) => {
      commentedLines.push(line);
      
      // Add sample comment for first significant rename
      if (!addedSample && this.containsSignificantRename(line)) {
        commentedLines.push(''); 
        commentedLines.push('// Examples of intelligent renames in this section:');
        let count = 0;
        for (const [oldName, newName] of this.globalRenameMap) {
          if (line.includes(newName) && count < 3) {
            commentedLines.push(`//   ${oldName} → ${newName}`);
            count++;
          }
        }
        commentedLines.push('');
        addedSample = true;
      }
    });
    
    return commentedLines.join('\n');
  }

  /**
   * Check if line contains a significant rename
   */
  containsSignificantRename(line) {
    for (const newName of this.globalRenameMap.values()) {
      if (line.includes(newName) && this.isSemanticName(newName)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Move metadata files to organized structure
   */
  moveMetadataFiles(baseName) {
    const metadataDir = path.join(this.workspace, 'metadata');
    
    // Find and move generated metadata files
    const possibleFiles = [
      `test-contextual-output-practical-rename-map.json`,
      `test-contextual-output-practical-quality.json`,
      `${baseName}-practical-rename-map.json`,
      `${baseName}-practical-quality.json`
    ];
    
    possibleFiles.forEach(filename => {
      if (fs.existsSync(filename)) {
        const newName = filename.replace('test-contextual-output-practical-', '').replace('-practical-', '-');
        fs.renameSync(filename, path.join(metadataDir, newName));
        console.log(`📊 Metadata moved: metadata/${newName}`);
      }
    });
  }

  /**
   * Create side-by-side comparison views
   */
  createComparisonViews(inputPath) {
    const comparisonDir = path.join(this.workspace, 'comparison');
    const inputName = path.basename(inputPath);
    const baseName = path.basename(inputPath, '.js');
    
    // Create HTML comparison view
    this.createHTMLComparison(inputPath, baseName, comparisonDir);
    
    // Create text diff view
    this.createTextComparison(inputPath, baseName, comparisonDir);
    
    console.log(`🔍 Comparisons created: comparison/${baseName}.html and .diff`);
  }

  /**
   * Create HTML side-by-side comparison
   */
  createHTMLComparison(inputPath, baseName, comparisonDir) {
    const originalContent = fs.readFileSync(inputPath, 'utf-8');
    const humanifiedPath = path.join(this.workspace, 'humanified', path.basename(inputPath));
    const humanifiedContent = fs.readFileSync(humanifiedPath, 'utf-8');
    
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${baseName} - Before/After Comparison</title>
    <style>
        body {
            font-family: 'Courier New', monospace;
            margin: 0;
            padding: 20px;
            background: #f5f5f5;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .comparison {
            display: flex;
            gap: 20px;
            height: 80vh;
        }
        .panel {
            flex: 1;
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .panel-header {
            background: #333;
            color: white;
            padding: 15px;
            font-weight: bold;
            font-size: 16px;
        }
        .original .panel-header {
            background: #d32f2f;
        }
        .humanified .panel-header {
            background: #388e3c;
        }
        .code {
            padding: 20px;
            height: calc(100% - 60px);
            overflow: auto;
            white-space: pre;
            font-size: 12px;
            line-height: 1.4;
        }
        .stats {
            margin-top: 20px;
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .stats h3 {
            margin-top: 0;
            color: #333;
        }
        .rename-example {
            background: #e8f5e8;
            padding: 10px;
            margin: 5px 0;
            border-radius: 5px;
            font-family: monospace;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>${baseName} - Humanification Comparison</h1>
        <p><strong>Project:</strong> ${this.projectDescription}</p>
        <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
    </div>
    
    <div class="comparison">
        <div class="panel original">
            <div class="panel-header">📄 Original (Minified)</div>
            <div class="code">${this.escapeHtml(originalContent.substring(0, 50000))}</div>
        </div>
        <div class="panel humanified">
            <div class="panel-header">✨ Humanified</div>
            <div class="code">${this.escapeHtml(humanifiedContent.substring(0, 50000))}</div>
        </div>
    </div>
    
    <div class="stats">
        <h3>📊 Transformation Statistics</h3>
        <p><strong>Total renames:</strong> ${this.globalRenameMap.size}</p>
        <p><strong>Semantic quality:</strong> ${Math.round((this.nameQualityStats.semantic / (this.nameQualityStats.semantic + this.nameQualityStats.contextual + this.nameQualityStats.generic)) * 100)}%</p>
        
        <h4>🎯 Example Renames:</h4>
        ${Array.from(this.globalRenameMap.entries()).slice(0, 10).map(([old, renamed]) => 
          `<div class="rename-example">${old} → ${renamed}</div>`
        ).join('')}
    </div>
</body>
</html>`;
    
    fs.writeFileSync(path.join(comparisonDir, `${baseName}.html`), html);
  }

  /**
   * Create text-based diff comparison
   */
  createTextComparison(inputPath, baseName, comparisonDir) {
    const originalContent = fs.readFileSync(inputPath, 'utf-8');
    const humanifiedPath = path.join(this.workspace, 'humanified', path.basename(inputPath));
    const humanifiedContent = fs.readFileSync(humanifiedPath, 'utf-8');
    
    const originalLines = originalContent.split('\n');
    const humanifiedLines = humanifiedContent.split('\n');
    
    let diff = `DIFF: ${baseName} - Original vs Humanified\n`;
    diff += `Generated: ${new Date().toISOString()}\n`;
    diff += `Project: ${this.projectDescription}\n`;
    diff += `${'='.repeat(60)}\n\n`;
    
    // Show first 50 lines with changes highlighted
    const maxLines = Math.min(50, Math.max(originalLines.length, humanifiedLines.length));
    
    for (let i = 0; i < maxLines; i++) {
      const originalLine = originalLines[i] || '';
      const humanifiedLine = humanifiedLines[i] || '';
      
      if (originalLine !== humanifiedLine) {
        diff += `Line ${i + 1}:\n`;
        diff += `- ${originalLine}\n`;
        diff += `+ ${humanifiedLine}\n\n`;
      }
    }
    
    fs.writeFileSync(path.join(comparisonDir, `${baseName}.diff`), diff);
  }

  /**
   * Create comprehensive report
   */
  createComprehensiveReport(inputPath, projectDescription) {
    const analysisDir = path.join(this.workspace, 'analysis');
    const inputName = path.basename(inputPath);
    const inputStats = fs.statSync(inputPath);
    
    const report = {
      metadata: {
        timestamp: new Date().toISOString(),
        inputFile: inputName,
        inputSize: inputStats.size,
        projectDescription: projectDescription,
        toolVersion: '1.0.0'
      },
      
      processing: {
        totalIdentifiers: this.globalRenameMap.size,
        processingTime: Date.now() - this.startTime,
        contextPatterns: Object.keys(this.contextPatterns || {}),
        qualityMetrics: this.nameQualityStats
      },
      
      namingAnalysis: {
        semanticNames: this.nameQualityStats.semantic,
        contextualNames: this.nameQualityStats.contextual,
        genericNames: this.nameQualityStats.generic,
        semanticPercentage: Math.round((this.nameQualityStats.semantic / this.globalRenameMap.size) * 100),
        topRenames: Array.from(this.globalRenameMap.entries()).slice(0, 20)
      },
      
      recommendations: this.generateRecommendations(),
      
      workspace: {
        structure: {
          'original/': 'Preserved original files',
          'humanified/': 'Processed output files',
          'comparison/': 'Before/after comparisons',
          'metadata/': 'Rename maps and statistics',
          'analysis/': 'Comprehensive reports'
        }
      }
    };
    
    // Save comprehensive report
    fs.writeFileSync(
      path.join(analysisDir, 'comprehensive-report.json'),
      JSON.stringify(report, null, 2)
    );
    
    // Save human-readable summary
    this.createHumanReadableSummary(report, analysisDir);
    
    console.log(`📋 Analysis complete: analysis/comprehensive-report.json`);
  }

  /**
   * Generate improvement recommendations
   */
  generateRecommendations() {
    const recommendations = [];
    
    const semanticPercentage = Math.round((this.nameQualityStats.semantic / this.globalRenameMap.size) * 100);
    
    if (semanticPercentage < 70) {
      recommendations.push('Consider using LLM-based naming for higher semantic quality');
    }
    
    if (Object.keys(this.contextPatterns || {}).length === 0) {
      recommendations.push('Provide more detailed project description for better context-aware naming');
    }
    
    if (this.globalRenameMap.size > 1000) {
      recommendations.push('Consider processing in chunks for better performance on large files');
    }
    
    recommendations.push('Review comparison files to verify naming accuracy');
    recommendations.push('Consider manual refinement of key function names');
    
    return recommendations;
  }

  /**
   * Create human-readable summary
   */
  createHumanReadableSummary(report, analysisDir) {
    let summary = `# Humanification Summary\n\n`;
    summary += `**File:** ${report.metadata.inputFile}\n`;
    summary += `**Size:** ${(report.metadata.inputSize / 1024).toFixed(1)}KB\n`;
    summary += `**Project:** ${report.metadata.projectDescription}\n`;
    summary += `**Generated:** ${new Date(report.metadata.timestamp).toLocaleString()}\n\n`;
    
    summary += `## 📊 Results\n\n`;
    summary += `- **Total renames:** ${report.processing.totalIdentifiers}\n`;
    summary += `- **Processing time:** ${(report.processing.processingTime / 1000).toFixed(1)}s\n`;
    summary += `- **Semantic quality:** ${report.namingAnalysis.semanticPercentage}%\n\n`;
    
    summary += `## 🎯 Quality Breakdown\n\n`;
    summary += `- **Semantic names:** ${report.namingAnalysis.semanticNames} (${Math.round((report.namingAnalysis.semanticNames/report.processing.totalIdentifiers)*100)}%)\n`;
    summary += `- **Contextual names:** ${report.namingAnalysis.contextualNames} (${Math.round((report.namingAnalysis.contextualNames/report.processing.totalIdentifiers)*100)}%)\n`;
    summary += `- **Generic names:** ${report.namingAnalysis.genericNames} (${Math.round((report.namingAnalysis.genericNames/report.processing.totalIdentifiers)*100)}%)\n\n`;
    
    summary += `## 🏆 Top Renames\n\n`;
    report.namingAnalysis.topRenames.forEach(([old, renamed], index) => {
      summary += `${index + 1}. \`${old}\` → \`${renamed}\`\n`;
    });
    
    summary += `\n## 💡 Recommendations\n\n`;
    report.recommendations.forEach(rec => {
      summary += `- ${rec}\n`;
    });
    
    summary += `\n## 📁 Workspace Structure\n\n`;
    Object.entries(report.workspace.structure).forEach(([dir, desc]) => {
      summary += `- **${dir}** ${desc}\n`;
    });
    
    fs.writeFileSync(path.join(analysisDir, 'SUMMARY.md'), summary);
  }

  /**
   * Print workspace summary
   */
  printWorkspaceSummary() {
    console.log('\n📂 ORGANIZED WORKSPACE COMPLETE!');
    console.log('=' .repeat(50));
    console.log(`📁 Workspace: ${this.workspace}/`);
    console.log('');
    console.log('📋 Directory structure:');
    console.log('   📄 original/     - Preserved original files');
    console.log('   ✨ humanified/   - Processed outputs (multiple formats)');
    console.log('   🔍 comparison/   - Before/after views (HTML + diff)');
    console.log('   📊 metadata/     - Rename maps and statistics'); 
    console.log('   📋 analysis/     - Comprehensive reports');
    console.log('');
    console.log('🚀 Next steps:');
    console.log(`   1. Open ${this.workspace}/comparison/*.html for visual comparison`);
    console.log(`   2. Review ${this.workspace}/analysis/SUMMARY.md for detailed report`);
    console.log(`   3. Use ${this.workspace}/humanified/*.js as your cleaned code`);
    console.log(`   4. Check ${this.workspace}/metadata/ for rename mappings`);
  }

  /**
   * Utility: Escape HTML characters
   */
  escapeHtml(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

function showUsage() {
  console.log('📂 Organized Humanify - Complete Workspace Generation');
  console.log('=' .repeat(55));
  console.log('Usage:');
  console.log('  node organized-humanify.js <input-file> "project description" [workspace-dir]');
  console.log('');
  console.log('Examples:');
  console.log('  node organized-humanify.js cli.js "Node.js CLI tool" cli-workspace');
  console.log('  node organized-humanify.js app.min.js "React e-commerce app"');
  console.log('');
  console.log('Creates organized workspace with:');
  console.log('  • Original files preserved');
  console.log('  • Multiple output formats');
  console.log('  • Before/after comparisons');
  console.log('  • Comprehensive analysis reports');
  console.log('  • Rename maps and statistics');
}

async function main() {
  if (process.argv.length < 4) {
    showUsage();
    process.exit(1);
  }

  const inputFile = process.argv[2];
  const projectDescription = process.argv[3];
  const workspaceDir = process.argv[4];
  
  if (!fs.existsSync(inputFile)) {
    console.error(`❌ Input file not found: ${inputFile}`);
    process.exit(1);
  }
  
  try {
    const humanifier = new OrganizedHumanifier(projectDescription, workspaceDir);
    await humanifier.processWithOrganizedOutput(inputFile, projectDescription);
  } catch (error) {
    console.error('❌ ORGANIZED HUMANIFICATION FAILED:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = OrganizedHumanifier;