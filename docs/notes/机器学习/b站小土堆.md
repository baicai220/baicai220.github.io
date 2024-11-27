# 小土堆



## pytorch环境的安装配置

### 配置conda系统环境变量

安装miniconda
用户path添加（安装时就自动添加了）：

```
D:\programing\miniconda3py311
D:\programing\miniconda3py311\Scripts
D:\programing\miniconda3py311\Library\bin
```

### 配置conda虚拟环境安装路径

修改环境默认安装位置

-  看conda配置 
   - `conda info`
-  在指定目录下创建环境
   - `conda create --prefix=C:/ProgramData/Anaconda3/envs/pytorch python=3.8`
     - 这里`pytorch`就是环境名称
-  修改 .condarc，添加 
```
  envs_dirs:
    - D://programing//miniconda3py311//envs
```


   -  如再次创建环境还没修改成功，就去修改下对应`miniconda3py311`文件夹的权限 

### 更换conda源

-  查看当前源 
   - `conda config --show channels`
-  删除当前源 
   - `conda config --remove-key channels`
-  手动换源，修改用户目录下的.condarc文件 
```
  channels:
    - defaults
  show_channel_urls: true
  channel_alias: http://mirrors.tuna.tsinghua.edu.cn/anaconda
  default_channels:
    - http://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main
    - http://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free
    - http://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r
    - http://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/pro
    - http://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2
  custom_channels:
    conda-forge: http://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
    msys2: http://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
    bioconda: http://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
    menpo: http://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
    pytorch: http://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
    simpleitk: http://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
```


   -  改完之后在命令行输入 
      - `conda config --set show_channel_urls yes`
-  命令行换源 (一行一行输入) 
```
  conda config --add channels https://mirrors.aliyun.com/anaconda/pkgs/free
  conda config --add channels https://mirrors.aliyun.com/anaconda/pkgs/main
  conda config --add channels https://mirrors.aliyun.com/anaconda/pkgs/msys2
  conda config --add channels https://mirrors.aliyun.com/anaconda/pkgs/r
  
  conda config --set show_channel_urls yes
```


### 更换pip源

-  查看源 
   - `pip config list`
-  移除源 
   - `pip config unset global.index-url`
-  临时换源 
   - `pip install tqdm -i  https://pypi.tuna.tsinghua.edu.cn/simple`
-  设置源（管理员权限） 
   - `pip config set global.index-url --site https://pypi.tuna.tsinghua.edu.cn/simple`

### conda常用命令

- 删除环境 
   - `conda romove -n 虚拟环境名 --all`
- 查看有哪些虚拟环境 
   - `conda env list`
   - `conda info --envs`

### conda创建环境

`conda create -n pytorch1 python=3.9`
`conda activate pytorch1`

安装pytorch

- 不用先安装CUDA，pytorch已经集成了CUDA核心模块了
- 我们一般用conda创建环境，用pip安装包
- 安装pytorch：
   - `pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118`
- `pip list`就能看到安装的torch了
- 安装成功 

cmd输入`nvidia-smi`可以看到显卡信息

### 安装python编辑器

#### pycharm

- 创建项目
- 选择基础`conda`（`miniconda`安装在`D:\programing\miniconda3py311`）![](./imgs/1712929160635-28ca4a14-6fdf-4c12-85a0-fe79d80ee04d.png)
- 选择conda自定义环境![alt text](./imgs/1712929160688-bfd37ee5-3149-4111-b468-ba757dff21a4.png)
- 输出这样说明pycharm导入环境成功![alt text](./imgs/1712929160755-eafaf7d3-cbad-4c2a-ada7-b05bc0065c39.png)
- 在右侧我们还能看到变量状态![alt text](./imgs/1712929160835-a24b72b7-5a90-493f-bde4-df70d8d0d0d2.png)

#### jupyter

-  可以在系统装的python环境中安装jupyter，也可以在 base环境 / pytorch1环境 中安装jupyter
   - `pip install notebook`
   
-  cmd输入`jupyter notebook`即可进入编辑器，但是在jupyter notebook中没看到pytorch1环境，解决： 
   - ```
         avtivate pytorch1
         pip install ipykernel
         python -m ipykernel install --name pytorch1
     ```

   -  选择pytorch1环境![alt text](./imgs/1712929160889-78518e11-6b81-414d-8ed9-5cb1b3a1e4ae.png) 
   -  成功：![alt text](./imgs/1712929160948-2d8c0490-5fa2-4df4-9b72-e6c8ba53eea4.png) 

