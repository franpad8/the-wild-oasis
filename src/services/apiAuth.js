import supabase, { supabaseUrl } from './supabase'

export async function loginUser ({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    console.error(error)
    throw new Error(error.message)
  }

  return data
}

export async function getCurrentUser () {
  const { error, data: { session } } = await supabase.auth.getSession()

  if (error) {
    console.error(error)
    throw new Error(error.message)
  }

  if (!session) return null

  return session.user
}

export async function logout () {
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error(error)
    throw new Error(error.message)
  }
}

export async function signUp ({ email, password, fullName }) {
  console.log(email, password, fullName)
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName
      }
    }
  })

  if (error) {
    console.error(error)
    throw new Error(error.message)
  }

  return data.user
}

export async function updateUserData ({ email, fullName, avatar }) {
  let avatarFileName
  let avatarPath
  if (avatar) {
    avatarFileName = `avatar-${email}-${Math.random()}`
    avatarPath = `${supabaseUrl}/storage/v1/object/public/avatars/${avatarFileName}`
  }

  const dataToUpdate = avatar ? { fullName, avatar: avatarPath } : { fullName }

  const { error, data } = await supabase.auth.updateUser({
    email,
    data: dataToUpdate
  })

  if (error) throw new Error(error.message)
  if (!avatar) return data

  const { error: storageError } = await supabase.storage
    .from('avatars')
    .upload(avatarFileName, avatar)

  if (storageError) throw new Error(storageError.message)

  return data
}

export async function changePassword (newPassword) {
  console.log(newPassword)
  const { error, data } = await supabase.auth.updateUser({
    password: newPassword
  })

  if (error) throw new Error(error.message)

  return data
}
