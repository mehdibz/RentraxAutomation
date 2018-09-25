using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using RentraxAutomation;

namespace Place_an_order
{
    class Place_an_order
    {
        [TestInitialize]
        public void Init()
        {
            Driver.Initialize();
        }
        [TestMethod]
        public void User_Can_Login()
        {
            LoginFramework.GoTo();
            LoginFramework.LoginAs("bz.mehdi@gmail.com").WithPassword("as12341234").Login();
            Orders.GoToRent();
            Orders.NewOrder();
            Orders.RentType();
            Orders.Customer_Info();
            Orders.I_want_To_Rent();
            Orders.Rental_Period();
            Orders.Borrow_Items();
            Orders.Would_Like_To_Purchase();
            Orders.Credit_Card_Info();
            Orders.Check_Availability();
            Orders.SkipPaymentAndSubmit();
            Orders.Pay();



            //#printable > div.tiles.margin-bototm-30.padding-left-tiles > a:nth-child(2)
            //# printable > div > div > div > div.portlet-title > div.tools > div > a
            Assert.IsTrue(DashboardPage.IsAt, "Failed to login.");
        }

        [TestCleanup]
        public void CleanUp()
        {
            Driver.Close();
        }
    }
}
