using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using RentraxAutomation;

namespace Tests
{
    [TestClass]
    public class Place_an_order
    {
        [TestInitialize]
        public void Init()
        {
            Driver.Initialize();
        }
        [TestMethod]
        public void MakeAnOrder()
        {
            LoginFramework.GoTo();
            LoginFramework.LoginAs("bz.mehdi@gmail.com").WithPassword("as12341234").Login();
                      Orders.GoToRent();
                        Orders.NewOrder();
                        Orders.RentType();
                        Orders.Customer_Info();
                        Orders.Check_Availability();
            /*
                        Orders.I_want_To_Rent();
                        Orders.Rental_Period();
                        Orders.Borrow_Items();
                        Orders.Would_Like_To_Purchase();
                        Orders.Credit_Card_Info();

                        Orders.SkipPaymentAndSubmit();
                        Orders.Pay();
                        */


            Assert.IsTrue(DashboardPage.IsAt, "Failed to login.");
        }

        [TestCleanup]
        public void CleanUp()
        {
            Driver.Close();
        }
    }
}
