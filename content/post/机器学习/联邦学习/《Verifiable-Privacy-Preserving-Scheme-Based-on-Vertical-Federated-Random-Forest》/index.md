---
title: "Verifiable Privacy-Preserving Scheme Based on Vertical Federated Random Forest"
description: 读论文
date: 2025-04-14T01:05:15+08:00
image: 
math: true
mermaid: true
license: false
hidden: false
comments: false
draft: false
categories:
    - 联邦学习
---



# 《Verifiable Privacy-Preserving Scheme Based on Vertical Federated Random Forest》

```txt
[1] Hou J , Su M , Fu A ,et al.Verifiable Privacy-preserving Scheme based on Vertical Federated Random Forest[J].IEEE Internet of Things Journal, 2021, PP(99):1-1.DOI:10.1109/JIOT.2021.3090951.
```



## 预备知识



### 单向hash函数

单向哈希函数$H$的输入是任意长度的消息$M$，它会返回一个固定长度的哈希值$h = H(M)$ 。它必须具备以下属性：

1）给定$h$，根据$h = H(M)$来计算$M$是不可行的。

2）给定$M$，从计算角度来说，找到另一个消息$M'$ ，使其满足$H(M)=H(M')$是不可行的。

3）给定$M$，计算$h$是容易的。

随机找到两条消息$M$和$M'$ ，从计算层面上使$H(M)=H(M')$是不可行的。





## 无隐私VFRF构建



垂直联邦学习（Vertical Federated Learning, VFL）适用于数据在特征维度上分布在不同用户（或客户端）之间的情况。例如，一个用户可能拥有部分特征数据和标签数据，而其他用户只拥有部分特征数据。随机森林（Random Forest, RF）是一种广泛使用的机器学习方法，通过构建多个决策树并集成其结果来提高预测性能。在VFRF中，数据分布在多个用户之间，训练过程需要协作完成，同时确保本地数据不直接共享。

该部分假设没有隐私保护机制，因此用户之间和服务器之间可以直接交换中间结果（如Gini系数、数据子集的ID等）。

### CART决策树构建

#### Gini系数的计算

Gini系数用于衡量数据的不纯度，是CART树分裂特征选择的核心指标。公式如下：

- **数据集 $ D $ 的Gini系数**：
    $$
    \text{Gini}(D) = \sum_{k=1}^{K} p_k (1 - p_k)
    $$

    - $ K $：类别数。
    - $ p_k $：样本属于第 $ k $ 类的概率。

- **按特征值 $ F_{ij} $ 分裂后的Gini系数**：
    $$
    \text{Gini}(D, F_{ij}) = \frac{|D_{\text{left}}|}{|D|} \text{Gini}(D_{\text{left}}) + \frac{|D_{\text{right}}|}{|D|} \text{Gini}(D_{\text{right}})
    $$

    - $ |D_{\text{left}}| $ 和 $ |D_{\text{right}}| $：左右子集的样本数。
    - $ |D| $：总样本数。
    - $ \text{Gini}(D_{\text{left}}) $ 和 $ \text{Gini}(D_{\text{right}}) $：左右子集的Gini系数。

这些公式用于评估每个特征值分裂后的不纯度，服务器根据用户上传的Gini系数选择最小值。



#### CART构建步骤



CART决策树是VFRF的基本构建单元，用于分类或回归任务。使用Gini系数作为特征选择的标准。CART决策树的构建过程如下：

- **输入**：
  - $ T $：空的决策树。
  - $ F $：特征集。
  - $ Y $：标签集。
  - $ D $：样本集。
