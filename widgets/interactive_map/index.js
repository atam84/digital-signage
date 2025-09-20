import BaseWidget from '../base_widget'
import InteractiveMapContent from './src/InteractiveMapContent'
import InteractiveMapOptions from './src/InteractiveMapOptions'

export default class InteractiveMap extends BaseWidget {
  constructor() {
    super({
      name: 'Interactive Map',
      version: '0.1',
      icon: 'map-marked-alt',
      defaultData: {
        // Map settings
        mapType: 'roadmap', // 'roadmap', 'satellite', 'hybrid', 'terrain'
        mapProvider: 'google', // 'google', 'openstreetmap', 'mapbox'
        mapStyle: 'default', // 'default', 'dark', 'light', 'colorful'
        
        // Location settings
        latitude: 40.7128,
        longitude: -74.0060,
        zoom: 10,
        autoZoom: true,
        zoomRange: [5, 18],
        
        // Display settings
        displayMode: 'floating', // 'floating', 'fullscreen', 'embedded'
        floatingPosition: 'top-right', // 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'center'
        floatingSize: 'medium', // 'small', 'medium', 'large'
        showControls: true,
        showScale: true,
        showCompass: true,
        
        // Timing settings
        displayDuration: 0, // 0 = permanent, >0 = seconds
        autoRotate: false,
        rotationInterval: 30, // seconds
        fadeTransition: true,
        
        // QR Code settings
        showQRCode: false,
        qrCodePosition: 'bottom-right', // 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'center'
        qrCodeSize: 'medium', // 'small', 'medium', 'large'
        qrCodeContent: 'https://maps.google.com/?q=40.7128,-74.0060',
        qrCodeLabel: 'Get Directions',
        
        // Animation settings
        animationType: 'fade', // 'fade', 'slide', 'zoom', 'none'
        animationDuration: 1000,
        animationDelay: 0,
        
        // Styling
        backgroundColor: '#ffffff',
        borderColor: '#cccccc',
        borderWidth: 2,
        borderRadius: 8,
        shadowStyle: 'subtle', // 'none', 'subtle', 'dramatic'
        
        // Overlay settings
        showOverlay: false,
        overlayText: 'Welcome to Our Location',
        overlayPosition: 'center',
        overlayStyle: 'glass', // 'glass', 'solid', 'gradient'
        overlayColor: '#000000',
        overlayOpacity: 0.7,
        overlayTextColor: '#ffffff',
        
        // Interactive features
        clickable: true,
        showMarkers: true,
        markerStyle: 'default', // 'default', 'custom', 'pin', 'dot'
        markerColor: '#ff0000',
        markerSize: 'medium',
        showInfoWindow: true,
        infoWindowContent: 'Our Business Location'
      }
    })
  }

  get Widget() {
    return InteractiveMapContent
  }

  get Options() {
    return InteractiveMapOptions
  }
}

