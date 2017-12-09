﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace RealTimeApp.Hubs
{
    public class LoopyHub : Hub
    {
        public Task Send(string data)
        {
            return Clients.All.InvokeAsync("Send", data);
        }
    }
}
