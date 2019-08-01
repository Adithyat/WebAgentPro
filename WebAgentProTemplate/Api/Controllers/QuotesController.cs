using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
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
            return await _context.Quotes.ToListAsync();
        }

        // GET: api/Quotes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Quote>> GetQuote(long id)
        {
            var quote = _context.Quotes
                .Include(q => q.QuoteDrivers)
                .Include(q => q.QuoteVehicles)
                .Where(q => q.QuoteId == id)
                .FirstOrDefault();

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

            // if status is not submitted
            // find and update all discounts in lookup tables
            // if status IS submitted, just call the function



            return Calculator.CalculateQuoteCost(id);
        }

        // PUT: api/Quotes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuote(long id, Quote quote)
        {
            if (id != quote.QuoteId)
            {
                return BadRequest("Bad QuoteId");
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
                    return NotFound("Quote does not exist");
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

        [HttpPost("{quoteId}/AddDriver")]
        public async Task<ActionResult<Driver>> AddDriver(Driver driver, int quoteId)
        {
            driver.QuoteId = quoteId;
            _context.Drivers.Add(driver);
               
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuote", new { id = driver.DriverId }, driver);
        }

        [HttpDelete("RemoveDriver/{driverId}")]
        public async Task<ActionResult<Driver>> RemoveDriver(Driver driver, int driverId)
        {
            var driverToRemove = _context.Drivers
                .Where(d => d.DriverId == driverId)
                .FirstOrDefault();
            _context.Drivers.Remove(driverToRemove);

            await _context.SaveChangesAsync();

            return driverToRemove;
        }

        [HttpPost("{quoteId}/AddVehicle")]
        public async Task<ActionResult<Vehicle>> AddVehicle(Vehicle vehicle, int quoteId)
        {
            vehicle.QuoteId = quoteId;
            _context.Vehicles.Add(vehicle);

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuote", new { id = vehicle.VehicleId }, vehicle);
        }

        [HttpDelete("RemoveVehicle/{vehicleId}")]
        public async Task<ActionResult<Vehicle>> RemoveVehicle(Vehicle vehicle, int vehicleId)
        {
            var vehicleToRemove = _context.Vehicles
                .Where(d => d.VehicleId == vehicleId)
                .FirstOrDefault();
            _context.Vehicles.Remove(vehicleToRemove);

            await _context.SaveChangesAsync();

            return vehicleToRemove;
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult<Quote>> UpdateQuote([FromBody]JsonPatchDocument<Quote> patch, int id)
        {
            if(patch == null)
            {
                return BadRequest();
            }

            var update = _context.Quotes.Where(q => q.QuoteId == id).FirstOrDefault();

            if(update == null)
            {
                return NotFound("Unable to find quote");
            }

            patch.ApplyTo(update, ModelState);

            return Ok();
        }

        private bool QuoteExists(long id)
        {
            return _context.Quotes.Any(e => e.QuoteId == id);
        }
    }
}
