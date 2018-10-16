using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using RentraxAutomation;

namespace Tests
{
    [TestClass]
    public class TestCase_N56
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
            OrderFramework.RentType("Now");
            OrderFramework.Customer_Info();
            OrderFramework.MultiRenter_SingleProduct();
            OrderFramework.First_Renter_Attributes_1();
            OrderFramework.Second_Renter_Attributes_1();
            OrderFramework.Rental_Period();
            OrderFramework.Borrow_Items();
            OrderFramework.TermAndCondition();
            OrderFramework.SignTerm();
            OrderFramework.TermAndCondition2();
            OrderFramework.SignTerm2();
            OrderFramework.Credit_Card_Info();
            Assert.IsTrue(OrderFramework.Validate());
        }

        [TestCleanup]
        public void CleanUp()
        {
           Driver.Close();
        }
    }
}
