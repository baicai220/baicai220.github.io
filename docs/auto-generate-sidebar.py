import os

def generate_index_file(subdir_path, notes_dir):
    # 获取子目录中的所有Markdown文件
    markdown_files = [f for f in os.listdir(subdir_path) if f.endswith('.md') and f != 'index.md']
    
    # 对文件名进行排序
    markdown_files.sort()
    
    # 生成index.md内容
    index_content = "# 目录\n\n"
    for file in markdown_files:
        file_name = os.path.splitext(file)[0]
        relative_path = os.path.relpath(os.path.join(subdir_path, file), notes_dir)
        link = f"notes/{relative_path}".replace(os.sep, '/')
        index_content += f"- [{file_name}]({link})\n"
    
    # 写入index.md文件
    index_file_path = os.path.join(subdir_path, 'index.md')
    with open(index_file_path, 'w', encoding='utf-8') as index_file:
        index_file.write(index_content)

def generate_sidebar(notes_dir, sidebar_path):
    # 获取notes文件夹的绝对路径
    notes_dir = os.path.abspath(notes_dir)
    
    # 检查notes文件夹是否存在
    if not os.path.exists(notes_dir):
        print(f"Error: Directory {notes_dir} does not exist.")
        return
    
    # 生成Sidebar内容
    sidebar_content = ""
    
    # 遍历notes目录下的所有子目录
    for subdir in sorted(os.listdir(notes_dir)):
        subdir_path = os.path.join(notes_dir, subdir)
        
        # 检查是否为目录
        if os.path.isdir(subdir_path):
            # 生成或更新index.md文件
            generate_index_file(subdir_path, notes_dir)
            
            # 添加文件夹名
            sidebar_content += f"+ [{subdir}]({os.path.join('notes', subdir, 'index.md').replace(os.sep, '/')})\n"
            
            # 获取子目录中的所有Markdown文件
            markdown_files = [f for f in os.listdir(subdir_path) if f.endswith('.md')]
            
            # 排除 index.md 文件
            markdown_files = [f for f in markdown_files if f != 'index.md']
            
            # 对文件名进行排序
            markdown_files.sort()
            
            # 添加子目录中的笔记文件
            for file in markdown_files:
                file_name = os.path.splitext(file)[0]
                relative_path = os.path.relpath(os.path.join(subdir_path, file), notes_dir)
                link = f"notes/{relative_path}".replace(os.sep, '/')
                sidebar_content += f"    + [{file_name}]({link})\n"
    
    # 写入_sidebar.md文件
    with open(sidebar_path, 'w', encoding='utf-8') as sidebar_file:
        sidebar_file.write(sidebar_content)
    
    print(f"Sidebar generated successfully at {sidebar_path}")

# 调用函数
if __name__ == "__main__":
    notes_dir = './notes'  # notes文件夹的路径
    sidebar_path = './_sidebar.md'  # _sidebar.md文件的路径
    generate_sidebar(notes_dir, sidebar_path)