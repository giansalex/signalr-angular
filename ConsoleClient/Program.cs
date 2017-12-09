using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR.Client;
using Microsoft.AspNetCore.Sockets;

namespace ConsoleClient
{
    class Program
    {
        private static HubConnection _connection;
        static void Main(string[] args)
        {
            StartConnectionAsync().Wait();
            _connection.On<string>("Send", (message) =>
            {
                Console.WriteLine($"said: {message}");
            });

            Console.ReadLine();
            DisposeAsync().Wait();
        }

        public static async Task StartConnectionAsync()
        {
            _connection = new HubConnectionBuilder()
                 .WithUrl("http://localhost:64988/loopy")
                 .WithConsoleLogger()
                 .Build();


            await _connection.StartAsync();
        }

        public static async Task DisposeAsync()
        {
            await _connection.DisposeAsync();
        }
    }
}
