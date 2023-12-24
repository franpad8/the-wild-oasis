import supabase, { supabaseUrl } from './supabase'

async function getCabins () {
  const { data, error } = await supabase
    .from('cabins')
    .select('*')

  if (error) {
    console.error(error)
    throw new Error('Error retrieving cabins data')
  }

  return data
}

async function removeCabin (id) {
  const { error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id)

  if (error) {
    console.error(error)
    throw new Error('Error deleting cabin')
  }
}

async function createCabin (newCabin) {
  const isEditSession = Boolean(newCabin.id)
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl)
  let imagePath
  let imageName

  if (hasImagePath) {
    imageName = newCabin.image.split('/').slice(-1)
    imagePath = newCabin.image
  } else {
    imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '')
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`
  }

  if (!isEditSession) delete newCabin.id
  const { data, error } = await supabase
    .from('cabins')
    .upsert([
      { ...newCabin, image: imagePath }
    ])

  if (error) {
    const errorMessage = isEditSession
      ? 'Error updating cabin'
      : 'Error creating cabin'
    console.error(error)
    throw new Error(errorMessage)
  }

  if (hasImagePath) return data

  const { storageError } = await supabase
    .storage
    .from('cabins-images')
    .upload(imageName, newCabin.image)

  if (storageError) {
    await supabase
      .from('cabins')
      .delete()
      .eq('id', data.id)

    console.error(storageError)
    throw new Error('Error uploading the cabin image. The cabin could not be created.')
  }

  return data
}

export { createCabin, getCabins, removeCabin }
