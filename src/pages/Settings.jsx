import UpdateSettingsForm from '../features/settings/UpdateSettingsForm'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

function Settings () {
  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>Update hotel settings</Heading>
      </Row>

      <Row>
        <UpdateSettingsForm />
      </Row>
    </>
  )
}

export default Settings
