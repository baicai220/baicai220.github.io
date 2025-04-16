---
title: "Fed_Avg"
description: 读论文《Communication-Efficient Learning of Deep Networks from Decentralized Data》  
date: 2025-04-11T15:10:05+08:00
image: 
math: true
mermaid: true
license: 
hidden: false
comments: false
draft: false
categories:
    - 联邦学习
tags: ["横向联邦学习"]
---





# Fed_Avg

```txt
Mcmahan H B , Moore E , Ramage D ,et al.Communication-Efficient Learning of Deep Networks from Decentralized Data[J].  2016.DOI:10.48550/arXiv.1602.05629.  
```



## 算法原理



设一共有$K$个客户机。中心服务器初始化模型参数，执行若干轮，每轮选取至少1个至多$K$个客户机参与训练，每个被选中的客户机同根据服务器下发的本轮（$t$轮）模型参数$w_t$，用自己的数据训练得到模型参数$w_{t + 1}^k$，上传回服务器。服务器将收集来的各客户机的模型根据各样本数量用加权平均的方式进行聚合，得到下一轮的模型参数$w_{t + 1}$：



$$ w_{t+1} \leftarrow \sum_{k = 1}^{K} \frac{n_k}{n} w_{t + 1}^k $$ 	// $n_k$为客户机$k$上的样本数量，$n$为所有被选中客户机的总样本数量



**【伪代码】**

**算法: Federated Averaging算法（FedAvg）**。

$K$个客户端编号为$1...k$；$B$，$E$，$\eta$ 分别代表本地的minibatch size，epochs，学习率learning rate

**服务器执行：**

初始化$w_0$

for 每轮$t = 1,2,\dots$, do

​	$m \leftarrow \max(C \cdot K, 1)$ 	// $C$为比例系数

​	$S_t \leftarrow$ (随机选取$m$个客户端)

​	for 每个客户端$k \in S_t$同时 do

​		$w_{t + 1}^k \leftarrow$ 客户端更新$(k, w_t)$

​		$ w_{t+1}\leftarrow\sum_{k = 1}^{K}\frac{n_k}{n}w_{t + 1}^k $  // $n_k$为客户机$k$上的样本数量，$n$为所有被选中客户机的总样本数量



**客户端更新**$(k, w_t)$: 　　// 在客户端$k$上运行

$\beta \leftarrow$ (将$P_k$分成若干大小为$B$的batch) 	// $P_k$为客户机$k$上数据点的索引集，$P_k$大小为$n_k$

for 每个本地的epoch $i (1 \sim E)$ do

​	for batch $b \in \beta$ do

​	$w \leftarrow w - \eta \nabla l(w; b)$ 	// $\nabla$为计算梯度，$l(w; b)$为损失函数

返回$w$给服务器



为了增加客户机计算量，可以在中心服务器做聚合（加权平均）操作前在每个客户机上多迭代更新几次。计算量由三个参数决定：

- $C$，每一轮（round）参与计算的客户机比例。
- $E$(epochs)，每一轮每个客户机投入其全部本地数据训练一遍的次数。 
- $B$(batch size)，用于客户机更新的batch大小。$B = \infty$表示batch为全部样本，此时就是full - batch梯度下降了。

当$E = 1\ B = \infty$时，对应的就是FedSGD，即每一轮客户机一次性将所有本地数据投入训练，更新模型参数。

对于一个有着$n_k$个本地样本的客户机$k$来说，每轮的本地更新次数为$u_k = E \cdot \frac{n_k}{B}$。 



## 实验

```java
int a
```

