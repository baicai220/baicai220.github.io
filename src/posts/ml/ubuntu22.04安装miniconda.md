# ubuntu22.04安装miniconda

## conda

两个概念：conda和miniconda

+ Miniconda，**它只包含最基本的内容——python与conda**，以及相关的必须依赖项，其他的库得自己装。
+ conda 是一种通用包管理系统，旨在构建和管理任何语言和任何类型的软件。

## 安装流程

+ 检查 python 版本

```bash
python3 --version
```

+ 下载文件

```bash
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
```

+ 添加可执行权限

```bash
sudo chmod +x Miniconda3-latest-Linux-x86_64.sh
```

+ 运行安装脚本

```bash
./Miniconda3-latest-Linux-x86_64.sh
```

+ 将miniconda加入PATH路径

```bash
vim ~/.bashrc
```

```shell
# <<< conda initialize <<<
# 在代码最后加入：

export PATH="/home/baicai/miniconda3/bin:$PATH"
```

+ 执行以下命令生效

```bash
source  ~/.bashrc
```

## minconda的一些操作
+ 创建conda环境

```bash
conda create -n py1 python=3.11
```

+ 激活conda环境

```bash
conda activate py1
```

+ 退出conda环境

```bash
conda deactivate
```

+ 检查conda环境是否安装好

```bash
conda info --envs
```

+ 删除conda环境

```bash
conda remove -n py1 --all
```

+ <font style="color:rgba(0, 0, 0, 0.85);">让 Conda 在启动终端时  不再自动/自动  激活基础环境</font>

```bash
conda config --set auto_activate_base false

conda config --set auto_activate_base true
```

+ conda init，会实现以下功能：
    - 自动加载Conda：在每次打开终端时，自动加载 Conda 的功能，让你能够直接使用 `conda` 命令。
    - 激活环境：允许通过 `conda activate <environment_name>` 命令轻松地切换到指定的 Conda 环境。

```bash
conda init bash
```

## conda的基本操作
升级全部库： conda upgrade --all 

升级一个包 conda update packagename 

安装包：conda install packagename 

也可以安装多个包： conda installl numpy pandas scipy 

安装固定版本的包：conda install numpy =1.10 

移除一个包：conda remove packagename 

查看所有包：conda list







