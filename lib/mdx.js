import fs from 'fs'
import read from 'fs-readdir-recursive'
import matter from 'gray-matter'
import renderToString from 'next-mdx-remote/render-to-string'
import path from 'path'
import MDXComponents from '../components/MDXComponents'
import remarkPlugins from './remark'

const root = process.cwd()
const POSTS_DIR = '_posts'

// POSTS_PATH is useful when you want to get the path to a specific file
export const POSTS_PATH = path.join(root, POSTS_DIR)

export const getAllFiles = read(POSTS_PATH)

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const postFilePaths = getAllFiles(POSTS_PATH)
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path))

export async function getFileBySlug(slug) {
  const postFilePath = path.join(root, POSTS_DIR, `${slug}.mdx`)
  const source = fs.readFileSync(postFilePath, 'utf8')

  const { data, content } = matter(source)
  const mdxSource = await renderToString(content, {
    components: MDXComponents,
    mdxOptions: {
      remarkPlugins,
    },
    scope: data,
  })

  return {
    mdxSource,
    frontMatter: {
      slug: slug || null,
      ...data,
    },
  }
}

export async function getAllFilesFrontMatter() {
  const files = fs.readdirSync(path.join(root, POSTS_DIR))

  return files.reduce((allPosts, postSlug) => {
    const source = fs.readFileSync(path.join(root, POSTS_DIR, postSlug), 'utf8')
    const { data } = matter(source)

    return [
      {
        ...data,
        slug: postSlug.replace('.mdx', ''),
      },
      ...allPosts,
    ]
  }, [])
}
