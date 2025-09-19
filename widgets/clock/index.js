import BaseWidget from '../base_widget'
import ClockContent from './src/ClockContent'
import ClockOptions from './src/ClockOptions'

export default class Clock extends BaseWidget {
  constructor() {
    super({
      name: 'Digital Clock',
      version: '0.1',
      icon: 'clock',
      defaultData: {
        format: '12', // 12 or 24 hour format
        showSeconds: true,
        showDate: false,
        timezone: 'local', // local or specific timezone
        color: '#ffffff',
        backgroundColor: '#2c3e50',
        fontSize: 48,
        fontFamily: 'monospace',
        dateFormat: 'MM/DD/YYYY', // MM/DD/YYYY, DD/MM/YYYY, YYYY-MM-DD
        showAMPM: true
      }
    })
  }

  get Widget() {
    return ClockContent
  }

  get Options() {
    return ClockOptions
  }
}
