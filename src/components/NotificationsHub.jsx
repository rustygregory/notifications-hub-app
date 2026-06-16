import { useState } from 'react'
import { XL, MD } from '@zendeskgarden/react-typography'
import { Tabs, TabList, Tab } from '@zendeskgarden/react-tabs'
import { notifications as initialNotifications, PRODUCTS, URGENCY } from './mockData'
import FilterBar from './FilterBar'
import NotificationCard from './NotificationCard'
import {
  HubContainer,
  ScrollableContent,
  HubHeader,
  TitleRow,
  Badge,
  PreferencesLink,
  NotificationList,
  EmptyState,
  TabWrapper,
} from '../styles/hub'

const allProductIds = Object.values(PRODUCTS).map((p) => p.id)

export default function NotificationsHub() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [activeFilters, setActiveFilters] = useState([...allProductIds])
  const [activeTab, setActiveTab] = useState('all')

  const unreadCount = notifications.filter((n) => !n.read && !n.dismissed).length

  const handleRemoveFilter = (productId) => {
    setActiveFilters((prev) => prev.filter((id) => id !== productId))
  }

  const handleClearAll = () => {
    setActiveFilters([])
  }

  const handleResetAll = () => {
    setActiveFilters([...allProductIds])
  }

  const handleDismiss = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, dismissed: true } : n))
    )
  }

  const handleMarkRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const getFilteredNotifications = () => {
    let filtered = notifications

    if (activeFilters.length > 0 && activeFilters.length < allProductIds.length) {
      filtered = filtered.filter((n) => activeFilters.includes(n.product.id))
    } else if (activeFilters.length === 0) {
      filtered = []
    }

    switch (activeTab) {
      case 'action_required':
        filtered = filtered.filter(
          (n) => n.urgency === URGENCY.ACTION_REQUIRED && !n.dismissed
        )
        break
      case 'informational':
        filtered = filtered.filter(
          (n) => n.urgency === URGENCY.INFORMATIONAL && !n.dismissed
        )
        break
      case 'dismissed':
        filtered = filtered.filter((n) => n.dismissed)
        break
      default:
        filtered = filtered.filter((n) => !n.dismissed)
        break
    }

    filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))

    return filtered
  }

  const filteredNotifications = getFilteredNotifications()

  return (
    <HubContainer>
      <HubHeader>
        <TitleRow>
          <XL tag="h1" style={{ margin: 0 }}>Notifications</XL>
          {unreadCount > 0 && <Badge>{unreadCount}</Badge>}
        </TitleRow>
        <PreferencesLink>Notification preferences</PreferencesLink>
      </HubHeader>

      <TabWrapper>
        <Tabs selectedItem={activeTab} onChange={setActiveTab}>
          <TabList>
            <Tab item="all">All</Tab>
            <Tab item="action_required">Action Required</Tab>
            <Tab item="informational">Informational</Tab>
            <Tab item="dismissed">Dismissed</Tab>
          </TabList>
        </Tabs>
      </TabWrapper>

      <FilterBar
        activeFilters={activeFilters}
        onRemoveFilter={handleRemoveFilter}
        onClearAll={handleClearAll}
        onResetAll={handleResetAll}
      />

      <ScrollableContent>
        {filteredNotifications.length > 0 ? (
          <NotificationList>
            {filteredNotifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onDismiss={handleDismiss}
                onMarkRead={handleMarkRead}
              />
            ))}
          </NotificationList>
        ) : (
          <EmptyState>
            <MD>No notifications to show</MD>
            <MD style={{ color: '#87929d', marginTop: '8px' }}>
              {activeFilters.length === 0
                ? 'Use "Show all" to see notifications from all products'
                : 'Try adjusting your filters or switching tabs'}
            </MD>
          </EmptyState>
        )}
      </ScrollableContent>
    </HubContainer>
  )
}