- **输出**：CART分类树 $ T $。
- **步骤**：
  1. **终止条件检查**：如果满足终止条件（如样本数少于阈值或特征集为空），返回叶节点，叶节点的值为样本集中多数类。
  2. **特征选择**：
     - 对每个特征 $ F_i $ 的每个特征值 $ F_{ij} $ 计算Gini系数。
     - 选择Gini系数最小的特征 $ F_i $ 和特征值 $ F_{ij} $ 作为分裂点。
  3. **树节点添加**：将选中的 $ F_i $ 和 $ F_{ij} $ 添加到树的根节点。
  4. **样本集划分**：根据 $ F_{ij} $ 将样本集 $ D $ 分为左子集 $ D_{\text{left}} $ 和右子集 $ D_{\text{right}} $。
  5. **递归构建**：
     - 对左子树调用 $ \text{CART}(T_{\text{left}}, F \setminus F_i, Y, D_{\text{left}}) $。
     - 对右子树调用 $ \text{CART}(T_{\text{right}}, F \setminus F_i, Y, D_{\text{right}}) $。



### 数据和特征选择-Bagging

Bagging（Bootstrap Aggregating）用于生成多个训练数据集并训练多个弱分类器（CART树），具体步骤如下：
1. 从样本集 $ D $ 中有放回地随机抽取 $ N $ 个样本，生成一个数据集，重复 $ M $ 次，得到 $ M $ 个数据集。
2. 使用这 $ M $ 个数据集分别训练 $ M $ 个CART分类树。
3. 集成 $ M $ 个弱分类器的推理结果（例如通过投票或平均）。



###  VFRF构建（RF Building）

VFRF的构建分为三个主要步骤，涉及云服务器和多个用户之间的协作：
- **输入**：
  - $ F_j $：特征集索引。
  - $ D $：样本集索引。
  - $ M $：采样次数上限。
  - $ K $：特征选择上限。
- **输出**：包含 $ M $ 个带 $ K $ 个特征的数据集 $ D_i $。
- **步骤**：
  1. **生成数据集**：
     - 使用Bagging算法从样本集 $ D $ 中生成 $ M $ 个数据集 $ D_i $（见Algorithm 2）。
  2. **特征选择**：
     - 对每个 $ D_i $，随机选择 $ K $ 个特征 $ F_j $。
  3. **训练CART树**：
     - 根据 $ D_i $ 和选中的 $ K $ 个特征 $ F_j $，训练 $ M $ 个CART分类树（见Algorithm 3）。
- **细节**（Algorithm 3）：
  - 云服务器负责生成数据集和特征选择，只需知道样本集和特征集的索引。
  - 用户计算Gini系数并上传至服务器，服务器选择最小值并更新树结构。
  - 具体过程：
    - 对每个特征 $ F_j $ 和特征值 $ F_{ij} $：
      - 用户将 $ D $ 划分为 $ D_{\text{left}} $ 和 $ D_{\text{right}} $。
      - 生成子集的ID：$ D_{\text{left}} = \text{ID}(D_{\text{left}}) $，$ D_{\text{right}} = \text{ID}(D_{\text{right}}) $。
      - 无标签用户 $ U_S $ 将ID发送给服务器，服务器转发给有标签用户 $ U_L $。
      - $ U_L $ 根据ID计算类别总数 $ \text{CAT}_{\text{left}} $ 和 $ \text{CAT}_{\text{right}} $，返回给服务器和 $ U_S $。
      - $ U_S $ 和 $ U_L $ 计算Gini系数并上传至服务器。
    - 服务器选择最小Gini系数对应的特征和特征值，添加到树节点。
    - 重复直到特征集为空或满足终止条件。
    - 叶节点添加标签索引，完成RF构建。

### VFRF推理（RF Inference）

- **过程**：
  - 服务器存储 $ M $ 个CART树，非叶节点包含特征索引和特征值索引，叶节点包含标签索引。
  - 接收推理数据后，从每棵树的根节点开始：
    - 服务器将索引发送给对应用户。
    - 用户根据本地数据返回左或右子树的方向。
    - 重复直到到达叶节点，获取标签索引。
  - 有标签用户根据索引返回真实标签值，服务器通过投票统计最终结果。





---

### 关键点分析

- **数据分布**：特征和标签分布在不同用户之间，服务器只知道索引，无法直接访问原始数据。
- **协作计算**：Gini系数的计算需要标签数据，但用户只需发送子集ID给标签持有者，避免直接暴露标签。
- **无隐私保护的局限**：中间结果（如Gini系数、子集ID）直接共享，可能被恶意用户利用推断隐私信息。

---



