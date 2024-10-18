<template>
    <imageUploadFront />
    以上為提供"後台"user的預覽畫面,需修改css
    <br />
    <div>
        <form @submit.prevent="uploadImage">
            <div>
                Upload Image:
                <input type="file" @change="onFileChange" />
            </div>
            <div>
                Priority:
                <input type="number" v-model="priority" />
            </div>
            <input type="checkbox" id="checkbox" v-model="checked">
            <label for="checkbox">visable</label>
            <button type="submit">Upload</button>
        </form>

        <div v-if="message">
            <p>{{ message }}</p>
        </div>


    </div>
</template>

<script>
    import imageUploadFront from './imageUploadFront.vue';

    export default {
        data() {
            return {
                file: null,
                type: '',
                priority: 0,
                message: '',
                images: [], // Store retrieved images data,
                checked: true
            };
        },
        methods: {
            onFileChange(event) {
                this.file = event.target.files[0];
                var arr = this.file.name.split('.');
                var fileExtension = arr[arr.length - 1].toLowerCase();

                // Check file extension
                const allowedExtensions = ['jpg', 'jpeg', 'png', 'bmp'];
                if (!allowedExtensions.includes(fileExtension)) {
                    this.message = 'Invalid file type. Please upload an image file (jpg, jpeg, png, bmp).';
                    this.file = null; // Reset the file
                    return;
                }

                this.message = ''; // Clear any previous messages
            },
            async uploadImage() {
                if (!this.file) {
                    this.message = 'Please upload a valid image file.';
                    return;
                }

                const formData = new FormData();
                formData.append('file', this.file);
                formData.append('type', this.type);
                formData.append('priority', this.priority);

                try {
                    const response = await fetch('https://localhost:7251/image/PostImage', {
                        method: 'POST',
                        body: formData
                    });
                    // 根據不同的 HTTP 狀態碼做不同的處理
                    if (response.ok) {
                        // 成功的狀態碼 (200–299)
                        const result = await response.json();
                        console.log('Image uploaded successfully:', result);
                        // 顯示成功信息，或者進行其他處理
                    } else if (response.status === 400) {
                        console.error('Bad request - Invalid data submitted');
                        // 顯示錯誤信息，提示用戶輸入有誤
                    } else if (response.status === 500) {
                        console.error('Server error - Please try again later');
                        // 顯示服務器錯誤信息，提示用戶稍後再試
                    } else {
                        console.error('Unexpected error:', response.status);
                        // 處理其他非預期的狀態碼
                    }
                } catch (error) {
                    console.error('Network error:', error.message);
                    // 顯示網絡錯誤信息，提示用戶檢查網絡連接
                }

            }
        },
        components: {
            imageUploadFront
        }
    };
</script>
