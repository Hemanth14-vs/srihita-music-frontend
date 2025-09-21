# Contributing to Music Streaming Platform

Thank you for contributing to our Music Streaming Platform! This document provides guidelines for team collaboration and faculty assessment requirements.

## 📅 Important Dates

- **Final Submission Deadline**: September 26, 2025
- **Progress Reviews**: Weekly (track in team-contributions.md)
- **Code Review Deadline**: 48 hours before final submission

## 🎯 Project Goals

1. **Equal Contribution**: Every team member must contribute meaningfully
2. **Code Quality**: Maintain high standards for academic review
3. **Documentation**: Comprehensive documentation for faculty evaluation
4. **Testing**: Adequate test coverage for reliability
5. **Functionality**: Working demo-ready application

## 👥 Team Workflow

### Branch Strategy

```
main (production-ready)
 ├── develop (integration branch)
 ├── feat/player-controls (feature branches)
 ├── feat/search-functionality
 ├── feat/playlist-management
 └── fix/audio-playback-bug
```

### Branch Naming Convention
- `feat/short-description` - New features
- `fix/bug-description` - Bug fixes
- `docs/update-readme` - Documentation updates
- `test/component-tests` - Test additions
- `refactor/code-cleanup` - Code refactoring

### Commit Message Format
Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Examples:**
```
feat(player): add shuffle and repeat functionality
fix(search): resolve search suggestions not appearing
docs(readme): update installation instructions
test(playlist): add playlist creation tests
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Formatting, missing semicolons, etc.
- `refactor` - Code change that neither fixes a bug nor adds a feature
- `test` - Adding missing tests
- `chore` - Updating build tasks, package manager configs, etc.

## 🔄 Development Process

### 1. Task Assignment
- Use GitHub Issues for task tracking
- Assign issues equally among team members
- Label issues with priority and estimated effort
- Link issues to project milestones

### 2. Feature Development
```bash
# 1. Create and switch to feature branch
git checkout -b feat/your-feature-name

# 2. Make your changes
# ... code, test, document ...

# 3. Run quality checks
npm run lint
npm run test
npm run build

# 4. Commit changes
git add .
git commit -m "feat: add your feature description"

# 5. Push to remote
git push origin feat/your-feature-name

# 6. Create Pull Request
```

### 3. Code Review Process
- **All PRs require at least 1 review** from another team member
- **Major features require 2 reviews**
- **Review within 24 hours** of PR creation
- **Address all review comments** before merging

### 4. Pull Request Template
Use the provided PR template and ensure:
- [ ] Description explains what and why
- [ ] All tests pass
- [ ] Code follows style guidelines
- [ ] Documentation updated if needed
- [ ] Team contribution tracking updated

## 📊 Equal Contribution Tracking

### team-contributions.md Updates
Update this file **weekly** with:
- Hours spent on tasks
- Files/components worked on
- Challenges faced and resolved
- Collaboration with team members

### Contribution Verification
```bash
# Check commit distribution
git shortlog -sn

# Check file contributions
git log --stat --author="Your Name"

