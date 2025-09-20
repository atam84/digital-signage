/**
 * @fileoverview Shows the display frame and renders all the
 * widgets inside of it
 */

import React from 'react'
import GridLayout from 'react-grid-layout'
import socketIOClient from 'socket.io-client'
import _ from 'lodash'
import { view } from 'react-easy-state'

import Frame from './Frame.js'
import HeightProvider from '../Widgets/HeightProvider'
import Widgets from '../../widgets'
import EmptyWidget from '../Widgets/EmptyWidget'

import { getDisplay } from '../../actions/display'
import axios from 'axios'

const DEFAULT_STATUS_BAR = []
const DEFAULT_LAYOUT = 'spaced'

class Display extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      widgets: [],
      layout: DEFAULT_LAYOUT,
      statusBar: DEFAULT_STATUS_BAR
    }
    this.throttledRefresh = _.debounce(this.refresh, 1500)
  }

  componentDidMount() {
    this.refresh()
    const { host = 'http://localhost' } = this.props
    const socket = socketIOClient(host)
    socket.on('admin:update', () => this.throttledRefresh())
  }

  componentDidUpdate(prevProps) {
    if (prevProps.display != this.props.display) this.refresh()
  }

  refresh = () => {
    const { display, host = 'http://localhost:9900' } = this.props
    console.log('Display refresh called with:', { display, host })
    return Promise.all([
      getDisplay(display),
      axios.get(`${host}/api/v1/widgets?display=${display}`).then(res => {
        console.log('Widgets API response:', res.data.length, 'widgets')
        return res.data
      })
    ]).then(([displayData, allWidgets]) => {
      const { widgets = [], layout, statusBar = DEFAULT_STATUS_BAR } = displayData
      console.log('Setting state with widgets:', allWidgets.length, 'total widgets')
      console.log('Floating widgets:', allWidgets.filter(w => w.data && w.data.displayMode === 'floating').length)
      // Use all widgets from the direct query instead of just the display's widgets array
      this.setState({ widgets: allWidgets, layout, statusBar })
    }).catch(err => {
      console.error('Error refreshing display:', err)
    })
  }

  render() {
    const { widgets, layout, statusBar } = this.state
    
    // Separate floating widgets from regular widgets
    const floatingWidgets = widgets.filter(widget => 
      widget.data && widget.data.displayMode === 'floating'
    )
    const regularWidgets = widgets.filter(widget => 
      !widget.data || widget.data.displayMode !== 'floating'
    )
    
    const widgetLayout = regularWidgets.map(widget => ({
      i: widget._id,
      x: widget.x || 0,
      y: widget.y || 0,
      w: widget.w || 1,
      h: widget.h || 1
    }))

    const GridLayoutWithHeight = HeightProvider(GridLayout, this.container, layout)

    return (
      <div className={'display-wrapper'}>
        <Frame statusBar={statusBar}>
          <div className={'gridContainer'} ref={ref => (this.container = ref)}>
            <GridLayoutWithHeight
              className='layout'
              isDraggable={false}
              isResizable={false}
              layout={widgetLayout}
              cols={6}
              margin={layout == 'spaced' ? [10, 10] : [0, 0]}
            >
              {regularWidgets.map(widget => {
                const Widget = Widgets[widget.type] ? Widgets[widget.type].Widget : EmptyWidget
                return (
                  <div key={widget._id} className={'widget'}>
                    <Widget data={widget.data} />
                  </div>
                )
              })}
            </GridLayoutWithHeight>
          </div>
          
          {/* Floating widgets rendered outside the grid system */}
          {floatingWidgets.map(widget => {
            const Widget = Widgets[widget.type] ? Widgets[widget.type].Widget : EmptyWidget
            return (
              <div key={`floating-${widget._id}`} className={'floating-widget'}>
                <Widget data={widget.data} />
              </div>
            )
          })}
        </Frame>
        
        <style jsx>
          {`
            .display-wrapper {
              width: 100%;
              height: 100%;
            }
            .display-wrapper :global(.display) {
              display: flex;
              flex-direction: column;
              width: 100%;
              height: 100%;
              background: black;
              font-family: Open Sans, sans-serif;
              color: white;
            }
            .display-wrapper :global(.status) {
              padding: 30px;
              display: flex;
              flex-direction: row;
              justify-content: flex-start;
              align-items: center;
            }
            .display-wrapper :global(.status .spacer) {
              display: flex;
              flex: 1;
            }
            .display-wrapper :global(.status *:not(:first-child):not(:last-child)) {
              margin-right: 8px;
              margin-left: 8px;
            }
            .display-wrapper :global(.status .connection) {
              color: #baff23;
            }
            .gridContainer {
              flex: 1;
              overflow: hidden;
              margin-bottom: ${layout == 'spaced' ? 10 : 0}px;
            }
            .widget {
              border-radius: ${layout == 'spaced' ? 6 : 0}px;
              overflow: hidden;
            }
            .floating-widget {
              position: fixed;
              z-index: 1000;
              pointer-events: none;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
            }
            .floating-widget > * {
              pointer-events: auto;
              position: fixed !important;
            }
            /* Override floating widget positioning to be relative to viewport */
            .floating-widget .business-presentation-widget.floating.center,
            .floating-widget .interactive-map-widget.floating.center {
              top: 50vh !important;
              left: 50vw !important;
              transform: translate(-50%, -50%) !important;
            }
            .floating-widget .business-presentation-widget.floating.top-right,
            .floating-widget .interactive-map-widget.floating.top-right {
              top: 20px !important;
              right: 20px !important;
              left: auto !important;
            }
            .floating-widget .business-presentation-widget.floating.top-left,
            .floating-widget .interactive-map-widget.floating.top-left {
              top: 20px !important;
              left: 20px !important;
              right: auto !important;
            }
            .floating-widget .business-presentation-widget.floating.bottom-right,
            .floating-widget .interactive-map-widget.floating.bottom-right {
              bottom: 20px !important;
              right: 20px !important;
              top: auto !important;
              left: auto !important;
            }
            .floating-widget .business-presentation-widget.floating.bottom-left,
            .floating-widget .interactive-map-widget.floating.bottom-left {
              bottom: 20px !important;
              left: 20px !important;
              top: auto !important;
              right: auto !important;
            }
          `}
        </style>
      </div>
    )
  }
}

export default view(Display)
