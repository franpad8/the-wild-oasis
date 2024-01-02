import { useState } from 'react'

import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'

import useCurrentUser from './useCurrentUser'
import useUpdateUserData from './useUpdateUserData'

function UpdateUserDataForm () {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    currentUser: {
      email,
      user_metadata: { fullName: currentFullName }
    }
  } = useCurrentUser()

  const { isUpdatingUserData, updateUserData } = useUpdateUserData()

  const [fullName, setFullName] = useState(currentFullName)
  const [avatar, setAvatar] = useState(null)

  function handleSubmit (e) {
    e.preventDefault()
    updateUserData({ email, fullName, avatar })
  }

  function handleReset () {
    setFullName(currentFullName)
    setAvatar(null)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label='Email address'>
        <Input value={email} disabled />
      </FormRow>
      <FormRow label='Full name'>
        <Input
          type='text'
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          disabled={isUpdatingUserData}
          id='fullName'
        />
      </FormRow>
      <FormRow label='Avatar image'>
        <FileInput
          id='avatar'
          accept='image/*'
          onChange={(e) => setAvatar(e.target.files[0])}
          disabled={isUpdatingUserData}
        />
      </FormRow>
      <FormRow>
        <Button
          type='reset'
          $variation='secondary'
          onClick={handleReset}
          disabled={isUpdatingUserData}
        >
          Cancel
        </Button>
        <Button disabled={isUpdatingUserData}>Update account</Button>
      </FormRow>
    </Form>
  )
}

export default UpdateUserDataForm
