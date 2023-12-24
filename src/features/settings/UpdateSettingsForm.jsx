import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import Spinner from '../../ui/Spinner'
import useSettings from './useSettings'
import useUpdateSettings from './useUpdateSettings'

function UpdateSettingsForm () {
  const {
    isLoading,
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice
  } = useSettings()

  const { isUpdating, updateSettings } = useUpdateSettings()

  const isProcessing = isLoading || isUpdating

  const handleSettingUpdate = (e, fieldName) => {
    const value = e.target.value

    if (!value) return
    updateSettings({ [fieldName]: value })
  }

  if (isLoading) return <Spinner />

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input onBlur={(e) => handleSettingUpdate(e, 'minBookingLength')} defaultValue={minBookingLength} type='number' id='min-nights' disabled={isProcessing} />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input onBlur={(e) => handleSettingUpdate(e, 'maxBookingLength')} defaultValue={maxBookingLength} type='number' id='max-nights' disabled={isProcessing} />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input onBlur={(e) => handleSettingUpdate(e, 'maxGuestsPerBooking')} defaultValue={maxGuestsPerBooking} type='number' id='max-guests' disabled={isProcessing} />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input onBlur={(e) => handleSettingUpdate(e, 'breakfastPrice')} defaultValue={breakfastPrice} type='number' id='breakfast-price' disabled={isProcessing} />
      </FormRow>
    </Form>
  )
}

export default UpdateSettingsForm
