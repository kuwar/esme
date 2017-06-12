var smpp = require('smpp');

var session = smpp.connect('smpp://example.com:2775');

session.bind_transceiver({
	system_id: 'YOUR_SYSTEM_ID',
	password: 'YOUR_PASSWORD'
}, function(pdu) {
	if (pdu.command_status == 0) {
		// Successfully bound
		session.submit_sm({
			destination_addr: 'DESTINATION NUMBER',
			short_message: 'Hello!'
		}, function(pdu) {
			if (pdu.command_status == 0) {
				// Message successfully sent
				console.log(pdu.message_id);
			}
		});
	}
});
