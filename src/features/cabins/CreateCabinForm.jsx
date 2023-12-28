import styled from 'styled-components'
import { useForm } from 'react-hook-form'

import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Textarea from '../../ui/Textarea'
import useCreateUpdateCabin from './useCreateUpdateCabin'
import FormRow from '../../ui/FormRow'
import Label from '../../ui/Label'

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`

function CreateCabinForm ({ cabinToEdit, handleClose }) {
  const isEditSession = Boolean(cabinToEdit)
  const { register, handleSubmit, reset: resetForm, getValues, formState } = useForm({
    defaultValues: { ...cabinToEdit }
  })

  const { isProcessing, createUpdateCabin } = useCreateUpdateCabin({ isEditSession })

  const { errors } = formState

  function onSubmit (data) {
    const image = typeof data.image === 'string'
      ? data.image
      : data.image[0]
    createUpdateCabin({ ...data, image, id: cabinToEdit?.id }, {
      onSuccess: () => {
        resetForm()
        handleClose?.()
      }
    })
  }

  function onErrors (errors) {
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onErrors)}>
      <FormRow>
        <Label htmlFor='name'>Cabin name</Label>
        <Input
          type='text'
          id='name'
          disabled={isProcessing}
          {...register('name', {
            required: 'This field is required'
          })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor='maxCapacity'>Maximum capacity</Label>
        <Input
          type='number'
          id='maxCapacity'
          disabled={isProcessing}
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1'
            }
          })}
        />
        {errors?.maxCapacity?.message && <Error>{errors.maxCapacity.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor='regularPrice'>Regular price</Label>
        <Input
          type='number'
          id='regularPrice'
          disabled={isProcessing}
          {...register('regularPrice', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Regular price should be at least 1'
            }
          })}
        />
        {errors?.regularPrice?.message && <Error>{errors.regularPrice.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor='discount'>Discount</Label>
        <Input
          type='number'
          id='discount'
          disabled={isProcessing}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) =>
              Number(value) <= Number(getValues('regularPrice')) || 'Discount should be less than regular price'
          })}
          defaultValue={0}
        />
        {errors?.discount?.message && <Error>{errors.discount.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor='description'>Description for website</Label>
        <Textarea
          type='text'
          id='description'
          disabled={isProcessing}
          {...register('description')}
          defaultValue=''
        />
      </FormRow>

      <FormRow>
        <Label htmlFor='image'>Cabin photo</Label>
        <FileInput
          id='image'
          accept='image/*'
          type='file'
          disabled={isProcessing}
          {...register('image', {
            required: isEditSession ? false : 'This field is required'
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button $variation='secondary' type='reset' disabled={isProcessing} onClick={() => handleClose?.()}>
          Cancel
        </Button>
        <Button disabled={isProcessing}>{isEditSession ? 'Edit cabin' : 'Create Cabin'}</Button>
      </FormRow>
    </Form>
  )
}

export default CreateCabinForm
