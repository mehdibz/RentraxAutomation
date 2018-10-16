using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Console = System.Diagnostics.Debug;
using static RentraxAutomation.CookiesManager;

namespace RentraxAutomation
{
    public class DashboardFramework
    {
        public static bool IsAt
        {
            get
            {
                var Span_tag = Driver.Instance.FindElement(By.CssSelector("#printable > div.tiles.margin-bototm-30.padding-left-tiles > p:nth-child(1) > span"));
                if (Span_tag.Text == "OPERATIONS")
                {
                    return true;
                }
                        
                return false;
            }
        }

        public static bool Check(By element,String text)
        {
            var tag = Driver.Instance.FindElement(element);
            if (tag.Text == text)
                return true;
            return false;
        }
    }
}
//Debug.Write("====>>>>  "+ url +"  <<<=====");