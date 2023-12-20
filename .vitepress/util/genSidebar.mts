import * as fs from 'node:fs'
import * as path from 'node:path'
import { DefaultTheme } from 'vitepress'

interface DirectoryResult {
  sidebarItems: DefaultTheme.SidebarItem[];
  folderLink: string | null;
}

/**
 * 根据文件路径生成页面链接
 */
function generateLink(filePath: string, basePath: string): string {
  return '/' + path.relative(basePath, filePath)
    .replace(/\\/g, '/')
    .replace(/\.md$/, '')
}

/**
 * 递归遍历目录生成侧边栏项
 */
function walkDirectory(directory: string, basePath: string): DirectoryResult {
  // 侧边栏项
  const sidebarItems: DefaultTheme.SidebarItem[] = []
  // 该目录是否可点击
  let folderLink = fs.existsSync(path.join(directory, 'index.md'))
    ? generateLink(directory, basePath) + '/'
    : null

  const filesAndDirs = fs.readdirSync(directory, { withFileTypes: true })
  filesAndDirs.forEach(dirent => {
    const fullPath = path.join(directory, dirent.name)
    if (dirent.isDirectory()) {
      // 如果是目录则递归调用
      const directoryItems = walkDirectory(fullPath, basePath)
      if (directoryItems.sidebarItems.length > 0) {
        sidebarItems.push({
          text: dirent.name,
          ...(directoryItems.folderLink ? { link: directoryItems.folderLink } : {}),
          items: directoryItems.sidebarItems
        })
      }
    } else if (path.extname(dirent.name) === '.md' && dirent.name !== 'index.md') {
      // 如果是 Markdown 文件则添加到数组
      sidebarItems.push({
        text: path.basename(dirent.name, '.md'),
        link: generateLink(fullPath, basePath)
      })
    }
  })

  return { sidebarItems, folderLink }
}

/**
 * 为指定目录生成侧边栏
 */
export function generateSidebar(directory: string): DefaultTheme.SidebarItem[] {
  let basePath = path.dirname(directory)
  return walkDirectory(directory, basePath).sidebarItems
}
