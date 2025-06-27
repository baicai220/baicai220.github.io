---
title: TFF
date: '2025-06-27'
mermaid: true
categories:
  - 联邦学习
tags:
  - TFF
---



# TFF

## learning API

`tff.learning`包封装了常见的联邦学习算法（如 FedAvg）

直接用就行 如直接用 ： `tff.learning.algorithms.build_weighted_fed_avg`



## Core API

主要在`tff`包下面

允许自定义联邦学习算法的分布式逻辑。

将 TensorFlow 代码与分布式通信操作结合，无需关注通信细节。

是构建 `tff.learning` 的基础。

### TFF 核心功能

+ **联邦数据、联邦数据存放位置/数据类型**  
	+ 数据放置在服务器 (`@SERVER`) 或客户端 (`@CLIENTS`)，如 `{float32}@CLIENTS` 表示客户端上的浮点数集合。
	+ 有分布式语义，忽略通信细节

- **数据转换方式/联邦计算**
  - 需要 `@tff.federated_computation` 装饰器装饰
  - 定义分布式逻辑，可以管理数据在客户端服务器间的流动，而无需写通信代码。例如，`federated_mean` 计算客户端数据的平均值并返回至服务器。

```python
#  例子：对所有客户端的分数平均
@tff.federated_computation(tff.FederatedType(tf.float32, tff.CLIENTS)) # 表示输入是客户端设备上的浮点数
def compute_average(client_scores):
    return tff.federated_mean(client_scores)
```

- **联邦算子**  
  - tff内置的实现好的联邦计算
  - `federated_broadcast`：从服务器广播数据到客户端。
  - `federated_map`：在客户端并行执行计算。
  - `federated_mean`：聚合客户端结果到服务器。



### 使用 TFF 自定义构建联邦学习的步骤

 FedAvg 算法为例（和TensorFlow实现有哪些不同）：

1. **数据准备**  
   - 使用 TFF 加载联邦数据集，如mnist的联邦版本： `tff.simulation.datasets.emnist.load_data()`。
2. **模型准备**  
   - 要把原本用tf.Keras写的模型用 TFF 的 `tff.learning.models.functional_model_from_keras` 包装，将这些本地逻辑封装并扩展到分布式环境。
3. **初始化服务器状态**  
   - 模型初始化，返初始化逻辑放在 `@tff.federated_computation` 中并指定为 `tff.SERVER` 放置位置。
4. **客户端更新**  
   - 本地训练逻辑由 tf.Keras实现
   - 用 `tff.tensorflow.computation` 封装，结合 `federated_map` 分发到客户端。
5. **服务器广播**  
   - 使用 `federated_broadcast` 将服务器权重发送到客户端。
6. **客户端上传与聚合**  
   - 使用 `federated_mean` 聚合客户端更新后的权重。
7. **服务器更新**  
   - 用 tf.Keras实现 `server_update`更新逻辑。
   - 然后 `tff.tensorflow.computation` 封装并应用。



### 可复用 TensorFlow 代码的步骤

TFF 与 TensorFlow 高度兼容，许多代码可直接复用：

- 使用 `tf.keras` 定义模型结构
- 使用 `tf.data.Dataset` 进行数据预处理，如进行本地数据转换，如展平图像、分批处理。
- 本地训练逻辑，如客户端的梯度计算（`tf.GradientTape`）和优化（`tf.keras.optimizers`）。
- 在服务器端使用 Keras 模型计算损失和指标。

TFF 的作用是将这些本地逻辑封装并扩展到分布式环境。

>  通过@tff.federated_computation和数据类型以及位置 封装

## 隐私保护支持

原生支持差分隐私，没有内置同态加密支持，需要将NTRU同态加密  使用联邦算法实现（使用@tff.federated_computation装饰，并定义好数据和位置）



