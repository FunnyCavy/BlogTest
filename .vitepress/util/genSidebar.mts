import * as fs from 'node:fs'
import * as path from 'node:path'

/**
 * 根据文件路径生成页面链接
 */
function generateLink(filePath: string, basePath: string) {
  return '/' + path.relative(basePath, filePath)
    .replace(/\\/g, '/')
    .replace(/\.md$/, '')
}

/**
 * 遍历目录
 */
function walkDirectory(directory: string, basePath: string) {
  const sidebarItems = []
  const filesAndDirs = fs.readdirSync(directory, { withFileTypes: true })

  // 检查当前目录是否有 index.md
  let folderLink = fs.existsSync(path.join(directory, 'index.md'))
    ? generateLink(directory, basePath) + '/'
    : null

  filesAndDirs.forEach(dirent => {
    const fullPath = path.join(directory, dirent.name)
    if (dirent.isDirectory) {
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

export function generateSidebar(directory: string) {
  let basePath = path.dirname(directory)
  return walkDirectory(directory, basePath).sidebarItems
}
