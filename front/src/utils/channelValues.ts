export const SYSTEM_TYPE = {
  ANALOG: 'Analog',
  DJI: 'Dji',
  HDZERO: 'Hdzero',
  WS: 'Walksnail',
} as const;

export type SystemType = (typeof SYSTEM_TYPE)[keyof typeof SYSTEM_TYPE];

type ChannelValue = {
  id: number;
  value: number;
};

type ChannelValues = {
  id: string;
  type: SystemType;
  values: ChannelValue[];
};

const djiO3LowWithout: ChannelValues = {
  id: 'DjiO3 Low',
  type: SYSTEM_TYPE.DJI,
  values: [
    { id: 1, value: 5768 },
    { id: 2, value: 5804 },
    { id: 3, value: 5839 },
  ],
};

const djiO3HighWithout: ChannelValues = {
  id: 'DjiO3 High',
  type: SYSTEM_TYPE.DJI,
  values: [{ id: 1, value: 5794 }],
};

const djiO3LowHam: ChannelValues = {
  id: 'DjiO3 Low Ham',
  type: SYSTEM_TYPE.DJI,
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
  id: 'DjiO3 High Ham',
  type: SYSTEM_TYPE.DJI,
  values: [
    { id: 1, value: 5677 },
    { id: 2, value: 5794 },
    { id: 3, value: 5902 },
  ],
};

const djiVista: ChannelValues[] = [
  {
    id: 'DjiVista 25',
    type: SYSTEM_TYPE.DJI,
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
    id: 'DjiVista 50',
    type: SYSTEM_TYPE.DJI,
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
    id: 'HDZero',
    type: SYSTEM_TYPE.HDZERO,
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
    id: 'Analog Raceband',
    type: SYSTEM_TYPE.ANALOG,
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
    id: 'Walksnail Race Mode',
    type: SYSTEM_TYPE.WS,
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
    id: 'Walksnail 25',
    type: SYSTEM_TYPE.WS,
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
    id: 'Walksnail 50',
    type: SYSTEM_TYPE.WS,
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
