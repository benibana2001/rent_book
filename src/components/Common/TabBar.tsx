import * as React from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'

import Icon from '@mdi/react'
import { mdiBank, mdiHome, mdiBookshelf, mdiHelp } from '@mdi/js'

const TabBar: React.FunctionComponent = () => {
  const [currentPage, setCurrentPage] = React.useState('/home')

  const location = useLocation()

  React.useEffect(() => {
    setCurrentPage(location.pathname)
  })

  return (
    <Outer>
      <LinkItem move={'home'} icon={'home'} location={currentPage} />
      <LinkItem
        move={'librarysearch'}
        icon={'library'}
        location={currentPage}
      />
      <LinkItem move={'newbooks'} icon={'book'} location={currentPage} />
      <LinkItem move={'about'} icon={'about'} location={currentPage} />
    </Outer>
  )
}

const Outer = styled.div`
  width: 100%;
  height: 83px;
  background: #ffffff;

  border-top: 1px solid #c7c7c7;

  display: flex;
  justify-content: space-around;
  align-items: center;

  position: fixed;
  z-index: 100;
  bottom: 0;
  left: 0;
`

const LinkItem = (props: { move: string; icon: string; location: string }) => {
  const linkTo = (() => {
    switch (props.move) {
      case 'home':
        return '/home'
      case 'librarysearch':
        return '/librarysearch'
      case 'about':
        return '/about'
      case 'result':
        return '/librarysearch/result'
      case 'newbooks':
        return '/newbooks'
      default:
        return '/home'
    }
  })()

  const linkIcon = (() => {
    switch (props.icon) {
      case 'home':
        return mdiHome
      case 'library':
        return mdiBank
      case 'about':
        return mdiHelp
      case 'book':
        return mdiBookshelf
    }
  })()

  const linkColor = () => {
    const page: string = props.location
    const link = linkTo

    if (page.includes(link)) return '#3D3D3D'
    return '#9F9F9F'
  }

  return (
    <Link to={linkTo}>
      <TabIcon>
        <Icon
          path={linkIcon}
          title="Tab Icon"
          size="26px"
          color={linkColor()}
        />
      </TabIcon>
    </Link>
  )
}

const TabIcon = styled.div`
  width: 26px;
  height: 26px;
`

export default TabBar
