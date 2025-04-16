---
title: "LTV12"
description: 读论文《On-the-Fly Multiparty Computation on the Cloud via Multikey Fully Homomorphic Encryption》
date: 2025-04-14T23:26:15+08:00
image: 
math: true
mermaid: true
license: false
hidden: false
comments: false
draft: false
categories:
    - 
tags: ["FHE","NTRU","MPC"]
---



# LTV12

---

## 多密钥FHE的算法原理

### NTRU

- **参数**：
  - 环：$ R = \mathbb{Z}[x] / (x^n + 1) $，其中 $ n $ 是2的幂。
  - 模数：大素数 $ q = q(\kappa) $，小模数 $ p = 2 $。
  - 噪声分布：离散高斯分布 $ \chi $，系数绝对值受限于 $ B(\kappa) $。
  - 安全参数：$ \kappa $，用户数上限：$ N $。
- **密钥生成（Keygen）**：
  - 采样短多项式：$ f', g \leftarrow \chi $。
  - 私钥：$ f = 2f' + 1 $（确保 $ f \equiv 1 \pmod{2} $ 且在 $ R_q $ 中可逆）。
  - 公钥：$ h = 2g \cdot f^{-1} \pmod{q} $。
- **加密（Enc）**：
  - 输入：消息 $ m \in \{0,1\} $（或二进制多项式）。
  - 采样随机短多项式：$ s, e \leftarrow \chi $。
  - 输出密文：$ c = h \cdot s + 2e + m \pmod{q} $。
- **解密（Dec）**：
  - 计算：$ \mu = f \cdot c \pmod{q} $。
  - 输出：$ m' = \mu \pmod{2} $。
  - **正确性**：
    $
    f \cdot c = f \cdot (h \cdot s + 2e + m) = 2(g \cdot s + f \cdot e) + f \cdot m \pmod{q}
    $
    由于 $ f \equiv 1 \pmod{2} $，噪声 $ 2(g \cdot s + f \cdot e) $ 小于 $ q/2 $，因此：
    $
    \mu \pmod{2} = m \pmod{2} = m
    $

### 单密钥有些同态加密

将NTRU改造为支持有限同态操作的方案，称为“有些同态加密”。

- **加法**：
  - 给定密文 $ c_1 = h \cdot s_1 + 2e_1 + m_1 \pmod{q} $，$ c_2 = h \cdot s_2 + 2e_2 + m_2 \pmod{q} $。
  - 计算：$ c_{\text{add}} = c_1 + c_2 \pmod{q} $。
  - 结果：
    $
    c_{\text{add}} = h \cdot (s_1 + s_2) + 2(e_1 + e_2) + (m_1 + m_2) \pmod{q}
    $
  - 解密：
    $
    f \cdot c_{\text{add}} = 2(g \cdot (s_1 + s_2) + f \cdot (e_1 + e_2)) + f \cdot (m_1 + m_2) \pmod{q}
    $
    噪声增长线性，仍可正确解密 $ m_1 + m_2 \pmod{2} $。
- **乘法**：
  - 计算：$ c_{\text{mult}} = c_1 \cdot c_2 \pmod{q} $。
  - 结果：
    $
    c_{\text{mult}} = (h \cdot s_1 + 2e_1 + m_1) \cdot (h \cdot s_2 + 2e_2 + m_2)
    $
    展开后主要项为：
    $
    c_{\text{mult}} \approx h \cdot (s_1 \cdot m_2 + s_2 \cdot m_1 + h \cdot s_1 \cdot s_2) + 2(e_1 \cdot m_2 + e_2 \cdot m_1 + 2e_1 \cdot e_2) + m_1 \cdot m_2 \pmod{q}
    $
  - 解密：
    $
    f \cdot c_{\text{mult}} \approx 2(\text{噪声项}) + f \cdot (m_1 \cdot m_2) \pmod{q}
    $
    噪声平方增长（因多项式乘法），限制了可支持的乘法次数。
