(function() {
    $.bind('command', function(event) {
        var sender = event.getSender(),
            command = event.getCommand(),
            args = event.getArgs();

        if (command.equalsIgnoreCase('btag')) {
            // Usage
            // !btag zombiebrainz#1952 [adds btag to user]
            // !btag zombiebrainz_twitch [displays zombiebrainz_twitch's btag]

            if (args[0] === undefined) {
              $.say("!btag [twitch_user | yourtag#123] : Provide a user to look up from chat or your own tag to share with others.");
            } else {
              var arg = args[0].indexOf("#");
              if (arg === -1) { // not a battletag - it's a user
                // Strip off spaces and @
                var target = new String(args[0]);
                target = target.replace(/^\s+|\s+$/gm,'');

                if (target.charAt(0) === '@') {
                  target = target.substr(1);
                }
                var value = $.getIniDbString('battletag', target, 'Not provided');
                $.say("Battletag for " + target + ": " + value);
              } else { // it is a battletag - set it
                $.setIniDbString('battletag', sender, args[0]);
                $.say("Registered battletag for " + sender + " as: " + args[0]);
              }
            }
            return;
        }
    });

    $.bind('initReady', function() {
        $.registerChatCommand('./custom/btag.js', 'btag', 7);
    });
})();
