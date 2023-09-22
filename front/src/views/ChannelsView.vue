<template>
  <div class="page">
    <div class="systems">
      <div
        class="hazard"
        v-for="line in hazardLines"
        :key="line + Math.random()"
        :style="{ left: (line - freqStart) / freqMul + '%' }"
      >
      </div>
      <div
        class="pickLine"
        v-for="line in pickedLines"
        :key="line"
        :style="{ left: (line - freqStart) / freqMul + '%' }"
      >
        p
      </div>
      <div class="system" v-for="system in allChannels" :key="system.id">
        {{ system.id }}
        <div class="channels">
          <template v-for="chObj in system.values" :key="chObj.id">
            <button
              :style="{ left: (chObj.value - freqStart) / freqMul + '%' }"
              :class="{ 'channel--active': isPicked(system.id, chObj.id, chObj.value) }"
              class="channel"
              @click="toggleChannel(system.id, chObj.id, chObj.value)"
            >
              <div>{{ chObj.id }}</div>
              <div>{{ chObj.value }}</div>
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { allChannels } from '@/utils/channelValues';
import {
  computed, Ref, ref,
} from 'vue';

const freqStart = 5645;
const freqEnd = 5930;
const freqMul = (freqEnd - freqStart) / 100;

const pickedChannels: Ref<string[]> = ref([]);

const toggleChannel = (systemId: string, channelId: number, channelValue: number) => {
  console.log(systemId, channelId);
  const channnel = `${systemId}:${channelId}:${channelValue}`;
  const index = pickedChannels.value.indexOf(channnel);
  if (index !== -1) {
    pickedChannels.value.splice(index, 1);
  } else {
    pickedChannels.value.push(channnel);
  }
};

const isPicked = (systemId: string, channelId: number, channelValue: number) => {
  const channnel = `${systemId}:${channelId}:${channelValue}`;
  return pickedChannels.value.indexOf(channnel) !== -1;
};

const pickedLines = computed(() => pickedChannels.value.map((chObj) => chObj.split(':')[2]));
// eslint-disable-next-line array-callback-return
const hazardLines = computed(() => {
  const elements = pickedLines.value;
  const hazards = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < elements.length; i++) {
    // eslint-disable-next-line no-plusplus
    for (let j = i + 1; j < elements.length; j++) {
      hazards.push(elements[i] * 2 - elements[j]);
      hazards.push(elements[j] * 2 - elements[i]);
    }
  }
  return [...hazards];
});
</script>

<style lang="scss">
//.page {
//  border: 1px solid red;
//}

.systems {
  position: relative;
  border: 2px solid black;
  border-radius: 8px;
}

.system {
  height: 90px;
  border: 1px solid grey;
}

.channels {
  position: relative;
}

.channel {
  all: unset;
  position: absolute;
  border: 3px solid grey;
  border-radius: 8px;
  width: 6%;
  height: 50px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  translate: -50%;
  &:hover {
    border: 3px solid red;
  }
  &--active {
    background: #42b983;
  }
}

.hazard {
  position: absolute;
  width: 6%;
  height: 100%;
  background: black;
  opacity: 30%;
  translate: -50%;
}

.pickLine {
  position: absolute;
  width: 5%;
  height: 100%;
  background: purple;
  opacity: 30%;
  translate: -50%;
}
</style>
