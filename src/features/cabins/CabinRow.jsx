import styled from 'styled-components'
import Button from '../../ui/Button'
import { useState } from 'react'
import CreateCabinForm from './CreateCabinForm'
import useDeleteCabin from './useDeleteCabin'
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2'
import useCreateUpdateCabin from './useCreateUpdateCabin'

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`

const Actions = styled.div`
  display: flex;
  gap: 1rem;
`

const CabinRow = ({ cabin }) => {
  const [showEditForm, setShowEditForm] = useState(false)
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin

  const { isDeleting, deleteCabin } = useDeleteCabin()
  const { isProcessing: isCopying, createUpdateCabin: createCabin } = useCreateUpdateCabin({ isEditSession: false })

  const isProcessing = isCopying || isDeleting

  function handleCopyCabin () {
    const copy = { ...cabin, name: `Copy of ${cabin.name}` }
    delete copy.id
    createCabin(copy)
  }

  return (
    <>
      <TableRow>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <Cabin>{maxCapacity}</Cabin>
        <Price>{regularPrice}</Price>
        <Discount>{discount}</Discount>
        <Actions>
          <Button onClick={handleCopyCabin} disabled={isProcessing}><HiSquare2Stack /></Button>
          <Button onClick={() => setShowEditForm(!showEditForm)} disabled={isProcessing}><HiPencil /></Button>
          <Button onClick={() => deleteCabin(id)} disabled={isProcessing}><HiTrash /></Button>
        </Actions>
      </TableRow>
      {showEditForm ? <CreateCabinForm cabinToEdit={cabin} /> : null}
    </>
  )
}

export default CabinRow
