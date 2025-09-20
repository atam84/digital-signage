# Social Media Widget Implementation Guide

## Quick Start Guide

### 1. Widget Structure Template

```javascript
// widgets/[platform]/index.js
import BaseWidget from '../base_widget'
import PlatformContent from './src/PlatformContent'
import PlatformOptions from './src/PlatformOptions'

export default class PlatformWidget extends BaseWidget {
  constructor() {
    super({
      name: 'Platform Widget',
      version: '0.1',
      icon: 'icon-name',
      defaultData: {
        // Platform-specific default data
        embedUrl: '',
        autoPlay: true,
        loop: true,
        showControls: false,
        // Common widget properties
        displayMode: 'embedded',
        floatingPosition: 'center',
        aspectRatio: '16:9',
        backgroundColor: '#000000'
      }
    })
  }

  get Widget() {
    return PlatformContent
  }

  get Options() {
    return PlatformOptions
  }
}
```

### 2. Content Component Template

```javascript
// widgets/[platform]/src/PlatformContent.js
import React, { Component } from 'react'

class PlatformContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      error: null,
      content: null
    }
  }

  componentDidMount() {
    this.loadContent()
  }

  loadContent = async () => {
    try {
      // Load content based on platform
      const content = await this.fetchPlatformContent()
      this.setState({ content, loading: false })
    } catch (error) {
      this.setState({ error: error.message, loading: false })
    }
  }

  render() {
    const { loading, error, content } = this.state
    const { displayMode, floatingPosition } = this.props.data

    if (loading) return <div className="loading">Loading...</div>
    if (error) return <div className="error">Error: {error}</div>

    return (
      <div className={`platform-widget ${displayMode}`}>
        <style jsx>{`
          .platform-widget {
            width: 100%;
            height: 100%;
            background: ${this.props.data.backgroundColor};
          }
          .platform-widget.floating {
            position: fixed;
            z-index: 1000;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
          }
        `}</style>
        
        {/* Platform-specific content rendering */}
        {this.renderPlatformContent(content)}
      </div>
    )
  }

  renderPlatformContent(content) {
    // Platform-specific implementation
    return <div>Platform Content</div>
  }
}

export default PlatformContent
```

### 3. Options Component Template

```javascript
// widgets/[platform]/src/PlatformOptions.js
import React, { Component } from 'react'
import { Form, Input, Button, Switch, ColorPicker } from '../../../components/Form'

class PlatformOptions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // Platform-specific options
      embedUrl: '',
      autoPlay: true,
      // ... other options
    }
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value }, () => {
      this.props.onChange(this.state)
    })
  }

  render() {
    return (
      <div className="container">
        <Form>
          <h3>Widget: Platform Name</h3>
          
          {/* Platform-specific configuration */}
          <Input
            label="Content URL"
            name="embedUrl"
            value={this.state.embedUrl}
            onChange={this.handleChange}
          />
          
          <Switch
            label="Auto Play"
            name="autoPlay"
            checked={this.state.autoPlay}
            onChange={this.handleChange}
          />
          
          {/* Common widget options */}
          <ColorPicker
            label="Background Color"
            name="backgroundColor"
            value={this.state.backgroundColor}
            onChange={this.handleChange}
          />
        </Form>
      </div>
    )
  }
}

export default PlatformOptions
```

## Implementation Checklist

### Pre-Development
- [ ] Review platform API documentation
- [ ] Check rate limits and authentication requirements
- [ ] Test embed codes in browser
- [ ] Verify content access permissions

### Development
- [ ] Create widget directory structure
- [ ] Implement BaseWidget extension
- [ ] Create content component with embed support
- [ ] Create options component with configuration
- [ ] Add to widget_list.js
- [ ] Test widget creation and display

### Testing
- [ ] Test embed rendering
- [ ] Test configuration options
- [ ] Test error handling
- [ ] Test performance
- [ ] Test mobile responsiveness

### Deployment
- [ ] Update documentation
- [ ] Test in production environment
- [ ] Monitor error logs
- [ ] Collect user feedback

## Common Patterns

### Embed-Based Widgets
```javascript
renderEmbed(url) {
  return (
    <iframe
      src={url}
      width="100%"
      height="100%"
      frameBorder="0"
      allowFullScreen
      loading="lazy"
    />
  )
}
```

### API-Based Widgets
```javascript
async fetchContent(apiKey, endpoint) {
  const response = await fetch(endpoint, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    }
  })
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`)
  }
  
  return response.json()
}
```

### Error Handling
```javascript
handleError(error, platform) {
  console.error(`${platform} widget error:`, error)
  
  return (
    <div className="error-fallback">
      <p>Unable to load {platform} content</p>
      <p>Error: {error.message}</p>
    </div>
  )
}
```
