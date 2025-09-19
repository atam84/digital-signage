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

## Additional Issues Fixed (v1.0.0b - Part 2)

### 14. Missing Key Props in ScreenList Component
- **Issue**: ContentLoader components in ScreenList missing key props
- **Solution**: Added key props to ContentLoader components in loading state
- **Files Modified**: `components/Admin/ScreenList.js`

### 15. Missing Key Props in Frame Component
- **Issue**: statusBar.map items missing key props in Display Frame
- **Solution**: Added unique key props to status bar items
- **Files Modified**: `components/Display/Frame.js`

### 16. Missing Key Props in Widget Components
- **Issue**: text.split('\n').map items missing key props in CongratsContent and AnnouncementContent
- **Solution**: Added key props to mapped text lines
- **Files Modified**: `widgets/congrats/src/CongratsContent.js`, `widgets/announcement/src/AnnouncementContent.js`

### 17. Invalid FontAwesome Icon Size
- **Issue**: Invalid `size` prop value `'0.4x'` for FontAwesomeIcon
- **Solution**: Changed to valid size value `'xs'`
- **Files Modified**: `widgets/announcement/src/AnnouncementContent.js`

### 18. Clock Widget Import Errors
- **Issue**: ClockOptions.js import errors causing white screen and React component type errors
- **Root Cause**: Incorrect import statements for Form components
- **Solution**: 
  - Fixed import statements to use named imports from Form index
  - Added ColorPicker to Form index exports
  - Updated import pattern to match existing widgets
- **Files Modified**: `widgets/clock/src/ClockOptions.js`, `components/Form/index.js`

### 19. Clock Widget UI Layout Issues
- **Issue**: Clock widget settings modal was very thin, cramped, and not user-friendly
- **Root Cause**: Custom styling that didn't follow existing widget patterns
- **Solution**: 
  - Completely rewrote ClockOptions component to match existing widget patterns
  - Added proper container layout with flex direction
  - Used InlineInputGroup for better organization
  - Added preview section on the right
  - Implemented proper styling with style jsx
  - Replaced complex dropdowns with standard Input components
- **Files Modified**: `widgets/clock/src/ClockOptions.js`

### 20. InlineInputGroup Children Mapping Error
- **Issue**: `TypeError: children.map is not a function` when clicking clock widget settings
- **Root Cause**: InlineInputGroup expected children to be an array but React children weren't properly converted
- **Solution**: 
  - Updated InlineInputGroup to use `React.Children.toArray(children)` for proper children handling
  - This ensures children are always converted to a proper array before mapping
- **Files Modified**: `components/Form/InlineInputGroup.js`

### 21. Clock Widget Dropdown Selection Issues
- **Issue**: Dropdown fields showing "Choose an option..." but not interactive/selectable
- **Root Cause**: Used `options` prop instead of `choices` prop for Input component select type
- **Solution**: 
  - Changed `options` prop to `choices` prop in all select Input components
  - Updated option structure from `{value, label}` to `{id, label}` to match Input component expectations
- **Files Modified**: `widgets/clock/src/ClockOptions.js`

### 22. Analogue Clock Widget Implementation
- **Issue**: User requested analogue clock widget to complement the digital clock
- **Solution**: 
  - Created complete analogue clock widget with SVG-based rendering
  - Implemented customizable clock face styles (circle, square, modern)
  - Added individual hand color customization (hour, minute, second)
  - Included show/hide options for numbers and second hand
  - Added date display with multiple formats and positions
  - Created user-friendly options interface with live preview
- **Files Created**: 
  - `widgets/analogue-clock/index.js`
  - `widgets/analogue-clock/src/AnalogueClockContent.js`
  - `widgets/analogue-clock/src/AnalogueClockOptions.js`
- **Files Modified**: 
  - `widgets/widget_list.js` (added 'analogue_clock')
  - `TODO.md` (updated progress tracking)

