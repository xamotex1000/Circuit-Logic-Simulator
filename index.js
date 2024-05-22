const Script = require("./Scripts/Run.js");
const rl = require("readline");
console.log(Script.Node)
const rlInterface = rl.createInterface({
 input: process.stdin,
 output: process.stdout
});

function readLine(question) {
	return new Promise((resolve) =>
	rlInterface.question(question+"\n", resolve));
}

async function main(){
	async function roll(){
			var input = await readLine("What would you like to do?\n 1. Create New Circuit\n 2. Save a Circuit\n 3. Run a Circuit");
			if(input != 1 && input != 2 && input != 3){
				console.log("Invalid Input. Try Again.");
				input = await roll();
				return(input);
			} else{
				return(input);
			}
 	}
	var choice = await roll();
	if(parseInt(choice) == 1){
		var c = await readLine("What is the name of your circuit?");
		var i = await readLine("How many inputs are in this circuit?");
		var inputs = [];
		for(var j = 0; j < i; j++){
			inputs.push(j);
		}
		var circuit = await customCircuit(inputs);
		var outputs = circuit[1];
		circuit = circuit[0];
		var id = await readLine("What is your preferred id? (leave blank if you dont care)");
		eval("global['"+c+"']=new Script.Node(["+inputs+"],["+outputs+"],"+circuit+",'"+c+"')");
		console.log("Inputs:",eval(c+".Inputs")+"\nOutputs:",eval(c+".Outputs"));
		main();
	} else if(parseInt(choice) == 2){
		var c = await readLine("What circuit would you like to save?");
		eval("Script.save("+c+")")
		main();
	} else if(parseInt(choice) == 3){
		var c = await readLine("What circuit would you like to run?");
		var inputs = await readLine("What are the inputs?");
		console.log(eval(c+".run(["+inputs+"])"));
		main();
	}
	async function customCircuit(inputs) {
		var next = "first";
		var tracker = [];
		for(var i = 0; i < inputs.length; i++){
			tracker.push({ "id": inputs[i], "name": "Input "+inputs[i] });
		}
		var outputs = [];
		var nodeArgs = "[";
		for(var i = 0; i > -1; i++){
			var node = { "name": "", "id": "" }
			node.name = await readLine(`What is the name of the `+next+` node?`);
			node.id = i;
			if(node.name == ""){
				break;
			}
			if(next != "first"){
				nodeArgs += ",";
			}
			var nodeInputs = [];
			var nodeOutputs = [];
			var inString = "\n";
			tracker.forEach(obj => inString+=obj.id+": "+obj.name+"\n");
			var input = await readLine(`What are the input IDs of this node separated by commas?`+inString);
			input.split(",").forEach(obj => nodeInputs.push(parseInt(obj)));
			var outputAmt = Script.GetCircuitByName(node.name).Outputs.length;
			for(var j = 0; j < outputAmt; j++){
				nodeOutputs.push(tracker.length);
				tracker.push({ "id": tracker.length, "name": node.name+" Output "+j });
			}
			var outString = "\n";
			nodeOutputs.forEach(obj => outString+=obj-(tracker.length-nodeOutputs.length)+"\n");
			var outs = await readLine("IF APPLICABLE, which outputs lead to the circuits outputs? (separate with commas)"+outString);
			if(outs != ""){
				outs.split(",").forEach(obj => outputs.push(parseInt(obj+(tracker.length-nodeOutputs.length))));
			}
			next = "next";
			nodeArgs += ("[["+Script.GetCircuitByName(node.name).ID+","+node.id+"],["+nodeInputs+"],["+nodeOutputs+"]]")
		}
		return([nodeArgs+"]", outputs]);
	}
}

main();
