// hooks/useProfile.ts
import useSWR from 'swr'
import axios from 'axios'

type Profile = {
  userName: string
  firstName: string
  middleName: string
  lastName: string
  emailAddress: string
  mobileNumber: string
}

export const useProfile = (id: string) => {
  const { data, error } = useSWR<Profile>(`/profile?id=${id}`, url => axios.get(url).then(res => res.data))

  return {
    data,
    error,
  }
}