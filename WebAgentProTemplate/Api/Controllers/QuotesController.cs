using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAgentPro.Data;
using WebAgentProTemplate.Api.CostCalculators;
using WebAgentProTemplate.Api.Models;

namespace WebAgentProTemplate.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuotesController : ControllerBase
    {
        private readonly WapDbContext _context;

        public QuotesController(WapDbContext context)
        {
            _context = context;
        }

        // GET: api/Quotes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Quote>>> GetQuotes()
        {
            return await _context.Quotes
                .Include(q => q.QuoteDrivers)
                .Include(q => q.QuoteVehicles)
                .ToListAsync();
        }

        // GET: api/Quotes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Quote>> GetQuote(long id)
        {
            var quote = await _context.Quotes.FindAsync(id);

            if (quote == null)
            {
                return NotFound();
            }

            return quote;
        }

        [HttpGet("Calculate/{id}")]
        public async Task<ActionResult<QuoteReceipt>> CalculateQuote(long id)
        {
            var Calculator = new QuoteCostCalculator(_context);
            return Calculator.CalculateQuoteCost(id);
        }

        // PUT: api/Quotes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuote(long id, Quote quote)
        {
            if (id != quote.QuoteId)
            {
                return BadRequest();
            }

            _context.Entry(quote).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuoteExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Quotes
        [HttpPost]
        public async Task<ActionResult<Quote>> PostQuote(Quote quote)
        {
            _context.Quotes.Add(quote);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuote", new { id = quote.QuoteId }, quote);
        }

        // DELETE: api/Quotes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Quote>> DeleteQuote(long id)
        {
            var quote = await _context.Quotes.FindAsync(id);
            if (quote == null)
            {
                return NotFound();
            }

            _context.Quotes.Remove(quote);
            await _context.SaveChangesAsync();

            return quote;
        }

        private bool QuoteExists(long id)
        {
            return _context.Quotes.Any(e => e.QuoteId == id);
        }
    }
}