### 23. Server Restart and Widget Functionality Verification
- **Issue**: Server was not responding after widget model updates
- **Root Cause**: Server process was stuck and needed proper restart to load updated widget models
- **Solution**: 
  - Force killed stuck server process
  - Restarted server with proper widget model loading
  - Verified both clock widgets are now fully functional
- **Verification Results**:
  - ✅ Digital Clock widget: Can be created and deleted successfully
  - ✅ Analogue Clock widget: Can be created and deleted successfully  
  - ✅ Widget deletion: Works without requiring page refresh
  - ✅ API endpoints: All functioning correctly on port 9900
- **Files Modified**: None (server restart resolved caching issues)

### 24. Enhanced Analogue Clock Styling Options
- **Issue**: User requested more styling options for the analogue clock widget
- **Solution**: 
  - Added multiple new styling categories and options
  - Enhanced visual appearance with gradients, shadows, and different styles
  - Improved customization options for all clock elements
- **New Styling Features**:
  - **Clock Face Styles**: Added 'vintage' and 'minimal' options
  - **Shadow Effects**: None, Subtle, Dramatic with SVG filters
  - **Gradient Backgrounds**: Radial and Linear gradients with customizable colors
  - **Hand Styles**: Classic, Modern (square caps), Thin (slimmer hands)
  - **Tick Mark Styles**: Simple (circles), Elegant (lines), Minimal (none)
  - **Number Styles**: Standard, Bold, Italic with shadow effects
  - **Center Dot Styles**: Simple, Elegant (larger with border), Hidden
- **Files Modified**: 
  - `widgets/analogue_clock/index.js` (updated default data)
  - `widgets/analogue_clock/src/AnalogueClockContent.js` (enhanced rendering)
  - `widgets/analogue_clock/src/AnalogueClockOptions.js` (added new controls)

### 25. Enhanced Date Styling and Additional Clock Face Styles
- **Issue**: User requested more date styling options and additional clock face styles
- **Solution**: 
  - Added comprehensive date styling controls (color, font size, font style, font weight)
  - Added 4 new clock face styles (hexagon, octagon, rounded, flat)
  - Enhanced SVG rendering to support polygon shapes
  - Improved live preview functionality
- **New Features**:
  - **Date Styling**: Color picker, font size (8-48px), font style (normal/italic), font weight (normal/bold/light)
  - **Clock Face Styles**: Added Hexagon, Octagon, Rounded, Flat options (total 9 styles)
  - **SVG Polygons**: Proper hexagon and octagon rendering with correct geometry
  - **Enhanced Preview**: All changes reflect immediately in the preview
- **Files Modified**: 
  - `widgets/analogue_clock/index.js` (added new default data)
  - `widgets/analogue_clock/src/AnalogueClockContent.js` (SVG polygon rendering, date styling)
  - `widgets/analogue_clock/src/AnalogueClockOptions.js` (new date controls, clock face options)

## Remaining Warnings (Non-Critical)

### 1. Deprecated Lifecycle Methods
- **Warning**: `componentWillReceiveProps` has been renamed
- **Components**: ReactGridLayout, Switch, Lottie
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

### 4. Hydration Mismatch Warning
- **Warning**: "Did not expect server HTML to contain a `<div>` in `<div>`"
- **Status**: Non-breaking, minor hydration issue
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

## Development Preferences
- **IMPORTANT**: Do NOT commit changes automatically - only commit when explicitly requested by user
- Always ask for permission before committing to git
- Make changes and wait for user approval before git operations

## Notes for Next Session
- Application is fully functional on port 9900
- All critical errors have been resolved
- Only non-critical warnings remain
- MongoDB connection uses IPv4 localhost
- Demo user authentication is working
- Widgets API is functional
- Ready for feature development or further improvements
- **NEW**: TODO.md created with comprehensive widget development roadmap
- **COMPLETED**: Digital Clock Widget implemented successfully
- **FIXED**: ClockOptions import errors resolved
- **NEXT**: Implement Simple Counter Widget (next quick win)
