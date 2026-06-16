import styled from 'styled-components'

export const HubContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  padding: 32px 40px;
  background: #ffffff;
  min-height: 0;
  overflow: hidden;
`

export const ScrollableContent = styled.div`
  flex: 1 1 0;
  min-height: 0;
  overflow-y: auto;
`

export const HubHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 24px;
  padding: 0 8px;
  border-radius: 12px;
  background: #cc3340;
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
`

export const PreferencesLink = styled.button`
  background: none;
  border: none;
  color: #1f73b7;
  font-size: 13px;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;

  &:hover {
    color: #144a75;
  }
`

export const FilterSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`

export const ClearAllButton = styled.button`
  background: none;
  border: none;
  color: #1f73b7;
  font-size: 13px;
  cursor: pointer;
  padding: 4px 8px;

  &:hover {
    color: #144a75;
    text-decoration: underline;
  }
`

export const FilterLabel = styled.span`
  font-size: 13px;
  color: #68737d;
  font-weight: 500;
  margin-right: 4px;
`

export const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: #e9ebed;
  border: 1px solid #e9ebed;
  border-radius: 8px;
  overflow: hidden;
`

export const NotificationRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px 20px;
  background: ${({ $read }) => ($read ? '#ffffff' : '#f5faff')};
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: #f8f9f9;
  }
`

export const UrgencyDot = styled.div`
  width: 10px;
  height: 10px;
  min-width: 10px;
  border-radius: 50%;
  margin-top: 6px;
  background: ${({ $urgency }) => {
    if ($urgency === 'action_required') return '#cc3340'
    return '#f5a623'
  }};
  opacity: ${({ $read }) => ($read ? 0.4 : 1)};
`

export const NotificationContent = styled.div`
  flex: 1;
  min-width: 0;
`

export const NotificationTitle = styled.div`
  font-size: 14px;
  font-weight: ${({ $read }) => ($read ? 400 : 600)};
  color: #2f3941;
  margin-bottom: 4px;
  line-height: 1.4;
`

export const NotificationDescription = styled.div`
  font-size: 13px;
  color: #68737d;
  line-height: 1.5;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: ${({ $expanded }) => ($expanded ? 'unset' : 2)};
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export const NotificationMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`

export const Timestamp = styled.span`
  font-size: 12px;
  color: #87929d;
`

export const NotificationActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
  flex-shrink: 0;
`

export const ExpandedDetail = styled.div`
  padding: 0 20px 16px 42px;
  background: ${({ $read }) => ($read ? '#ffffff' : '#f5faff')};
  border-top: none;
`

export const DetailDescription = styled.div`
  font-size: 14px;
  color: #49545c;
  line-height: 1.6;
  margin-bottom: 16px;
`

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  color: #68737d;
`

export const TabWrapper = styled.div`
  margin-bottom: 20px;
`
