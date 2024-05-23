const SaveData = import('./Get Data Files.js')
const { writeFile } = import('./Write Data Files.js')
const save = writeFile;
var circuits = [{Name: "And", ID: 0, Data: "Reserved"}, {Name: "Not", ID: 1, Data: "Reserved"}];
const GetCircuitById = (id) => circuits.find(item => item.ID === id);
const GetCircuitByName = (name) => circuits.find(item => item.Name === name);

const CheckBit = (Arry1, Arry2, x, y) => (Arry2[Arry1[x][1][y]] == 1 || Arry2[Arry1[x][1][y]] == true);

for(var Data of SaveData){
	global[Data.name] = new Node(Data.Inputs, Data.Outputs, Data.Data, Data.name, Data.id)
}

function Node(inputs, outputs, circuit, name, id, ORData){
	this.name=name;
	this.Inputs=inputs;
	this.Outputs=outputs;
	this.Data=circuit;
	if(circuit == []){
		this.OverRide = true;
		this.Data = ORData;
	}
	if(id){
		this.id=id
	} else{
		this.id=Math.max(...numbers)+1;
		if(this.id <= 0){
			this.id = 0;
		}
	}
	circuits.push({Name: this.name, ID: this.id, Data: this.Data, Inputs: this.Inputs, Outputs: this.Outputs, Override: this.OverRide})
	this.run= function(ins){
			return(RunCircuit(this.Data, ins, this.Outputs, this.OverRide));
	};
}

function RunCircuit(BlueprintArray, inputMap, Outputs, OvrKey){
	var DataArray = inputMap;
	for(var i = 0; i < BlueprintArray.length; i++){
		if(BlueprintArray[i][0][0] === 0){
			if(CheckBit(BlueprintArray, DataArray, i, 0) && CheckBit(BlueprintArray, DataArray, i, 1)){
				DataArray[BlueprintArray[i][2][0]] = true;
			} else{
				DataArray[BlueprintArray[i][2][0]] = false;
			}
		} else if(BlueprintArray[i][0][0] === 1){
			if(CheckBit(BlueprintArray, DataArray, i, 0)){
				DataArray[BlueprintArray[i][2][0]] = false;
			} else{
				DataArray[BlueprintArray[i][2][0]] = true;
			}
		} else{
			inputs = [];
			for(var j = 0; j < BlueprintArray[i][1].length; j++){
				inputs.push(DataArray[BlueprintArray[i][1][j]])
			}
			res = RunCircuit(GetCircuitById(BlueprintArray[i][0][0]).Data, inputs, GetCircuitById(BlueprintArray[i][0][0]).Outputs)
			for(var j = 0; j < BlueprintArray[i][2].length; j++){
				if(res[j]){
					DataArray[BlueprintArray[i][2][j]] = res[j]
				} else{
					DataArray[BlueprintArray[i][2][j]] = false;
				}
			}
		}
	}
	info = [];
	for(var i = 0; i < Outputs.length; i++){
		info.push(DataArray[Outputs[i]]);
	}
	return(info);
}


/* Example of new circuit:
var circuit = [[[1, 0], [0], [2]], [[1, 1], [1], [3]], [[0, 2], [2, 3], [4]], [[1, 3], [4], [5]]]
var Xor = new Node([0, 1], [5], circuit, "Xor", id);
Name should be the same as your variable name, id is optional and autoassigned if left blank.
*/

/* Example of running:
var Run = Xor;
var Inputs = [1,0];

var result = Run.run(Inputs)
var output = "";
for(var i = 0; i < result.length; i++){
	if(result[i]){
		output += "1";
	} else{
		output += "0";
	}
}
console.log(output)
//This will return true
*/
module.exports = { "Node": Node, "GetCircuitByName": GetCircuitByName, "save": save }
