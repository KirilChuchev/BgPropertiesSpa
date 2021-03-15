using BgPropertiesServer.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BgPropertiesServer.Helpers
{
    public static class AdvIdentityGenerator
    {
        public static string Generate(ApplicationDbContext dbContext)
        {
            //const string AllowedChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#@$^*()";
            const string AllowedChars = "0123456789abcdefghijklmnopqrstuvwxyz";
            Random rng = new Random();
            var strList = new List<string>();

            var advIdentity = string.Join(string.Empty, strList);
            while (true)
            {
                
                foreach (string randomString in rng.NextStrings(AllowedChars, (1, 1), 17))
                {
                    strList.Add(randomString);
                }
                advIdentity = string.Join(string.Empty, strList);
                if (dbContext.BgProperties.Any(x => x.AdvIdentity == advIdentity) == false)
                {
                    break;
                }
            }

            return advIdentity;
        }

        public static IEnumerable<string> NextStrings(
            this Random rnd,
            string allowedChars,
            (int Min, int Max) length,
            int count)
        {
            ISet<string> usedRandomStrings = new HashSet<string>();
            (int min, int max) = length;
            char[] chars = new char[max];
            int setLength = allowedChars.Length;

            while (count-- > 0)
            {
                int stringLength = rnd.Next(min, max + 1);

                for (int i = 0; i < stringLength; ++i)
                {
                    chars[i] = allowedChars[rnd.Next(setLength)];
                }

                string randomString = new string(chars, 0, stringLength);

                if (usedRandomStrings.Add(randomString))
                {
                    yield return randomString;
                }
                else
                {
                    count++;
                }
            }
        }
    }
}
