var getOutputAssistant = function(){}
/*
*	service call: 	getOutput
*	function: 		retrieve the selected output from the config file
*   argument list:  n.a.
*/
    
getOutputAssistant.prototype.run = function(future){
	var output="";
	this.future = future;
	
    //read parameter from config file
    var homebrewCmd = new CommandLine("/bin/grep -o '^DefaultModule.*' /var/etc/speech-dispatcher/speechd.conf|/bin/sed 's/DefaultModule\ //'|/usr/bin/tr -d '\\n'", function(results) {

        //Return the results of installation
        future.result = {reply: results.stdout,error:results.stderr};
    });
    
    //Start the first command which will chain the remaining
	homebrewCmd.run();

}
