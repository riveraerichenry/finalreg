// pages/api/profile.ts
import { NextApiRequest, NextApiResponse } from 'next'

type Profile = {
  userName: string
  firstName: string
  middleName: string
  lastName: string
  emailAddress: string
  mobileNumber: string
}

const profiles: Record<string, Profile> = {
  id: {
    userName: '',
    firstName: '',
    middleName: '',
    lastName: '',
    emailAddress: '',
    mobileNumber: '',
  },

}

export default (req: NextApiRequest, res: NextApiResponse<Profile>) => {
  const { id } = req.query
  const profile = profiles[id as string]

  if (!profile) {
    return res.status(404).end()
  }

  res.status(200).json(profile)
}