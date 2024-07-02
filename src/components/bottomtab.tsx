import { useState } from 'react'
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components'

export const BottomTab = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <BottomNavigation
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}
    >
      <BottomNavigationTab
        icon={
          <Icon name='person-outline'/>
        }
      />
      <BottomNavigationTab
        icon={
          <Icon name='bell-outline'/>
        }
      />
      <BottomNavigationTab
        icon={
          <Icon name='email-outline'/>
        }
      />
    </BottomNavigation>
  )
}
