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

        public static void TermAndCondition()
        {
            //
            var ReservationTerms = Driver.Instance.FindElement(By.XPath("//*[@id='renters']/tbody/tr[1]/td[1]/div"));
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
            Thread.Sleep(500);
            actionBuilder.ClickAndHold(canvas0)
                .MoveByOffset(-140, 5)
                .MoveByOffset(0, -45)
                .MoveByOffset(-30, 10)
                .MoveByOffset(-20, 2)
                .Release().Build().Perform();
            Thread.Sleep(500);
            actionBuilder.ClickAndHold(canvas0)
                .MoveByOffset(130, 50)
                .MoveByOffset(0, -45)
                .MoveByOffset(-20, 20)
                .MoveByOffset(-25, 5)
                .Release().Build().Perform();
            Thread.Sleep(500);
            actionBuilder.ClickAndHold(canvas0)
                .MoveByOffset(-120, -30)
                .MoveByOffset(0, -35)
                .MoveByOffset(21, -10)
                .MoveByOffset(20, -10)
                .Release().Build().Perform();
            Thread.Sleep(500);
            var save_agree = Driver.Instance.FindElement(By.XPath("//*[@id='btn_agree0']"));
            save_agree.Click();
            Thread.Sleep(4000);
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
            email.SendKeys("bz.mehdi@gmail.com");
            var firstName = Driver.Instance.FindElement(By.CssSelector("#first_name"));
            firstName.SendKeys("Mehdi");
            var lastName = Driver.Instance.FindElement(By.CssSelector("#last_name"));
            lastName.SendKeys("Bz");
            var Phone = Driver.Instance.FindElement(By.CssSelector("#customer_phone"));
            Phone.SendKeys("6047040000");
            var Address = Driver.Instance.FindElement(By.CssSelector("#address_street"));
            Address.SendKeys("Fullerton Ave");
            Driver.Wait(4, By.XPath("//*[@id='printable']/div/div/div/div/section/div[1]/div[1]/div/div[2]/div[1]"));
        }

        public static void I_want_To_Rent()
        {
            //Select the SingleBike
            Driver.Wait(2, By.XPath("//*[@id='printable']/div/div/div/div/section/div[3]/div[1]/div[2]/div/div/div[2]/button[1]"));
//            Features.ScrollToView(By.XPath("//*[@id='printable']/div/div/div/div/section/div[3]/div/div[1]/div[1]/div"));
            var singleBike = Driver.Instance.FindElement(By.XPath("//*[@id='printable']/div/div/div/div/section/div[3]/div[1]/div[2]/div/div/div[2]/button[1]"));
            singleBike.Click();
            var selectBike = Driver.Instance.FindElement(By.XPath("//*[@id='printable']/div/div/div/div/section/div[3]/div[1]/div[2]/div/div[2]/div[1]/div/div[1]/div[2]/select"));
            selectBike.Click();
            var selectedBike = Driver.Instance.FindElement(By.XPath("//*[@id='printable']/div/div/div/div/section/div[3]/div[1]/div[2]/div/div[2]/div[1]/div/div[1]/div[2]/select/option[3]"));
            selectedBike.Click();
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
            Driver.Wait(4, By.XPath("//*[@id='printable']/div/div/div/div/section/div[1]/div[1]/div/div[2]/div[1]"));
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
            Driver.Wait(6, By.XPath("//*[@id='printable']/div/div/div/div/section/div[8]/input"));
            Features.ScrollToView(By.XPath("//*[@id='printable']/div/div/div/div/section/div[8]/input"));
            var pay = Driver.Instance.FindElement(By.XPath("//*[@id='printable']/div/div/div/div/section/div[8]/input"));
            Thread.Sleep(4000);
            pay.Click();
            Driver.Wait(6, By.XPath("//*[@id='printable']/div/div/div/div[2]/div/div/a[2]/small"));
            return DashboardFramework.Check(By.XPath("//*[@id='printable']/div/div/div/div[2]/div/div/a[2]/small"), "DELIVERED ORDERS");  
        }

        public static void SkipPaymentAndSubmit()
        {
            var Submit = Driver.Instance.FindElement(By.XPath("//*[@id='printable']/div/div/div/div/section/div[7]/div/div[3]/div/button"));
            Submit.Click();
        }

        public static void Check_Availability()
        {
            //Check Availability 
            var availability = Driver.Instance.FindElement(By.XPath("//*[@id='Renter_12']/button"));
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
