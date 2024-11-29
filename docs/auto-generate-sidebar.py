import os

def generate_index_file(subdir_path, notes_dir):
    # 获取当前目录下的所有Markdown文件（除了index.md）和子目录
    markdown_files = [f for f in os.listdir(subdir_path) if f.endswith('.md') and f != 'index.md']
    subdirectories = [d for d in os.listdir(subdir_path) if os.path.isdir(os.path.join(subdir_path, d)) and d != 'imgs']

    # 对文件名进行排序
    markdown_files.sort()
    subdirectories.sort()

    # 生成index.md内容
    index_content = "# 目录\n\n"

    # 添加子目录链接
    for subdir in subdirectories:
        relative_path = os.path.relpath(os.path.join(subdir_path, subdir, 'index.md'), notes_dir)
        link = f"notes/{relative_path}".replace(os.sep, '/')
        index_content += f"- [{subdir}]({link})\n"

    # 添加Markdown文件链接
    for file in markdown_files:
        file_name = os.path.splitext(file)[0]
        relative_path = os.path.relpath(os.path.join(subdir_path, file), notes_dir)
        link = f"notes/{relative_path}".replace(os.sep, '/')
        index_content += f"- [{file_name}]({link})\n"
    
    # 写入index.md文件
    index_file_path = os.path.join(subdir_path, 'index.md')
    with open(index_file_path, 'w', encoding='utf-8') as index_file:
        index_file.write(index_content)

def generate_sidebar_for_directory(directory, depth, notes_dir, sidebar_content):
    # 递归处理多级目录
    dirs = []
    files = []
    for name in sorted(os.listdir(directory)):
        path = os.path.join(directory, name)
        relative_path = os.path.relpath(path, notes_dir)
        
        if os.path.isdir(path) and name != 'imgs':
            dirs.append((name, path, relative_path))
        elif name.endswith('.md') and name != 'index.md':
            files.append((name, relative_path))
    
    # 添加当前目录下的文件夹链接
    for dir_name, dir_path, rel_path in dirs:
        # 为当前目录生成或更新index.md
        generate_index_file(dir_path, notes_dir)
        
        # 在侧边栏中添加当前目录链接
        sidebar_content.append("  " * depth + f"+ [{dir_name}]({os.path.join('notes', rel_path, 'index.md').replace(os.sep, '/')})\n")
        
        # 递归处理子目录
        generate_sidebar_for_directory(dir_path, depth + 1, notes_dir, sidebar_content)
    
    # 添加当前目录下的Markdown文件链接
    for file_name, rel_path in files:
        file_name_without_ext = os.path.splitext(file_name)[0]
        link = f"notes/{rel_path}".replace(os.sep, '/')
        sidebar_content.append("  " * (depth + 1) + f"+ [{file_name_without_ext}]({link})\n")

def generate_sidebar(notes_dir, sidebar_path):
    # 获取notes文件夹的绝对路径
    notes_dir = os.path.abspath(notes_dir)
    
    # 检查notes文件夹是否存在
    if not os.path.exists(notes_dir):
        print(f"Error: Directory {notes_dir} does not exist.")
        return
    
    # 生成Sidebar内容
    sidebar_content = []
    generate_sidebar_for_directory(notes_dir, 0, notes_dir, sidebar_content)
    
    # 将列表转换成字符串
    sidebar_content_str = ''.join(sidebar_content)
    
    # 写入_sidebar.md文件
    with open(sidebar_path, 'w', encoding='utf-8') as sidebar_file:
        sidebar_file.write(sidebar_content_str)
    
    print(f"Sidebar generated successfully at {sidebar_path}")

# 调用函数
if __name__ == "__main__":
    notes_dir = './notes'  # notes文件夹的路径
    sidebar_path = './_sidebar.md'  # _sidebar.md文件的路径
    generate_sidebar(notes_dir, sidebar_path)