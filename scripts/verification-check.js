#!/usr/bin/env node

/**
 * Verification check script for Music Streaming Platform
 * Verifies that all required components and features are present
 */

const fs = require('fs');
const path = require('path');

const REQUIRED_COMPONENTS = [
  'src/components/Player/Player.tsx',
  'src/components/Search/SearchBar.tsx',
  'src/components/Playlist/SongList.tsx',
  'src/components/Playlist/PlaylistCard.tsx',
  'src/components/Artist/ArtistCard.tsx',
  'src/components/Layout/Navbar.tsx',
];

const REQUIRED_PAGES = [
  'src/pages/Home.tsx',
  'src/pages/Search.tsx',
  'src/pages/Auth/Login.tsx',
  'src/pages/Auth/Signup.tsx',
  'src/pages/Playlist.tsx',
  'src/pages/Album.tsx',
  'src/pages/Artist.tsx',
  'src/pages/Settings.tsx',
];

const REQUIRED_CONTEXTS = [
  'src/contexts/PlayerContext.tsx',
  'src/contexts/AuthContext.tsx',
  'src/contexts/ThemeContext.tsx',
  'src/contexts/PlaylistContext.tsx',
];

const REQUIRED_SERVICES = [
  'src/services/api.ts',
  'src/services/config.ts',
];

const REQUIRED_CONFIG_FILES = [
  'package.json',
  'tsconfig.json',
  'vite.config.ts',
  'tailwind.config.js',
  'jest.config.js',
  'eslint.config.js',
];

const REQUIRED_DOCS = [
  'README.md',
  'CONTRIBUTING.md',
  'LICENSE',
  'CODE_OF_CONDUCT.md',
];

const REQUIRED_GITHUB_FILES = [
  '.github/workflows/ci.yml',
  '.github/ISSUE_TEMPLATE.md',
  '.github/PULL_REQUEST_TEMPLATE.md',
];

function checkFileExists(filePath) {
  try {
    return fs.existsSync(path.join(process.cwd(), filePath));
  } catch (error) {
    return false;
  }
}

function checkPackageJsonScripts() {
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const requiredScripts = [
      'dev',
      'build',
      'test',
      'lint',
      'mock',
      'verification-ready'
    ];
    
    const missingScripts = requiredScripts.filter(script => !packageJson.scripts[script]);
    return {
      valid: missingScripts.length === 0,
      missing: missingScripts
    };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

function generateReport() {
  const report = {
    timestamp: new Date().toISOString(),
    components: {},
    pages: {},
    contexts: {},
    services: {},
    config: {},
    docs: {},
    github: {},
    scripts: {},
    summary: {
      total: 0,
      passed: 0,
      failed: 0
    }
  };

  // Check components
  REQUIRED_COMPONENTS.forEach(component => {
    const exists = checkFileExists(component);
    report.components[component] = exists;
    report.summary.total++;
    if (exists) report.summary.passed++;
    else report.summary.failed++;
  });

  // Check pages
  REQUIRED_PAGES.forEach(page => {
    const exists = checkFileExists(page);
    report.pages[page] = exists;
    report.summary.total++;
    if (exists) report.summary.passed++;
    else report.summary.failed++;
  });

  // Check contexts
  REQUIRED_CONTEXTS.forEach(context => {
    const exists = checkFileExists(context);
    report.contexts[context] = exists;
    report.summary.total++;
    if (exists) report.summary.passed++;
    else report.summary.failed++;
  });

  // Check services
  REQUIRED_SERVICES.forEach(service => {
    const exists = checkFileExists(service);
    report.services[service] = exists;
    report.summary.total++;
    if (exists) report.summary.passed++;
    else report.summary.failed++;
  });

  // Check config files
  REQUIRED_CONFIG_FILES.forEach(config => {
    const exists = checkFileExists(config);
    report.config[config] = exists;
    report.summary.total++;
    if (exists) report.summary.passed++;
    else report.summary.failed++;
  });

  // Check documentation
  REQUIRED_DOCS.forEach(doc => {
    const exists = checkFileExists(doc);
    report.docs[doc] = exists;
    report.summary.total++;
    if (exists) report.summary.passed++;
    else report.summary.failed++;
  });

  // Check GitHub files
  REQUIRED_GITHUB_FILES.forEach(file => {
    const exists = checkFileExists(file);
    report.github[file] = exists;
    report.summary.total++;
    if (exists) report.summary.passed++;
    else report.summary.failed++;
  });

  // Check package.json scripts
  const scriptsCheck = checkPackageJsonScripts();
  report.scripts = scriptsCheck;
  report.summary.total++;
  if (scriptsCheck.valid) report.summary.passed++;
  else report.summary.failed++;

  return report;
}

function printReport(report) {
  console.log('\n🎵 Music Streaming Platform - Verification Report\n');
  console.log('='.repeat(50));
  
  const { passed, failed, total } = report.summary;
  const percentage = Math.round((passed / total) * 100);
  
  console.log(`📊 Summary: ${passed}/${total} checks passed (${percentage}%)\n`);
  
  if (failed === 0) {
    console.log('✅ All verification checks passed!');
  } else {
    console.log(`❌ ${failed} checks failed\n`);
  }

  // Print detailed results
  const sections = [
    { name: 'Components', data: report.components },
    { name: 'Pages', data: report.pages },
    { name: 'Contexts', data: report.contexts },
    { name: 'Services', data: report.services },
    { name: 'Configuration', data: report.config },
    { name: 'Documentation', data: report.docs },
    { name: 'GitHub Files', data: report.github },
  ];

  sections.forEach(section => {
    console.log(`\n📁 ${section.name}:`);
    Object.entries(section.data).forEach(([file, exists]) => {
      const status = exists ? '✅' : '❌';
      console.log(`  ${status} ${file}`);
    });
  });

  console.log('\n📜 Package.json Scripts:');
  if (report.scripts.valid) {
    console.log('  ✅ All required scripts present');
  } else {
    console.log('  ❌ Missing scripts:', report.scripts.missing?.join(', ') || 'Unknown error');
    if (report.scripts.error) {
      console.log('  Error:', report.scripts.error);
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`Generated at: ${report.timestamp}`);
  
  return failed === 0;
}

// Run the verification
const report = generateReport();
const success = printReport(report);

// Save report to file
try {
  fs.writeFileSync('verification-report.json', JSON.stringify(report, null, 2));
  console.log('\n📄 Report saved to verification-report.json');
} catch (error) {
  console.error('Failed to save report:', error.message);
}

// Exit with appropriate code
process.exit(success ? 0 : 1);