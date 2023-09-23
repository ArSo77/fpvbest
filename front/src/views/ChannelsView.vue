<template>
  <div class="page">
    <section class="actions">
      <button
        class="actions__btn"
        @click="
          pickedChannels = [];
          pickedSystems = [];
        "
      >
        Clear
      </button>
      <button
        class="actions__btn"
        :class="{ 'actions__btn--active': isSystemPicked(system) }"
        @click="toggleSystem(system)"
        v-for="system in Object.values(SYSTEM_TYPE)"
        :key="system"
      >
        {{ system }}
      </button>
    </section>
    <div class="systems">
      <div
        class="hazard"
        v-for="line in hazardLines"
        :key="line + Math.random()"
        :style="{ left: (line - freqStart) / freqMul + '%' }"
      ></div>
      <div
        class="pickLine"
        v-for="line in pickedLines"
        :key="line"
        :style="{ left: (line - freqStart) / freqMul + '%' }"
      />
      <div class="system" v-for="system in filterChannels" :key="system.id">
        <span class="system__title">
          {{ system.id }}
        </span>
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
import { allChannels, SYSTEM_TYPE, SystemType } from '@/utils/channelValues';
import {
  computed, onBeforeMount, Ref, ref,
} from 'vue';

const pickedChannels: Ref<string[]> = ref([]);
const pickedSystems: Ref<string[]> = ref([]);

const freqStart = 5645;
const freqEnd = 5930;
const freqMul = (freqEnd - freqStart) / 100;

const toggleSystem = (type: SystemType) => {
  const index = pickedSystems.value.indexOf(type);
  if (index !== -1) {
    pickedSystems.value.splice(index, 1);
  } else {
    pickedSystems.value.push(type);
  }
  window.localStorage.setItem('systems', JSON.stringify(pickedSystems.value));
};

const toggleChannel = (systemId: string, channelId: number, channelValue: number) => {
  const channnel = `${systemId}:${channelId}:${channelValue}`;
  const index = pickedChannels.value.indexOf(channnel);
  if (index !== -1) {
    pickedChannels.value.splice(index, 1);
  } else {
    pickedChannels.value.push(channnel);
  }
  window.localStorage.setItem('channels', JSON.stringify(pickedChannels.value));
};

const isPicked = (systemId: string, channelId: number, channelValue: number) => {
  const channnel = `${systemId}:${channelId}:${channelValue}`;
  return pickedChannels.value.indexOf(channnel) !== -1;
};

const isSystemPicked = (system: SystemType) => pickedSystems.value.indexOf(system) !== -1;

const pickedLines = computed(() => pickedChannels.value.map((chObj) => chObj.split(':')[2]));
// eslint-disable-next-line array-callback-return
const hazardLines = computed(() => {
  const elements = pickedLines.value;
  const hazards = [];
  // eslint-disable-next-line no-plusplus
  for (let chA = 0; chA < elements.length; chA++) {
    // eslint-disable-next-line no-plusplus
    for (let chB = chA + 1; chB < elements.length; chB++) {
      hazards.push(elements[chA] * 2 - elements[chB]);
      hazards.push(elements[chB] * 2 - elements[chA]);
    }
  }
  return [...hazards].filter((hazard) => hazard < freqEnd && hazard > freqStart);
});

const filterChannels = computed(() => allChannels.filter(
  (channel) => pickedSystems.value.includes(channel.type),
));

onBeforeMount(() => {
  const jsonChannels = window.localStorage.getItem('channels');
  if (jsonChannels) pickedChannels.value.push(...JSON.parse(jsonChannels));
  const jsonSystem = window.localStorage.getItem('systems');
  if (jsonSystem) pickedSystems.value.push(...JSON.parse(jsonSystem));
});
</script>

<style lang="scss">
//.page {
//  border: 1px solid red;
//}

.actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 8px;
  &__btn {
    background: transparent;
    border: 2px solid rgba(173, 255, 47, 0.63);
    border-radius: 16px;
    padding: 8px 16px;
    font-size: 16px;
    color: greenyellow;
    &--active {
      background: rgba(173, 255, 47, 0.63);
      color: black;
    }
  }
}

.systems {
  position: relative;
  border: 2px solid black;
  border-radius: 8px;
}

.system {
  height: 100px;
  border: 1px solid grey;
  &__title {
    padding: 6px;
    display: block;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
  }
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
    border: 3px solid greenyellow;
  }
  &--active {
    background: greenyellow;
    color: black;
  }
}

.hazard {
  position: absolute;
  width: 6%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 0, 0, 0.3) 0%,
    rgba(255, 0, 0, 0.9) 50%,
    rgba(255, 0, 0, 0.3) 100%
  );
  opacity: 30%;
  translate: -50%;
}

.pickLine {
  position: absolute;
  width: 5%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(#61f858, 0.3) 0%,
    rgba(#61f858, 1) 50%,
    rgba(#61f858, 0.3) 100%
  );
  opacity: 30%;
  translate: -50%;
}
</style>
