import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

config.autoAddCss = false
library.add(fas)
library.add(fab)

class DropdownButton extends Component {
  constructor() {
    super()

    this.state = {
      showMenu: false
    }

    this.showMenu = this.showMenu.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
  }

  showMenu(event) {
    event.preventDefault()

    this.setState({ showMenu: true }, () => {
      document && document.addEventListener('click', this.closeMenu)
    })
  }

  closeMenu(event, force = false) {
    if (force || (this.dropdownMenu && !this.dropdownMenu.contains(event.target))) {
      this.setState({ showMenu: false }, () => {
        document && document.removeEventListener('click', this.closeMenu)
      })
    }
  }

  render() {
    const {
      icon = null,
      text = 'Show menu',
      choices = [],
      onSelect = () => {},
      style = {},
      menuStyle = {},
      children
    } = this.props
    return (
      <div className={'dropdownContainer'}>
        {children ? (
          <div style={style} onClick={this.showMenu}>
            {children}
          </div>
        ) : (
          <button className={'btn'} onClick={this.showMenu} style={style}>
            <div className={'btnIcon'}>{icon && <FontAwesomeIcon icon={icon} />}</div>
            {text}
          </button>
        )}

        {this.state.showMenu ? (
          <div
            className='menu'
            ref={element => {
              this.dropdownMenu = element
            }}
            style={menuStyle}
          >
            {choices.map(choice => {
              if (choice.type === 'category' && choice.children) {
                // Render category with submenu
                return (
                  <div key={choice.key} className={'category'}>
                    <div className={'categoryHeader'}>
                      {choice.icon && (
                        <div className={'btnIcon'}>
                          <FontAwesomeIcon icon={choice.icon} />
                        </div>
                      )}
                      {choice.name}
                      <div className={'arrow'}>
                        <FontAwesomeIcon icon={'chevron-right'} />
                      </div>
                    </div>
                    <div className={'submenu'}>
                      {choice.children.map(child => (
                        <button
                          key={child.key}
                          className={'choice subchoice'}
                          onClick={event => {
                            this.closeMenu(event, true /* force */)
                            onSelect(child.key)
                          }}
                        >
                          {child.icon && (
                            <div className={'btnIcon'}>
                              <FontAwesomeIcon icon={child.icon} />
                            </div>
                          )}
                          {child.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )
              } else {
                // Render regular choice
                return (
                  <button
                    key={choice.key}
                    className={'choice'}
                    onClick={event => {
                      this.closeMenu(event, true /* force */)
                      onSelect(choice.key)
                    }}
                  >
                    {choice.icon && (
                      <div className={'btnIcon'}>
                        <FontAwesomeIcon icon={choice.icon} />
                      </div>
                    )}
                    {choice.name}
                  </button>
                )
              }
            })}
          </div>
        ) : null}
        <style jsx>
          {`
            .dropdownContainer {
              display: inline-block;
              vertical-align: middle;
              position: relative;
            }
            .btn {
              font-family: 'Open Sans', sans-serif;
              background: #7bc043;
              text-decoration: none;
              text-transform: uppercase;
              color: white;
              font-size: 14px;
              border-radius: 4px;
              border: none;
              display: inline-block;
              padding: 16px;
              padding-left: 24px;
              padding-right: 24px;
              outline: none;
              cursor: pointer;
            }
            .btnIcon {
              margin-right: 16px;
              display: inline;
            }
            .menu {
              position: absolute;
              top: calc(100% + 8px);
              left: 0;
              display: flex;
              flex-direction: column;
              z-index: 2;
              background: white;
              box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.1);
              border-radius: 4px;
              overflow: hidden;
              min-width: 100%;
            }
            .choice {
              font-family: 'Open Sans', sans-serif;
              background: white;
              text-decoration: none;
              text-transform: uppercase;
              color: #333;
              min-width: 200px;
              font-size: 14px;
              border: none;
              border-bottom: 1px solid #efefef;
              display: flex;
              padding: 16px;
              padding-left: 24px;
              padding-right: 24px;
              text-align: left;
              outline: none;
              cursor: pointer;
              flex-direction: row;
            }
            .choice:hover {
              background: #fafafa;
            }
            .choice:last-child {
              border-bottom: 0px;
            }
            .category {
              position: relative;
            }
            .categoryHeader {
              display: flex;
              align-items: center;
              padding: 12px 16px;
              color: #333;
              font-weight: 600;
              border-bottom: 1px solid rgba(0, 0, 0, 0.1);
              cursor: pointer;
            }
            .categoryHeader:hover {
              background-color: rgba(123, 192, 67, 0.1);
            }
            .categoryHeader .arrow {
              margin-left: auto;
              font-size: 12px;
              color: #666;
            }
            .submenu {
              display: none;
              position: absolute;
              left: 100%;
              top: 0;
              background: white;
              border: 1px solid rgba(0, 0, 0, 0.1);
              border-radius: 4px;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
              min-width: 200px;
              z-index: 1000;
            }
            .category:hover .submenu {
              display: block;
            }
            .subchoice {
              padding: 12px 16px;
              font-weight: normal;
              border-bottom: none;
            }
            .subchoice:last-child {
              border-bottom: none;
            }
          `}
        </style>
      </div>
    )
  }
}

export default DropdownButton
