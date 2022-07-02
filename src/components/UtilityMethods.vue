<template>
    <div>

    </div>
</template>

<script>
    export default {
        name: UtilityMethods,
        methods: {
            removeDuplicates: function (array) {
                var current = array[0]
                for(var i = 0; i<array.length; i++){
                    if (current === array[i+1]){
                        array.pop(array[i+1])
                        i--
                    } else {
                        current = array[i+1]
                    }
                }
                return array
            }
        }
    }
</script>

<style scoped>

</style>