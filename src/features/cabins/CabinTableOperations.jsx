import React from 'react'
import TableOperations from '../../ui/TableOperations'
import Filter from '../../ui/Filter'
import SortBy from '../../ui/SortBy'

const CabinTableOperations = () => {
  return (
    <TableOperations>
      <Filter
        filterField='discount'
        options={[
          { value: 'all', label: 'All' },
          { value: 'no-discount', label: 'No discount' },
          { value: 'with-discount', label: 'With discount' }
        ]}
      />

      <SortBy
        options={[
          { value: '', label: 'Sort By Date (oldest first)' },
          { value: 'name-asc', label: 'Sort By Name (lowest first)' },
          { value: 'name-desc', label: 'Sort By Name (highest first)' },
          { value: 'regularPrice-asc', label: 'Sort By Price (lowest first)' },
          { value: 'regularPrice-desc', label: 'Sort By Price (highest first)' },
          { value: 'maxCapacity-asc', label: 'Sort By Capacity (lowest first)' },
          { value: 'maxCapacity-desc', label: 'Sort By Capacity (highest first)' }
        ]}
      />

    </TableOperations>
  )
}

export default CabinTableOperations
