using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RollOffApi.Repository
{
    public class FeedBack: IFeedBack
    {
        private readonly ExcelDataContext context;
        public FeedBack(ExcelDataContext context)
        {
            this.context = context;
        }
        public async Task<FeedbackForm> AddFeedbackAsync(FeedbackForm feedback)
        {
            await context.FeedbackForms.AddAsync(feedback);
            await context.SaveChangesAsync();
            return feedback;
        }

        public async Task<IEnumerable<FeedbackForm>> GetAllFormsAsync()
        {
            try
            {
                return await context.FeedbackForms.ToListAsync();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}

