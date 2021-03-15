using BgPropertiesServer.ViewModels.Partial;

namespace BgPropertiesServer.ViewModels.BgProperty
{
    public class OneBgPropertyViewModel
    {
        public BgPropertyDetailsViewModel BgProperty { get; set; }

        public BgPropertiesTitlePartialViewModel Partial { get; set; }
    }
}
