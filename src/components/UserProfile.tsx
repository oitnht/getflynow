
import React from 'react'
import Card from './Card'

interface User {
  name: string
  email: string
  avatar?: string
}

interface UserProfileProps {
  user: User
}

export default function UserProfile({ user }: UserProfileProps) {
  return (
    <Card title="User Profile">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
          {user.name.charAt(0)}
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">{user.name}</h4>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
    </Card>
  )
}
