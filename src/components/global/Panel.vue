<template>
     <div>
          <div class="white elevation-2 text-center">
               <v-toolbar flat dense class="cyan" dark>
                    <v-toolbar-title>{{ title }}</v-toolbar-title>
                    <slot name="action" />
               </v-toolbar>


               <div 
                    class="pl-4 pr-4 pt-2 pb-2 justify-space-between"
                    :style="{top:$vuetify.breakpoint.mdAndUp?'700vh':'500vh'}"
               >
                    <slot>
                         No slot content defined
                    </slot>
               </div>
          </div>
     </div>
</template>

<script>
     export default {
          // data() {
          //      return {
          //           title: "hello world"
          //      }
          // },

          props: [
               'title'
          ]
          
     }
</script>

<style lang="scss" scoped>

</style>