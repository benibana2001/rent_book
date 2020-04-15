import * as React from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'

import Icon from '@mdi/react'
import { mdiBank, mdiHome } from '@mdi/js'

const TabBar: React.FunctionComponent = () => {
  const [currentPage, setCurrentPage] = React.useState('/home')

  const location = useLocation()

  React.useEffect(() => {
    setCurrentPage(location.pathname)
  })

  return (
    <Outer>
      <LinkItem move={'home'} icon={'home'} location={currentPage} />
      <LinkItem move={'result'} icon={'library'} location={currentPage} />
      <LinkItem move={'about'} icon={'library'} location={currentPage} />
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
  bottom: 0;
  left: 0;
`

const LinkItem = (props: { move: string; icon: string; location: string }) => {
  const linkTo = (() => {
    switch (props.move) {
      case 'home':
        return '/home'
      case 'about':
        return '/about'
      case 'result':
        return '/home/result'
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
    }
  })()

  const linkColor = () => {
    const page: string = props.location
    const link = linkTo

    if (page.includes(link)) return 'red'
    return '#9f9f9f'
  }

  return (
    <Link to={linkTo}>
      <TabIcon>
        <Icon
          path={linkIcon}
          title="User Profile"
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
