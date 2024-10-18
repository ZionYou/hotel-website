<template>
    <swiper :spaceBetween="30"
            :centeredSlides="true"
            :loop="true"
            :autoplay="{
      delay: 2000,
      disableOnInteraction: false,
      pauseOnMouseEnter:true
    }"
            :pagination="{
      clickable: true,
    }"
            :navigation="true"
            :modules="modules"
            class="mySwiper">

        <swiper-slide v-for="image in images" :key="image">
            <img :src="image.src"/>
        </swiper-slide>
        
    </swiper>
</template>


<script>
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import 'swiper/css';
    import 'swiper/css/pagination';
    import 'swiper/css/navigation';

    import { Autoplay, Pagination, Navigation } from 'swiper/modules';
    import { ref, onMounted } from 'vue';

    export default {
        components: {
            Swiper,
            SwiperSlide,
        },
        setup() {
            const images = ref([]); // 使用 ref 來定義 images 狀態
            const message = ref(''); // 使用 ref 來定義 message 狀態

            const getAllImages = async () => {
                try {
                    const response = await fetch('https://localhost:7251/image/GetAllImage', {
                        method: 'GET',
                    });
                    const data = await response.json();

                    // 映射圖片資料
                    images.value = data.map(image => ({
                        src: `data:image/jpeg;base64,${image.bt}`, // 根據需要調整 MIME 類型
                        type: image.type,
                        priority: image.priority,
                    }));
                } catch (error) {
                    message.value = 'Failed to retrieve images: ' + error.message;
                }
            };

            // 使用 onMounted 生命週期鉤子
            onMounted(() => {
                getAllImages();
            });

            return {
                modules: [Autoplay, Pagination, Navigation],
                images, // 返回 images 以便在模板中使用
                message, // 返回 message 以便在模板中使用
            };
        },
    };
</script>
