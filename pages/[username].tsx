// pages/[username].tsx
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useProfile } from './hooks/useProfile'

const ProfilePage = () => {
  const router = useRouter()
  const { username } = router.query
  const { data: profile, error } = useProfile(username as string)

  useEffect(() => {
    if (error) {
      // Handle error
    }
  }, [error])

  if (!profile) {
    // Handle loading state
    return null
  }

  return (
    <div>
      <h1>{profile.name}</h1>
      <p>{profile.bio}</p>
    </div>
  )
}

export default ProfilePage