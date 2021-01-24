import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";


const postsDirectory = path.join(process.cwd(), "posts");

export const getSortedPostsData = () => {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.map((file) => {
    const id = file.replace(/\.md/, "");
    //full path
    const fullPath = path.join(postsDirectory, file);
    //read the file content
    const fileContent = fs.readFileSync(fullPath, "utf-8");

    const matterResults = matter(fileContent);

    return { id, ...matterResults.data };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
};

export const getAllPostsId = () => {
  const filesNames = fs.readdirSync(postsDirectory);

  return filesNames.map((file) => {
    return {
      params: {
        slug: file.replace(/\.md/, ""),
      },
    };
  });
};

export const getPostData = async (slug) => {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf-8");

  const matterResult = matter(fileContents);

  //use remark to parse the markdown into HTML string 
  const processedContent = await remark().use(html).process(matterResult.content)
  const contentHTML = processedContent.toString()

  return {
    slug,
   contentHTML, ...matterResult.data,
  };
};
