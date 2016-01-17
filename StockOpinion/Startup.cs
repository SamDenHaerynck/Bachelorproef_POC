using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(StockOpinion.Startup))]
namespace StockOpinion
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
        }
    }
}
