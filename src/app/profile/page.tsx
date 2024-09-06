import React from 'react';
import PlainLayout from '@/component/mastter/PlainLayout';
import {cookies} from "next/headers";
import ProfileForm from '@/component/profile/ProfileForm';

async function getData(cookies:any) {
    let option:any={method: 'GET', headers: {'Cookie': cookies}, cache: 'no-store'}
    let profile = (await (await fetch(`${process.env.HOST}/api/user/profile/detiel`,option)).json())['data'];
    return { profile: profile };
}

const Page = async () => {

    const cookieStore = cookies()
    let data=await getData(cookieStore);

    return (
        <PlainLayout>
            <ProfileForm data={data['profile']} />
        </PlainLayout>
    );
};

export default Page;