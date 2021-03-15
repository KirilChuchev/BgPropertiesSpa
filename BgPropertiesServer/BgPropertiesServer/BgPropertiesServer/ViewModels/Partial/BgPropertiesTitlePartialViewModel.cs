namespace BgPropertiesServer.ViewModels.Partial
{
    public class BgPropertiesTitlePartialViewModel
    {
        public string Text { get; set; }

        public string SearchSetName { get; set; }

        public int BgPropertiesCount { get; set; }

		//public string WordSearchSet { get; set; } = "SearchSet";
		//public string PhraseFreeSearch { get; set; } = "Free Search";

		public string ForWhat { get; set; }

		public string Space { get; set; } = " ";

        public string SpaceDashSpace { get; set; } = " - ";
    }
}
