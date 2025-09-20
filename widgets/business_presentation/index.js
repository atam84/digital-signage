import BaseWidget from '../base_widget'
import BusinessPresentationContent from './src/BusinessPresentationContent'
import BusinessPresentationOptions from './src/BusinessPresentationOptions'

export default class BusinessPresentation extends BaseWidget {
  constructor() {
    super({
      name: 'Business Presentation',
      version: '0.1',
      icon: 'presentation',
      defaultData: {
        // Content settings
        title: 'Welcome to Our Business',
        subtitle: 'Your trusted partner in success',
        description: 'We provide exceptional services and solutions tailored to your needs.',
        logoUrl: '',
        backgroundImage: '',
        
        // Display settings
        displayMode: 'floating', // 'floating', 'fullscreen', 'embedded'
        floatingPosition: 'center', // 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'center'
        floatingSize: 'large', // 'small', 'medium', 'large', 'extra-large'
        aspectRatio: '16:9', // '4:3', '16:9', '21:9', '1:1'
        
        // Timing settings
        displayDuration: 0, // 0 = permanent, >0 = seconds
        autoAdvance: false,
        advanceInterval: 30, // seconds
        fadeTransition: true,
        transitionDuration: 1000,
        
        // QR Code settings
        showQRCode: false,
        qrCodePosition: 'bottom-right', // 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'center'
        qrCodeSize: 'medium', // 'small', 'medium', 'large'
        qrCodeContent: 'https://ourbusiness.com',
        qrCodeLabel: 'Visit Our Website',
        
        // Animation settings
        animationType: 'fade', // 'fade', 'slide', 'zoom', 'flip', 'none'
        animationDuration: 1500,
        animationDelay: 0,
        entranceAnimation: 'slideInUp', // 'slideInUp', 'slideInDown', 'slideInLeft', 'slideInRight', 'fadeIn', 'zoomIn'
        exitAnimation: 'fadeOut', // 'fadeOut', 'slideOutDown', 'zoomOut'
        
        // Styling
        backgroundColor: '#ffffff',
        backgroundGradient: false,
        gradientColors: ['#667eea', '#764ba2'],
        textColor: '#333333',
        titleColor: '#2c3e50',
        accentColor: '#3498db',
        borderColor: '#e0e0e0',
        borderWidth: 0,
        borderRadius: 12,
        shadowStyle: 'dramatic', // 'none', 'subtle', 'dramatic'
        
        // Typography
        titleFontSize: 48,
        subtitleFontSize: 24,
        descriptionFontSize: 16,
        titleFontWeight: 'bold', // 'normal', 'bold', 'lighter'
        subtitleFontWeight: 'normal',
        descriptionFontWeight: 'normal',
        fontFamily: 'Arial, sans-serif',
        textAlignment: 'center', // 'left', 'center', 'right'
        
        // Layout
        contentLayout: 'centered', // 'centered', 'top-heavy', 'bottom-heavy', 'split'
        logoPosition: 'top', // 'top', 'center', 'bottom', 'hidden'
        logoSize: 'medium', // 'small', 'medium', 'large'
        
        // Interactive features
        clickable: true,
        hoverEffects: true,
        showContactInfo: false,
        contactInfo: {
          phone: '',
          email: '',
          website: '',
          address: ''
        },
        
        // Overlay settings
        showOverlay: false,
        overlayType: 'glass', // 'glass', 'solid', 'gradient', 'pattern'
        overlayColor: '#000000',
        overlayOpacity: 0.3,
        overlayPattern: 'dots', // 'dots', 'lines', 'grid', 'waves'
        
        // Advanced features
        parallaxEffect: false,
        parallaxSpeed: 0.5,
        showProgressIndicator: false,
        progressPosition: 'bottom', // 'top', 'bottom', 'left', 'right'
        progressColor: '#3498db',
        progressHeight: 4,
        
        // Business specific
        showSocialMedia: false,
        socialMediaLinks: {
          facebook: '',
          twitter: '',
          instagram: '',
          linkedin: ''
        },
        showTestimonials: false,
        testimonialText: 'Great service and excellent results!',
        testimonialAuthor: 'Happy Customer',
        showCallToAction: false,
        callToActionText: 'Contact Us Today',
        callToActionColor: '#e74c3c'
      }
    })
  }

  get Widget() {
    return BusinessPresentationContent
  }

  get Options() {
    return BusinessPresentationOptions
  }
}

