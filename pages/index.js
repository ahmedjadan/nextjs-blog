import Head from "next/head";
import Link from 'next/link'
import React, {useState} from 'react'

import Layout, { siteTitle } from "../components/layout";
import { getSortedPostsData } from "../lib/posts";

export default function Home({ allPostsData }) {
  const [dark, setDark] = useState(false)
  return (
    <Layout home className="bg-gray-100">
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <div onClick={() => setDark(!dark)} className="p-4 bg-indigo-600 rounded-md cursor-pointer">Toggle</div>
      <section className={dark ? 'dark' : 'light'}>
        <h2 className="text-2xl font-serif font-semibold text-indigo-700">Blog</h2>
        <p className="p-4 text-2xl bg-white dark:bg-gray-800 mt-2 dark:text-gray-100 rounded-md text-indigo-600 ">[Your Self Introduction]</p>
        <p className="p-4 text-2xl bg-white dark:bg-gray-800 mt-2 dark:text-gray-100 rounded-md text-indigo-600 ">[Your Self Introduction]</p>
        <p className="p-4 text-2xl bg-white dark:bg-gray-800 mt-2 dark:text-gray-100 rounded-md text-indigo-600 ">[Your Self Introduction]</p>
        <p className="p-4 text-2xl bg-white dark:bg-gray-800 mt-2 dark:text-gray-100 rounded-md text-indigo-600 ">[Your Self Introduction]</p>
        <ul>
          {allPostsData &&
            allPostsData.map(({ id, title, date }) => (
              <li key={id}>
                <Link href={`/posts/${id}`}>
                <a>
                {title}
                </a>
                </Link>
                <br />
                {date}
              </li>
            ))}
        </ul>
      </section>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const allPostsData = await getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};