### conda install & pip install

- pip是Python默认的包管理器，只能安装python包，它将PyPI（Python Package Index）作为获取包的安装源，PyPI上的软件包特别多，因此pip可以访问到的数据包的量非常庞大
- conda是Anaconda的默认的包管理器，它将 Anaconda数据库作为获取包的安装源。conda重点专注于科学计算和数据计算等领域它的数据库中包含了许多常用的科学计算库，但总体的软件包数量要远小于pip，因此一些小众的软件包可以使用pip进行安装。conda支持安装多种语言的包
- pip在安装软件包时对当前环境内其他的软件包依赖的检查方式复杂且不一致，因此可能会导致包与包之间发生`冲突`； conda在安装软件包时使用更为复杂的检查方式，解决软件包的冲突问题，保证安装的所有软件包都能够`兼容`。
- pip没有内置环境隔离，需要借助conda提供的虚拟环境来实现
- pip 安装的库 ：如果使用系统的的python，则库会被保存在` ~/.local/lib/python3.x/site-packages `文件夹中，如果使用的是conda内置的python，则会被保存到` anaconda3/envs/current_env/lib/site-packages`中。。。conda 安装的库都会放在`anaconda3/pkgs`目录下。这样的好处就是，当在某个环境下已经下载好了某个库，再在另一个环境中还需要这个库时，就可以直接从pkgs目录下将该库复制至新环境而不用重复下载。
- conda install 和 pip install不要混着用，要用只用一个。conda对库的管理十分全面，而且不易产生冲突等各种乱七八糟的问题，但是pip包更全

### python两个有用的函数

python每个包（比如：torch）可以看成一个盒子

-  dir函数用来打开这个盒子，输出里边有什么道具 
   - 看看torch里面有什么 
      - `dir(torch)`
-  help函数告诉我们怎么使用道具 
   - 看看torch.cuda.is_available怎么使用 
      - `help(torch.cuda.is_available)`

### pycharm & 命令行 & jupyter

![alt text](./imgs/1712929161005-b2075042-faf9-486f-8da5-65bade6cf3fe.png)

这里c=a+b会出错，然后我们把b=2019修改成b="2019"后，代码再次运行后的流程

## pytorch加载数据初认识

- Dataset
- Dataloader

![image.png](./imgs/1712932581394-d7a18fc4-cb9e-4e15-9b7f-a04ad976d1e0.png)

读取数据集代码：
![image.png](./imgs/1712934944603-a9f402e4-496c-4692-8785-7ede88ba1eeb.png)
像这种情况，数据集的label就是数据集所在的文件夹名称

```python
from torch.utils.data import Dataset
from  PIL import Image

import os

class MyData(Dataset):
    def __init__(self,root_dir,label_dir):
        self.root_dir = root_dir
        self.label_dir = label_dir
        self.path=os.path.join(self.root_dir,self.label_dir)
        self.img_path=os.listdir(self.path)

    def __getitem__(self, idx):
        img_name=self.img_path[idx]
        img_item_path=os.path.join(self.path,img_name)
        img=Image.open(img_item_path)
        label=self.label_dir
        return img,label

    def __len__(self):
        return len(self.img_path)


root_dir="hymenoptera_data/train"
ants_label_dir="ants"
bees_label_dir="bees"
ants_dataset=MyData(root_dir,ants_label_dir)
bees_dataset=MyData(root_dir,bees_label_dir)

train_dataset=ants_dataset+bees_dataset
```
还有一种情况，当label比较复杂，如：![image.png](./imgs/1712935094099-b03f8930-83bd-4a68-830f-e28fd9d8fa6e.png)，在ants_image里放图片（如 1234.jpg），但是label放在ants_label文件夹中相同名字的txt文件中（如ants_image/1234.jpg对应label为 ants_label/1234.txt文件中的ants)

## TensorBoard的使用
```python
from torch.utils.tensorboard import SummaryWriter
import numpy as np
from PIL import Image

writer = SummaryWriter('logs')

image_path="练手数据集/train/ants_image/0013035.jpg"
img_PIL=Image.open(image_path)
img_array=np.array(img_PIL)

print(type(img_array))
print(img_array.shape)

writer.add_image("test",img_array,1,dataformats="HWC")

# writer.add_scalar()
for i in range(100):
    writer.add_scalar('y=2x', 2*i, i)

writer.close()
```
命令行输入：`tensorboard --logdir=logs`
![image.png](./imgs/1712988610877-e2c406fb-db58-4378-9dce-b0aae14888e2.png)