# Run verification script
npm run verification-ready
```

### Fair Work Distribution
- **Frontend Components**: Divide UI components equally
- **Context/State Management**: Assign different contexts to different members
- **Pages/Routes**: Distribute page components
- **Testing**: Each member tests their own components + shared tests
- **Documentation**: Rotate documentation responsibilities

## 🧪 Testing Requirements

### Test Coverage Goals
- **Components**: 80%+ coverage
- **Contexts**: 90%+ coverage
- **Services**: 85%+ coverage
- **Overall**: 85%+ coverage

### Testing Responsibilities
- **Unit Tests**: Component author writes tests
- **Integration Tests**: Shared responsibility
- **E2E Tests**: Team collaboration
- **Accessibility Tests**: Include in component tests

### Test Commands
```bash
npm run test              # Run all tests
npm run test:watch        # Development mode
npm run test:coverage     # Coverage report
npm run test:ci           # CI mode (no watch)
```

## 📝 Code Standards

### TypeScript Guidelines
- **Strict Mode**: All TypeScript strict checks enabled
- **Type Definitions**: Explicit types for all props and state
- **Interface Usage**: Prefer interfaces over types for objects
- **Generic Types**: Use generics for reusable components

### React Best Practices
- **Functional Components**: Use function components with hooks
- **Custom Hooks**: Extract reusable logic into custom hooks
- **Context Usage**: Use Context for global state, not prop drilling
- **Performance**: Use React.memo, useMemo, useCallback appropriately

### CSS/Styling Guidelines
- **Tailwind CSS**: Use utility classes primarily
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Support both light and dark themes
- **Accessibility**: Include focus states and ARIA attributes

### File Organization
```
src/
├── components/
│   └── ComponentName/
│       ├── ComponentName.tsx
│       ├── ComponentName.test.tsx
│       └── index.ts
├── contexts/
├── pages/
├── services/
└── utils/
```

## 🔍 Code Review Guidelines

### For Authors
- [ ] Self-review your code before requesting review
- [ ] Include screenshots for UI changes
- [ ] Write clear PR description
- [ ] Ensure all CI checks pass
- [ ] Update documentation if needed

### For Reviewers
- [ ] Check code functionality and logic
- [ ] Verify test coverage
- [ ] Review for accessibility
- [ ] Check for performance issues
- [ ] Ensure code follows project standards
- [ ] Verify equal contribution tracking

### Review Checklist
```markdown
## Code Review Checklist
- [ ] Code compiles without warnings
- [ ] All tests pass
- [ ] Code follows style guidelines
- [ ] No console.log statements in production code
- [ ] Proper error handling
- [ ] Accessibility considerations
- [ ] Performance implications considered
- [ ] Documentation updated
```

## 🚀 Deployment Guidelines

### Pre-deployment Checklist
- [ ] All tests pass
- [ ] Build completes successfully
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] Performance audit passes
- [ ] Accessibility audit passes

### Deployment Process
1. **Staging Deployment**: Deploy to staging for team review
2. **Team Testing**: All members test the staging deployment
3. **Production Deployment**: Deploy to production after approval
4. **Post-deployment**: Verify all features work in production

## 📋 Faculty Review Preparation

### Documentation Requirements
- [ ] README.md is comprehensive and up-to-date
- [ ] API documentation is complete
- [ ] Component documentation includes props and usage
- [ ] Installation and setup instructions are clear

### Demo Preparation
1. **Prepare Demo Script**: 5-10 minute walkthrough
2. **Test All Features**: Ensure everything works
3. **Prepare Q&A**: Anticipate technical questions
4. **Team Presentation**: Each member presents their contributions

### Verification Checklist
```bash
# Run full verification
npm run verification-ready

# Check build
npm run build

# Run all tests
npm run test

# Check code quality
npm run lint
```

## 🐛 Issue Reporting

### Bug Reports
Use the GitHub issue template and include:
- **Environment**: Browser, OS, device
- **Steps to Reproduce**: Clear, numbered steps
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Screenshots**: If applicable

### Feature Requests
- **User Story**: As a [user], I want [goal] so that [benefit]
- **Acceptance Criteria**: Clear definition of done
- **Priority**: Low, Medium, High, Critical
- **Effort Estimate**: Small, Medium, Large, Extra Large

## 📞 Communication Guidelines

### Team Communication
- **Daily Standups**: Brief progress updates
- **Weekly Reviews**: Detailed progress and planning
- **Slack/Discord**: Quick questions and coordination
- **GitHub**: All technical discussions and decisions

### Faculty Communication
- **Progress Reports**: Weekly updates on team contributions
- **Technical Questions**: Document in GitHub discussions
- **Meeting Requests**: Schedule through appropriate channels

## 🎓 Academic Integrity

### Collaboration Guidelines
- **Code Sharing**: All code must be original team work
- **External Libraries**: Document all third-party dependencies
- **AI Assistance**: Disclose any AI tool usage
- **Attribution**: Credit any external resources or inspiration

### Plagiarism Prevention
- **Original Work**: All code must be written by team members
- **Documentation**: Cite any external references
- **Code Reviews**: Help catch unintentional similarities
- **Version Control**: Maintain clear commit history

## 🏆 Success Metrics

### Technical Metrics
- [ ] 85%+ test coverage
- [ ] Zero TypeScript errors
- [ ] Zero ESLint errors
- [ ] Build time < 30 seconds
- [ ] Lighthouse score > 90

### Team Metrics
- [ ] Equal commit distribution
- [ ] All members contribute to each sprint
- [ ] Code review participation
- [ ] Documentation contributions
- [ ] Meeting attendance

### Academic Metrics
- [ ] On-time deliverables
- [ ] Quality documentation
- [ ] Working demo
- [ ] Team collaboration evidence
- [ ] Individual contribution clarity

---

## 📞 Getting Help

- **Technical Issues**: Create GitHub issue
- **Process Questions**: Ask in team chat
- **Faculty Questions**: Follow course communication guidelines
- **Emergency**: Contact team lead or course instructor

Remember: The goal is not just to build a working application, but to demonstrate effective team collaboration and software development practices. Every contribution matters, and every team member's success contributes to the overall project success.

**Good luck, and happy coding! 🎵**