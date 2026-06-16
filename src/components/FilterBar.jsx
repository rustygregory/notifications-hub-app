import { Tag } from '@zendeskgarden/react-tags'
import { PRODUCTS } from './mockData'
import { FilterSection, FilterLabel, ClearAllButton } from '../styles/hub'

const allProducts = Object.values(PRODUCTS)

export default function FilterBar({ activeFilters, onRemoveFilter, onClearAll, onResetAll }) {
  const allActive = activeFilters.length === allProducts.length
  const noneActive = activeFilters.length === 0

  return (
    <FilterSection>
      <FilterLabel>Products:</FilterLabel>
      {allProducts.map((product) => {
        const isActive = activeFilters.includes(product.id)
        if (!isActive) return null
        return (
          <Tag
            key={product.id}
            size="medium"
            style={{
              backgroundColor: product.color,
              color: '#ffffff',
              borderColor: product.color,
            }}
          >
            <span>{product.label}</span>
            <Tag.Close
              aria-label={`Remove ${product.label} filter`}
              onClick={(e) => {
                e.stopPropagation()
                onRemoveFilter(product.id)
              }}
            />
          </Tag>
        )
      })}
      {!allActive && !noneActive && (
        <ClearAllButton onClick={onResetAll}>Show all</ClearAllButton>
      )}
      {noneActive && (
        <ClearAllButton onClick={onResetAll}>Show all</ClearAllButton>
      )}
      {allActive && activeFilters.length > 1 && (
        <ClearAllButton onClick={onClearAll}>Clear all</ClearAllButton>
      )}
    </FilterSection>
  )
}