## trochvision中的transforms
![image.png](./imgs/1712979357857-4593373a-0caa-4469-8821-43f2051f719f.png)

```python
from torch.utils.tensorboard import SummaryWriter
from torchvision import transforms
from PIL import Image

img_path="练手数据集/train/ants_image/0013035.jpg"
img=Image.open(img_path)
print(img)

writer=SummaryWriter('logs')

tensor_trans=transforms.ToTensor()
tensor_img=tensor_trans(img)

print(tensor_img)

writer.add_image("Tensor_img",tensor_img)

writer.close()
```
```python
from PIL import Image
from torch.utils.tensorboard import SummaryWriter
from torchvision import transforms

writer=SummaryWriter('logs')

img=Image.open("images/c123bbafaf7dfc5ca61d5d29d3ff9bc3.jpg")
print(img)

# ToTensor
trans_totensor=transforms.ToTensor()
img_tensor=trans_totensor(img)

writer.add_image("ToTensor",img_tensor)

# Normalize
print(img_tensor[0][0][0])
trans_norm=transforms.Normalize([0.5,0.5,0.5],[0.5,0.5,0.5])
img_norm=trans_norm(img_tensor)
print(img_norm[0][0][0])

writer.add_image("Normalization",img_norm)


#resize
print(img.size)
trans_resize=transforms.Resize((512,512))
# img PIL -> resize  -> img_resize PIL
img_resize=trans_resize(img)
# img_resize PIL ->totensor ->img_resize tensor
img_resize=trans_totensor(img_resize)

writer.add_image("Resize",img_resize,0)


#Compose -resize -2
trans_resize_2=transforms.Resize(512)
trans_compose =transforms.Compose([trans_resize_2,trans_totensor])
img_resize_2=trans_compose(img)
writer.add_image("Resize",img_resize_2,1)

writer.close()

```

**总结：**

- 关注输入、输出
- 关注输入类型
- 多看官方文档


## torchvision中的数据集的使用
```python
import torchvision
from torch.utils.tensorboard import SummaryWriter

dataset_transform = torchvision.transforms.Compose([
    torchvision.transforms.ToTensor()
])

train_set=torchvision.datasets.CIFAR10(root='./dataset', train=True, download=True,transform=dataset_transform)

test_set=torchvision.datasets.CIFAR10(root='./dataset', train=False, download=True,transform=dataset_transform)

# print(test_set.classes)

# img,target=train_set[0]
# print(img)
# print(target) 
# print(test_set.classes[target])

print(test_set[0])

writer=SummaryWriter('logs')
for i in range(10):
    img,targrt=test_set[i]
    writer.add_image("test_set",img,i)


writer.close()
```
## DataLoader使用
![image.png](./imgs/1713001396767-64fea29b-8710-409b-bf93-edec49831303.png)

```python
import torchvision

from torch.utils.data import DataLoader
from torch.utils.tensorboard import SummaryWriter

test_data=torchvision.datasets.CIFAR10(root='./dataset', train=False, download=True,transform=torchvision.transforms.ToTensor())

test_loader=DataLoader(dataset=test_data,batch_size=4,shuffle=True,num_workers=0,drop_last=False)

# 测试集中的第一张图片
img,target=test_data[0]
print(img.shape)
print(target)

writer=SummaryWriter('logs')
for epoch in range(2):
    step=0
    for data in test_loader:
        imgs,targets=data
        # print(imgs.shape)
        # print(targets)
        writer.add_images("Epoch:{}".format(epoch),imgs,step)
        step+=1

writer.close()
```
## 神经网络的基本骨架-nn.Module的使用
```python
import torch
from torch import nn


class  Tudui(nn.Module):
    def __init__(self):
        super().__init__()

    def forward(self,input):
        output=input+1
        return output

tudui=Tudui()
x=torch.tensor(1.0)
output=tudui(x)
print(output)
```
## 卷积层
> 作用是提取图片特征

![alt text](./imgs/1713006262344-dd8d142d-9b88-4c5b-ad82-42999cbf6398.png)

