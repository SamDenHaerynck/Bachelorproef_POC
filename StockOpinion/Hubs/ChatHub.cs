using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Timers;
using Microsoft.AspNet.SignalR;
using Newtonsoft.Json;

namespace SignalR.Hubs
{
    /// <summary>
    /// Hub & hub methods will generate an interface client site via Hubs.tt
    /// </summary>
    public class ChatHub : Hub<IChatHubClient>
    {
        public void Send()
        {
                System.Timers.Timer aTimer = new System.Timers.Timer();
                aTimer.Elapsed += SendToClient;
                aTimer.Interval = 5000;
                aTimer.Enabled = true;
        }

        private void SendToClient(object source, ElapsedEventArgs eventArgs)
        {
            using (var w = new WebClient())
            {
                var jsonData = string.Empty;
                const string url2 = "http://finance.yahoo.com/webservice/v1/symbols/YHOO,AAPL,GOOG,MSFT,AMZN,FB,INTC,NFLX,PAYX,TSLA,BEKB.BR,UMI.BR/quote?format=json&view=detail";

                try
                {
                    jsonData = w.DownloadString(url2);
                }
                catch (Exception e)
                {

                }

                var data2 = JsonConvert.DeserializeObject<RootObject>(jsonData);
                FieldsList fieldsList = new FieldsList();
                List<Fields> list = new List<Fields>();
                foreach (var stock in data2.list.resources)
                {
                    list.Add(stock.resource.fields);
                }
                fieldsList.fieldsList = list.ToArray();
                Clients.All.AddNewMessageToPage(fieldsList, UserHandler.ConnectedIds.Count);
            }
        }

        public void SendMessage(string name, string message, string avatar)
        {
            Clients.All.AddNewMessage(name,message,avatar);
        }

        public override Task OnConnected()
        {
            UserHandler.ConnectedIds.Add(Context.ConnectionId);
            return base.OnConnected();
        }

        public override Task OnDisconnected()
        {
            UserHandler.ConnectedIds.Remove(Context.ConnectionId);
            return base.OnDisconnected();
        }
    }

    public static class UserHandler
    {
        public static HashSet<string> ConnectedIds = new HashSet<string>(); 
    }


    /// <summary>
    /// Will generate an interface client-side via Hubs.tt
    /// </summary>
    public interface IChatHubClient
    {
        void AddNewMessageToPage(FieldsList fields, int clientCount);
        void AddNewMessage(string name, string message,string avatar);
    }


    public class Fields
    {
        public string change { get; set; }
        public string chg_percent { get; set; }
        public string price { get; set; }
        public string symbol { get; set; }
    }

    public class Resource2
    {
        public string classname { get; set; }
        public Fields fields { get; set; }
    }

    public class Resource
    {
        public Resource2 resource { get; set; }
    }

    public class List
    {
        public List<Resource> resources { get; set; }
    }

    public class RootObject
    {
        public List list { get; set; }
    }

    public class FieldsList
    {
        public Fields[] fieldsList { get; set; }
    }

}