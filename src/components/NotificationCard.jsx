import { useState } from 'react'
import { Tag } from '@zendeskgarden/react-tags'
import { Button } from '@zendeskgarden/react-buttons'
import {
  NotificationRow,
  UrgencyDot,
  NotificationContent,
  NotificationTitle,
  NotificationDescription,
  NotificationMeta,
  Timestamp,
  NotificationActions,
  ExpandedDetail,
  DetailDescription,
} from '../styles/hub'

function getRelativeTime(timestamp) {
  const now = new Date('2026-06-16T12:00:00Z')
  const date = new Date(timestamp)
  const diffMs = now - date
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffHours < 1) return 'Just now'
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays === 1) return '1 day ago'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function getCategoryLabel(category) {
  const labels = {
    critical: 'Critical',
    billing: 'Billing',
    incident: 'Incident',
    feature: 'New Feature',
    adoption: 'Recommendation',
    setup: 'Setup',
    maintenance: 'Maintenance',
  }
  return labels[category] || category
}

function getCategoryColor(category) {
  const colors = {
    critical: '#cc3340',
    billing: '#ad5e18',
    incident: '#c72a1c',
    feature: '#1f73b7',
    adoption: '#186146',
    setup: '#5b7fbb',
    maintenance: '#87929d',
  }
  return colors[category] || '#68737d'
}

export default function NotificationCard({ notification, onDismiss, onMarkRead }) {
  const [expanded, setExpanded] = useState(false)

  const handleClick = () => {
    setExpanded(!expanded)
    if (!notification.read) {
      onMarkRead(notification.id)
    }
  }

  return (
    <>
      <NotificationRow $read={notification.read} onClick={handleClick}>
        <UrgencyDot $urgency={notification.urgency} $read={notification.read} />
        <NotificationContent>
          <NotificationTitle $read={notification.read}>
            {notification.title}
          </NotificationTitle>
          {!expanded && (
            <NotificationDescription $expanded={false}>
              {notification.description}
            </NotificationDescription>
          )}
          <NotificationMeta>
            <Tag
              size="small"
              isPill
              style={{
                backgroundColor: `${notification.product.color}15`,
                color: notification.product.color,
                borderColor: `${notification.product.color}40`,
              }}
            >
              {notification.product.label}
            </Tag>
            <Tag
              size="small"
              isPill
              style={{
                backgroundColor: `${getCategoryColor(notification.category)}10`,
                color: getCategoryColor(notification.category),
                borderColor: `${getCategoryColor(notification.category)}30`,
              }}
            >
              {getCategoryLabel(notification.category)}
            </Tag>
            <Timestamp>{getRelativeTime(notification.timestamp)}</Timestamp>
          </NotificationMeta>
        </NotificationContent>
        <NotificationActions>
          {notification.cta && (
            <Button size="small" isPrimary onClick={(e) => e.stopPropagation()}>
              {notification.cta.label}
            </Button>
          )}
        </NotificationActions>
      </NotificationRow>
      {expanded && (
        <ExpandedDetail $read={notification.read}>
          <DetailDescription>{notification.description}</DetailDescription>
          <div style={{ display: 'flex', gap: '8px' }}>
            {notification.cta && (
              <Button size="small" isPrimary>
                {notification.cta.label}
              </Button>
            )}
            <Button
              size="small"
              isDanger={false}
              onClick={(e) => {
                e.stopPropagation()
                onDismiss(notification.id)
              }}
            >
              Dismiss
            </Button>
          </div>
        </ExpandedDetail>
      )}
    </>
  )
}
