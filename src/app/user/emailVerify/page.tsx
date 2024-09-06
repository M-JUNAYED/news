import PlainLayout from '@/component/mastter/PlainLayout'
import VerifyEmail from '@/component/user/VerifyEmail'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import React from 'react'

const page = () => {

  const cookieStore = cookies();
  const token = cookieStore.get('token');
  
  if(typeof token !== 'undefined'){
    redirect('/')
  }

  return (
    <PlainLayout>
        <VerifyEmail />
    </PlainLayout>
  )
}

export default page