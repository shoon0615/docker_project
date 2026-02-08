'use client'

import { wait } from '@/serverActions'
import { useState, useEffect } from 'react'

export default function ClientPage() {
  console.log('ClientPage')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    wait(3000).then(({ message }) => {
      setMessage(message)
      setLoading(false)
    })
  }, [])
  return <h1>{loading ? 'Loading...' : message}</h1>
}