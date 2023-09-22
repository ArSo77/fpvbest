const MAIN_TYPE = {
  ANALOG: 'Analog',
  DJI: 'Dji',
  HDZERO: 'Hdzero',
  WS: 'Walksnail',
} as const;

type MainType = (typeof MAIN_TYPE)[keyof typeof MAIN_TYPE];

type ChannelValue = {
  id: number;
  value: number;
};

type ChannelValues = {
  id: string;
  type: MainType;
  values: ChannelValue[];
};

const djiO3LowWithout: ChannelValues = {
  id: 'djiO3LowWithout',
  type: MAIN_TYPE.DJI,
  values: [
    { id: 1, value: 5768 },
    { id: 2, value: 5804 },
    { id: 3, value: 5839 },
  ],
};

const djiO3HighWithout: ChannelValues = {
  id: 'djiO3HighWithout',
  type: MAIN_TYPE.DJI,
  values: [{ id: 1, value: 5794 }],
};

const djiO3LowHam: ChannelValues = {
  id: 'djiO3LowHam',
  type: MAIN_TYPE.DJI,
  values: [
    { id: 1, value: 5669 },
    { id: 2, value: 5705 },
    { id: 3, value: 5768 },
    { id: 4, value: 5804 },
    { id: 5, value: 5839 },
    { id: 6, value: 5876 },
    { id: 7, value: 5912 },
  ],
};

const djiO3HighHam: ChannelValues = {
  id: 'djiO3HighHam',
  type: MAIN_TYPE.DJI,
  values: [
    { id: 1, value: 5677 },
    { id: 2, value: 5794 },
    { id: 3, value: 5902 },
  ],
};

const djiVista: ChannelValues[] = [
  {
    id: 'djiVista25',
    type: MAIN_TYPE.DJI,
    values: [
      { id: 1, value: 5660 },
      { id: 2, value: 5695 },
      { id: 3, value: 5735 },
      { id: 4, value: 5770 },
      { id: 5, value: 5805 },
      { id: 8, value: 5839 },
      { id: 6, value: 5878 },
      { id: 7, value: 5914 },
    ],
  },
  {
    id: 'djiVista50',
    type: MAIN_TYPE.DJI,
    values: [
      { id: 1, value: 5677 },
      { id: 2, value: 5794 },
      { id: 3, value: 5902 },
    ],
  },
];

const djiChannels: ChannelValues[] = [
  djiO3LowWithout,
  djiO3LowHam,
  djiO3HighWithout,
  djiO3HighHam,
  ...djiVista,
];

const hdzeroChannels: ChannelValues[] = [
  {
    id: 'Hdzero',
    type: MAIN_TYPE.HDZERO,
    values: [
      { id: 1, value: 5658 },
      { id: 2, value: 5695 },
      { id: 3, value: 5732 },
      { id: 4, value: 5769 },
      { id: 5, value: 5806 },
      { id: 6, value: 5843 },
      { id: 7, value: 5880 },
      { id: 8, value: 5917 },
    ],
  },
];

const analogChannels: ChannelValues[] = [
  {
    id: 'Raceband',
    type: MAIN_TYPE.ANALOG,
    values: [
      { id: 1, value: 5658 },
      { id: 2, value: 5695 },
      { id: 3, value: 5732 },
      { id: 4, value: 5769 },
      { id: 5, value: 5806 },
      { id: 6, value: 5843 },
      { id: 7, value: 5880 },
      { id: 8, value: 5917 },
    ],
  },
];

export const wsChannels: ChannelValues[] = [
  {
    id: 'walksnailRaceMode',
    type: MAIN_TYPE.WS,
    values: [
      { id: 1, value: 5658 },
      { id: 2, value: 5695 },
      { id: 3, value: 5732 },
      { id: 4, value: 5769 },
      { id: 5, value: 5806 },
      { id: 6, value: 5843 },
      { id: 7, value: 5880 },
      { id: 8, value: 5917 },
    ],
  },
  {
    id: 'walksnail25Mbps',
    type: MAIN_TYPE.WS,
    values: [
      { id: 1, value: 5660 },
      { id: 2, value: 5695 },
      { id: 3, value: 5735 },
      { id: 4, value: 55770 },
      { id: 5, value: 5805 },
      { id: 8, value: 5839 },
      { id: 6, value: 5878 },
      { id: 7, value: 5914 },
    ],
  },
  {
    id: 'walksnail50Mbps',
    type: MAIN_TYPE.WS,
    values: [
      { id: 1, value: 5695 },
      { id: 2, value: 5770 },
      { id: 8, value: 5839 },
      { id: 3, value: 5878 },
    ],
  },
];

export const allChannels: ChannelValues[] = [
  ...analogChannels,
  ...hdzeroChannels,
  ...djiChannels,
  ...wsChannels,
];
