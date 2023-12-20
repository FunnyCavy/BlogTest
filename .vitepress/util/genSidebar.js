import path from 'node:path'
import fs from 'node:fs'

function generateLink(filePath, basePath) {
    // 根据文件路径生成相对链接
    return '/' + path.relative(basePath, filePath)
        .replace(/\\/g, '/')
        .replace(/\.md$/, '');
}

function walkDirectory(directory, basePath) {
    const items = [];
    const filesAndDirs = fs.readdirSync(directory, {withFileTypes: true});

    // 检查当前目录是否有 index.md
    let folderLink = fs.existsSync(path.join(directory, 'index.md'))
        ? generateLink(directory, basePath) + '/'
        : null;

    filesAndDirs.forEach(dirent => {
        const fullPath = path.join(directory, dirent.name);
        if (dirent.isDirectory()) {
            // 如果是目录则递归调用
            const directoryItems = walkDirectory(fullPath, basePath);
            if (directoryItems.items.length > 0) {
                items.push({
                    text: dirent.name,
                    ...(directoryItems.folderLink ? {link: directoryItems.folderLink} : {}),
                    items: directoryItems.items
                });
            }
        } else if (path.extname(dirent.name) === '.md' && dirent.name !== 'index.md') {
            // 如果是 Markdown 文件则添加到数组
            items.push({
                text: path.basename(dirent.name, '.md'),
                link: generateLink(fullPath, basePath)
            });
        }
    });

    return {items, folderLink};
}

export function generateSidebar(directory) {
    let basePath = path.dirname(directory)
    return walkDirectory(directory, basePath).items;
}
