<template>
    <div>
        <p>目前商品分類:</p>
        <div v-if="productTypes.length > 0">
            <div v-for="n in productTypes" :key="n.ProductTypeID">
                <input type="text" v-model="n.productTypeName">
                <button @click="addProduct(n.productTypeID)">新增商品</button>
                <button @click="confirmEdit(n)">修改分類</button>
                <button @click="confirmDelete(n.productTypeID)">刪除分類</button>
                
                <!-- 商品菜单 -->
                <div v-if="n.products && n.products.length > 0" class="form-group">
                    <ul v-for="product in n.products" :key="product.productID">
                        <h1>{{ product.productName }}</h1>
                        <img :src="`data:image/png;base64,${product.imageBase64}`" alt="Product Image" v-if="product.imageBase64" />
                        <h1>金額: {{product.price}}</h1>
                        <button @click="editProduct(product.productID)">修改</button>
                        <button @click="ProductconfirmDelete(product.productID)">刪除</button>
                    </ul>
                </div>
                <div v-else>
                    <p>此分類下暫無商品。</p>
                </div>
            </div>
        </div>
        <div v-else>
            <p>暫無商品分類。</p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                productTypes: []  // 存储从 API 获取到的商品分类
            };
        },
        mounted() {
            this.fetchProductTypes();  // 在组件加载时调用获取数据的方法
        },
        methods: {
            async fetchProductTypes() {
                try {
                    const response = await fetch('https://localhost:7280/AllProductType', { // 确保 URL 正确
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();  // 获取响应的数据
                        this.productTypes = data.length ? data : [];  // 确保数据不为空

                        // 获取每个分类对应的商品列表
                        this.productTypes.forEach(async (type) => {
                            await this.fetchProductsForType(type.productTypeID);
                        });

                    } else {
                        const errorData = await response.json();
                        alert('Error: ' + (errorData.message || 'Unknown error occurred'));
                    }
                } catch (error) {
                    console.error('Error fetching product types:', error);
                    alert('Failed to fetch product types: ' + error.message);
                }
            },

            async fetchProductsForType(productTypeID) {
                    try {
                        const response = await fetch(`https://localhost:7280/Product/${productTypeID}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        });

                        if (response.ok) {
                            const products = await response.json();
                            const productType = this.productTypes.find(t => t.productTypeID === productTypeID);
                            if (productType) {
                                // 使用 Vue 的 $set 函数将 products 添加到 productType 对象中
                                productType.products = products;
                            }
                        } else {
                            const errorData = await response.json();
                            if (errorData !== null) {
                                console.log(errorData);
                            }
                        }
                    } catch (error) {
                        console.error('Error fetching products:', error);
                        alert('Failed to fetch products: ' + error.message);
                    }
            },

            confirmDelete(id) {
                if (confirm('確定要刪除此商品分類嗎？')) {
                    this.deleteProductType(id);  // 如果用户确认删除，调用删除函数
                }
            },

            confirmEdit(productType) {
                if (confirm('確定要修改此商品分類嗎？')) {
                    this.editProductType(productType);  // 调用修改函数
                }
            },

            async deleteProductType(id) {
                try {
                    const response = await fetch('https://localhost:7280/ProductType', {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(id)  // 将 ID 传递给后端
                    });

                    if (response.ok) {
                        alert('刪除資料成功');
                        this.fetchProductTypes();  // 重新获取数据以刷新列表
                    } else {
                        const errorData = await response.json();
                        alert('Error: ' + (errorData.message || 'Unknown error occurred'));
                    }
                } catch (error) {
                    console.error('Error deleting product type:', error);
                    alert('Failed to delete product type: ' + error.message);
                }
            },

            async editProductType(productType) {
                try {
                    const response = await fetch('https://localhost:7280/ProductType', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            id: productType.productTypeID,  // 传递ID
                            type: productType.productTypeName  // 传递修改后的名称
                        })
                    });

                    if (response.ok) {
                        alert('更新資料成功');
                        this.fetchProductTypes();  // 重新获取数据以刷新列表
                    } else {
                        const errorData = await response.json();
                        alert('Error: ' + (errorData.message || 'Unknown error occurred'));
                    }
                } catch (error) {
                    console.error('Error updating product type:', error);
                    alert('Failed to update product type: ' + error.message);
                }
            },
            async ProductconfirmDelete(id) {
                try {
                    const response = await fetch('https://localhost:7280/ProductType', {
                        method: 'Delete',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            id: id,
                        })
                    });

                    if (response.ok) {
                        alert('刪除成功');
                        this.fetchProductTypes();  // 重新获取数据以刷新列表
                    } else {
                        const errorData = await response.json();
                        alert('Error: ' + (errorData.message || 'Unknown error occurred'));
                    }
                } catch (error) {
                    console.error('Error updating product type:', error);
                    alert('Failed to update product type: ' + error.message);
                }
            },
            addProduct(id) {
                this.$router.push(`/product/${id}`); //商品新增頁面
            },
            editProduct(id) {
                this.$router.push(`/product/edit/${id}`); //商品新增頁面
            }
        }
    };
</script>

<style scoped>
    .form-group {
        margin-bottom: 15px;
    }

    ul {
        list-style-type: none; /* 去掉默认的项目符号 */
        padding: 0;
    }

    li {
        padding: 8px;
        border-bottom: 1px solid #ddd; /* 添加分隔线 */
    }

        li:last-child {
            border-bottom: none; /* 去掉最后一个项的分隔线 */
        }
</style>