- **噪声管理**：
  - 初始噪声界为 $ O(B) $，加法后为 $ O(B) $，乘法后为 $ O(B^2) $。
  - 通过选择大 $ q $，支持有限深度电路（如深度 $ \epsilon \log n $）。

### 多密钥FHE

扩展NTRU到多密钥FHE ：

- **多密钥密文**：
  - 每个用户 $ i $ 有密钥对 $ (f_i, h_i) $，密文 $ c_i = h_i \cdot s_i + 2e_i + m_i \pmod{q} $。
  - 云端对 $ N $ 个密文 $ \{c_1, \ldots, c_N\} $ 执行计算，生成结果密文 $ c_{\text{eval}} $。
- **同态评估（Eval）**：
  - **加法**：直接相加 $ c_i + c_j $，但涉及不同公钥 $ h_i, h_j $。
  - **乘法**：
    - 计算 $ c_i \cdot c_j $，生成高阶密文，解密需联合密钥 $ f_i \cdot f_j $。
    - **重新线性化（relinearization）**：
      - 问题：乘法后密文依赖 $ f_i^{d_i} \cdot f_j^{d_j} $（指数增长）。
      - 解决方案：引入“重新线性化密钥”（类似传统FHE的key-switching）。
        - 用户发布加密后的密钥信息：$ \gamma_{i,\tau} = \text{Enc}_{h_i}(f_i^\tau) $，其中 $ \tau $ 为可能的多项式次数。
        - 云端使用 $ \gamma_{i,\tau} $ 将高阶密文转换为依赖 $ f_i, f_j $ 的低阶密文。
      - 算法：
        - 对高阶密文 $ c_{\text{high}} \approx \text{Enc}(m, f_i^2) $，计算：
          $
          c_{\text{low}} = c_{\text{high}} + \gamma_{i,2} \cdot s_{\text{new}} + 2e_{\text{new}} \pmod{q}
          $
        - 结果密文依赖 $ f_i $，噪声略增。
  - **噪声控制**：
    - 乘法和重新线性化会放大噪声，论文使用**模数约减（modulus reduction）**：
      - 将密文从模 $ q $ 约减到较小的模 $ q' $，降低噪声界。
      - 算法：
        $
        c' = \lfloor c \cdot (q' / q) \rceil \pmod{q'}
        $
      - 确保噪声保持在 $ q'/2 $ 以下。
- **联合解密**：
  - 结果密文 $ c_{\text{eval}} $ 依赖联合密钥 $ F = \prod_{i=1}^N f_i $。
  - 解密算法：
    - 每个用户 $ i $ 计算部分解密：$ \mu_i = f_i \cdot c_{\text{eval}} \pmod{q} $。
    - 云端或用户通过交互式协议组合：$ \mu = \sum \mu_i \pmod{q} $。
    - 输出：$ m = \mu \pmod{2} $。
  - **解密电路优化**：
    - 解密电路深度为 $ O(\log N (\log \log q + \log n)) $，通过优化多项式乘法和模约减实现。
- **深度限制**：
  - 有些同态加密支持电路深度 $ O(\log n) $，噪声增长为多项式。
  - 若需更大深度，需全同态加密。

### 全同态加密

支持任意深度的电路，采用**自举（bootstrapping）**技术：

- **原理**：
  - 自举通过在加密域内运行解密电路，将高噪声密文“刷新”为低噪声密文。
  - 要求加密方案是“可自举的”（bootstrappable），即支持略大于解密电路深度的同态操作。
- **算法**：
  - 输入：高噪声密文 $ c $。
  - 加密私钥：发布 $ f_i $ 的加密形式 $ \text{Enc}_{h_i}(f_i) $。
  - 云端运行加密的解密电路：
    $
    c_{\text{new}} = \text{Eval}(\text{Dec}_{f_i}, c, \text{Enc}_{h_i}(f_i))
    $
  - 输出：新密文 $ c_{\text{new}} $，加密相同消息，噪声大幅降低。
- **要求**：
  - 解密电路深度低（论文优化到 $ O(\log N (\log \log q + \log n)) $）。
  - 环形安全假设：加密 $ f_i $ 的密文不泄露信息。
- **替代方案**：
  - 若避免环形安全假设，可使用分级FHE（leveled FHE），预定义最大电路深度，需更大密钥。

---

## On-the-Fly MPC 框架

### 算法步骤

 **步骤：**

+ **数据上传**：每个用户用自己的公钥加密数据并上传至云端。

+ **动态计算**：云端选择参与用户子集和任意函数，在加密数据上执行计算，生成加密结果。

+ **联合解密**：参与用户通过交互式协议联合解密结果，验证函数和参与方的选择。

+ ***验证**：通过可验证计算协议确保云端计算的正确性。



### 关键步骤

- **重新线性化**：
    - 解决多密钥乘法中的密钥指数增长问题，将高阶密钥 $ f_i^{d_i} $ 转换为线性密钥 $ f_i $。
    - 依赖加密的密钥信息 $ \gamma_{i,\tau} $，增加少量噪声。
- **模数约减**：
    - 降低密文模数，从 $ q $ 到 $ q' $，控制噪声增长。
    - 确保同态操作支持更深电路。
- **自举**：
    - 通过加密域内的解密电路，将噪声重置为初始水平。
    - 优化解密电路深度，降低自举开销。
- **噪声分析**：
    - 初始密文噪声为 $ O(B) $。
    - 每次乘法噪声平方增长，重新线性化增加常数噪声。
    - 模数约减将噪声缩放到新模数范围。
    - 自举后噪声恢复到 $ O(B) $。
- **解密优化**：
    - 联合解密通过分担计算（每个用户处理 $ f_i \cdot c_{\text{eval}} $），降低单用户负担。
    - 交互式协议确保安全性和正确性。



### 算法实现

- **初始化**：
  - 每个用户 $ i $ 生成密钥对 $ (f_i, h_i) $，上传公钥 $ h_i $ 和加密数据 $ c_i = \text{Enc}_{h_i}(x_i) $。
- **动态计算**：
  - 云端选择用户子集 $ S \subseteq \{1, \ldots, M\} $（$ |S| \leq N $和函数 $ f $ )。
  - 对密文 $ \{c_i\}_{i \in S} $，运行多密钥FHE的同态评估：
    $
    c_{\text{eval}} = \text{Eval}_f(\{c_i\}_{i \in S}, \{h_i\}_{i \in S})
    $
  - 若电路深度超限，使用自举刷新密文。
