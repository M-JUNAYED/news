import PlainLayout from '@/component/mastter/PlainLayout'
import LoginFrom from '@/component/user/LoginFrom'
import React from 'react'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

const page = () => {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  
  if(typeof token !== 'undefined'){
    redirect('/')
  }
  return (
    <PlainLayout>
        <LoginFrom />
    </PlainLayout>
  )
}

export default page