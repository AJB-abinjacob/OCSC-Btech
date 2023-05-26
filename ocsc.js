// machine details
//var powerRating = document.getElementById("powerRating").value;

function powerfactor_slider(text_id, range_id) {
  document.getElementById(text_id).value =
    document.getElementById(range_id).value;
}

function check_slider(text_id, range_id) {
  document.getElementById(text_id).value =
    document.getElementById(range_id).value;
}

function calculate() {
  // var powerRating = parseFloat(document.getElementById("powerRating").value);
  // var lvVoltage = parseFloat(document.getElementById("lvVoltage").value);
  // var hvVoltage = parseFloat(document.getElementById("hvVoltage").value);

  var Voc = parseFloat(document.getElementById("Voc").value);
  var Ioc = parseFloat(document.getElementById("Ioc").value);
  var Woc = parseFloat(document.getElementById("Woc").value);
  var Vsc = parseFloat(document.getElementById("Vsc").value);
  var Isc = parseFloat(document.getElementById("Isc").value);
  var Wsc = parseFloat(document.getElementById("Wsc").value);

  var cosfi = parseFloat(document.getElementById("cosfi").value);
  var X = parseFloat(document.getElementById("load").value);

  var powerRating = 2.5;
  var lvVoltage = 115;
  var hvVoltage = 230;

  //   tabular column
  //   OC TEST
  // var Voc = 115;
  // var Ioc = 2.5;
  // var Woc = 88;
  // var Voc = 115;
  // var Ioc = 0.5;
  // var Woc = 42;
  //   sc TEST
  // var Vsc = 6;
  // var Isc = 5.4;
  // var Wsc = 20;
  // var Vsc = 22;
  // var Isc = 10.86;
  // var Wsc = 200;

  // calculaton
  // oc Test
  var cosfi0 = Woc / (Voc * Ioc);
  console.log("cosfi0 : " + cosfi0);
  var fi = (Math.acos(cosfi0) * 180) / Math.PI;
  console.log("fi : " + fi);
  var Iw = Ioc * cosfi0;
  console.log(" Iw : " + Iw);
  var Iu = Ioc * Math.sqrt(1 - Math.pow(cosfi0, 2)); //Math.sin(fi);
  console.log("Iu : " + Iu);
  var Roc = Voc / Iw;
  console.log("Roc : " + Roc);
  var Xoc = Voc / Iu;
  console.log("Xo : " + Xoc);
  console.log("-----------------------");
  console.log("SC Test");
  var Z01 = Vsc / Isc;
  console.log(" Z01 : " + Z01);
  var R01 = Wsc / Math.pow(Isc, 2);
  console.log("RO1 : " + R01);
  var X01 = Math.sqrt(Math.pow(Z01, 2) - Math.pow(R01, 2));
  console.log("X01 : " + X01);
  var K = lvVoltage / hvVoltage;
  console.log("k : " + K);
  var R02 = R01 * Math.pow(K, 2);
  console.log("R02 : " + R02);
  var X02 = X01 * Math.pow(K, 2);
  console.log("X02 : " + X02);
  var I2dash = (powerRating * 1000) / hvVoltage;
  console.log("I2' : " + I2dash);
  var V2dash = lvVoltage / K;
  console.log("V2' : " + V2dash);
  // Predetermine the efficiency cosfi( .8)
  console.log("Predetermine the efficiency cosfi( .8)");
  // var cosfi = 0.8; //cosfi
  // var X = 1 / 4; // load factor
  console.log("load factor : " + X);
  var outputPower = X * powerRating * 1000 * cosfi;
  console.log("Output Power : " + outputPower);
  var copperLoss = Math.pow(X, 2) * Wsc;
  console.log("Copper Loss : " + copperLoss);
  var coreLoss = Woc;
  console.log("core Loss : " + coreLoss);
  var inputPower = outputPower + coreLoss + copperLoss;
  console.log("Input Power : " + inputPower);
  var efficiency = (outputPower / inputPower) * 100;
  console.log("Efficiency : " + efficiency);
  // Predetermine the regulation of different power factor
  console.log("Predetermine the regulation of different power factor");
  var I2 = (powerRating * 1000) / hvVoltage;
  console.log("I2 : " + I2);
  // I1 = (powerRating * 1000) / hvVoltage;
  var precosfi = cosfi; // cosfi
  var prefi = (Math.acos(precosfi) * 180) / Math.PI; //Math.acos(precosfi);
  var presinfi = Math.sqrt(1 - Math.pow(precosfi, 2)); // sinfi
  console.log("cos fi : " + precosfi);
  console.log("fi : " + prefi);
  console.log("sin fi : " + presinfi);
  var regulationLag = (I2 * (R02 * precosfi + X02 * presinfi)) / hvVoltage;
  console.log("regulationLag : " + regulationLag);

  var regulationLead = (I2 * (R02 * precosfi - X02 * presinfi)) / hvVoltage;
  console.log("regulationLead : " + regulationLead);
  console.log("---------------------- in percentage ------------------");

  var regulationLag =
    ((X * (I2 * (R02 * precosfi + X02 * presinfi))) / hvVoltage) * 100;
  console.log("regulationLag : " + regulationLag);
  var regulationLead =
    ((X * (I2 * (R02 * precosfi - X02 * presinfi))) / hvVoltage) * 100;
  console.log("regulationLead : " + regulationLead);
  console.log("---------------------- Sparsh -------------------------");
  var regulationLag =
    ((X * (I2 * (R01 * precosfi + X01 * presinfi))) / hvVoltage) * 100;
  console.log("regulationLag : " + regulationLag);
  var regulationLead =
    ((X * (I2 * (R01 * precosfi - X01 * presinfi))) / hvVoltage) * 100;
  console.log("regulationLead : " + regulationLead);

  // Tabluar Column 1
  var table1 = document
    .getElementById("tabulation")
    .getElementsByTagName("tbody")[0];
  var row = table1.insertRow(0);

  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  var cell6 = row.insertCell(5);
  var cell7 = row.insertCell(6);
  var cell8 = row.insertCell(7);
  var cell9 = row.insertCell(8);

  cell1.innerHTML = X;
  cell2.innerHTML = cosfi;
  cell3.innerHTML = coreLoss;
  cell4.innerHTML = copperLoss;
  cell5.innerHTML = outputPower;
  cell6.innerHTML = inputPower;
  cell7.innerHTML = efficiency;
  cell8.innerHTML = regulationLag;
  cell9.innerHTML = regulationLead;
}
