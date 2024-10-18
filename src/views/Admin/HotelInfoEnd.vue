<template>
    <div>
        <form @submit.prevent="submitHotelInfo">
            <div class="form-group">
                <h2>Hotel Information Form</h2>
                <label for="hotelName">Hotel Name:</label>
                <input type="text" id="hotelName" v-model="hotelInfo.name" required />
            </div>

            <div class="form-group">
                <label for="address">address:</label>
                <input type="text" id="address" v-model="hotelInfo.address" required />
            </div>

            <div class="form-group">
                <label for="phone">Phone:</label>
                <input type="text" id="phone" v-model="hotelInfo.phone" required />
            </div>

            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="hotelInfo.email" required />
            </div>

            <div class="form-group">
                <label for="description">Description:</label>
                <textarea id="description" v-model="hotelInfo.desc"></textarea>
            </div>

            <div class="form-group">
                <label for="checkInTime">Check-In Time:</label>
                <input type="time" id="checkInTime" v-model="hotelInfo.checkIn" />
            </div>

            <div class="form-group">
                <label for="checkOutTime">Check-Out Time:</label>
                <input type="time" id="checkOutTime" v-model="hotelInfo.checkOut" />
                <br>
                <hr>
                <button type="submit">Submit</button>
            </div>

            
        </form>
    </div>
</template>

<script>
    export default {
        name: 'HotelInfoEndComponent',
        data() {
            return {
                hotelInfo: {
                    name: '',
                    address: '',
                    phone: '',
                    email: '',
                    desc: '',
                    checkIn: '',
                    checkOut: ''
                }
            };
        },
        methods: {
            async submitHotelInfo() {
                try {
                    const response = await fetch(`${process.env.VUE_APP_API_BASE_URL}/hotelInfo`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(this.hotelInfo)
                    });

                    if (response.ok) {
                        alert('Hotel information submitted successfully');
                    } else {
                        const errorData = await response.json();
                        alert('Error: ' + (errorData.message || 'Unknown error occurred'));
                    }
                } catch (error) {
                    console.error('Error submitting hotel information:', error);
                    alert('Failed to submit hotel information: ' + error.message);
                }
            }
        }
    };
</script>

<style scoped>
    .form-group {
        /*margin-bottom: 15px;*/
        margin: 0 auto;
        padding: 10px; /* 新增的邊距 */
    }

    label {
        display: block;
        margin-bottom: 5px;
    }

    input,
    textarea {
        max-width: 600px;
        width: 100%;
        padding: 8px;
        box-sizing: border-box;
    }

    button {
        padding: 10px 15px;
        background-color: #007bff;
        color: white;
        border: none;
        cursor: pointer;
    }

        button:hover {
            background-color: #0056b3;
        }
</style>
