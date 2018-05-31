module.exports = (convo, converterbot) => {
    convo.ask("Bạn muốn đổi từ định dạng file nào?", (payload, convo) => {
        convo.set("from", payload.message.text);
        convo.ask("Và sang định dạng ...? (chưa hỗ trợ đổi từ pdf sang doc, xlsx,...", (payload, convo) => {
            convo.set("to", payload.message.text);
            convo.ask("Ok. Bạn gửi file lên cho mình nhé ;)", (payload, convo) => {
                if (payload.message.attachments && payload.message.attachments[0].type) {
                    let answer = "Đã chuyển: \n";
                    for (let i = 0; i < payload.message.attachments.length; i++) {
                        (async () => {
                            await request.get({
                                url: 'https://v2.convertapi.com' + convo.get('from') + '/to/' + convo.get('to') + '?Secret='+ process.env.CONVERT_API_KEY +'&File=' + payload.message.attachments[i].payload.url + '&StoreFile=true',
                                headers: {
                                    'Accept': 'application/json'
                                }
                            }, (err, response, body) => {
                                answer += body.Files[0].Url + "\n";
                            });
                            if (i === payload.message.attachments.length - 1) convo.say(answer).then(() => converterbot(convo));
                        })();
                    }
                } else convo.say(":( file đâu file đâu").then(() => converterbot(convo));
            });
        });
    });
};