```python

import torch
import torch.nn.functional as F

input=torch.tensor([[1,2,0,3,1],
                    [0,1,2,3,1],
                    [1,2,1,0,0],
                    [5,2,3,1,1],
                    [2,1,0,1,1]])


kernel=torch.tensor([[1,2,1],
                     [0,1,0],
                     [2,1,0]])

input=torch.reshape(input,(1,1,5,5))
kernel=torch.reshape(kernel,(1,1,3,3))

print(input.shape)
print(kernel.shape)

output=F.conv2d(input,kernel,stride=1)
print(output)

output=F.conv2d(input,kernel,stride=2)
print(output)

output=F.conv2d(input,kernel,stride=2,padding=1)
print(output)

```
```python

import torch
import torchvision
from torch import nn
from torch.utils.data import DataLoader
from torch.utils.tensorboard import SummaryWriter

dataset=torchvision.datasets.CIFAR10(root='./dataset', train=False, download=True,transform=torchvision.transforms.ToTensor())

dataLoader=DataLoader(dataset,batch_size=64)

class Tuduin(nn.Module):
    def __init__(self):
        super(Tuduin, self).__init__()
        self.conv1 = nn.Conv2d(3,6,3)

    def forward(self,x):
        x=self.conv1(x)
        return x

tudui=Tuduin()
print(tudui)

writer=SummaryWriter('logs')
step=0
for data in dataLoader:
    imgs,targets=data
    output=tudui(imgs)
    print(imgs.shape)
    print(output.shape)
    writer.add_images("input",imgs,step)
    output=torch.reshape(output,(-1,3,30,30))
    writer.add_images("output",output,step)

    step+=1


```
## 神经网络-最大池化的使用
![alt text](./imgs/1713063068109-b6886349-57b3-4b87-a0fb-bba75d347a4d.png)

```python

import torch
from torch import nn
from torch.nn import MaxPool2d

input=torch.tensor([[1,2,0,3,1],
                    [0,1,2,3,1],
                    [1,2,1,0,0],
                    [5,2,3,1,1],
                    [2,1,0,1,1]],dtype=torch.float32)

# -1表示让他自己计算batch size
input=torch.reshape(input,(-1,1,5,5))

print(input.shape)

class Tudui(nn.Module):
    def __init__(self):
        super(Tudui,self).__init__()
        # self.maxpool1 = MaxPool2d(kernel_size=3,ceil_mode=True)
        self.maxpool1 = MaxPool2d(kernel_size=3, ceil_mode=False)
    def forward(self,input):
        output = self.maxpool1(input)
        return  output

tudui = Tudui()
output = tudui(input)
print(output)
```
最大池化作用：
> 想减小数据维度，又想保持数据特征，缩短训练时间
> 比如：
> 1080p图像经过最大池化 --> 720p，但是依然满足我们需求

```python

import torch
import torchvision
from torch import nn
from torch.nn import MaxPool2d
from torch.utils.data import DataLoader
from torch.utils.tensorboard import SummaryWriter

dataset=torchvision.datasets.CIFAR10(root='./dataset', train=False, download=True,
                                     transform=torchvision.transforms.ToTensor())

dataloader=DataLoader(dataset,batch_size=64)

class Tudui(nn.Module):
    def __init__(self):
        super(Tudui,self).__init__()
        # self.maxpool1 = MaxPool2d(kernel_size=3,ceil_mode=True)
        self.maxpool1 = MaxPool2d(kernel_size=3, ceil_mode=False)

    def forward(self,input):
        output = self.maxpool1(input)
        return  output

tudui = Tudui()

writer=SummaryWriter('logs')
step=0
for data in dataloader:
    imgs,targets=data
    writer.add_images("input",imgs,step)
    output=tudui(imgs)
    writer.add_images("output",output,step)
    step+=1

writer.close()

```
## 非线性激活
```python
import torch
from torch import nn
from torch.nn import ReLU

input =torch.tensor([[1,-0.5],[-1,3]])

input=torch.reshape(input,[-1,1,2,2])
print(input.shape)

class Tudui(nn.Module):
    def __init__(self):
        super(Tudui, self).__init__()
        self.relu1=ReLU()

    def forward(self,input):
        output=self.relu1(input)
        return output

tudui=Tudui()

output=tudui(input)
print(output)
```
```python
import torch
import torchvision
from torch import nn
from torch.nn import ReLU, Sigmoid
from torch.utils.data import DataLoader
from torch.utils.tensorboard import SummaryWriter

dataset=torchvision.datasets.CIFAR10(root='./dataset', train=False, download=True,transform=torchvision.transforms.ToTensor())

dataloader=DataLoader(dataset,batch_size=64)

class Tudui(nn.Module):
    def __init__(self):
        super(Tudui, self).__init__()
        self.relu1=ReLU()
        self.sigmoid1=Sigmoid()

    def forward(self,input):
        output=self.sigmoid1(input)
        return output

tudui=Tudui()
step=0
writer=SummaryWriter('./logs')
for data in dataloader:
    imgs,targets=data
    writer.add_images("input",imgs,global_step=step)
    output=tudui(imgs)
    writer.add_images("output",output,global_step=step)


writer.close()

```
## 神经网络-线性层及其它层介绍
```python
import torch
import torchvision
from torch import nn

dataset=torchvision.datasets.CIFAR10(root='./dataset', train=False, download=True,
                                     transform=torchvision.transforms.ToTensor())

# drop_last=False 表示不要最后的不满64个的
dataloader = torch.utils.data.DataLoader(dataset, batch_size=64,drop_last=True)

class Tudui(nn.Module):
    def __init__(self):
        super(Tudui, self).__init__()
        self.linear1=nn.Linear(196608, 10)

    def forward(self, input):
        output=self.linear1(input)
        return output

tudui=Tudui()

for data in dataloader:
    imgs,targets = data
    print(imgs.shape)
    # output=torch.reshape(imgs,(1,1,1,-1))
    output=torch.flatten(imgs)
    print(output.shape)
    output=tudui(output)
    print(output.shape)
```

