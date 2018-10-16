using OpenQA.Selenium;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium.Interactions;
using OpenQA.Selenium.Support.Extensions;
using OpenQA.Selenium.Support.UI;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace RentraxAutomation
{
    public class OrderFramework
    {
        public static void GoToRent()
        {
            //click on Rent Order
            Driver.Wait(2, By.CssSelector("#printable > div.tiles.margin-bototm-30.padding-left-tiles > a:nth-child(2) > div"));
            var rentOrder = Driver.Instance.FindElement(By.CssSelector("#printable > div.tiles.margin-bototm-30.padding-left-tiles > a:nth-child(2) > div"));
            rentOrder.Click();
        }

        public static void MultiRenter_MultiProduct()
        {
            SingleRenter_MultiProduct();

            var AddRenter = Driver.Instance.FindElement(By.XPath("//*[@id='Renter_04']/button"));
            AddRenter.Click();

            var SelectCategory = Driver.Instance.FindElement(By.XPath("//*[@id='renter_section_id_2']/div/div/div[2]/button[1]"));
            SelectCategory.Click();
            var selectItem = Driver.Instance.FindElement(By.XPath("//*[@id='renter_section_id_2']/div/div[2]/div[1]/div/div[1]/div[2]/select"));
            selectItem.Click();
            var selectItemValue = Driver.Instance.FindElement(By.XPath("//*[@id='renter_section_id_2']/div/div[2]/div[1]/div/div[1]/div[2]/select/option[2]"));
            selectItemValue.Click();

            var SelectCategory2 = Driver.Instance.FindElement(By.XPath("//*[@id='renter_section_id_2']/div/div[2]/div[3]/button[2]"));
            SelectCategory2.Click();
            var selectItem2 = Driver.Instance.FindElement(By.XPath("//*[@id='renter_section_id_2']/div/div[2]/div[2]/div/div[1]/div[2]/select"));
            selectItem2.Click();
            var selectItem2Value = Driver.Instance.FindElement(By.XPath("//*[@id='renter_section_id_2']/div/div[2]/div[2]/div/div[1]/div[2]/select/option[2]"));
            selectItem2Value.Click();

            var MultiRenterName = Driver.Instance.FindElement(By.XPath("//*[@id='Renter_03']/div[1]/div[1]/div/input"));
            MultiRenterName.SendKeys("Second Renter");
        }

        public static void MultiRenter_SingleProduct()
        {
            SingleRenter_SingleProduct();

            var AddRenter = Driver.Instance.FindElement(By.XPath("//*[@id='Renter_04']/button"));
            AddRenter.Click();

            var SelectCategory = Driver.Instance.FindElement(By.XPath("//*[@id='renter_section_id_2']/div/div/div[2]/button[1]"));
            SelectCategory.Click();
            var selectItem = Driver.Instance.FindElement(By.XPath("//*[@id='renter_section_id_2']/div/div[2]/div[1]/div/div[1]/div[2]/select"));
            selectItem.Click();
            var selectItemValue = Driver.Instance.FindElement(By.XPath("//*[@id='renter_section_id_2']/div/div[2]/div[1]/div/div[1]/div[2]/select/option[2]"));
            selectItemValue.Click();

            var MultiRenterName = Driver.Instance.FindElement(By.XPath("//*[@id='printable']/div/div/div/div/section/div[3]/div[2]/div[1]/div[1]/div/input"));
            MultiRenterName.SendKeys("Second Renter");
        }

        public static void First_Renter_Attributes_1()
        {
            Driver.Wait(2, By.XPath("//*[@id='renter_section_id_1']/div/div[2]/div[1]/div/div[4]/div[2]/div[1]/div/div/select"));
            var selectAttribute1 = Driver.Instance.FindElement(By.XPath("//*[@id='renter_section_id_1']/div/div[2]/div[1]/div/div[4]/div[2]/div[1]/div/div/select"));
            selectAttribute1.Click();
            var selectAttribute1_value = Driver.Instance.FindElement(By.XPath("//*[@id='renter_section_id_1']/div/div[2]/div[1]/div/div[4]/div[2]/div[1]/div/div/select/option[2]"));
            selectAttribute1_value.Click();

            var selectAttribute2 = Driver.Instance.FindElement(By.XPath("//*[@id='renter_section_id_1']/div/div[2]/div[1]/div/div[4]/div[2]/div[2]/div/div/select"));
            selectAttribute2.Click();
            var selectAttribute2_value = Driver.Instance.FindElement(By.XPath("//*[@id='renter_section_id_1']/div/div[2]/div[1]/div/div[4]/div[2]/div[2]/div/div/select/option[3]"));
            selectAttribute2_value.Click();

            var selectAttribute3 = Driver.Instance.FindElement(By.XPath("//*[@id='renter_section_id_1']/div/div[2]/div[1]/div/div[4]/div[2]/div[3]/div/div/select"));
            selectAttribute3.Click();
            var selectAttribute3_value = Driver.Instance.FindElement(By.XPath("//*[@id='renter_section_id_1']/div/div[2]/div[1]/div/div[4]/div[2]/div[3]/div/div/select/option[3]"));
            selectAttribute3_value.Click();

            var selectAttribute4 = Driver.Instance.FindElement(By.XPath("//*[@id='renter_section_id_1']/div/div[2]/div[1]/div/div[4]/div[2]/div[4]/div/div/select"));
            selectAttribute4.Click();
            var selectAttribute4_value = Driver.Instance.FindElement(By.XPath("//*[@id='renter_section_id_1']/div/div[2]/div[1]/div/div[4]/div[2]/div[4]/div/div/select/option[3]"));
            selectAttribute4_value.Click();

            var selectAttribute5 = Driver.Instance.FindElement(By.XPath("//*[@id='renter_section_id_1']/div/div[2]/div[1]/div/div[4]/div[2]/div[5]/div/div/select"));
            selectAttribute5.Click();
            var selectAttribute5_value = Driver.Instance.FindElement(By.XPath("//*[@id='renter_section_id_1']/div/div[2]/div[1]/div/div[4]/div[2]/div[5]/div/div/select/option[3]"));
            selectAttribute5_value.Click();
        }

        public static void First_Renter_Attributes_2()
        {
            Driver.Wait(2, By.XPath("//*[@id='renter_section_id_1']/div/div[2]/div[2]/div/div[4]/div[2]/div[1]/div/div/input[4]"));

            var selectAttribute1 = Driver.Instance.FindElement(By.XPath("//*[@id='renter_section_id_1']/div/div[2]/div[2]/div/div[4]/div[2]/div[1]/div/div/input[4]"));
            selectAttribute1.SendKeys("10");

            var selectAttribute2 = Driver.Instance.FindElement(By.XPath("//*[@id='renter_section_id_1']/div/div[2]/div[2]/div/div[4]/div[2]/div[2]/div/div/input[4]"));
            selectAttribute2.SendKeys("12");

            var selectAttribute3 = Driver.Instance.FindElement(By.XPath("//*[@id='renter_section_id_1']/div/div[2]/div[2]/div/div[4]/div[2]/div[4]/div/div/input[4]"));
            selectAttribute3.SendKeys("10");

            var selectAttribute5 = Driver.Instance.FindElement(By.XPath("//*[@id='renter_section_id_1']/div/div[2]/div[2]/div/div[4]/div[2]/div[3]/div/div/select"));
            selectAttribute5.Click();

            var selectAttribute5_value = Driver.Instance.FindElement(By.XPath("//*[@id='renter_section_id_1']/div/div[2]/div[2]/div/div[4]/div[2]/div[3]/div/div/select/option[3]"));
            selectAttribute5_value.Click();
        }

        public static void Second_Renter_Attributes_1()
        {
            Driver.Wait(2, By.XPath("//*[@id='renter_section_id_2']/div/div[2]/div[1]/div/div[4]/div[2]/div[1]/div/div/select"));
            var selectAttribute1 = Driver.Instance.FindElement(By.XPath("//*[@id='renter_section_id_2']/div/div[2]/div[1]/div/div[4]/div[2]/div[1]/div/div/select"));
            selectAttribute1.Click();
            var selectAttribute1_value = Driver.Instance.FindElement(By.XPath("//*[@id='renter_section_id_2']/div/div[2]/div[1]/div/div[4]/div[2]/div[1]/div/div/select/option[2]"));
            selectAttribute1_value.Click();

            var selectAttribute2 = Driver.Instance.FindElement(By.XPath("//*[@id='renter_section_id_2']/div/div[2]/div[1]/div/div[4]/div[2]/div[2]/div/div/select"));
            selectAttribute2.Click();
            var selectAttribute2_value = Driver.Instance.FindElement(By.XPath("//*[@id='renter_section_id_2']/div/div[2]/div[1]/div/div[4]/div[2]/div[2]/div/div/select/option[3]"));
            selectAttribute2_value.Click();

            var selectAttribute3 = Driver.Instance.FindElement(By.XPath("//*[@id='renter_section_id_2']/div/div[2]/div[1]/div/div[4]/div[2]/div[3]/div/div/select"));
            selectAttribute3.Click();
            var selectAttribute3_value = Driver.Instance.FindElement(By.XPath("//*[@id='renter_section_id_2']/div/div[2]/div[1]/div/div[4]/div[2]/div[3]/div/div/select/option[3]"));
            selectAttribute3_value.Click();

            var selectAttribute4 = Driver.Instance.FindElement(By.XPath("//*[@id='renter_section_id_2']/div/div[2]/div[1]/div/div[4]/div[2]/div[4]/div/div/select"));
            selectAttribute4.Click();
            var selectAttribute4_value = Driver.Instance.FindElement(By.XPath("//*[@id='renter_section_id_2']/div/div[2]/div[1]/div/div[4]/div[2]/div[4]/div/div/select/option[3]"));
            selectAttribute4_value.Click();

            var selectAttribute5 = Driver.Instance.FindElement(By.XPath("//*[@id='renter_section_id_2']/div/div[2]/div[1]/div/div[4]/div[2]/div[5]/div/div/select"));
            selectAttribute5.Click();
            var selectAttribute5_value = Driver.Instance.FindElement(By.XPath("//*[@id='renter_section_id_2']/div/div[2]/div[1]/div/div[4]/div[2]/div[5]/div/div/select/option[3]"));
            selectAttribute5_value.Click();
        }

        public static void Second_Renter_Attributes_2()
        {
            Driver.Wait(2, By.XPath("//*[@id='renter_section_id_2']/div/div[2]/div[2]/div/div[4]/div[2]/div[1]/div/div/input[4]"));

            var selectAttribute1 = Driver.Instance.FindElement(By.XPath("//*[@id='renter_section_id_2']/div/div[2]/div[2]/div/div[4]/div[2]/div[1]/div/div/input[4]"));
            selectAttribute1.SendKeys("10");

            var selectAttribute2 = Driver.Instance.FindElement(By.XPath("//*[@id='renter_section_id_2']/div/div[2]/div[2]/div/div[4]/div[2]/div[2]/div/div/input[4]"));
            selectAttribute2.SendKeys("12");

            var selectAttribute3 = Driver.Instance.FindElement(By.XPath("//*[@id='renter_section_id_2']/div/div[2]/div[2]/div/div[4]/div[2]/div[4]/div/div/input[4]"));
            selectAttribute3.SendKeys("10");

            var selectAttribute5 = Driver.Instance.FindElement(By.XPath("//*[@id='renter_section_id_2']/div/div[2]/div[2]/div/div[4]/div[2]/div[3]/div/div/select"));
            selectAttribute5.Click();
            var selectAttribute5_value = Driver.Instance.FindElement(By.XPath("//*[@id='renter_section_id_2']/div/div[2]/div[2]/div/div[4]/div[2]/div[3]/div/div/select/option[3]"));
            selectAttribute5_value.Click();
        }

        public static void TermAndCondition()
        {
            var ReservationTerms = Driver.Instance.FindElement(By.XPath("//*[@id='renters']/tbody/tr[1]/td[1]/div"));
            ReservationTerms.Click();
        }

        public static void TermAndCondition2()
        {
            var ReservationTerms = Driver.Instance.FindElement(By.XPath("//*[@id='renters']/tbody/tr[2]/td[1]/div"));
            ReservationTerms.Click();
        }

        public static void SignTerm()
        {
            Driver.Wait(2, By.XPath("//*[@id='renter_is_minor0']"));
            var signing_behalf = Driver.Instance.FindElement(By.XPath("//*[@id='renter_is_minor0']"));
            signing_behalf.Click();

            var canvasArea = Driver.Instance.FindElement(By.XPath("//*[@id='canvas0']"));
            canvasArea.Click();

            var canvas0 = Driver.Instance.FindElement(By.XPath("//*[@id='canvas0']"));
            Actions actionBuilder = new Actions(Driver.Instance);

            actionBuilder.Click(canvas0).Perform();
            actionBuilder.ClickAndHold(canvas0)
                .MoveByOffset(140, 10)
                .MoveByOffset(0, -45)
                .MoveByOffset(-30, 10)
                .MoveByOffset(-20, 2)
                .Release().Build().Perform();
            actionBuilder.ClickAndHold(canvas0)
                .MoveByOffset(-140, 5)
                .MoveByOffset(0, -45)
                .MoveByOffset(-30, 10)
                .MoveByOffset(-20, 2)
                .Release().Build().Perform();
            actionBuilder.ClickAndHold(canvas0)
                .MoveByOffset(130, 50)
                .MoveByOffset(0, -45)
                .MoveByOffset(-20, 20)
                .MoveByOffset(-25, 5)
                .Release().Build().Perform();
            actionBuilder.ClickAndHold(canvas0)
                .MoveByOffset(-120, -30)
                .MoveByOffset(0, -35)
                .MoveByOffset(21, -10)
                .MoveByOffset(20, -10)
                .Release().Build().Perform();
            var save_agree = Driver.Instance.FindElement(By.XPath("//*[@id='btn_agree0']"));
            save_agree.Click();
            Thread.Sleep(2000);
        }

        public static void SignTerm2()
        {
            Driver.Wait(2, By.XPath("//*[@id='renter_is_minor1']"));
            var signing_behalf = Driver.Instance.FindElement(By.XPath("//*[@id='renter_is_minor1']"));
            signing_behalf.Click();

            var canvasArea = Driver.Instance.FindElement(By.XPath("//*[@id='canvas1']"));
            canvasArea.Click();

            var canvas0 = Driver.Instance.FindElement(By.XPath("//*[@id='canvas1']"));
            Actions actionBuilder = new Actions(Driver.Instance);

            actionBuilder.Click(canvas0).Perform();
            actionBuilder.ClickAndHold(canvas0)
                .MoveByOffset(140, 10)
                .MoveByOffset(0, -45)
                .MoveByOffset(-30, 10)
                .MoveByOffset(-20, 2)
                .Release().Build().Perform();
            actionBuilder.ClickAndHold(canvas0)
                .MoveByOffset(-140, 5)
                .MoveByOffset(0, -45)
                .MoveByOffset(-30, 10)
                .MoveByOffset(-20, 2)
                .Release().Build().Perform();
            actionBuilder.ClickAndHold(canvas0)
                .MoveByOffset(130, 50)
                .MoveByOffset(0, -45)
                .MoveByOffset(-20, 20)
                .MoveByOffset(-25, 5)
                .Release().Build().Perform();
            actionBuilder.ClickAndHold(canvas0)
                .MoveByOffset(-120, -30)
                .MoveByOffset(0, -35)
                .MoveByOffset(21, -10)
                .MoveByOffset(20, -10)
                .Release().Build().Perform();
            var save_agree = Driver.Instance.FindElement(By.XPath("//*[@id='btn_agree1']"));
            save_agree.Click();
            Thread.Sleep(2000);
        }

        public static void NewOrder()
        {
            //click on New Order
            var newOrder = Driver.Instance.FindElement(By.CssSelector("#printable > div > div > div > div.portlet-title > div.tools > div > a"));
            newOrder.Click();
        }

        public static void Customer_Info()
        {
            //Fill the customer form
            Driver.Wait(2, By.XPath("//*[@id='email']"));
            var email = Driver.Instance.FindElement(By.CssSelector("#email"));
            email.SendKeys(LoginFramework.LoadData("Email"));
            var firstName = Driver.Instance.FindElement(By.CssSelector("#first_name"));
            firstName.SendKeys(LoginFramework.LoadData("Firstname"));
            var lastName = Driver.Instance.FindElement(By.CssSelector("#last_name"));
            lastName.SendKeys(LoginFramework.LoadData("Lastname"));
            var Phone = Driver.Instance.FindElement(By.CssSelector("#customer_phone"));
            Phone.SendKeys(LoginFramework.LoadData("Phone"));
            var Address = Driver.Instance.FindElement(By.CssSelector("#address_street"));
            Address.SendKeys(LoginFramework.LoadData("Address"));
            Driver.Wait(4, By.XPath("//*[@id='printable']/div/div/div/div/section/div[1]/div[1]/div/div[2]/div[1]"));
        }

        public static void SingleRenter_SingleProduct()
        {
            //Select the SingleBike
            Driver.Wait(2, By.XPath("//*[@id='printable']/div/div/div/div/section/div[3]/div[1]/div[2]/div/div/div[2]/button[1]"));
            var selectCategory = Driver.Instance.FindElement(By.XPath("//*[@id='printable']/div/div/div/div/section/div[3]/div[1]/div[2]/div/div/div[2]/button[1]"));
            selectCategory.Click();
            var selectItem = Driver.Instance.FindElement(By.XPath("//*[@id='printable']/div/div/div/div/section/div[3]/div[1]/div[2]/div/div[2]/div[1]/div/div[1]/div[2]/select"));
            selectItem.Click();
            var selectItemValue = Driver.Instance.FindElement(By.XPath("//*[@id='printable']/div/div/div/div/section/div[3]/div[1]/div[2]/div/div[2]/div[1]/div/div[1]/div[2]/select/option[2]"));
            selectItemValue.Click();
        }

        public static void SingleRenter_MultiProduct()
        {
            //Select the SingleBike
            Driver.Wait(2, By.XPath("//*[@id='printable']/div/div/div/div/section/div[3]/div[1]/div[2]/div/div/div[2]/button[1]"));
            var selectCategory = Driver.Instance.FindElement(By.XPath("//*[@id='printable']/div/div/div/div/section/div[3]/div[1]/div[2]/div/div/div[2]/button[1]"));
            selectCategory.Click();
            var selectItem = Driver.Instance.FindElement(By.XPath("//*[@id='printable']/div/div/div/div/section/div[3]/div[1]/div[2]/div/div[2]/div[1]/div/div[1]/div[2]/select"));
            selectItem.Click();
            var selectItemValue = Driver.Instance.FindElement(By.XPath("//*[@id='printable']/div/div/div/div/section/div[3]/div[1]/div[2]/div/div[2]/div[1]/div/div[1]/div[2]/select/option[2]"));
            selectItemValue.Click();

            Driver.Wait(2, By.XPath("//*[@id='renter_section_id_1']/div/div[2]/div[3]/button[2]"));
            var selectCategory2 = Driver.Instance.FindElement(By.XPath("//*[@id='renter_section_id_1']/div/div[2]/div[3]/button[2]"));
            selectCategory2.Click();
            var selectItem2 = Driver.Instance.FindElement(By.XPath("//*[@id='renter_section_id_1']/div/div[2]/div[2]/div/div[1]/div[2]/select"));
                                                                    
            selectItem2.Click();
            var selectItem2Value = Driver.Instance.FindElement(By.XPath("//*[@id='renter_section_id_1']/div/div[2]/div[2]/div/div[1]/div[2]/select/option[2]"));
            selectItem2Value.Click();
        }

        public static void Rental_Period()
        {
            //Check Rental Period 
            var Duration = Driver.Instance.FindElement(By.XPath("//*[@id='printable']/div/div/div/div/section/div[4]/div/div[2]/form/div/div/div/div[1]/div[3]/div/div/select"));
            Duration.Click();
            var SpecificDuration = Driver.Instance.FindElement(By.XPath("//*[@id='printable']/div/div/div/div/section/div[4]/div/div[2]/form/div/div/div/div[1]/div[3]/div/div/select/option[3]"));
            SpecificDuration.Click();
        }

        public static void RentType()
        {
            //click on Rent_Now
            Driver.Wait(5, By.XPath("//*[@id='printable']/div/div/div/div/section/div[1]/div[1]/div/div[2]/div[1]"));
            var newOrder = Driver.Instance.FindElement(By.XPath("//*[@id='printable']/div/div/div/div/section/div[1]/div[1]/div/div[2]/div[1]"));
            newOrder.Click();
        }

        public static void Credit_Card_Info()
        {
            var nameOnCard = Driver.Instance.FindElement(By.XPath("//*[@id='payment_form']/div[1]/input"));
            nameOnCard.SendKeys("Mehdi Badiezadegan");
            IWebElement detailFrame = Driver.Instance.FindElement(By.XPath("//*[@id='payment_form']/div/div/div/iframe"));
            Driver.Instance.SwitchTo().Frame(detailFrame);
            IWebElement insideElement = Driver.Instance.FindElement(By.XPath("//*[@id='root']/form"));
            insideElement.Click();
            var creadit_number = Driver.Instance.FindElement(By.XPath("//*[@id='root']/form/div/div[2]/span[1]/span[2]/label/input"));
            creadit_number.SendKeys("4242 4242 4242 4242");
            var date = Driver.Instance.FindElement(By.XPath("//*[@id='root']/form/div/div[2]/span[2]/span/label/input"));
            date.SendKeys("04 / 24");
            var cvc = Driver.Instance.FindElement(By.XPath("//*[@id='root']/form/div/div[2]/span[3]/span/label/input"));
            cvc.SendKeys("242");
            var zip = Driver.Instance.FindElement(By.XPath("//*[@id='root']/form/div/div[2]/span[4]/span/label/input"));
            zip.SendKeys("42424");
            Driver.Instance.SwitchTo().DefaultContent();
        }

        public static bool Pay()
        {
            Thread.Sleep(1000);
            var pay = Driver.Instance.FindElement(By.XPath("//*[@id='printable']/div/div/div/div/section/div[9]/input"));
            Thread.Sleep(3000);
            pay.Click();
            Driver.Wait(6, By.XPath("//*[@id='printable']/div/div/div/div[2]/div/div/a[2]/small"));
            return DashboardFramework.Check(By.XPath("//*[@id='printable']/div/div/div/div[2]/div/div/a[2]/small"), "DELIVERED ORDERS");  
        }

        public static bool Validate()
        {
            Thread.Sleep(1000);
            var Validate = Driver.Instance.FindElement(By.XPath("//*[@id='Renter_12']"));
            Thread.Sleep(3000);
            Validate.Click();
            Driver.Wait(6, By.XPath("//*[@id='printable']/div/div/div/div[2]/div/div/a[2]/small"));
            return DashboardFramework.Check(By.XPath("//*[@id='printable']/div/div/div/div[2]/div/div/a[2]/small"), "DELIVERED ORDERS");
        }

        public static void SkipPaymentAndSubmit()
        {
            var Submit = Driver.Instance.FindElement(By.XPath("//*[@id='Renter_10']/div/button"));
            Submit.Click();
        }

        public static void Check_Availability()
        {
            //Check Availability 
            var availability = Driver.Instance.FindElement(By.XPath("//*[@id='Renter_13']/button"));
            availability.Click();
        }

        public static void Would_Like_To_Purchase()
        {
            var Purchased_Item_category = Driver.Instance.FindElement(By.XPath("//*[@id='printable']/div/div/div/div/section/div[6]/div/div[2]/div[2]/button[1]"));
            Purchased_Item_category.Click();
            var Purchased_Item_Dropdown = Driver.Instance.FindElement(By.XPath("//*[@id='printable']/div/div/div/div/section/div[6]/div/div[2]/div[1]/div/div/div[1]/select"));
            Purchased_Item_Dropdown.Click();
            var Purchased_Item = Driver.Instance.FindElement(By.XPath("//*[@id='printable']/div/div/div/div/section/div[6]/div/div[2]/div[1]/div/div/div[1]/select/option[2]"));
            Purchased_Item.Click();
        }

        public static void Borrow_Items()
        {
            // Borrow Items
            var SafetyGear = Driver.Instance.FindElement(By.XPath("//*[@id='printable']/div/div/div/div/section/div[5]/div/div[2]/div[2]/button[1]"));
            SafetyGear.Click();
            var SafetyGear_Dropdown = Driver.Instance.FindElement(By.XPath("//*[@id='printable']/div/div/div/div/section/div[5]/div/div[2]/div[1]/div/div/div[1]/select"));
            SafetyGear_Dropdown.Click();
            var SafetyGearItem = Driver.Instance.FindElement(By.XPath("//*[@id='printable']/div/div/div/div/section/div[5]/div/div[2]/div[1]/div/div/div[1]/select/option[2]"));
            SafetyGearItem.Click();
        }
    }
}
