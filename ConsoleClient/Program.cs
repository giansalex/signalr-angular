using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR.Client;

namespace ConsoleClient
{
    class Program
    {
        private static HubConnection _connection;
        static async Task  Main(string[] args)
        {
            await StartConnectionAsync();
            Console.WriteLine("Listenning messages... (Press enter to exit)");
            _connection.On<string>("Send", (message) =>
            {
                Console.WriteLine($"said: {message}");
            });
            await _connection.SendCoreAsync("Send", new [] {"Hey from Console!"});

            Console.ReadLine();
            await DisposeAsync();
        }

        public static async Task StartConnectionAsync()
        {
            _connection = new HubConnectionBuilder()
                 .WithUrl("http://localhost:64988/loopy")
                 .Build();


            await _connection.StartAsync();
        }

        public static async Task DisposeAsync()
        {
            await _connection.DisposeAsync();
        }
    }
}
