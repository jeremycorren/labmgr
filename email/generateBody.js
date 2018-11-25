module.exports = (lab) => (
  'Hi ' + lab.patient.firstName + ',<br><br>'
  + 'This is a friendly reminder to complete the following labwork: <br>'
  + '<ul>' + generateList(lab.labTypes) + '</ul>'
);

const LAB_TYPE_TO_NAME = {
  cbp: 'Comprehensive Blood Panel',
  bmp: 'Basic Metabolic Panel'
};

function generateList(labTypes) {
  return labTypes.map(labType => (
    '<li>' + LAB_TYPE_TO_NAME[labType] + '</li>'
  ));
}