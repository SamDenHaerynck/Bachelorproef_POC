/// <reference path="scripts/typings/jquery/jquery.d.ts" />
/// <reference path="scripts/typings/signalr/signalr.d.ts" />
/// <reference path="scripts/typings/chartjs/chart.d.ts" />
/// <reference path="scripts/typings/hubs.d.ts" />
$(() => {
    // Reference the auto-generated proxy for the hub.
    var chat = $.connection.chatHub;

    $(document).ready(() => {
        $("#launch").click();
        setTimeout(() => { $("#start").click(); }, 500);
        $("#message").focus();
    });

    chat.client.addNewMessageToPage = (fieldsList: FieldsList, clientCount: number) => {
        var labels: string[] = new Array();
        var dataPrice: number[] = new Array();
        var dataChange: number[] = new Array();

        $.each(fieldsList.fieldsList, function() {
            labels.push(this.symbol);
            dataPrice.push(<number>this.price);
            dataChange.push(<number>this.chg_percent);
        });

        var data: LinearChartData = {
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

        var data2: LinearChartData = {
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
        $('#clientCount').html(clientCount.toString());
    };

    chat.client.addNewMessage = (name: string, message: string, avatar: string) => {
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

    function showGraph(data: LinearChartData, chart: HTMLElement) {
        var canvas = <HTMLCanvasElement> chart;
        var ctx = canvas.getContext("2d");
        var options: BarChartOptions = {
            scaleBeginAtZero: false,
            animation: false
        };
        var barChart = new Chart(ctx).Bar(data, options);
    };


});

function htmlEncode(value: string) {
    var encodedValue = $("<div />").text(value).html();
    return encodedValue;
}

function setAvatar(avatarName: string) {
    $("#avatar").val(avatarName);
}