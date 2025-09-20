/**
 * @fileoverview DisplayFrame component which renders the date, time and layout
 * for the added widgets
 */

import React from 'react'
import Clock from 'react-live-clock'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWifi } from '@fortawesome/free-solid-svg-icons'

class Frame extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { children, statusBar = [] } = this.props
    return (
      <div className='display'>
        {statusBar && statusBar.length > 0 && (
          <div className={'status'}>
            {statusBar.map((item, index) => {
              const type = item.split('_')[0]
              return (
                <div key={`status-${index}-${type}`} className={type}>
                  {type == 'date' ? (
                    <Clock ticking={true} format={'dddd, MMMM Do.'} />
                  ) : type == 'connection' ? (
                    <FontAwesomeIcon className={'wifi'} icon={faWifi} />
                  ) : type == 'time' ? (
                    <Clock ticking={true} format={'H:mm'} />
                  ) : (
                    ' '
                  )}
                </div>
              )
            })}
          </div>
        )}
        {children}
      </div>
    )
  }
}

export default Frame