## 神经网络-搭建小实战和Sequential使用
![image.png](./imgs/1713258570433-e7b38232-cec4-43a8-8767-cc39bafb012e.png)
```python
import torch
from torch import nn
from torch.utils.tensorboard import SummaryWriter


class Tudui(nn.Module):
    def __init__(self):
        super(Tudui, self).__init__()
        # self.conv1 = nn.Conv2d(3, 32, kernel_size=5,padding=2)
        # self.maxpool1 = nn.MaxPool2d(2)
        # self.conv2 = nn.Conv2d(32, 32, kernel_size=5,padding=2)
        # self.maxpool2 = nn.MaxPool2d(2)
        # self.conv3 = nn.Conv2d(32, 64, kernel_size=5,padding=2)
        # self.maxpool3 = nn.MaxPool2d(2)
        # self.flatten = nn.Flatten()
        # self.linear1=nn.Linear(1024, 64)
        # self.linear2=nn.Linear(64, 10)

        self.model1=nn.Sequential(
            nn.Conv2d(3,32,5,padding=2),
            nn.MaxPool2d(2),
            nn.Conv2d(32, 32, kernel_size=5, padding=2),
            nn.MaxPool2d(2),
            nn.Conv2d(32, 64, kernel_size=5, padding=2),
            nn.MaxPool2d(2),
            nn.Flatten(),
            nn.Linear(1024, 64),
            nn.Linear(64, 10)
        )

    def forward(self, x):
        # x=self.conv1(x)
        # x=self.maxpool1(x)
        # x=self.conv2(x)
        # x=self.maxpool2(x)
        # x=self.conv3(x)
        # x=self.maxpool3(x)
        # x=self.flatten(x)
        # x=self.linear1(x)
        # x=self.linear2(x)

        # Sequential的作用
        x=self.model1(x)
        return x

tudui=Tudui()
print(tudui)

# 检测下网络的正确性
input=torch.ones((64,3,32,32))
output=tudui(input)
print(output.shape)

writer=SummaryWriter('logs')
writer.add_graph(tudui,input)
writer.close()



```

