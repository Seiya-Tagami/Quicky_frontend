<script setup lang="ts">
const emits = defineEmits(["onClick"]);
const onClick = () => {
  emits("onClick");
};

</script>

<template>
  <div class="w-[200px] text-cyan-900 bg-gray-200 border-2 border-cyan-900 rounded-lg absolute md:top-[56px] top-[40px] right-[16px]">
    <div class="w-full flex items-center justify-around gap-4 px-2 py-3 border-cyan-900 border-b-[1px]">
      <span class="font-semibold">Appearance</span>
      <button @click="onClick">change</button>
    </div>
    <div>
      <div class="flex items-center justify-around px-2 py-2">
        <span class="font-semibold">Follow me!</span>
        <div class="flex items-center gap-3">
          <a href="https://github.com/Seiya-Tagami/Simple-Memo">
            <img src="../../assets/github.png" alt="github" class="w-6 h-6" />
          </a>
          <a href="https://seiya-tagami.github.io/portfolio">
            <img src="../../assets/developer.png" alt="developer" class="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
