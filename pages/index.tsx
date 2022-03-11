import type { NextPage } from 'next';
import { loadStaticPaths } from 'next/dist/server/dev/static-paths-worker';
import { Main } from '../components/Main';
import Head from 'next/head';
import Image from 'next/image';
import { Navigation } from '../components/Navigation';

const Index: NextPage = () => {
    return (
        <div className="flex min-h-screen h-full mx-auto  bg-dim text-white">
            <Navigation />
            <Main />
        </div>
    );
};

export default Index;
