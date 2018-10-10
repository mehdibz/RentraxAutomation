using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using RentraxAutomation;

namespace Tests
{
    [TestClass]
    public class TestCase_All
    {
        [TestInitialize]
        public void Init()
        {
            Driver.Initialize();
        }
        [TestMethod]
        public void MakeAnOrder()
        {
            Login_OK login = new Login_OK();
            login.User_Can_Login();
            OrderFramework.GoToRent();
            OrderFramework.NewOrder();
            OrderFramework.RentType();
            OrderFramework.Customer_Info();
            OrderFramework.I_want_To_Rent();
            OrderFramework.Renter_Attributes();
            OrderFramework.Check_Availability();
            OrderFramework.Rental_Period();
            OrderFramework.Borrow_Items();
            OrderFramework.Would_Like_To_Purchase();
            OrderFramework.TermAndCondition();
            OrderFramework.SignTerm();
            OrderFramework.Credit_Card_Info();
       //Orders.SkipPaymentAndSubmit();
            Assert.IsTrue(OrderFramework.Pay());
       //Assert.IsTrue(DashboardPage.IsAt, "Failed to login.");
        }

        [TestCleanup]
        public void CleanUp()
        {
           //Driver.Close();
        }
    }
}
