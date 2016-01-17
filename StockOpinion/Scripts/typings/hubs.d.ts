
// Get signalr.d.ts.ts from https://github.com/borisyankov/DefinitelyTyped (or delete the reference)
/// <reference path="signalr/signalr.d.ts" />
/// <reference path="jquery/jquery.d.ts" />

////////////////////
// available hubs //
////////////////////
//#region available hubs

interface SignalR {
    chatHub : ChatHub;
}
//#endregion available hubs

///////////////////////
// Service Contracts //
///////////////////////
//#region service contracts
//#region ChatHub hub

interface ChatHub {
    server : ChatHubServer;
    client : ChatHubClient;
}

interface ChatHubServer {
    send(): JQueryPromise<void>;
    sendMessage(name:string, message:string, avatar:string): JQueryPromise<void>;
}

interface ChatHubClient
{
    addNewMessageToPage: (fields: FieldsList, clientCount: number) => void;
    addNewMessage: (name:string, message: string, avatar:string) => void;
}

////////////////////
// Data Contracts //
////////////////////
//#region data contracts
interface Fields {
    change: string;
    chg_percent: string;
    price: string;
    symbol: string;
}

interface FieldsList {
    fieldsList: Fields[];
}
//#endregion data contracts

