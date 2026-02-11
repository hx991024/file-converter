<template>
  <v-list nav density="comfortable">
    <template v-for="item in menuRoutes" :key="item.name">
      <v-list-group v-if="item.children?.length" :value="isActive(item)">
        <template #activator="{ props }">
          <v-list-item v-bind="props" :prepend-icon="item.meta?.icon" :title="item.meta?.title" />
        </template>
        <v-list-item
          v-for="child in item.children"
          :key="child.name"
          v-show="child.meta?.showInMenu"
          :to="`/${item.path}/${child.path}`"
          :title="child.meta?.title"
          :prepend-icon="child.meta?.icon"
          :active="route.name === child.name"
        />
      </v-list-group>
      <v-list-item
        v-else
        :to="item.path"
        :prepend-icon="item.meta?.icon"
        :title="item.meta?.title"
        :active="route.name === item.name"
      />
    </template>
  </v-list>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 只拿 layout 下的子路由
const rootRoutes = router.options.routes[0]?.children || []

// 过滤出需要菜单显示的
const menuRoutes = computed(() => rootRoutes.filter((r) => r.meta?.showInMenu))

// 判断是否激活（用于自动展开父菜单）
const isActive = (r: any) => {
  return route.matched.some((m) => m.name === r.name)
}
</script>

<style scoped></style>
