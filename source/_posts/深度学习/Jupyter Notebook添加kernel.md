# Jupyter Notebook添加kernel

### kernal切换

*   先进入demo的环境，安装kernel:

```
conda install ipykernel
```

*   安装完毕后，使用：

```
 python -m ipykernel install --user --name demo --display-name "demo"
```

*   这样，jupyter notebook即可选择demo kernel。

### kernel命令

*   查看kernel：

```
jupyter kernelspec list
```

*   删除指定kernel

```
jupyter kernelspec remove kernel_name
```

