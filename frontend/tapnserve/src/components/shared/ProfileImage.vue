<template>
    <div class="profile-image-container">
        <img src="@/assets/logo.png" alt="Profile Image" class="profile-image">
    </div>
</template>

<script>
export default {
name: 'ProfileImage',
props: {
    path: {
        type: String,
        required: true
    },
},
computed: {
    computedWidth() {
        return this.width;
    }
},
methods: {
    handleClick(event) {
        this.$emit('click', event);
    }
}
};
</script>