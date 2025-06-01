document.addEventListener('DOMContentLoaded', function() {
    // Mảng mẫu chứa các sản phẩm ban đầu
    const initialProducts = [
        {
            id: 1,
            name: 'Dầu dừa nguyên chất',
            price: 250000,
            image: 'https://public.youware.com/users-website-assets/prod/92fc1e01-f3f7-4ec1-b099-13eb7c6128b7/g0f705b75ac642fb50b5ac91f1f3d52cc6afc5ca61a0887e231f935759fc29f71104dca60126c6a82fcbe6d6ccba307191c487ba7289cce4461860f9e6255848b_640.jpg',
            description: 'Dầu dừa nguyên chất 100% tự nhiên, giúp dưỡng ẩm, làm mềm da và tóc hiệu quả.',
            category: 'body'
        },
        {
            id: 2,
            name: 'Son dưỡng môi hữu cơ',
            price: 180000,
            image: 'https://public.youware.com/users-website-assets/prod/92fc1e01-f3f7-4ec1-b099-13eb7c6128b7/g91eb800464a18cc2dce8f9939fd16246cfccefaa5406d720f27234b8424d4301dc6eafa96b844ffc7a871de52387698214f2970eec3640e928d40146243766d1_640.jpg',
            description: 'Son dưỡng môi từ thành phần tự nhiên, giúp môi mềm mịn, hồng hào.',
            category: 'makeup'
        },
        {
            id: 3,
            name: 'Phấn mắt tự nhiên',
            price: 350000,
            image: 'https://public.youware.com/users-website-assets/prod/92fc1e01-f3f7-4ec1-b099-13eb7c6128b7/g19eaa482a0de05d3ffeed8cd2b9043866a6433e2da755d870418b959c6f83dbd4afc6ff6261cd3ccdb7ed7984f08305ed510cab796e1f2e49488c3cf0d7a5aa6_640.jpg',
            description: 'Bộ phấn mắt với những màu sắc tự nhiên, mềm mịn và dễ tán.',
            category: 'makeup'
        },
        {
            id: 4,
            name: 'Bộ dưỡng da trà xanh',
            price: 420000,
            image: 'https://public.youware.com/users-website-assets/prod/92fc1e01-f3f7-4ec1-b099-13eb7c6128b7/ged98530a901ed25d68de1151a743bd3f7788e4043775fd59683eab0c1579e323a9daf9333c88ff2bd201b6e2a1d7b92f_640.jpg',
            description: 'Bộ sản phẩm chăm sóc da chiết xuất từ trà xanh, giúp làm sạch và se khít lỗ chân lông.',
            category: 'skincare'
        }
    ];
    
    // Khởi tạo danh sách sản phẩm từ localStorage hoặc dùng dữ liệu mẫu nếu chưa có
    let products = JSON.parse(localStorage.getItem('ylangSpaProducts')) || initialProducts;
    
    // Lưu sản phẩm vào localStorage
    function saveProducts() {
        localStorage.setItem('ylangSpaProducts', JSON.stringify(products));
    }
    
    // Hiển thị danh sách sản phẩm
    function renderProducts() {
        const productList = document.getElementById('product-list');
        productList.innerHTML = '';
        
        if (products.length === 0) {
            productList.innerHTML = '<p>Chưa có sản phẩm nào.</p>';
            return;
        }
        
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            productItem.innerHTML = `
                <div class="product-info">
                    <h4>${product.name}</h4>
                    <p>${product.description.substring(0, 100)}${product.description.length > 100 ? '...' : ''}</p>
                    <p><strong>Giá:</strong> ${formatCurrency(product.price)} VNĐ</p>
                    <p><strong>Danh mục:</strong> ${getCategoryName(product.category)}</p>
                </div>
                <div class="product-actions">
                    <button class="btn btn-sm btn-edit" data-id="${product.id}">Sửa</button>
                    <button class="btn btn-sm btn-danger" data-id="${product.id}">Xóa</button>
                </div>
            `;
            productList.appendChild(productItem);
        });
        
        // Thêm event listener cho các nút
        document.querySelectorAll('.btn-danger').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                deleteProduct(productId);
            });
        });
        
        document.querySelectorAll('.btn-edit').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                editProduct(productId);
            });
        });
    }
    
    // Xóa sản phẩm
    function deleteProduct(productId) {
        if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
            products = products.filter(product => product.id !== productId);
            saveProducts();
            renderProducts();
        }
    }
    
    // Chỉnh sửa sản phẩm
    function editProduct(productId) {
        const product = products.find(product => product.id === productId);
        if (!product) return;
        
        // Điền thông tin sản phẩm vào form
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-image').value = product.image;
        document.getElementById('product-description').value = product.description;
        document.getElementById('product-category').value = product.category;
        
        // Thay đổi nút submit để cập nhật thay vì thêm mới
        const submitButton = document.querySelector('#add-product-form button[type="submit"]');
        submitButton.textContent = 'Cập nhật sản phẩm';
        submitButton.setAttribute('data-edit-id', productId);
        
        // Cuộn lên đầu trang để hiển thị form
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Xử lý form thêm/sửa sản phẩm
    document.getElementById('add-product-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('button[type="submit"]');
        const isEditing = submitButton.hasAttribute('data-edit-id');
        
        const productData = {
            name: document.getElementById('product-name').value,
            price: parseInt(document.getElementById('product-price').value),
            image: document.getElementById('product-image').value,
            description: document.getElementById('product-description').value,
            category: document.getElementById('product-category').value
        };
        
        if (isEditing) {
            // Đang sửa sản phẩm
            const productId = parseInt(submitButton.getAttribute('data-edit-id'));
            const productIndex = products.findIndex(product => product.id === productId);
            
            if (productIndex !== -1) {
                products[productIndex] = {
                    ...products[productIndex],
                    ...productData
                };
            }
            
            // Đặt lại trạng thái ban đầu của form
            submitButton.textContent = 'Thêm sản phẩm';
            submitButton.removeAttribute('data-edit-id');
        } else {
            // Đang thêm mới
            const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
            products.push({
                id: newId,
                ...productData
            });
        }
        
        saveProducts();
        renderProducts();
        this.reset();
    });
    
    // Format số tiền
    function formatCurrency(amount) {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    
    // Lấy tên danh mục từ mã
    function getCategoryName(categoryCode) {
        const categories = {
            'skincare': 'Chăm sóc da',
            'makeup': 'Trang điểm',
            'hair': 'Chăm sóc tóc',
            'body': 'Chăm sóc cơ thể'
        };
        
        return categories[categoryCode] || categoryCode;
    }
    
    // Khởi tạo hiển thị
    renderProducts();
});