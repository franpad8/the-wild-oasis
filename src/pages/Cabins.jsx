import { useState } from 'react'
import CabinTable from '../features/cabins/CabinTable'
import CreateCabinForm from '../features/cabins/CreateCabinForm'
import Button from '../ui/Button'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

function Cabins () {
  const [showNewCabinForm, setShowNewCabinForm] = useState(false)

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>All cabins</Heading>
      </Row>

      <Row>
        <CabinTable />
        <Button onClick={() => setShowNewCabinForm(!showNewCabinForm)}>Add New Cabin</Button>
        {showNewCabinForm && <CreateCabinForm />}
      </Row>
    </>
  )
}

export default Cabins
