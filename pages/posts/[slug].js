import Layout from "../../components/Layout";
import { getAllPostsId, getPostData } from "../../lib/posts";


export default function Post({content}) {
  return <Layout>
      <p> {content.title} </p>
      <br/>
      <p>{ content.slug }</p>
      <p>{ content.date }</p>
      <br/>
      <p dangerouslySetInnerHTML={{__html: content.contentHTML}}></p>
  </Layout>;
}

export const getStaticPaths = async () => {
  const paths = getAllPostsId();

  return {
    paths,
    fallback: false,
  };
};
export const getStaticProps = async ({ params }) => {
    const content = await getPostData(params.slug)

    return {
        props: {
            content
        }
    }
};
