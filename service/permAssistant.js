var permAssistant = function(){}
/*
*	service call: 	checkperms
*	function: 		Makes sure that we are running as root
*   argument list:
*		A callback function that takes 1 parameter, the parameter passed in
*       will be an object with the fields:
*       {
*           "root": boolean,
*           "homebrew": boolean
*       }
*/
    
permAssistant.prototype.run = function(future){
	var rootGood = false;
    var homeBrewGood = false;
	this.future = future;
	
	//Check that we have root access
	var rootCmd = new CommandLine("whoami", function(results) {
		if(results.stdout == "root\n"){
			rootGood = true;
			console.log("Root good");
		}
	
		homebrewCmd.run();
	});

    //Check if the homebrew js framework is installed
    var homebrewCmd = new CommandLine("if [ -f /var/usr/bin/run-homebrew-js-service ]; then echo yes; fi", function(results) {
        if(results.stdout == "yes\n"){
            homeBrewGood = true;
            console.log("homebrew good");
        }
        
        //Return the results of installation
        var result = {"root": rootGood, "homebrew": homeBrewGood};
        future.result = {reply: result};
    });
    
    //Start the first command which will chain the remaining
	rootCmd.run();
}
