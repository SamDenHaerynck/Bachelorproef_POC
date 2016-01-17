$(() => {
    // Reference the auto-generated proxy for the hub.
    var chat = $.connection.chatHub;

    $(document).ready(() => {
        $("#launch").click();
        setTimeout(() => { $("#start").click(); }, 500);
        $("#message").focus();
    });

    chat.client.addNewMessageToPage = (fieldsList) => {
        var labels = new Array();
        var dataPrice = new Array();
        var dataChange = new Array();

        $.each(fieldsList.fieldsList, function() {
            labels.push(this.symbol);
            dataPrice.push(this.price);
            dataChange.push(this.chg_percent);
        });

        var data = {
            labels: labels,
            datasets: [
                {
                    label: "My First dataset",
                    fillColor: "rgba(220,220,220,0.5)",
                    strokeColor: "rgba(220,220,220,0.8)",
                    highlightFill: "rgba(220,220,220,0.75)",
                    highlightStroke: "rgba(220,220,220,1)",
                    data: dataPrice
                }
            ]
        };

        var data2 = {
            labels: labels,
            datasets: [
                {
                    label: "My First dataset",
                    fillColor: "rgba(220,220,220,0.5)",
                    strokeColor: "rgba(220,220,220,0.8)",
                    highlightFill: "rgba(220,220,220,0.75)",
                    highlightStroke: "rgba(220,220,220,1)",
                    data: dataChange
                }
            ]
        };
        showGraph(data, document.getElementById("myChart"));
        showGraph(data2, document.getElementById("myBarChart"));
    };

    chat.client.addNewMessage = (name, message, avatar) => {
        $("#discussion").prepend(`<li class="collection-item avatar" style = "overflow: auto"><img src = "images/${avatar !== "" ? htmlEncode(avatar) : "default.png"}" alt="" class="circle"><span class="title"> ${ htmlEncode(name)} </span><p>${htmlEncode(message)}</p></li>`);
    };

    // Start the connection.
    $.connection.hub.start().done(() => {
        $("#start").click(() => {
            $("#discussion").html("");
            chat.server.send();
        });
        $("#sendmessage").click(() => {
            chat.server.sendMessage($("#username").val(), $("#message").val(), $("#avatar").val());
            $("#message").val("").focus();
        });
    });

    function showGraph(data, chart) {
        const canvas = chart;
        const ctx = canvas.getContext("2d");
        const options = {
            scaleBeginAtZero: false,
            animation: false
        };
        const barChart = new Chart(ctx).Bar(data, options);
    };
});

function htmlEncode(value) {
    const encodedValue = $("<div />").text(value).html();
    return encodedValue;
}

function setAvatar(avatarName) {
    $("#avatar").val(avatarName);
}