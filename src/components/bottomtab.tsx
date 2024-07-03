import React from 'react'
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components'

export const BottomTab = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  return (
    <BottomNavigation
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}
    >
      <BottomNavigationTab
        icon={
          <Icon name='edit-2-outline'/>
        }
      />
      <BottomNavigationTab
        icon={
          <Icon name='book-open-outline'/>
        }
      />
      <BottomNavigationTab
        icon={
          <Icon name='person-outline'/>
        }
      />
    </BottomNavigation>
  )
}
