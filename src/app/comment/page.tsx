import React from 'react';
import PlainLayout from '@/component/mastter/PlainLayout';
import {cookies} from "next/headers";
import UserCommentsList from '@/component/comment/UserCommentsList';

async function getData(cookies:any) {
    let option:any={method: 'GET', headers: {'Cookie': cookies}, cache: 'no-store'}
    let Comments = (await (await fetch(`${process.env.HOST}/api/comment/manage`,option)).json())['data'];
    return { Comments: Comments };
}

const Page =async () => {

    const cookieStore = cookies()
    let data=await getData(cookieStore);

    return (
        <PlainLayout>
            <UserCommentsList data={data['Comments']}/>
        </PlainLayout>
    );
};

export default Page;