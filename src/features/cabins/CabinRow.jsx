import styled from 'styled-components'
import CreateCabinForm from './CreateCabinForm'
import useDeleteCabin from './useDeleteCabin'
import useCreateUpdateCabin from './useCreateUpdateCabin'
import Modal from '../../ui/Modal'
import ConfirmDelete from '../../ui/ConfirmDelete'
import Menus from '../../ui/Menus'

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
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <Cabin>{maxCapacity}</Cabin>
      <Price>{regularPrice}</Price>
      <Discount>{discount}</Discount>
      <Actions>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabin.id} />

            <Menus.List id={cabin.id}>
              <Menus.Button onClick={handleCopyCabin}>Duplicate</Menus.Button>
              <Modal.Open opens='cabin-form'>
                <Menus.Button>Edit</Menus.Button>
              </Modal.Open>
              <Modal.Open opens='confirm-cabin-deletion'>
                <Menus.Button>Remove</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window windowName='cabin-form'>
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>
            <Modal.Window windowName='confirm-cabin-deletion'>
              <ConfirmDelete resourceName='cabin' disabled={isProcessing} onConfirm={() => deleteCabin(id)} />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </Actions>
    </>
  )
}

export default CabinRow
