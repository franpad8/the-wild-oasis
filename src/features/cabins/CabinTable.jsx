import { useQuery } from '@tanstack/react-query'
import { getCabins } from '../../services/apiCabins'
import CabinRow from './CabinRow'
import Spinner from '../../ui/Spinner'
import Table from '../../ui/Table'
import Menus from '../../ui/Menus'
import { useSearchParams } from 'react-router-dom'
import { useMemo } from 'react'

const CabinTable = () => {
  const { isLoading, data: cabins } = useQuery(['cabins'], getCabins)
  const [searchParams] = useSearchParams()
  const filterValue = searchParams.get('discount') || 'all'
  const sortBy = searchParams.get('sortBy') || ''

  const filteredCabins = useMemo(() => {
    if (filterValue === 'with-discount') return cabins.filter(c => c.discount > 0)
    if (filterValue === 'no-discount') return cabins.filter(c => c.discount === 0)
    return cabins
  }, [cabins, filterValue])

  const sortedCabins = useMemo(() => {
    if (!filteredCabins) return []
    if (sortBy === '') return filteredCabins

    const [field, direction] = sortBy.split('-')
    const modifier = direction === 'asc' ? 1 : -1
    return [...filteredCabins].sort((a, b) => {
      if (typeof a[field] === 'string') return a[field].localeCompare(b[field]) * modifier

      return (a[field] - b[field]) * modifier
    }
    )
  }, [filteredCabins, sortBy])

  if (isLoading) return <Spinner />

  return (

    <Menus>
      <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
        <Table.Header>
          <div />
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div />
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={cabin => <Table.Row key={cabin.id}><CabinRow cabin={cabin} /></Table.Row>}
        />
      </Table>
    </Menus>
  )
}

export default CabinTable
