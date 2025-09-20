import BaseWidget from '../base_widget'
import SimpleCounterContent from './src/SimpleCounterContent'
import SimpleCounterOptions from './src/SimpleCounterOptions'

export default class SimpleCounter extends BaseWidget {
  constructor() {
    super({
      name: 'Simple Counter',
      version: '0.1',
      icon: 'calculator',
      defaultData: {
        // Counter settings
        targetValue: 1000,
        currentValue: 0,
        prefix: '', // e.g., '$', '€', '#'
        suffix: '', // e.g., 'visitors', 'sales', 'users'
        
        // Animation settings
        animationDuration: 2000, // milliseconds
        easing: 'easeOut', // 'linear', 'easeIn', 'easeOut', 'easeInOut'
        
        // Display settings
        showPrefix: true,
        showSuffix: true,
        numberFormat: 'comma', // 'comma', 'space', 'none'
        decimalPlaces: 0, // 0 for integers, 1-3 for decimals
        
        // Styling
        fontSize: 48,
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'bold',
        color: '#ffffff',
        backgroundColor: '#2c3e50',
        
        // Counter behavior
        autoStart: true,
        repeatAnimation: false, // restart animation when value changes
        waitTime: 3000, // wait time in milliseconds before repeating animation
        showProgress: false, // show progress bar
        progressColor: '#3498db',
        
        // Layout
        alignment: 'center', // 'left', 'center', 'right'
        verticalAlignment: 'center', // 'top', 'center', 'bottom'
        
        // Advanced features
        showIcon: false,
        iconName: 'trophy',
        iconSize: 32,
        iconColor: '#f39c12',
        
        // End animation effects
        endAnimation: 'none', // 'none', 'zoom', 'pulse', 'bounce', 'shake', 'fireworks', 'glow', 'rainbow'
        endAnimationDuration: 1000, // duration of end effect in milliseconds
        endAnimationIntensity: 'medium', // 'low', 'medium', 'high'
        endAnimationColor: '#ffd700', // color for effects like glow, fireworks
        combineEffects: false // allow multiple effects to be combined
      }
    })
  }

  get Widget() {
    return SimpleCounterContent
  }

  get Options() {
    return SimpleCounterOptions
  }
}
