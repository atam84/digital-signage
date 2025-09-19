# Digital Signage Project - Issue Tracking

## Project Overview
- **Project Name**: Digital Signage Application
- **Version**: 1.0.0b
- **Repository**: git@github.com:atam84/digital-signage.git
- **Technology Stack**: Next.js, Express.js, MongoDB, React
- **Backend Port**: 9900
- **Development Date**: 6 years ago (legacy project)

## Current Status
✅ **RESOLVED** - All critical errors have been fixed and application is fully functional

## Fixed Issues (v1.0.0b)

### 1. Package Compatibility Issues
- **Issue**: `mongoose-crudify` package unavailable
- **Solution**: Removed dependency and implemented custom CRUD routes
- **Files Modified**: `package.json`, `api/routes/widgets.js`

### 2. MongoDB Connection Issues
- **Issue**: `ECONNREFUSED ::1:27017` (IPv6 localhost connection failure)
- **Solution**: Updated MongoDB URI to use IPv4 localhost
- **Files Modified**: `.env` file
- **MongoDB URI**: `mongodb://127.0.0.1:27017/digital-signage`

### 3. Babel Compilation Errors
- **Issue**: Optional chaining (`?.`) and nullish coalescing (`??`) syntax errors in `react-draggable`
- **Solution**: 
  - Created `.babelrc` with proper plugins
  - Added webpack rule in `next.config.js` for transpiling node_modules
  - Downgraded problematic packages to compatible versions
- **Files Modified**: `.babelrc`, `next.config.js`, `package.json`
- **Package Versions**:
  - `react-grid-layout`: 0.16.6
  - `react-resizable`: 1.10.1
  - `react-draggable`: 4.2.0

### 4. JSX Support Issues
- **Issue**: "Support for the experimental syntax 'jsx' isn't currently enabled"
- **Solution**: Added JSX plugin to Babel configuration and simplified `_app.js`
- **Files Modified**: `.babelrc`, `pages/_app.js`

### 5. Build Manifest Issues
- **Issue**: "Cannot find module '.next/build-manifest.json'"
- **Solution**: Cleaned `.next` directory and rebuilt application

### 6. React Prop Validation Warnings
- **Issue**: "Link: unknown props found: style"
- **Solution**: Moved style prop from Link component to child div
- **Files Modified**: `pages/index.js`

### 7. Hydration Mismatch Warnings
- **Issue**: "Did not expect server HTML to contain a `<div>` in `<div>`"
- **Solution**: Removed extra div wrapper in `_app.js`
- **Files Modified**: `pages/_app.js`

### 8. DOM Property Warnings
- **Issue**: "Invalid DOM property `for`"
- **Solution**: Changed `for` attributes to `htmlFor` in form labels
- **Files Modified**: `pages/login.js`

### 9. MongoDB ObjectId Casting Errors
- **Issue**: "Cast to ObjectId failed for value 'null'"
- **Solution**: Added validation for null/undefined IDs
- **Files Modified**: `api/routes/display.js`

### 10. Input Value Warnings
- **Issue**: "`value` prop on `input` should not be null"
- **Solution**: Provided empty string fallback for input values
- **Files Modified**: `pages/layout.js`

### 11. Missing Key Props
- **Issue**: "Each child in a list should have a unique 'key' prop"
- **Solution**: Added key props to list items
- **Files Modified**: `pages/layout.js`, `components/DropdownButton.js`

### 12. Controlled/Uncontrolled Input Switching
- **Issue**: "A component is changing an uncontrolled input to be controlled"
- **Solution**: Initialized display.name to empty string instead of null
- **Files Modified**: `stores/display.js`

### 13. Widgets API 500 Error
- **Issue**: POST request to `/api/v1/widgets` returning 500 error
- **Solution**: Replaced mongoose-crudify with custom CRUD implementation
- **Files Modified**: `api/routes/widgets.js`

## Remaining Warnings (Non-Critical)

### 1. Deprecated Lifecycle Methods
- **Warning**: `componentWillReceiveProps` has been renamed
- **Components**: ReactGridLayout, Switch
- **Status**: Non-breaking, from external packages
- **Action**: No action required (external package warnings)

### 2. MongoDB Driver Warnings
- **Warning**: Current Server Discovery and Monitoring engine is deprecated
- **Status**: Non-breaking, informational only
- **Action**: Can be addressed in future updates

### 3. Mongoose Deprecation Warnings
- **Warning**: `collection.ensureIndex` is deprecated, use `createIndexes` instead
- **Warning**: `findOneAndUpdate()` without `useFindAndModify` option
- **Status**: Non-breaking, functional warnings
- **Action**: Can be addressed in future updates

## Development Environment Setup

### Prerequisites
- Node.js v18.19.0
- MongoDB (local instance)
- npm

### Installation Steps
1. Clone repository: `git clone git@github.com:atam84/digital-signage.git`
2. Navigate to project: `cd digital-signage`
3. Install dependencies: `npm install`
4. Create `.env` file with:
   ```
   PORT=9900
   MONGODB_URI=mongodb://127.0.0.1:27017/digital-signage
   ```
5. Start MongoDB service
6. Run development server: `NODE_OPTIONS="--openssl-legacy-provider" npm run dev`

### Key Configuration Files
- `.babelrc` - Babel configuration for JSX and modern syntax
- `next.config.js` - Next.js configuration with webpack rules
- `.env` - Environment variables
- `package.json` - Dependencies and scripts

## API Endpoints

### Working Endpoints
- `GET /` - Homepage
- `GET /login` - Login page
- `GET /layout` - Layout page
- `GET /screens` - Screens page
- `GET /slideshows` - Slideshows page
- `GET /preview` - Preview page
- `POST /api/v1/widgets` - Create widget
- `GET /api/v1/display/:id` - Get display by ID

### Authentication
- Demo credentials: username: `demo`, password: `demo`
- Auto-creates demo user if it doesn't exist

## Known Limitations

1. **Package Versions**: Some packages are downgraded for compatibility
2. **MongoDB Connection**: Requires local MongoDB instance
3. **Legacy Code**: Some deprecated patterns remain in external dependencies
4. **Browser Compatibility**: May require modern browser features

## Future Improvements

### High Priority
1. Update MongoDB driver configuration to remove deprecation warnings
2. Update Mongoose configuration to use modern options
3. Consider upgrading to newer package versions gradually

### Medium Priority
1. Add comprehensive error handling
2. Implement proper logging
3. Add unit tests
4. Optimize bundle size

### Low Priority
1. Update UI/UX to modern standards
2. Add TypeScript support
3. Implement CI/CD pipeline
4. Add Docker support

## Troubleshooting Guide

### Common Issues

1. **MongoDB Connection Failed**
   - Ensure MongoDB is running locally
   - Check MongoDB URI in `.env` file
   - Verify port 27017 is available

2. **Compilation Errors**
   - Clear `.next` directory: `rm -rf .next`
   - Reinstall dependencies: `rm -rf node_modules && npm install`
   - Check Babel configuration

3. **Port Already in Use**
   - Change port in `.env` file
   - Kill existing process: `lsof -ti:9900 | xargs kill -9`

4. **Permission Errors**
   - Ensure proper file permissions
   - Run with appropriate user privileges

## Contact Information
- **Repository**: https://github.com/atam84/digital-signage
- **Last Updated**: January 2025
- **Version**: 1.0.0b

## Notes for Next Session
- Application is fully functional on port 9900
- All critical errors have been resolved
- Only non-critical warnings remain
- MongoDB connection uses IPv4 localhost
- Demo user authentication is working
- Widgets API is functional
- Ready for feature development or further improvements