## 损失函数与反向传播
```python
import torch
from torch import nn
from torch.nn import L1Loss

inputs=torch.tensor([1,2,3],dtype=torch.float)
targets=torch.tensor([1,2,5],dtype=torch.float)

inputs=torch.reshape(inputs,(1,1,1,3))
targets=torch.reshape(targets,(1,1,1,3))

loss=L1Loss()
result=loss(inputs,targets)

loss_mse=nn.MSELoss()
result_mse=loss_mse(inputs,targets)

print(result)
print(result_mse)

# 交叉熵损失
x=torch.tensor([0.1,0.2,0.3])
y=torch.tensor([1])
x=torch.reshape(x,(1,3))
loss_cross=nn.CrossEntropyLoss()
result_cross=loss_cross(x,y)
print(result_cross)
```
```python
import torch
import torchvision
from torch import nn
from torch.utils.tensorboard import SummaryWriter

dataset=torchvision.datasets.CIFAR10(root='./dataset', train=False, download=True,
                                     transform=torchvision.transforms.ToTensor())

dataloader = torch.utils.data.DataLoader(dataset, batch_size=1)

class Tudui(nn.Module):
    def __init__(self):
        super(Tudui, self).__init__()
        self.model1=nn.Sequential(
            nn.Conv2d(3,32,5,padding=2),
            nn.MaxPool2d(2),
            nn.Conv2d(32, 32, kernel_size=5, padding=2),
            nn.MaxPool2d(2),
            nn.Conv2d(32, 64, kernel_size=5, padding=2),
            nn.MaxPool2d(2),
            nn.Flatten(),
            nn.Linear(1024, 64),
            nn.Linear(64, 10)
        )

    def forward(self, x):
        x=self.model1(x)
        return x


tudui=Tudui()
loss=nn.CrossEntropyLoss()
for data in dataloader:
    imgs,targets=data
    outputs=tudui(imgs)
    result_loss=loss(outputs,targets)
    result_loss.backward()
    print('ok~')


```
## 优化器
```python
import torch
import torchvision
from torch import nn

dataset=torchvision.datasets.CIFAR10(root='./dataset', train=False, download=True,
                                     transform=torchvision.transforms.ToTensor())

dataloader = torch.utils.data.DataLoader(dataset, batch_size=1)

class Tudui(nn.Module):
    def __init__(self):
        super(Tudui, self).__init__()
        self.model1=nn.Sequential(
            nn.Conv2d(3,32,5,padding=2),
            nn.MaxPool2d(2),
            nn.Conv2d(32, 32, kernel_size=5, padding=2),
            nn.MaxPool2d(2),
            nn.Conv2d(32, 64, kernel_size=5, padding=2),
            nn.MaxPool2d(2),
            nn.Flatten(),
            nn.Linear(1024, 64),
            nn.Linear(64, 10)
        )

    def forward(self, x):
        x=self.model1(x)
        return x


tudui=Tudui()
loss=nn.CrossEntropyLoss()
# 设置优化器
optim=torch.optim.SGD(tudui.parameters(), lr=0.1)

for epoch in range(20):
    running_loss=0.0
    for data in dataloader:
        imgs, targets = data
        outputs = tudui(imgs)
        result_loss = loss(outputs, targets)
        optim.zero_grad()
        result_loss.backward()
        optim.step()
        running_loss += result_loss

    print(running_loss)



```
## 现有网络模型的使用和修改
```python
import torchvision
from torch import nn

vgg16_false = torchvision.models.vgg16(pretrained=False)

vgg16_true=torchvision.models.vgg16(pretrained=True)

print(vgg16_true)

train_data=torchvision.datasets.CIFAR10(root='./dataset', train=True, download=True,
                                        transform=torchvision.transforms.ToTensor())

# 我们在vgg网络后又加了一层
vgg16_true.add_module("add_linear",nn.Linear(1000, 10))
print(vgg16_true)

vgg16_false.classifier[6] = nn.Linear(4096, 10)
print(vgg16_false)
```
## 网络模型的保存与读取
```python
import torch
import torchvision
from torch import nn

vgg16 = torchvision.models.vgg16(pretrained=False)
# 保存方式1,模型结构+模型参数
torch.save(vgg16, "vgg16_method1.pth")

# 保存方式2，模型参数（官方推荐）
torch.save(vgg16.state_dict(), "vgg16_method2.pth")

# 陷阱
class Tudui(nn.Module):
    def __init__(self):
        super(Tudui, self).__init__()
        self.conv1 = nn.Conv2d(3, 64, kernel_size=3)

    def forward(self, x):
        x = self.conv1(x)
        return x

tudui = Tudui()
torch.save(tudui, "tudui_method1.pth")

```
```python
import torch
from model_save import *
# 方式1-》保存方式1，加载模型
import torchvision
from torch import nn

model = torch.load("vgg16_method1.pth")
# print(model)

# 方式2，加载模型
vgg16 = torchvision.models.vgg16(pretrained=False)
vgg16.load_state_dict(torch.load("vgg16_method2.pth"))
# model = torch.load("vgg16_method2.pth")
# print(vgg16)

# 陷阱1 ，一般不把模型定义复制，而是把模型定义放在单独一个文件里并引入
# class Tudui(nn.Module):
#     def __init__(self):
#         super(Tudui, self).__init__()
#         self.conv1 = nn.Conv2d(3, 64, kernel_size=3)
#
#     def forward(self, x):
#         x = self.conv1(x)
#         return x

model = torch.load('tudui_method1.pth')
print(model)

```
## 完整的模型训练套路
```python
import torch
import torchvision
from torch.utils.tensorboard import SummaryWriter

# 准备数据集
from torch import nn
from torch.utils.data import DataLoader

train_data = torchvision.datasets.CIFAR10(root="../data", train=True, transform=torchvision.transforms.ToTensor(),
                                          download=True)
test_data = torchvision.datasets.CIFAR10(root="../data", train=False, transform=torchvision.transforms.ToTensor(),
                                         download=True)

# length 长度
train_data_size = len(train_data)
test_data_size = len(test_data)
# 如果train_data_size=10,训练数据集的长度为：10
print("训练数据集的长度为:{}".format(train_data_size))
print("测试数据集的长度为:{}".format(test_data_size))

# 利用 DataLoader 来加载数据集
train_dataloader = DataLoader(train_data, batch_size=64)
test_dataloader = DataLoader(test_data, batch_size=64)


# 创建网络模型
class Tudui(nn.Module):
    def __init__(self):
        super(Tudui, self).__init__()
        self.model1 = nn.Sequential(
            nn.Conv2d(3, 32, 5, padding=2),
            nn.MaxPool2d(2),
            nn.Conv2d(32, 32, kernel_size=5, padding=2),
            nn.MaxPool2d(2),
            nn.Conv2d(32, 64, kernel_size=5, padding=2),
            nn.MaxPool2d(2),
            nn.Flatten(),
            nn.Linear(1024, 64),
            nn.Linear(64, 10)
        )

    def forward(self, x):
        x = self.model1(x)
        return x


tudui = Tudui()

# 损失函数
loss_fn = nn.CrossEntropyLoss()

# 优化器
learning_rate = 1e-2
optimizer = torch.optim.SGD(tudui.parameters(), lr=learning_rate)

# 训练网络的一些参数
# 记录训练的次数
total_train_step = 0
# 记录测试的次数
total_test_step = 0
# 训练的轮数
epoch = 10

# 添加tensorboard
writer = SummaryWriter("../logs_train")

for i in range(epoch):
    print("-----------第{}轮训练开始-----------".format(i + 1))

    # 训练步骤开始
    tudui.train()
    for data in train_dataloader:
        imgs, targets = data
        outputs = tudui(imgs)
        loss = loss_fn(outputs, targets)
        # 优化器优化模型
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

        total_train_step += 1
        if total_train_step % 100 == 0:
            print("训练次数：{},Loss:{}".format(total_train_step, loss.item()))
            writer.add_scalar("train_loss", loss.item(), total_train_step)

    # 测试步骤开始
    tudui.eval()
    total_test_loss = 0
    total_accuracy = 0
    with torch.no_grad():
        for data in test_dataloader:
            imgs, targets = data
            outputs = tudui(imgs)
            loss = loss_fn(outputs, targets)
            total_test_loss += loss
            accuracy = (outputs.argmax(1) == targets).sum()
            total_accuracy += accuracy
    print("整体集上的Loss:{}".format(total_test_loss))
    print("整体数据集上的正确率：{}".format(total_accuracy / test_data_size))
    writer.add_scalar("test_loss", total_test_loss, total_test_step)
    writer.add_scalar("test_accuracy", total_accuracy / test_data_size, total_test_step)
    total_test_step += 1

    torch.save(tudui, "tudui_{}.pth".format(i))
    # torch.save(tudui.state_dict(),"tudui_{}".format(i))
    print("模型已保存")

writer.close()


```
## 利用GPU训练
> 网络模型、数据、损失函数有cuda方法

