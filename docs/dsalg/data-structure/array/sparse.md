# 稀疏数组

`Sparse Array` 稀疏数组

## 定义
> 稀疏数组实际上是一个典型的二维数组，它描述的是一个标准二维数组的有效数据。
> - 稀疏数组的行数 = 有效元素个数 + 1；
> - 稀疏数组的列数 = 数组维度 + 1。

**稀疏数组**有固定的三列，分别代表原始二维数组的行、列和值。  
稀疏数组的第一行存储原始数组的行数、列数和有效数据个数。  
从第二行（也就是行标[1]）开始，才是真正的原始二维数组的有效数据。

## 示例

![原始二维数组](~public/array/assets/1678678583618.png) 
![稀疏数组](~public/array/assets/1678678670627.png)

左侧是原始的二维数组 `6 * 7 =42` 个格子(六行七列), 右侧是稀疏数组 `3 * 9 = 27` 个格子 (九行3列)
 - 右侧[0]记录了原始二维数组有6行、7列、8个有效值
 - 后面的每一条记录了有效数据的行、列、值(行、列均为下标)  
   如[1]的数据在原始二维数组中的位置为(0,3),且值为22  

## 应用场景

  **五子棋存盘(二维数组转稀疏数组)、续上盘(稀疏数组转二维数组)**  

![五子棋存盘](~public/array/assets/1678677921618.png)


## 解决思路

![存盘](~public/array/assets/1678679597625.png)

如上图所示，总结出来稀疏数组为右侧那样。那么他们互转思路如下：

二维数组转稀疏数组思路：

1. 遍历原始的二维数组，得到有效个数 `sum`
2. 根据 `sum` 创建 稀疏数组 `sparseArr = int[sum + 1][3]`
3. 将二维数据的有效数据存入到稀疏数组中（从第 2 行开始存储）
4. 最后将棋盘大小和有效个数写入第一行

稀疏数组转原始二维数组思路：

1. 读取第一行数据，根据棋盘大小，创建原始的二维数组 `chessArr = int [11][11]`
2. 从第二行开始，将有效数据还原到原始数组中

## 代码实现

```java
package com.coder.xiaozhu.array.sparse;

import java.util.Arrays;

/**
 * 稀疏数组实现
 *
 * @author Coder
 */
public class SparseArray {

    /**
     * 二维数组转稀疏数组
     */
    private static int[][] chessToSparseArray(int[][] chessArray) {
        // 记录有效的数据个数
        int sum = 0;
        for (int[] row : chessArray) {
            for (int column : row) {
                if (column != 0) {
                    sum++;
                }
            }
        }

        // 初始化稀疏数组，行数为 sum + 1,列数为3
        int[][] sparseArray = new int[sum + 1][3];

        // 存储有效数据。从第二行开始
        // 稀疏数组第一行数据：
        int chessRows = chessArray.length;
        int chessColumn = chessArray[0].length;
        sparseArray[0][0] = chessRows;
        sparseArray[0][1] = chessColumn;
        sparseArray[0][2] = sum;

        // 有效数据在稀疏数组中的下标,从1开始是因为在稀疏数组中有效数据从第二行存储
        int effectiveIndex = 1;
        for (int i = 0; i < chessArray.length; i++) {
            int[] rows = chessArray[i];
            for (int j = 0; j < rows.length; j++) {
                int column = rows[j];
                if (column != 0) {
                    //行
                    sparseArray[effectiveIndex][0] = i;
                    //列
                    sparseArray[effectiveIndex][1] = j;
                    // 值
                    sparseArray[effectiveIndex][2] = column;
                    ++effectiveIndex;
                }
            }
        }
        return sparseArray;
    }
    
    /**
     * 稀疏数组转二维数组
     */
    private static int[][] sparseToChess(int[][] sparseArray) {
        // 初始化棋盘大小
        int[][] chessArray = new int[sparseArray[0][0]][sparseArray[0][1]];
        // 恢复棋盘内的有效数据
        for (int i = 1; i < sparseArray.length; i++) {
            int[] rows = sparseArray[i];
            chessArray[rows[0]][rows[1]] = rows[2];
        }
        return chessArray;
    }

    public static void main(String[] args) {
        int[][] chessArr = new int[11][11];
        chessArr[1][2] = 1;
        chessArr[2][3] = 2;

        System.out.println("二维数组转稀疏数组:");
        for (int[] rows : chessToSparseArray(chessArr)) {
            System.out.println(Arrays.toString(rows));
        }
        System.out.println("稀疏数组还原二维数组:");
        for (int[] rows : sparseToChess(chessToSparseArray(chessArr))) {
            System.out.println(Arrays.toString(rows));
        }
    }
}

```
  输出信息如下

![测试结果](~public/array/assets/1678687768534.png)