﻿using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using RentraxAutomation;

namespace Tests
{
    [TestClass]
    public class TestCase_N31
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
            OrderFramework.MultiRenter_MultiProduct();
            OrderFramework.Rental_Period();
            OrderFramework.Would_Like_To_Purchase();
            OrderFramework.TermAndCondition();
            OrderFramework.SignTerm();
            OrderFramework.TermAndCondition2();
            OrderFramework.SignTerm2();
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