```python
import torchvision
from torch.utils.tensorboard import SummaryWriter
import torch
import time

#准备数据集
from torch import nn
from torch.utils.data import DataLoader


device = torch.device("cuda")
train_data = torchvision.datasets.CIFAR10(root="../data",train=True,transform=torchvision.transforms.ToTensor(),download=True)
test_data = torchvision.datasets.CIFAR10(root="../data",train=False,transform=torchvision.transforms.ToTensor(),download=True)

# length 长度
train_data_size = len(train_data)
test_data_size = len(test_data)
# 如果train_data_size=10,训练数据集的长度为：10
print("训练数据集的长度为:{}".format(train_data_size))
print("测试数据集的长度为:{}".format(test_data_size))


#利用 DataLoader 来加载数据集
train_dataloader = DataLoader(train_data,batch_size=64)
test_dataloader = DataLoader(test_data,batch_size=64)

#创建网络模型
class Tudui(nn.Module):
    def __init__(self):
        super(Tudui, self).__init__()
        self.model = nn.Sequential(
            nn.Conv2d(3,32,5,1,2),
            nn.MaxPool2d(2),
            nn.Conv2d(32,32,5,1,2),
            nn.MaxPool2d(2),
            nn.Conv2d(32,64,5,1,2),
            nn.MaxPool2d(2),
            nn.Flatten(),
            nn.Linear(64*4*4,64),
            nn.Linear(64,10)
        )
    def forward(self,x):
        x=self.model(x)
        return x
tudui = Tudui()
tudui=tudui.to(device)

#损失函数
loss_fn = nn.CrossEntropyLoss()
loss_fn = loss_fn.to(device)

#优化器
learning_rate = 1e-2
optimizer = torch.optim.SGD(tudui.parameters(),lr=learning_rate)

#训练网络的一些参数
#记录训练的次数
total_train_step = 0
#记录测试的次数
total_test_step = 0
#训练的轮数
epoch = 10


#添加tensorboard
writer = SummaryWriter("../logs_train")

start_time=time.time()
for i in range(epoch):
    print("-----------第{}轮训练开始-----------".format(i+1))


    #训练步骤开始
    tudui.train()
    for data in train_dataloader:
        imgs,targets = data
        imgs = imgs.to(device)
        targets = targets.to(device)
        outputs = tudui(imgs)
        loss = loss_fn(outputs,targets)
        #优化器优化模型
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

        total_train_step += 1
        if total_train_step % 100 == 0:
            end_time = time.time()
            print(end_time-start_time)
            print("训练次数：{},Loss:{}".format(total_train_step,loss.item()))
            writer.add_scalar("train_loss",loss.item(),total_train_step)


    # 测试步骤开始
    tudui.eval()
    total_test_loss = 0
    total_accuracy = 0
    with torch.no_grad():
        for data in test_dataloader:
            imgs,targets = data
            imgs = imgs.to(device)
            targets = targets.to(device)
            outputs = tudui(imgs)
            loss = loss_fn(outputs,targets)
            total_test_loss += loss
            accuracy = (outputs.argmax(1)==targets).sum()
            total_accuracy += accuracy
    print("整体集上的Loss:{}".format(total_test_loss))
    print("整体数据集上的正确率：{}".format(total_accuracy/test_data_size))
    writer.add_scalar("test_loss",total_test_loss,total_test_step)
    writer.add_scalar("test_accuracy",total_accuracy/test_data_size,total_test_step)
    total_test_step += 1

    torch.save(tudui,"tudui_{}.pth".format(i))
    #torch.save(tudui.state_dict(),"tudui_{}".format(i))
    print("模型已保存")

writer.close()

```