- **联合解密**：
  - 云端广播 $ c_{\text{eval}} $ 和函数 $ f $。
  - 用户 $ i \in S $ 验证 $ f $ 和 $ S $，计算部分解密 $ \mu_i = f_i \cdot c_{\text{eval}} \pmod{q} $。
  - 通过交互式协议（或云端汇总）计算：
    $
    m = \left( \sum_{i \in S} \mu_i \right) \pmod{2}
    $
  - 输出：$ m = f(x_{i_1}, \ldots, x_{i_{|S|}}) $。
- **验证**：
  - 使用可验证计算协议（零知识证明）确保云端正确执行 $ \text{Eval}_f $。
  - 或通过简洁论证系统验证结果。



---

### 算法复杂度

- **密钥生成**：$ O(n \log n) $，多项式乘法和求逆。
- **加密**：$ O(n \log n) $，单次多项式运算。
- **同态评估**：
  - 加法：$ O(n) $。
  - 乘法：$ O(n \log n) $，含重新线性化。
  - 自举：取决于解密电路复杂度，约为 $ O(n^2 \log n) $。
- **联合解密**：每个用户 $ O(n \log n) $，总交互复杂度 $ O(N \cdot n \log n) $。
- **空间复杂度**：
  - 公钥/私钥：$ O(n) $。
  - 密文：$ O(n \cdot \log q) $。
  - 重新线性化密钥：$ O(n \cdot N \cdot \log q) \）（若支持 $ N $ 用户）。

