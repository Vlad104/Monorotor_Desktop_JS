const defaultData = {
  dozator:  {id: 'D', value: 2},
  volume:   {id: 'V', value: 100},
  feedrate: {id: 'F', value: 200},
  accel:    {id: 'A', value: 1000},
  reverse:  {id: 'R', value: 0},
  propA:    {id: 'q', value: 1},
  propB:    {id: 'p', value: 1},
  ratioA:   {id: 'r', value: 0.5},
  ratioB:   {id: 'f', value: 0.5},
  gearA:    {id: 'a', value: 2050},
  gearB:    {id: 'b', value: 2050},
};

const defaultOldData = {
  dozator:  {id: 'D', value: -1},
  volume:   {id: 'V', value: -1},
  feedrate: {id: 'F', value: -1},
  accel:    {id: 'A', value: -1},
  reverse:  {id: 'R', value: -1},
  propA:    {id: 'q', value: -1},
  propB:    {id: 'p', value: -1},
  ratioA:   {id: 'r', value: -1},
  ratioB:   {id: 'f', value: -1},
  gearA:    {id: 'a', value: -1},
  gearB:    {id: 'b', value: -1},
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
];

export default class Protocol {
  constructor(data = defaultData) {
    this.data = JSON.parse(JSON.stringify(defaultData));
    this.oldData = JSON.parse(JSON.stringify(defaultOldData));
    this.transmitData = [];
  }

  makeTransmitData() {
    transmitList.forEach((key) => {
      if (this.data[key].value != this.oldData[key].value) {
        this.transmitData.push(`@${this.data[key].id}${this.data[key].value}*`);
        this.oldData[key].value = this.data[key].value;
      }
    });
    return this.transmitData;
  }

  updateRatios() {
    this.data.ratioA.value = (this.data.propA.value / (parseFloat(this.data.propA.value) + parseFloat(this.data.propB.value))).toFixed(5);
    this.data.ratioB.value = (this.data.propB.value / (parseFloat(this.data.propA.value) + parseFloat(this.data.propB.value))).toFixed(5);
  }

  makeStart() {
    this.makeTransmitData();
    this.transmitData.push('=1');
    return this.transmitData;
  }

  makeContinues() {
    this.makeTransmitData();
    this.transmitData.push('=2');
    return this.transmitData;
  }

  makeStop() {
    return ['=0'];
  }

  makeSave() {
    return ['=9'];
  }

  clearData() {
    this.transmitData = [];
  }

  calcTime() {
    return 60 * this.data.volume.value / this.data.feedrate.value + this.data.feedrate.value / this.data.accel.value;
  }
}