## 完整的模型验证套路
```python

import torch
import torchvision
from PIL import Image
from torch import nn

image_path = "../imgs/airplane.png"
image = Image.open(image_path)
print(image)
image = image.convert('RGB')    # 因为png格式是四通道，除了RGB三通道外，还有一个透明度通道，
# 调用convert保留其颜色通道。当然，如果图片本来就是三个颜色通道，经此操作，不变。加上这一步可以适应png jpg各种格式的图片
transform = torchvision.transforms.Compose([torchvision.transforms.Resize((32, 32)),
                                            torchvision.transforms.ToTensor()])

image = transform(image)
print(image.shape)

class Tudui(nn.Module):
    def __init__(self):
        super(Tudui, self).__init__()
        self.model = nn.Sequential(
            nn.Conv2d(3, 32, 5, 1, 2),
            nn.MaxPool2d(2),
            nn.Conv2d(32, 32, 5, 1, 2),
            nn.MaxPool2d(2),
            nn.Conv2d(32, 64, 5, 1, 2),
            nn.MaxPool2d(2),
            nn.Flatten(),
            nn.Linear(64*4*4, 64),
            nn.Linear(64, 10)
        )

    def forward(self, x):
        x = self.model(x)
        return x

model = torch.load("tudui_29_gpu.pth", map_location=torch.device('cpu'))
print(model)
image = torch.reshape(image, (1, 3, 32, 32))
model.eval()
with torch.no_grad():
    output = model(image)
print(output)

print(output.argmax(1))


```
