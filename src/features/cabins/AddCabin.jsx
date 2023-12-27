import Modal from '../../ui/Modal'
import Button from '../../ui/Button'
import CreateCabinForm from './CreateCabinForm'

const AddCabin = () => {
  return (
    <Modal>
      <Modal.Open opens='cabin-form'>
        <Button>Create Cabin</Button>
      </Modal.Open>

      <Modal.Window windowName='cabin-form'>
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  )
}

export default AddCabin
