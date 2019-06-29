const defaultData = {
  dozator:  {id: 'D', value: 2},
  volume:   {id: 'V', value: 100},
  feedrate: {id: 'F', value: 200},
  accel:    {id: 'A', value: 1000},
  reverse:  {id: 'R', value: 0},
  propA:    {id: 'q', value: 1},
  propB:    {id: 'p', value: 1},
  ratioA:   {id: 'a', value: 0.5},
  ratioB:   {id: 'b', value: 0.5},
  gearA:    {id: 'A', value: 2050},
  gearB:    {id: 'B', value: 2050},
};

const transmitList = [
  'dozator',
  'volume',
  'feedrate',
  'accel',
  'reverse',
  'gearA',
  'gearB',
  'ratioA',
  'ratioB',
];

export default class Protocol {
  constructor(data = defaultData) {
    this.data = JSON.parse(JSON.stringify(defaultData));
    this.oldData = JSON.parse(JSON.stringify(defaultData));
    this.transmitData = [];
  }

  makeTransmitData() {
    transmitList.forEach((key) => {
      if (this.data[key].value != this.oldData[key].value) {
        this.transmitData.push(`${this.data[key].id}${this.data[key].value}*`);
        this.oldData[key].value = this.data[key].value;
      }
    });
    return this.transmitData;
  }

  clearData() {
    this.transmitData = [];
  }
}
