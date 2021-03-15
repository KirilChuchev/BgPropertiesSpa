namespace BgPropertiesServer.ViewModels.SearchSet
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public class SearchSetInputViewModel : BaseInputViewModel, IValidatableObject
    {
        public string SearchSetName { get; set; }

        public string Description { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (string.IsNullOrEmpty(this.SearchSetName))
            {
                yield return new ValidationResult("Полето SearchSet не трябва да е празно.");
            }

            if (!string.IsNullOrEmpty(this.SearchSetName) && this.SearchSetName.Length > 20)
            {
                yield return new ValidationResult("Името на Вашия SearchSet не трябва да превишава 20 знака.");
            }

            if (!string.IsNullOrEmpty(this.Description) && this.Description.Length > 200)
            {
                yield return new ValidationResult("Описанието не може да превишава 200 знака.");
            }

            if (!string.IsNullOrEmpty(this.PriceFrom) && (!int.TryParse(this.PriceFrom, out int priceFrom) || priceFrom < 0))
            {
                yield return new ValidationResult("Полето \"Цена на имота: -> от\" трябва да съдържа цели, неотрицателни числа.");
            }

            if (!string.IsNullOrEmpty(this.PriceTo) && (!int.TryParse(this.PriceTo, out int priceTo) || priceTo < 0))
            {
                yield return new ValidationResult("Полето \"Цена на имота: -> до\" трябва да съдържа цели, неотрицателни числа.");
            }

            if (!string.IsNullOrEmpty(this.PricePerSqrMFrom) && (!double.TryParse(this.PricePerSqrMFrom, out double pricePerSqrMFrom) || pricePerSqrMFrom < 0))
            {
                yield return new ValidationResult("Полето \"Цена на кв.м площ: -> от\" трябва да съдържа неотрицателни числа.");
            }

            if (!string.IsNullOrEmpty(this.PricePerSqrMTo) && (!double.TryParse(this.PricePerSqrMTo, out double pricePerSqrMTo) || pricePerSqrMTo < 0))
            {
                yield return new ValidationResult("Полето \"Цена на кв.м площ: -> до\" трябва да съдържа неотрицателни числа.");
            }

            if (!string.IsNullOrEmpty(this.SizeFrom) && (!int.TryParse(this.SizeFrom, out int sizeFrom) || sizeFrom < 0))
            {
                yield return new ValidationResult("Полето \"Квадратура: -> от\" трябва да съдържа цели, неотрицателни числа.");
            }

            if (!string.IsNullOrEmpty(this.SizeTo) && (!double.TryParse(this.SizeTo, out double sizeTo) || sizeTo < 0))
            {
                yield return new ValidationResult("Полето \"Квадратура: -> до\" трябва да съдържа цели, неотрицателни числа.");
            }

            if (string.IsNullOrEmpty(this.CityRegion))
            {
                yield return new ValidationResult("Трябва да посочите местоположение.");
            }

            if (!string.IsNullOrEmpty(this.FloorFrom) && (!int.TryParse(this.FloorFrom, out int floorFrom) || floorFrom < 0))
            {
                yield return new ValidationResult("Полето \"Етаж: -> от\" трябва да съдържа стойности от 1 до 60.");
            }

            if (!string.IsNullOrEmpty(this.FloorTo) && (!int.TryParse(this.FloorTo, out int floorTo) || floorTo < 0))
            {
                yield return new ValidationResult("Полето \"Етаж: -> до\" трябва да съдържа стойности от 1 до 60.");
            }

            var firstCategoryChecks =
                        !string.IsNullOrEmpty(this.OneRoomPropType)
                        || !string.IsNullOrEmpty(this.TwoRoomsPropType)
                        || !string.IsNullOrEmpty(this.ThreeRoomsPropType)
                        || !string.IsNullOrEmpty(this.FourRoomsPropType)
                        || !string.IsNullOrEmpty(this.MultiRoomsPropType)
                        || !string.IsNullOrEmpty(this.MaisonettePropType)
                        || !string.IsNullOrEmpty(this.StudioPropType);

            var secondCategoryChecks =
                        !string.IsNullOrEmpty(this.OfficePropType)
                        || !string.IsNullOrEmpty(this.StorePropType)
                        || !string.IsNullOrEmpty(this.RestaurantPropType)
                        || !string.IsNullOrEmpty(this.WarehousePropType)
                        || !string.IsNullOrEmpty(this.HotelPropType)
                        || !string.IsNullOrEmpty(this.IndustrialPropType);

            var thirdCategoryChecks = !string.IsNullOrEmpty(this.BusinessPropType);

            var fourthCategoryChecks =
                        !string.IsNullOrEmpty(this.HouseFloorPropType)
                        || !string.IsNullOrEmpty(this.HousePropType)
                        || !string.IsNullOrEmpty(this.VillagePropType);

            var fifthCategoryChecks = !string.IsNullOrEmpty(this.PlotPropType);

            var sixthCategoryChecks = !string.IsNullOrEmpty(this.GaragePropType);

            var seventhCategoryChecks = !string.IsNullOrEmpty(this.LandPropType);

            if ((firstCategoryChecks == false)
                && (secondCategoryChecks == false)
                && (thirdCategoryChecks == false)
                && (fourthCategoryChecks == false)
                && (fifthCategoryChecks == false)
                && (sixthCategoryChecks == false)
                && (seventhCategoryChecks == false))
            {
                yield return new ValidationResult("Изберете поне едно поле от посочените групи категории.");
            }

            if ((firstCategoryChecks && secondCategoryChecks)
                || (firstCategoryChecks && thirdCategoryChecks)
                || (firstCategoryChecks && fourthCategoryChecks)
                || (firstCategoryChecks && fifthCategoryChecks)
                || (firstCategoryChecks && sixthCategoryChecks)
                || (firstCategoryChecks && seventhCategoryChecks))
            {
                yield return new ValidationResult("Не може да изберете едновремено полета от различни групи категории.");
            }
            else if ((secondCategoryChecks && thirdCategoryChecks)
                || (secondCategoryChecks && fourthCategoryChecks)
                || (secondCategoryChecks && fifthCategoryChecks)
                || (secondCategoryChecks && sixthCategoryChecks)
                || (secondCategoryChecks && seventhCategoryChecks))
            {
                yield return new ValidationResult("Не може да изберете едновремено полета от различни групи категории.");
            }
            else if ((thirdCategoryChecks && fourthCategoryChecks)
                || (thirdCategoryChecks && fifthCategoryChecks)
                || (thirdCategoryChecks && sixthCategoryChecks)
                || (thirdCategoryChecks && seventhCategoryChecks))
            {
                yield return new ValidationResult("Не може да изберете едновремено полета от различни групи категории.");
            }
            else if ((fourthCategoryChecks && fifthCategoryChecks)
                || (fourthCategoryChecks && sixthCategoryChecks)
                || (fourthCategoryChecks && seventhCategoryChecks))
            {
                yield return new ValidationResult("Не може да изберете едновремено полета от различни групи категории.");
            }
            else if ((fifthCategoryChecks && sixthCategoryChecks)
                || (fifthCategoryChecks && seventhCategoryChecks))
            {
                yield return new ValidationResult("Не може да изберете едновремено полета от различни групи категории.");
            }
            else if (sixthCategoryChecks && seventhCategoryChecks)
            {
                yield return new ValidationResult("Не може да изберете едновремено полета от различни групи категории.");
            }
        }
    }
}
