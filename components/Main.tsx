import LoadingSpinner from './LoadingSpinner';
import { formatDistanceToNow } from 'date-fns';
import { formatDistance } from 'date-fns/esm';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Feed } from './Feed';

type RedditJson = {};

export function Main({}) {
    const token = '-h3oSbFfls22mO_UkawmuLphG9sD47Q';
    const { data: homePageJson, isLoading, isError } = useQuery({
        queryKey: 'home',
        queryFn: async () => {
            return fetch('https://oauth.reddit.com/hot/.json', {
                method: 'GET',
                headers: {
                    Authorization: `bearer ${token}`,
                },
            }).then((res) => res.json());
        },
    });

    return (
        <main className="z-[1] flex w-full max-w-[600px] flex-col  border border-dim-border font-display">
            <div className="sticky top-1 z-[3] px-[16px]">
                <span className="text-20px font-semibold">Home</span>
            </div>
            {isLoading && (
                <div className="flex w-full justify-center py-[12px]">
                    <LoadingSpinner />
                </div>
            )}
            {homePageJson && !isLoading && !isError && (
                <Feed data={homePageJson.data.children} />
            )}
        </main>
    );
}
