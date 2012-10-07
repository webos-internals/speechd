function ChangeLogAssistant()
{
    this.menuModel =
	{
	    visible: false,
	    items: []
	};
	
	// setup command menu
    this.cmdMenuModel =
	{
	    visible: true, 
	    items:
	    [
		    { iconPath: 'app/images/config.png', command: "do-config" },
		    {
				label: $L("Let us do a test"),
				command: 'do-test'
		    },
		    {}
	     ]
	};
};

ChangeLogAssistant.prototype.setup = function()
{
    this.controller.setupWidget(Mojo.Menu.appMenu, { omitDefaultItems: true }, this.menuModel);
	this.controller.setupWidget(Mojo.Menu.commandMenu,
			this.attributes = {
				spacerHeight: 0,
				menuClass: 'no-fade'
			},
			this.cmdMenuModel
		);   
	this.controller.pushCommander(this.handleCommand.bind(this));
	
    this.titleContainer = this.controller.get('title');
    this.dataContainer =  this.controller.get('data');
	
	this.titleContainer.innerHTML = Mojo.appInfo.title;
	
	this.setHtml("");		
	
	this.request = new Mojo.Service.Request('palm://org.webosinternals.speechd.service', {
			method: 'getOutput',
			parameters: {},
		onSuccess:	function(result) {
					this.setHtml(result.reply);
					delete this.request;
				}.bind(this),
		onFailure:	function(err) {
					delete this.request;
					Mojo.Log.error('Unable to get speech dispatcher audio output');
					Mojo.Controller.errorDialog('Unable to get speech dispatcher audio output');
				}.bind(this)
	});
};

ChangeLogAssistant.prototype.handleCommand = function(event)
{
    if (event.type == Mojo.Event.command) {
		switch (event.command) {
			case 'do-test':
				new Mojo.Service.Request('palm://org.webosinternals.speechd.service', {
						method: 'say',
						parameters: {
							text: $L("Let us do a test")
						}
					});
			break;
			case 'do-config':
				this.controller.showAlertDialog({
  					onChoose: function(value) {
  						if (value.substring(0, 6) == "espeak") {
    						this.setOutput(value);	
						}
      				}.bind(this),
      				title: $L("Set output"),
      				message: $L("Select the default audio output?"),
      				choices:[
          				{label:$L("Telefone (voip)"), value:"espeak-voip"},
          				{label:$L("Ringtone"), value:"espeak-ringtones"},
          				{label:$L("Feedback"), value:"espeak-feedback"},
          				{label:$L("Alarm"), value:"espeak-alarm"},
          				{label:$L("Media"), value:"espeak-media"},
          				{label:$L("Navigation"), value:"espeak-navigation"},
          				{label:$L("Cancle"), value:"cancel", type:'negative'}
      				]
  				}); 
			break;
		}
    }
};

ChangeLogAssistant.prototype.setHtml = function(output)
{
	var html = '';
	if (Mojo.appInfo.message)
	{
    	html += '<div class="text">' + Mojo.appInfo.message + '</div>';
	}
	
	if (output.length > 0)
	{
    	html += '<div class="text">Default audio output is set to: ' + output.replace(/espeak-/g," ").replace(/voip/g,"Telefone (voip)") + ' </div>';
	}
	
	
	if (Mojo.appInfo.changeLog.length > 0)
	{
	    for (var v = 0; v < Mojo.appInfo.changeLog.length; v++)
		{
		    html += Mojo.View.render({object: {title: 'v' + Mojo.appInfo.changeLog[v].version}, template: 'change-log/row'});
		    html += '<ul class="changelog">';
		    for (var l = 0; l < Mojo.appInfo.changeLog[v].log.length; l++)
			{
			    html += '<li>' + Mojo.appInfo.changeLog[v].log[l] + '</li>';
			}
		    html += '</ul>';
		}
	}
    this.dataContainer.innerHTML = html;

}

ChangeLogAssistant.prototype.setOutput = function(audio)
{
	this.request = new Mojo.Service.Request('palm://org.webosinternals.speechd.service', {
			method: 'setOutput',
			parameters: {
				"output":audio
			},
		onSuccess:	function(result) {
					this.setHtml(audio);
					delete this.request;
				}.bind(this),
		onFailure:	function(err) {
					delete this.request;
					Mojo.Log.error('Unable to set speech dispatcher audio output');
					Mojo.Controller.errorDialog('Unable to set speech dispatcher audio output');
				}.bind(this)
	});
	
}
// Local Variables:
// tab-width: 4
// End:
