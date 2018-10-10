﻿using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using RentraxAutomation;

namespace Tests
{
    [TestClass]
    public class TestCase_N20
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
            OrderFramework.Rental_Period();
            OrderFramework.Borrow_Items();
            OrderFramework.TermAndCondition();
            OrderFramework.SignTerm();
            OrderFramework.Credit_Card_Info();
            Assert.IsTrue(OrderFramework.Pay());
        }

        [TestCleanup]
        public void CleanUp()
        {
           Driver.Close();
        }
    }
}
