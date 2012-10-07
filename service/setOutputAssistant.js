/*
*	service call: 	setOutput
*	function: 		set the selected output from the config file
*   argument list:  output: "voip"
*		
*/

var setOutputAssistant = function(){}

setOutputAssistant.prototype.run = function(future){

	//Build up command
	var inArgs = this.controller.args;

	var cmd = new CommandLine("/sbin/stop org.webosinternals.speechd;/bin/sed -i 's/^DefaultModule.*/DefaultModule " + inArgs.output + "/' /var/etc/speech-dispatcher/speechd.conf;/sbin/start org.webosinternals.speechd", function(results) {

        //Return the results of installation
        future.result = {reply: results.stdout,error:results.stderr};
    });
	cmd.run();
}
