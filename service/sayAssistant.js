/*
*	speech service 
	author: Hanspeter Jochmann
	
	copyed from: ffplay service - Historically I used ffplay, now using mplayer but too lazy to
					 change the filename.
	author: Zachary Burke
	website: http://mobilecoder.wordpress.com
	twitter: @error454
*/

var sayAssistant = function(){}
/*
*	service call: 	say
*	function: 		say a text
*   argument list:
    text: "The text"
* 		
*/

sayAssistant.prototype.run = function(future){

	//Build up command
	var inArgs = this.controller.args;
	var args = "";
	
	if(inArgs.rate != null){
		args += "-r "+inArgs.rate+" ";
	}
	if(inArgs.pitch != null){
		args += "-p "+inArgs.pitch+" ";
	}
	if(inArgs.volume != null){
		args += "-i "+inArgs.volume+" ";
	}
	if(inArgs.language != null){
		args += "-l "+inArgs.language+" ";
	}
	if(inArgs.spell != null){
		args += "-s ";
	}
	if(inArgs.type != null){
		args += "-t "+inArgs.type+" ";
	}
	if(inArgs.output != null){
		args += "-o "+inArgs.output+" ";
	}
    
	var cmd = new CommandLine("/media/cryptofs/apps/usr/palm/applications/org.webosinternals.speechd/spd-say " + args + " \"" + inArgs.text + "\"", function(results) {

        //Return the results of installation
        future.result = {reply: results.stdout,error:results.stderr};
    });
	cmd.run();
}
/*
 * Speech Dispatcher Say -- a simple client for speech synthesis (GNU GPL)

-r, --rate             -     Set the rate of the speech
                               (between -100 and +100, default: 0)
-p, --pitch            -     Set the pitch of the speech
                               (between -100 and +100, default: 0)
-i, --volume           -     Set the volume (intensity) of the speech
                               (between -100 and +100, default: 0) 
-o, --output-module    -     Set the output module
-l, --language         -     Set the language (iso code)
-t, --voice-type       -     Set the prefered voice type
                               (male1, male2, male3, female1, female2
                                female3, child_male, child_female)
-m, --punctuation-mode -     Set the punctuation mode (none, some, all) 
-s, --spelling         -     Spell the message
-x, --ssml             -     Set SSML mode on (default: off)

-e, --pipe-mode        -     Pipe from stdin to stdout plus Speech Dispatcher
-P, --priority         -     Set priority of the message (important, message,
                                text, notification, progress; default: text)
-N, --application-name -     Set the application name used to estabilish
                                the connection to specified string value
                                (default: spd-say)
-n, --connection-name  -     Set the connection name used to estabilish
                                the connection to specified string value
                                (default: main)

-w, --wait             -     Wait till the message is spoken or discarded
-S, --stop             -     Stop speaking the message being spoken
                                in Speech Dispatcher
-C, --cancel           -     Cancel all messages in Speech Dispatcher

-v, --version          -     Print version and copyright info
-h, --help             -     Print this info

Copyright (C) 2003 Brailcom, o.p.s.
This is free software; you can redistribute it and/or modify it
under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2, or (at your option)
any later version. Please see COPYING for more details.

Please report bugs to <speechd@bugs.freebsoft.org>
*/
