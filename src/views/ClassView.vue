<template>
  <div class="class-view">
    <div class="class-view-header d-flex justify-space-between">
      <v-tabs
          v-model="tab"
          class="ml-10"
          height="60px"
      >
        <v-tab value="one" class="tabs-title">我的班级</v-tab>
      </v-tabs>
    </div>
    <v-divider />
    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="one" class="pa-4">
        <div class="operate-area d-flex justify-space-between mr-4">
          <div class="d-flex">
            <v-text-field
                v-model="keyWord"
                class="ml-6"
                variant="outlined"
                density="compact"
                rounded
                width="300px"
                append-inner-icon="mdi-magnify"
                placeholder="搜索班级"
                hide-details
                clearable
                single-line
                @click:append-inner="useClassList"
                @click:clear="useClassList"
            ></v-text-field>
          </div>
          <v-btn color="primary" variant="outlined" rounded @click="overlay = true">添加班级</v-btn>
        </div>
        <ClassCards v-if="classList" :data="classList.list"/>
      </v-tabs-window-item>
    </v-tabs-window>
    <v-overlay
        v-model="overlay"
        class="align-center justify-center"
    >
      <NewClass @close="handleClose"/>
    </v-overlay>
  </div>
</template>

<script setup lang="ts">
import {useApi} from "@/api/handler";
import {classes} from "@/api";
import {ApiMap} from "@/api/type";
import {onMounted, ref} from "vue";
import NewClass from "@/components/class/NewClass.vue";
import ClassCards from "@/components/class/ClassCards.vue";

const tab = ref<string>('one')
const overlay = ref<boolean>(false)
const classList = ref<ApiMap['/class/list']['resp'] | null>(null)
const keyWord = ref<string>('')

function handleClose() {
  overlay.value = false
  useClassList()
}

onMounted(() => {
  useClassList()
})

const useClassList = () => {
  useApi({
    api: classes.ClassList(1, 10, keyWord.value),
    onSuccess: resp => {
      classList.value = resp.data as ApiMap['/class/list']['resp']
    }
  })
}
</script>

<style scoped lang="scss">
.tabs-title {
  font-size: 16px;
}
</style>
