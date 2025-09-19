import BaseWidget from '../base_widget'
import AnalogueClockContent from './src/AnalogueClockContent'
import AnalogueClockOptions from './src/AnalogueClockOptions'

export default class AnalogueClock extends BaseWidget {
  constructor() {
    super({
      name: 'Analogue Clock',
      version: '0.1',
      icon: 'clock',
      defaultData: {
        showNumbers: true,
        showSeconds: true,
        showDate: false,
        clockFace: 'circle', // 'circle', 'square', 'modern', 'vintage', 'minimal'
        hourHandColor: '#333333',
        minuteHandColor: '#333333',
        secondHandColor: '#ff0000',
        numbersColor: '#333333',
        backgroundColor: '#ffffff',
        borderColor: '#333333',
        borderWidth: 2,
        size: 200,
        dateFormat: 'MM/DD/YYYY',
        datePosition: 'bottom', // 'bottom', 'top', 'hidden'
        dateColor: '#333333',
        dateFontSize: 14,
        dateFontStyle: 'normal',
        dateFontWeight: 'normal',
        shadowStyle: 'none', // 'none', 'subtle', 'dramatic'
        gradientStyle: 'none', // 'none', 'radial', 'linear'
        gradientColors: ['#ffffff', '#f0f0f0'],
        centerDotStyle: 'simple', // 'simple', 'elegant', 'hidden'
        tickMarkStyle: 'simple', // 'simple', 'elegant', 'minimal'
        handStyle: 'classic', // 'classic', 'modern', 'thin'
        numberStyle: 'standard' // 'standard', 'bold', 'italic'
      }
    })
  }

  get Widget() {
    return AnalogueClockContent
  }

  get Options() {
    return AnalogueClockOptions
  }
}
