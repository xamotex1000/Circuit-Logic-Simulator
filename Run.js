const SaveData = require('./Get Data Files')
const { writeFile, writeCombinedFiles } = require('./Write Data Files')
const SaveCircuit = writeFile;
var circuits = [{Name: "And", ID: 0, Data: "Reserved"}, {Name: "Not", ID: 1, Data: "Reserved"}];
const GetCircuitById = (id) => circuits.find(item => item.ID === id);
const GetCircuitByName = (name) => circuits.find(item => item.Name === name);

const runExamples = false;


const CheckBit = (Arry1, Arry2, x, y) => (Arry2[Arry1[x][1][y]] == 1 || Arry2[Arry1[x][1][y]] == true);

for(var Data of SaveData){
	global[Data.name] = new Node(Data.Inputs, Data.Outputs, Data.Data, Data.name, Data.id);
}
var IDChart = []

function Node(inputs, outputs, circuit, internalName, id){
	this.name=internalName;
	this.Inputs=inputs;
	this.Outputs=outputs;
	this.Data=circuit;
	if(id){
		this.id=id
	} else{
		this.id=circuits.length;
	}
	circuits.push({Name: this.name, ID: this.id, Data: this.Data, Inputs: this.Inputs, Outputs: this.Outputs})
	this.run= function(ins){
		return(RunCircuit(this.Data, ins, this.Outputs))
	};
}

function RunCircuit(BlueprintArray, inputMap, Outputs){
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

function WriteIntoFolder(Circuit, Folder){
	writeCombinedFiles([Folder, Circuit]);
}


if(runExamples){
 //To make a new circuit:
 var id = 3;
 var exampleCircuit = [[/*[Target ID, ID in circuit]*/ [1,0], /*Input IDs*/[0], /*Output IDs*/[2]], [[1,1], [1], [3]], [[0,2], [2,3], [4]], [[1,3], [4], [5]]];
 var exampleNor = new Node(/*input IDs*/[0, 1], /*output IDs*/[5], exampleCircuit, /*Name*/"Nor", id /*(optional)*/);

 //To run a circuit:
 var Run = exampleNor;
 var Inputs = /*Values of the inputs*/[1,0];

 var out = Run.run(Inputs)

 //Encoding the output into binary
 var o = "";
 for(var i = 0; i < out.length; i++){
 	if(out[i]){
 		o += "1";
 	} else{
 		o += "0";
 	}
 }

 console.log(o)
 if(false){
         //To save a circuit
         save(exampleNor);
 }
}